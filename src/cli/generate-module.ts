#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import yargs from "yargs";
import {
  hideBin,
} from "yargs/helpers";

import {
  GnoJSONRPCProvider,
} from "../provider/jsonrpc/jsonrpc";
import {
  FunctionSignature, NamedType,
} from "../provider/types/vm";

function gnoTypeToTS(gnoType: string): string {
  switch (gnoType) {
    case "string":
      return "string";
    case "bool":
      return "boolean";
    case "int":
    case "int64":
    case "uint":
    case "uint64":
      return "bigint";
    case "int8":
    case "int16":
    case "int32":
    case "uint8":
    case "uint16":
    case "uint32":
    case "float32":
    case "float64":
    case "byte":
    case "rune":
      return "number";
    case "error":
      return "string";
    default:
      return "unknown";
  }
}

/**
 * Returns true if the parameter is a VM-injected context (std.Caller)
 * that should not be exposed to the user.
 */
function isContextParam(param: NamedType): boolean {
  return param.Type.startsWith("interface {");
}

/**
 * Sanitize a Gno parameter name into a valid TypeScript identifier.
 * The VM uses names like ".arg_0" for unnamed params.
 */
function sanitizeParamName(name: string): string {
  // Strip leading dots / non-identifier characters
  const cleaned = name.replace(/^[^a-zA-Z_$]+/, "");
  return cleaned || "arg";
}

/**
 * Filter out VM-injected context parameters from a function's param list.
 */
function filterUserParams(params: NamedType[] | null): NamedType[] {
  if (!params) return [];
  return params
    .filter(p => !isContextParam(p))
    .map(p => ({
      ...p,
      Name: sanitizeParamName(p.Name),
    }));
}

function normalizeResults(results: NamedType[] | null): NamedType[] {
  return results || [];
}

function realmPathToSegments(realmPath: string): string[] {
  return realmPath
    .replace(/^gno\.land\//, "")
    .split("/")
    .filter(s => s.length > 0);
}

/**
 * Ensure the realm path has the gno.land prefix required by the VM.
 * Accepts both "/r/demo/boards" and "gno.land/r/demo/boards".
 */
function normalizeRealmPath(realmPath: string): string {
  if (realmPath.startsWith("/")) {
    return "gno.land" + realmPath;
  }
  return realmPath;
}

function buildReturnType(results: NamedType[]): string {
  if (results.length === 0) {
    return "void";
  }
  return "[" + results.map(r => gnoTypeToTS(r.Type)).join(", ") + "]";
}

function buildParamsType(params: NamedType[]): string {
  if (params.length === 0) {
    return "";
  }
  const fields = params
    .map(p => `${p.Name}: ${gnoTypeToTS(p.Type)}`)
    .join("; ");
  return `params: { ${fields} }`;
}

function buildEvalExpression(funcName: string, params: NamedType[]): string {
  if (params.length === 0) {
    return `\`${funcName}()\``;
  }
  const args = params
    .map((p) => {
      if (p.Type === "string") {
        return `"\${params.${p.Name}}"`;
      }
      return `\${params.${p.Name}}`;
    })
    .join(",");
  return `\`${funcName}(${args})\``;
}

function buildCallArgs(params: NamedType[]): string {
  if (params.length === 0) {
    return "[]";
  }
  const args = params.map(p => `String(params.${p.Name})`).join(", ");
  return `[${args}]`;
}

function generateModule(
  realmPath: string,
  signatures: FunctionSignature[],
): string {
  const segments = realmPathToSegments(realmPath);
  const lines: string[] = [];

  lines.push("/* eslint-disable max-lines-per-function */");
  lines.push("/* eslint-disable max-lines */");
  lines.push("// Auto-generated module for " + realmPath + " — DO NOT EDIT");
  // Imports
  lines.push(
    "import { TransactionEndpoint, TxFee } from \"@gnolang/tm2-js-client\";",
  );
  lines.push("import { GnoWallet } from \"@gnolang/gno-js-client\";");
  lines.push("// Imported with leading underscore to avoid linting errors about unused imports in void-returning functions");
  lines.push(
    "import { parseGnoReturns as _parseGnoReturns } from \"@gnolang/gno-js-client\";",
  );
  lines.push("");

  // Realm path constant
  lines.push(`const realm = "${realmPath}";`);
  lines.push("");

  // Pre-process signatures: filter context params and normalize results
  const processed = signatures.map(sig => ({
    ...sig,
    Params: filterUserParams(sig.Params),
    Results: normalizeResults(sig.Results),
  }));

  // Return type aliases
  for (const sig of processed) {
    const returnType = buildReturnType(sig.Results);
    if (returnType !== "void") {
      lines.push(`type ${sig.FuncName}Return = ${returnType};`);
    }
  }
  lines.push("");

  // queryClient
  lines.push("const queryClient = (wallet: GnoWallet) => {");
  lines.push("\treturn {");
  for (let i = 0; i < processed.length; i++) {
    const sig = processed[i];
    const paramsType = buildParamsType(sig.Params);
    const returnType = buildReturnType(sig.Results);
    const hasReturn = returnType !== "void";
    const returnTypeStr = hasReturn ? `${sig.FuncName}Return` : "void";
    const evalExpr = buildEvalExpression(sig.FuncName, sig.Params);

    const paramsList = paramsType
      ? `${paramsType}, height?: number`
      : "height?: number";

    lines.push(
      `\t\tasync ${sig.FuncName}(${paramsList}):Promise<${returnTypeStr}> {`,
    );
    if (hasReturn) {
      lines.push(
        `\t\t\tconst result = await wallet.getProvider().evaluateExpression(realm, ${evalExpr}, height);`,
      );
      lines.push(`\t\t\treturn _parseGnoReturns(result) as ${returnTypeStr};`);
    }
    else {
      lines.push(
        `\t\t\tawait wallet.getProvider().evaluateExpression(realm, ${evalExpr}, height);`,
      );
      lines.push("\t\t\treturn;");
    }
    lines.push("\t\t}" + (i < processed.length - 1 ? "," : ""));
  }
  lines.push("\t}");
  lines.push("}");
  lines.push("");

  // txClient
  lines.push("const txClient = (wallet: GnoWallet) => {");
  lines.push("\treturn {");
  for (let i = 0; i < processed.length; i++) {
    const sig = processed[i];
    const paramsType = buildParamsType(sig.Params);
    const returnType = buildReturnType(sig.Results);
    const hasReturn = returnType !== "void";
    const returnTypeStr = hasReturn ? `${sig.FuncName}Return` : "void";
    const callArgs = buildCallArgs(sig.Params);

    const paramsList = paramsType
      ? `${paramsType}, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee`
      : "funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee";

    lines.push(
      `\t\tasync ${sig.FuncName}(${paramsList}):Promise<${returnTypeStr}> {`,
    );
    lines.push("\t\t\tconst resp = await wallet.callMethod(");
    lines.push("\t\t\t\trealm,");
    lines.push(`\t\t\t\t"${sig.FuncName}",`);
    lines.push(`\t\t\t\t${callArgs},`);
    lines.push("\t\t\t\tTransactionEndpoint.BROADCAST_TX_COMMIT,");
    lines.push("\t\t\t\tfunds,");
    lines.push("\t\t\t\tmaxDeposit,");
    lines.push("\t\t\t\tfee");
    lines.push("\t\t\t);");
    lines.push("\t\t\tif (resp.deliver_tx.ResponseBase.Error) {");
    lines.push(
      "\t\t\t\tthrow new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));",
    );
    lines.push("\t\t\t}");
    if (hasReturn) {
      lines.push(
        "\t\t\tconst result = atob(resp.deliver_tx.ResponseBase.Data as string);",
      );
      lines.push(`\t\t\treturn _parseGnoReturns(result) as ${returnTypeStr};`);
    }
    lines.push("\t\t}" + (i < processed.length - 1 ? "," : ""));
  }
  lines.push("\t}");
  lines.push("}");
  lines.push("");

  // RealmModule class
  lines.push("class RealmModule {");
  lines.push("\tpublic query: ReturnType<typeof queryClient>;");
  lines.push("\tpublic tx: ReturnType<typeof txClient>;");
  lines.push("");
  lines.push("\tconstructor(wallet: GnoWallet) {");
  lines.push("\t\tthis.tx = txClient(wallet);");
  lines.push("\t\tthis.query = queryClient(wallet);");
  lines.push("\t}");
  lines.push("}");
  lines.push("");

  // Factory function — build nested realms object from path segments
  const opening = segments.map(seg => `{ ${seg}: `).join("");
  const closing = " }".repeat(segments.length);
  lines.push("const Realm = (wallet: GnoWallet) => {");
  lines.push("\treturn {");
  lines.push(
    `\t\trealm: { realms: ${opening}new RealmModule(wallet)${closing} }`,
  );
  lines.push("\t}");
  lines.push("}");
  lines.push("");
  lines.push("export default Realm;");
  lines.push("");

  return lines.join("\n");
}

async function generateAndWrite(
  provider: GnoJSONRPCProvider,
  realmPath: string,
  outRoot: string,
): Promise<boolean> {
  console.log(`Fetching function signatures for ${realmPath}...`);
  let signatures: FunctionSignature[];
  try {
    signatures = await provider.getFunctionSignatures(realmPath);
  }
  catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to fetch function signatures for "${realmPath}" from provider:\n  ${msg}\n\nPlease verify:\n  - The realm path "${realmPath}" exists on the chain`,
      {
        cause: err,
      });
  }
  if (!signatures || signatures.length === 0) {
    console.log("  No exported functions, skipping.");
    return false;
  }
  console.log(`  ${signatures.length} function(s) found.`);

  const code = generateModule(realmPath, signatures);
  const segments = realmPathToSegments(realmPath);
  const outDir = path.join(outRoot, ...segments);
  fs.mkdirSync(outDir, {
    recursive: true,
  });
  const outFile = path.join(outDir, "module.ts");
  fs.writeFileSync(outFile, code, "utf-8");
  console.log(`  Written to ${outFile}`);
  return true;
}

function writeIndex(outRoot: string, realmPaths: string[]): void {
  const lines: string[] = [];
  for (const realmPath of realmPaths) {
    const segments = realmPathToSegments(realmPath);
    const alias = segments.join("_");
    const importPath = "./" + segments.join("/") + "/module";
    lines.push(`export { default as ${alias} } from '${importPath}';`);
  }
  lines.push("");
  const outFile = path.join(outRoot, "index.ts");
  fs.writeFileSync(outFile, lines.join("\n"), "utf-8");
  console.log(`\nIndex written to ${outFile}`);
}

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option("realm", {
      type: "string",
      describe: "Realm path, e.g. gno.land/r/demo/boards or /r/demo/boards",
    })
    .option("prefix", {
      type: "string",
      describe:
        "Path prefix — generate modules for all realms under this path, e.g. /r/gnoland",
    })
    .option("remote", {
      type: "string",
      demandOption: true,
      describe: "JSON-RPC endpoint URL, e.g. http://localhost:26657",
    })
    .option("out", {
      type: "string",
      default: ".",
      describe: "Root output directory",
    })
    .check((argv) => {
      if (argv.realm && argv.prefix) {
        throw new Error("--realm and --prefix are mutually exclusive");
      }
      return true;
    })
    .help()
    .parseAsync();

  const provider = await GnoJSONRPCProvider.create(argv.remote);

  const generated: string[] = [];

  if (argv.realm) {
    const realmPath = normalizeRealmPath(argv.realm);
    if (await generateAndWrite(provider, realmPath, argv.out)) {
      generated.push(realmPath);
    }
  }
  else {
    const prefix = argv.prefix
      ? normalizeRealmPath(argv.prefix)
      : "gno.land/r/";
    console.log(`Discovering realms under ${prefix}...`);
    const realmPaths = await provider.getRealmPaths(prefix);
    if (realmPaths.length === 0) {
      console.log("No realms found.");
      return;
    }
    console.log(`Found ${realmPaths.length} realm(s).\n`);
    for (const realmPath of realmPaths) {
      try {
        if (await generateAndWrite(provider, realmPath, argv.out)) {
          generated.push(realmPath);
        }
      }
      catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  Skipping ${realmPath}: ${msg}`);
      }
    }
  }

  if (generated.length > 0) {
    writeIndex(argv.out, generated);
  }
}

main().catch((err) => {
  console.error("Error:", err.message || err);
  process.exit(1);
});

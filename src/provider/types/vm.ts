export interface FunctionSignature {
  FuncName: string
  Params: NamedType[]
  Results: NamedType[]
}

export interface NamedType {
  Name: string
  Type: string
  Value: string
}

export interface TypedValueJSON {
  T?: unknown
  V?: unknown
  N?: string
}

export interface EvalJSONResult {
  results: TypedValueJSON[]
  /** Set when the last result is an error. It can be "", so compare with undefined. */
  "@error"?: string
}

export interface RealmStorage {
  /** uint64 values use bigint, matching decodeTypedValue's 64-bit integers. */
  storage: bigint
  deposit: bigint
}

/** Raw amino JSON from gnovm/pkg/doc.JSONDocumentation. Nil slices remain null; Go int lines are strings. */
export interface PackageDocumentation {
  package_path: string
  package_line: string
  package_doc: string
  imports?: string[]
  bugs: string[] | null
  values: DocumentationValueDecl[] | null
  funcs: DocumentationFunction[] | null
  types: DocumentationType[] | null
}

export interface DocumentationValueDecl {
  signature: string
  const: boolean
  values: DocumentationValue[] | null
  doc: string
  file?: string
  line?: string
}

export interface DocumentationValue {
  name: string
  doc: string
  type: string
}

export interface DocumentationField {
  name: string
  type: string
  doc: string
}

export interface DocumentationFunction {
  type: string
  name: string
  crossing: boolean
  signature: string
  doc: string
  params: DocumentationField[] | null
  results: DocumentationField[] | null
  file?: string
  line?: string
}

export interface DocumentationInterfaceElement {
  method?: DocumentationFunction
  type?: string
}

export interface DocumentationType {
  name: string
  type: string
  doc: string
  alias: boolean
  kind: string
  inter_elems?: DocumentationInterfaceElement[]
  fields?: DocumentationField[]
  file?: string
  line?: string
}

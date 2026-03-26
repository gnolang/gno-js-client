import { GnoWallet } from "./wallet";

export type Constructor<T> = new (...args: any[]) => T;

export type AnyFunction = (...args: any) => any;

export type UnionToIntersection<Union> =
  (Union extends any
    ? (argument: Union) => void
    : never
  ) extends (argument: infer Intersection) => void
      ? Intersection
  : never;

export type Return<T> =
  T extends AnyFunction
  ? ReturnType<T>
  : T extends AnyFunction[]
  ? UnionToIntersection<ReturnType<T[number]>>
      : never

export type RealmInterface = { [key: string]: any }
export type Realm = (instance: GnoWallet) => { realm: RealmInterface}

const bigIntTypes = new Set(['int', 'int64', 'uint', 'uint64']);

export const parseGnoReturns = (result: string):Array<unknown> => {
  const ret=[];
  const values = result.split("\n").filter(v => v.length > 0);
  for (let i=0; i<values.length; i++) {
    // Format: "(value type)" — strip parens, split type from value
    const inner = values[i].slice(1, -1);
    const lastSpace = inner.lastIndexOf(" ");
    const rawValue = inner.substring(0, lastSpace);
    const gnoType = inner.substring(lastSpace + 1);

    if (bigIntTypes.has(gnoType)) {
      ret.push(BigInt(rawValue));
    } else {
      ret.push(JSON.parse(rawValue));
    }
  }
  return ret;
}

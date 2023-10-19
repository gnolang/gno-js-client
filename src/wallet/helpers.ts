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

export const parseGnoReturns = (result: string):Array<unknown> => {
  const ret=[];
  const values = result.split("\n");
  for (let i=0; i<values.length; i++) {
    let value=JSON.parse(values[i].substring(1).split(" ").slice(0,-1).join(" "));
    ret.push(value);
  }
  return ret;
}

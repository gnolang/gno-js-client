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

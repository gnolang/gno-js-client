export interface FunctionSignature {
  FuncName: string;
  Params: NamedType[];
  Results: NamedType[];
}

export interface NamedType {
  Name: string;
  Type: string;
  Value: string;
}

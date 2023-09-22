/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Value } from '../google/protobuf/struct';

export const protobufPackage = 'gno.vm';

/**
 * MsgCall is the method invocation tx message,
 * denoted as "m_call"
 */
export interface MsgCall {
  /** the bech32 address of the caller */
  caller: string;
  /** the amount of funds to be deposited to the package, if any ("<amount><denomination>") */
  send: string;
  /** the gno package path */
  pkg_path: string;
  /** the function name being invoked */
  func: string;
  /** the function arguments */
  args?: any | undefined;
}

/**
 * MsgAddPackage is the package deployment tx message,
 * denoted as "m_addpkg"
 */
export interface MsgAddPackage {
  /** the package deployer */
  creator: string;
  /** the package being deployed */
  package?: MemPackage | undefined;
  /** the amount of funds to be deposited at deployment, if any ("<amount><denomination>") */
  deposit: string;
}

/**
 * MemPackage is the metadata information tied to
 * package / realm deployment
 */
export interface MemPackage {
  /** the name of the package */
  name: string;
  /** the gno path of the package */
  path: string;
  /** the associated package gno source */
  files: MemFile[];
}

/**
 * MemFile is the metadata information tied to
 * a single gno package / realm file
 */
export interface MemFile {
  /** the name of the source gno file */
  name: string;
  /** the content of the source gno file */
  body: string;
}

function createBaseMsgCall(): MsgCall {
  return { caller: '', send: '', pkg_path: '', func: '', args: undefined };
}

export const MsgCall = {
  encode(
    message: MsgCall,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.caller !== '') {
      writer.uint32(10).string(message.caller);
    }
    if (message.send !== '') {
      writer.uint32(18).string(message.send);
    }
    if (message.pkg_path !== '') {
      writer.uint32(26).string(message.pkg_path);
    }
    if (message.func !== '') {
      writer.uint32(34).string(message.func);
    }
    if (message.args !== undefined) {
      Value.encode(Value.wrap(message.args), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCall {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCall();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.caller = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.send = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.pkg_path = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.func = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.args = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCall {
    return {
      caller: isSet(object.caller) ? String(object.caller) : '',
      send: isSet(object.send) ? String(object.send) : '',
      pkg_path: isSet(object.pkg_path) ? String(object.pkg_path) : '',
      func: isSet(object.func) ? String(object.func) : '',
      args: isSet(object?.args) ? object.args : undefined,
    };
  },

  toJSON(message: MsgCall): unknown {
    const obj: any = {};
    if (message.caller !== '') {
      obj.caller = message.caller;
    }
    if (message.send !== '') {
      obj.send = message.send;
    }
    if (message.pkg_path !== '') {
      obj.pkg_path = message.pkg_path;
    }
    if (message.func !== '') {
      obj.func = message.func;
    }
    if (message.args !== undefined) {
      obj.args = message.args;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCall>, I>>(base?: I): MsgCall {
    return MsgCall.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCall>, I>>(object: I): MsgCall {
    const message = createBaseMsgCall();
    message.caller = object.caller ?? '';
    message.send = object.send ?? '';
    message.pkg_path = object.pkg_path ?? '';
    message.func = object.func ?? '';
    message.args = object.args ?? undefined;
    return message;
  },
};

function createBaseMsgAddPackage(): MsgAddPackage {
  return { creator: '', package: undefined, deposit: '' };
}

export const MsgAddPackage = {
  encode(
    message: MsgAddPackage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== '') {
      writer.uint32(10).string(message.creator);
    }
    if (message.package !== undefined) {
      MemPackage.encode(message.package, writer.uint32(18).fork()).ldelim();
    }
    if (message.deposit !== '') {
      writer.uint32(26).string(message.deposit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddPackage {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddPackage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.package = MemPackage.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.deposit = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddPackage {
    return {
      creator: isSet(object.creator) ? String(object.creator) : '',
      package: isSet(object.package)
        ? MemPackage.fromJSON(object.package)
        : undefined,
      deposit: isSet(object.deposit) ? String(object.deposit) : '',
    };
  },

  toJSON(message: MsgAddPackage): unknown {
    const obj: any = {};
    if (message.creator !== '') {
      obj.creator = message.creator;
    }
    if (message.package !== undefined) {
      obj.package = MemPackage.toJSON(message.package);
    }
    if (message.deposit !== '') {
      obj.deposit = message.deposit;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddPackage>, I>>(
    base?: I
  ): MsgAddPackage {
    return MsgAddPackage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddPackage>, I>>(
    object: I
  ): MsgAddPackage {
    const message = createBaseMsgAddPackage();
    message.creator = object.creator ?? '';
    message.package =
      object.package !== undefined && object.package !== null
        ? MemPackage.fromPartial(object.package)
        : undefined;
    message.deposit = object.deposit ?? '';
    return message;
  },
};

function createBaseMemPackage(): MemPackage {
  return { name: '', path: '', files: [] };
}

export const MemPackage = {
  encode(
    message: MemPackage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.path !== '') {
      writer.uint32(18).string(message.path);
    }
    for (const v of message.files) {
      MemFile.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemPackage {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemPackage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.path = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.files.push(MemFile.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemPackage {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      path: isSet(object.path) ? String(object.path) : '',
      files: Array.isArray(object?.files)
        ? object.files.map((e: any) => MemFile.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MemPackage): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.path !== '') {
      obj.path = message.path;
    }
    if (message.files?.length) {
      obj.files = message.files.map((e) => MemFile.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemPackage>, I>>(base?: I): MemPackage {
    return MemPackage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemPackage>, I>>(
    object: I
  ): MemPackage {
    const message = createBaseMemPackage();
    message.name = object.name ?? '';
    message.path = object.path ?? '';
    message.files = object.files?.map((e) => MemFile.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMemFile(): MemFile {
  return { name: '', body: '' };
}

export const MemFile = {
  encode(
    message: MemFile,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.body !== '') {
      writer.uint32(18).string(message.body);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemFile {
    const reader =
      input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemFile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.body = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemFile {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      body: isSet(object.body) ? String(object.body) : '',
    };
  },

  toJSON(message: MemFile): unknown {
    const obj: any = {};
    if (message.name !== '') {
      obj.name = message.name;
    }
    if (message.body !== '') {
      obj.body = message.body;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemFile>, I>>(base?: I): MemFile {
    return MemFile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemFile>, I>>(object: I): MemFile {
    const message = createBaseMemFile();
    message.name = object.name ?? '';
    message.body = object.body ?? '';
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

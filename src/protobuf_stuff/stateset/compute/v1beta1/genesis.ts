/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import {
  CodeInfo, ContractCustomInfo, ContractInfo, Model
} from "../../../stateset/compute/v1beta1/types";

export const protobufPackage = "stateset.compute.v1beta1";

/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
  /** Params params = 1 [(gogoproto.nullable) = false]; */
  codes: Code[];
  contracts: Contract[];
  sequences: Sequence[];
}

/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
  codeId: string;
  codeInfo?: CodeInfo;
  codeBytes: Uint8Array;
}

/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
  contractAddress: Uint8Array;
  contractInfo?: ContractInfo;
  contractState: Model[];
  contractCustomInfo?: ContractCustomInfo;
}

/** Sequence id and value of a counter */
export interface Sequence {
  idKey: Uint8Array;
  value: string;
}

function createBaseGenesisState(): GenesisState {
  return { codes: [], contracts: [], sequences: [] };
}

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.codes) {
      Code.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.contracts) {
      Contract.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.sequences) {
      Sequence.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.codes.push(Code.decode(reader, reader.uint32()));
          break;
        case 3:
          message.contracts.push(Contract.decode(reader, reader.uint32()));
          break;
        case 4:
          message.sequences.push(Sequence.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      codes: Array.isArray(object?.codes)
        ? object.codes.map((e: any) => Code.fromJSON(e))
        : [],
      contracts: Array.isArray(object?.contracts)
        ? object.contracts.map((e: any) => Contract.fromJSON(e))
        : [],
      sequences: Array.isArray(object?.sequences)
        ? object.sequences.map((e: any) => Sequence.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.codes) {
      obj.codes = message.codes.map((e) => (e ? Code.toJSON(e) : undefined));
    } else {
      obj.codes = [];
    }
    if (message.contracts) {
      obj.contracts = message.contracts.map((e) =>
        e ? Contract.toJSON(e) : undefined,
      );
    } else {
      obj.contracts = [];
    }
    if (message.sequences) {
      obj.sequences = message.sequences.map((e) =>
        e ? Sequence.toJSON(e) : undefined,
      );
    } else {
      obj.sequences = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(
    object: I,
  ): GenesisState {
    const message = createBaseGenesisState();
    message.codes = object.codes?.map((e) => Code.fromPartial(e)) || [];
    message.contracts =
      object.contracts?.map((e) => Contract.fromPartial(e)) || [];
    message.sequences =
      object.sequences?.map((e) => Sequence.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCode(): Code {
  return { codeId: "0", codeInfo: undefined, codeBytes: new Uint8Array() };
}

export const Code = {
  encode(message: Code, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.codeId !== "0") {
      writer.uint32(8).uint64(message.codeId);
    }
    if (message.codeInfo !== undefined) {
      CodeInfo.encode(message.codeInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.codeBytes.length !== 0) {
      writer.uint32(26).bytes(message.codeBytes);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Code {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.codeId = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.codeInfo = CodeInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.codeBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Code {
    return {
      codeId: isSet(object.codeId) ? String(object.codeId) : "0",
      codeInfo: isSet(object.codeInfo)
        ? CodeInfo.fromJSON(object.codeInfo)
        : undefined,
      codeBytes: isSet(object.codeBytes)
        ? bytesFromBase64(object.codeBytes)
        : new Uint8Array(),
    };
  },

  toJSON(message: Code): unknown {
    const obj: any = {};
    message.codeId !== undefined && (obj.codeId = message.codeId);
    message.codeInfo !== undefined &&
      (obj.codeInfo = message.codeInfo
        ? CodeInfo.toJSON(message.codeInfo)
        : undefined);
    message.codeBytes !== undefined &&
      (obj.codeBytes = base64FromBytes(
        message.codeBytes !== undefined ? message.codeBytes : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Code>, I>>(object: I): Code {
    const message = createBaseCode();
    message.codeId = object.codeId ?? "0";
    message.codeInfo =
      object.codeInfo !== undefined && object.codeInfo !== null
        ? CodeInfo.fromPartial(object.codeInfo)
        : undefined;
    message.codeBytes = object.codeBytes ?? new Uint8Array();
    return message;
  },
};

function createBaseContract(): Contract {
  return {
    contractAddress: new Uint8Array(),
    contractInfo: undefined,
    contractState: [],
    contractCustomInfo: undefined,
  };
}

export const Contract = {
  encode(
    message: Contract,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.contractAddress.length !== 0) {
      writer.uint32(10).bytes(message.contractAddress);
    }
    if (message.contractInfo !== undefined) {
      ContractInfo.encode(
        message.contractInfo,
        writer.uint32(18).fork(),
      ).ldelim();
    }
    for (const v of message.contractState) {
      Model.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.contractCustomInfo !== undefined) {
      ContractCustomInfo.encode(
        message.contractCustomInfo,
        writer.uint32(34).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Contract {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContract();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contractAddress = reader.bytes();
          break;
        case 2:
          message.contractInfo = ContractInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.contractState.push(Model.decode(reader, reader.uint32()));
          break;
        case 4:
          message.contractCustomInfo = ContractCustomInfo.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Contract {
    return {
      contractAddress: isSet(object.contractAddress)
        ? bytesFromBase64(object.contractAddress)
        : new Uint8Array(),
      contractInfo: isSet(object.contractInfo)
        ? ContractInfo.fromJSON(object.contractInfo)
        : undefined,
      contractState: Array.isArray(object?.contractState)
        ? object.contractState.map((e: any) => Model.fromJSON(e))
        : [],
      contractCustomInfo: isSet(object.contractCustomInfo)
        ? ContractCustomInfo.fromJSON(object.contractCustomInfo)
        : undefined,
    };
  },

  toJSON(message: Contract): unknown {
    const obj: any = {};
    message.contractAddress !== undefined &&
      (obj.contractAddress = base64FromBytes(
        message.contractAddress !== undefined
          ? message.contractAddress
          : new Uint8Array(),
      ));
    message.contractInfo !== undefined &&
      (obj.contractInfo = message.contractInfo
        ? ContractInfo.toJSON(message.contractInfo)
        : undefined);
    if (message.contractState) {
      obj.contractState = message.contractState.map((e) =>
        e ? Model.toJSON(e) : undefined,
      );
    } else {
      obj.contractState = [];
    }
    message.contractCustomInfo !== undefined &&
      (obj.contractCustomInfo = message.contractCustomInfo
        ? ContractCustomInfo.toJSON(message.contractCustomInfo)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Contract>, I>>(object: I): Contract {
    const message = createBaseContract();
    message.contractAddress = object.contractAddress ?? new Uint8Array();
    message.contractInfo =
      object.contractInfo !== undefined && object.contractInfo !== null
        ? ContractInfo.fromPartial(object.contractInfo)
        : undefined;
    message.contractState =
      object.contractState?.map((e) => Model.fromPartial(e)) || [];
    message.contractCustomInfo =
      object.contractCustomInfo !== undefined &&
      object.contractCustomInfo !== null
        ? ContractCustomInfo.fromPartial(object.contractCustomInfo)
        : undefined;
    return message;
  },
};

function createBaseSequence(): Sequence {
  return { idKey: new Uint8Array(), value: "0" };
}

export const Sequence = {
  encode(
    message: Sequence,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.idKey.length !== 0) {
      writer.uint32(10).bytes(message.idKey);
    }
    if (message.value !== "0") {
      writer.uint32(16).uint64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sequence {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.idKey = reader.bytes();
          break;
        case 2:
          message.value = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Sequence {
    return {
      idKey: isSet(object.idKey)
        ? bytesFromBase64(object.idKey)
        : new Uint8Array(),
      value: isSet(object.value) ? String(object.value) : "0",
    };
  },

  toJSON(message: Sequence): unknown {
    const obj: any = {};
    message.idKey !== undefined &&
      (obj.idKey = base64FromBytes(
        message.idKey !== undefined ? message.idKey : new Uint8Array(),
      ));
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Sequence>, I>>(object: I): Sequence {
    const message = createBaseSequence();
    message.idKey = object.idKey ?? new Uint8Array();
    message.value = object.value ?? "0";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

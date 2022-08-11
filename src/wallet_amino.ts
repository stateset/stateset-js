import { toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoMsg, Coin } from ".";

export type WalletOptions = {
  hdAccountIndex?: number;
  coinType?: number;
  bech32Prefix?: string;
};

/**
 * Takes a binary pubkey and signature to create a signature object
 *
 * @param pubkey a compressed secp256k1 public key
 * @param signature a 64 byte fixed length representation of secp256k1 signature components r and s
 */
export function encodeSecp256k1Signature(
  pubkey: Uint8Array,
  signature: Uint8Array,
): StdSignature {
  if (signature.length !== 64) {
    throw new Error(
      "Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.",
    );
  }

  return {
    pub_key: encodeSecp256k1Pubkey(pubkey),
    signature: toBase64(signature),
  };
}

export function encodeSecp256k1Pubkey(pubkey: Uint8Array): Pubkey {
  if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
    throw new Error(
      "Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03",
    );
  }
  return {
    type: "tendermint/PubKeySecp256k1",
    value: toBase64(pubkey),
  };
}

export type AminoSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: StdSignDoc;
  readonly signature: StdSignature;
};

/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export type StdSignDoc = {
  readonly chain_id: string;
  readonly account_number: string;
  readonly sequence: string;
  readonly fee: StdFee;
  readonly msgs: readonly AminoMsg[];
  readonly memo: string;
};

export type StdFee = {
  readonly amount: readonly Coin[];
  readonly gas: string;
};

export type StdSignature = {
  readonly pub_key: Pubkey;
  readonly signature: string;
};

export type Pubkey = {
  // type is one of the strings defined in pubkeyType
  // I don't use a string literal union here as that makes trouble with json test data:
  // https://github.com/cosmos/cosmjs/pull/44#pullrequestreview-353280504
  readonly type: string;
  readonly value: any;
};

type Algo = "secp256k1" | "ed25519" | "sr25519";

export type AccountData = {
  /** A printable address (typically bech32 encoded) */
  readonly address: string;
  readonly algo: Algo;
  readonly pubkey: Uint8Array;
};

function sortedObject(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortedObject);
  }
  const sortedKeys = Object.keys(obj).sort();
  const result: Record<string, any> = {};
  // NOTE: Use forEach instead of reduce for performance with large objects eg Wasm code
  sortedKeys.forEach((key) => {
    result[key] = sortedObject(obj[key]);
  });
  return result;
}

/** Returns a JSON string with objects sorted by key, used for Amino signing */
function JsonSortedStringify(obj: any): string {
  return JSON.stringify(sortedObject(obj));
}

export function serializeStdSignDoc(signDoc: StdSignDoc): Uint8Array {
  return toUtf8(JsonSortedStringify(signDoc));
}

export type DirectSigner = {
  readonly getAccounts: () => Promise<readonly AccountData[]>;
  readonly signDirect: (
    signerAddress: string,
    signDoc: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc,
  ) => Promise<DirectSignResponse>;
};

export type DirectSignResponse = {
  /**
   * The sign doc that was signed.
   * This may be different from the input signDoc when the signer modifies it as part of the signing process.
   */
  readonly signed: import("./protobuf_stuff/cosmos/tx/v1beta1/tx").SignDoc;
  readonly signature: StdSignature;
};

export type Signer = AminoSigner | DirectSigner;

export function isOfflineDirectSigner(signer: Signer): signer is DirectSigner {
  return (signer as DirectSigner).signDirect !== undefined;
}

export interface AminoSigner {
  /**
   * Get AccountData array from wallet. Rejects if not enabled.
   */
  readonly getAccounts: () => Promise<readonly AccountData[]>;

  /**
   * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
   *
   * The signer implementation may offer the user the ability to override parts of the signDoc. It must
   * return the doc that was signed in the response.
   *
   * @param signerAddress The address of the account that should sign the transaction
   * @param signDoc The content that should be signed
   */
  readonly signAmino: (
    signerAddress: string,
    signDoc: StdSignDoc,
  ) => Promise<AminoSignResponse>;
}

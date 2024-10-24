import { Buffer } from "buffer";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/minimal/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/minimal/contract';

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}

export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "NIL",
  }
} as const

export type SignerKey = { tag: "Policy", values: readonly [string] } | { tag: "Ed25519", values: readonly [Buffer] } | { tag: "Secp256r1", values: readonly [Buffer] };

export type StorageKey = { tag: "Admin", values: void } | { tag: "Previous", values: readonly [Buffer] };

export const Errors = {
  1: { message: "AlreadyInitialized" },

  2: { message: "NotInitialized" },

  3: { message: "NotFound" },

  4: { message: "NotAllowed" },

  5: { message: "TooSoon" },

  6: { message: "TooMuch" }
}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  init: ({ admin }: { admin: string }, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a add_wallet transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_wallet: ({ user, sac, interval, amount }: { user: Buffer, sac: string, interval: u32, amount: i128 }, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a remove_wallet transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_wallet: ({ user }: { user: Buffer }, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a update_wallet transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_wallet: ({ user, interval, amount }: { user: Buffer, interval: Option<u32>, amount: Option<i128> }, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>
}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec(["AAAAAgAAAAAAAAAAAAAACVNpZ25lcktleQAAAAAAAAMAAAABAAAAAAAAAAZQb2xpY3kAAAAAAAEAAAATAAAAAQAAAAAAAAAHRWQyNTUxOQAAAAABAAAD7gAAACAAAAABAAAAAAAAAAlTZWNwMjU2cjEAAAAAAAABAAAADg==",
        "AAAAAgAAAAAAAAAAAAAAClN0b3JhZ2VLZXkAAAAAAAIAAAAAAAAAAAAAAAVBZG1pbgAAAAAAAAEAAAAAAAAACFByZXZpb3VzAAAAAQAAA+4AAAAg",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABgAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAABAAAAAAAAAA5Ob3RJbml0aWFsaXplZAAAAAAAAgAAAAAAAAAITm90Rm91bmQAAAADAAAAAAAAAApOb3RBbGxvd2VkAAAAAAAEAAAAAAAAAAdUb29Tb29uAAAAAAUAAAAAAAAAB1Rvb011Y2gAAAAABg==",
        "AAAAAAAAAAAAAAAEaW5pdAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAKYWRkX3dhbGxldAAAAAAABAAAAAAAAAAEdXNlcgAAA+4AAAAgAAAAAAAAAANzYWMAAAAAEwAAAAAAAAAIaW50ZXJ2YWwAAAAEAAAAAAAAAAZhbW91bnQAAAAAAAsAAAAA",
        "AAAAAAAAAAAAAAANcmVtb3ZlX3dhbGxldAAAAAAAAAEAAAAAAAAABHVzZXIAAAPuAAAAIAAAAAA=",
        "AAAAAAAAAAAAAAANdXBkYXRlX3dhbGxldAAAAAAAAAMAAAAAAAAABHVzZXIAAAPuAAAAIAAAAAAAAAAIaW50ZXJ2YWwAAAPoAAAABAAAAAAAAAAGYW1vdW50AAAAAAPoAAAACwAAAAA=",
        "AAAAAAAAAAAAAAAIcG9saWN5X18AAAADAAAAAAAAAAdfc291cmNlAAAAABMAAAAAAAAABnNpZ25lcgAAAAAH0AAAAAlTaWduZXJLZXkAAAAAAAAAAAAACGNvbnRleHRzAAAD6gAAB9AAAAAHQ29udGV4dAAAAAAA"]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
    add_wallet: this.txFromJSON<null>,
    remove_wallet: this.txFromJSON<null>,
    update_wallet: this.txFromJSON<null>,
  }
}
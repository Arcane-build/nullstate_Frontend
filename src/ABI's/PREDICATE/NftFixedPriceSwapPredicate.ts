/* Autogenerated file. Do not edit manually. */

/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/*
  Fuels version: 0.99.0
*/

import {
  BigNumberish,
  BN,
  decompressBytecode,
  InputValue,
  Predicate as __Predicate,
  PredicateParams,
  Provider,
} from 'fuels';

export type AddressInput = { bits: string };
export type AddressOutput = AddressInput;
export type AssetIdInput = { bits: string };
export type AssetIdOutput = AssetIdInput;

export type NftFixedPriceSwapPredicateConfigurables = Partial<{
    FEE_AMOUNT: BigNumberish;
    FEE_ASSET: AssetIdInput;
    TREASURY_ADDRESS: AddressInput;
    ASK_AMOUNT: BigNumberish;
    ASK_ASSET: AssetIdInput;
    RECEIVER: AddressInput;
    NFT_ASSET_ID: AssetIdInput;
}>;

export type NftFixedPriceSwapPredicateInputs = [];

export type NftFixedPriceSwapPredicateParameters = Omit<
  PredicateParams<NftFixedPriceSwapPredicateInputs, NftFixedPriceSwapPredicateConfigurables>,
  'abi' | 'bytecode'
>;

const abi = {
  "programType": "predicate",
  "specVersion": "1",
  "encodingVersion": "1",
  "concreteTypes": [
    {
      "type": "bool",
      "concreteTypeId": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903"
    },
    {
      "type": "struct std::address::Address",
      "concreteTypeId": "f597b637c3b0f588fb8d7086c6f4735caa3122b85f0423b82e489f9bb58e2308",
      "metadataTypeId": 1
    },
    {
      "type": "struct std::asset_id::AssetId",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "metadataTypeId": 2
    },
    {
      "type": "u64",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0"
    }
  ],
  "metadataTypes": [
    {
      "type": "b256",
      "metadataTypeId": 0
    },
    {
      "type": "struct std::address::Address",
      "metadataTypeId": 1,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    },
    {
      "type": "struct std::asset_id::AssetId",
      "metadataTypeId": 2,
      "components": [
        {
          "name": "bits",
          "typeId": 0
        }
      ]
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "main",
      "output": "b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903",
      "attributes": null
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "FEE_AMOUNT",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "offset": 7024
    },
    {
      "name": "FEE_ASSET",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "offset": 7032
    },
    {
      "name": "TREASURY_ADDRESS",
      "concreteTypeId": "f597b637c3b0f588fb8d7086c6f4735caa3122b85f0423b82e489f9bb58e2308",
      "offset": 7128
    },
    {
      "name": "ASK_AMOUNT",
      "concreteTypeId": "1506e6f44c1d6291cdf46395a8e573276a4fa79e8ace3fc891e092ef32d1b0a0",
      "offset": 6984
    },
    {
      "name": "ASK_ASSET",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "offset": 6992
    },
    {
      "name": "RECEIVER",
      "concreteTypeId": "f597b637c3b0f588fb8d7086c6f4735caa3122b85f0423b82e489f9bb58e2308",
      "offset": 7096
    },
    {
      "name": "NFT_ASSET_ID",
      "concreteTypeId": "c0710b6731b1dd59799cf6bef33eee3b3b04a2e40e80a0724090215bbf2ca974",
      "offset": 7064
    }
  ]
};

const bytecode = decompressBytecode('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');

export class NftFixedPriceSwapPredicate extends __Predicate<
  NftFixedPriceSwapPredicateInputs,
  NftFixedPriceSwapPredicateConfigurables
> {
  static readonly abi = abi;
  static readonly bytecode = bytecode;

  constructor(params: NftFixedPriceSwapPredicateParameters) {
    super({ abi, bytecode, ...params });
  }
}

"use client"
import React,{useState} from "react";
import Eth from "../../../assets/icons/Eth.svg";
import { useWallet } from '@fuels/react';
import {ScriptTransactionRequest, bn, Address, Output, OutputType } from 'fuels';
import { NftFixedPriceSwapPredicate } from "../../../ABI's/PREDICATE/NftFixedPriceSwapPredicate";
import { changePredicateStatus } from "@/Backend/GetListedNFTs";
import { useRouter } from "next/navigation";
interface PriceSectionProps {
  price: number;
  askAsset: string;
  tokenId: string;
  seller:string;
}

const PriceSection: React.FC<PriceSectionProps> = ({ price, askAsset, tokenId, seller}) => {
  const { wallet } = useWallet();
  const router = useRouter();
  const [isBuying, setIsBuying] = useState(false);
  const BuyerTransaction = async () => {
    if (!wallet) return alert("No wallet connected!");
    
  ///////These need to be asked and put//////

    const FEE_AMOUNT = "1";
    const FEE_ASSET =
      "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07";
    const TREASURY_ADDRESS =
      "0x3867E485f463f22fb49758E18e72ed3844701d8AFaCaA434FB7e971bD22116b0";

    ///////////////////////////////////////////

    try {
      setIsBuying(true);

      // 1. Configure the predicate
      const configurableConstants = {
        FEE_AMOUNT: bn(FEE_AMOUNT),
        FEE_ASSET: { bits: FEE_ASSET },
        TREASURY_ADDRESS: { bits: TREASURY_ADDRESS },
        ASK_AMOUNT: bn(price),
        ASK_ASSET: { bits: askAsset },
        RECEIVER: { bits: seller }, // 64 chars
        NFT_ASSET_ID: { bits: tokenId },
      };

      const existingPredicate = new NftFixedPriceSwapPredicate({
        provider: wallet.provider,
        data: [],
        configurableConstants,
      });

      // 2. Gather needed resources
      const predicateInputs = await existingPredicate.getResourcesToSpend([
        { amount: bn(1), assetId: tokenId },
      ]);

      // total = price + fee
      const totalToSpend = bn(price).add(bn(FEE_AMOUNT));
      const takerInputs = await wallet.getResourcesToSpend([
        { amount: totalToSpend, assetId: askAsset },
      ]);

      const inputPredicate = predicateInputs[0];
      const inputFromTaker = takerInputs[0];

      // 3. Construct outputs
      const sellerAddress = new Address(seller);

      const outputToReceiver: Output = {
        type: OutputType.Coin,
        to: sellerAddress.toB256(),
        amount: bn(price),
        assetId: askAsset,
      };

      const outputToTreasury: Output = {
        type: OutputType.Coin,
        to: TREASURY_ADDRESS,
        amount: bn(FEE_AMOUNT),
        assetId: askAsset,
      };

      const outputToTaker: Output = {
        type: OutputType.Coin,
        to: wallet.address.toB256(),
        amount: bn(1),
        assetId: tokenId,
      };

      // Change outputs
      const outputChangeAsk: Output = {
        type: OutputType.Change,
        to: wallet.address.toB256(),
        amount: bn(0),
        assetId: askAsset,
      };

      const outputChangeNFT: Output = {
        type: OutputType.Change,
        to: wallet.address.toB256(),
        amount: bn(0),
        assetId: tokenId,
      };

      // 4. Create and fund transaction
      const transactionRequest = new ScriptTransactionRequest({
        maxFee: bn(50_000_000),
      });

      transactionRequest.addResources([inputPredicate, inputFromTaker]);
      transactionRequest.outputs = [
        outputToReceiver,
        outputToTreasury,
        outputToTaker,
        outputChangeAsk,
        outputChangeNFT,
      ];

      // 5. Estimate & send transaction
      await transactionRequest.estimateAndFund(existingPredicate);
      const tx = await wallet.sendTransaction(transactionRequest);
      const transactionResponse = await tx.waitForResult();

      // 6. Check result & update backend
      if (transactionResponse.status !== "success") {
        setIsBuying(false);
        return alert("Transaction failed. Please try again.");
      }

      await changePredicateStatus(existingPredicate.address.toString());
      console.log("Success! Tx:", tx);

      // 7. Go back to previous page (or wherever you wish to navigate)
      router.back();
    } catch (error) {
      console.error("Error initializing predicate:", error);
      alert(`Transaction error: ${error}`);
      setIsBuying(false);
    }
};

  
  return (
    <div className="rounded-lg border-[1px] border-[#272934] p-6 mb-6">
      <div className="rounded-md border-[1px] border-[#272934] py-3 px-8 bg-[#131419] mb-6">
        <p className="text-[#7F8199] uppercase font-medium text-md">PRICE</p>
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">{price}</span>
          <Eth className="h-5" />
        </div>
      </div>
      <button className="bg-[#4023B5] hover:bg-indigo-700 w-full py-3 font-medium mb-4"
      onClick={BuyerTransaction}
      disabled={isBuying}
      >
        {isBuying ? "Buying..." : "BUY NOW"}

      </button>
      <button className="bg-white w-full py-3 font-medium text-[#4023B5]">
        MAKE OFFER
      </button>
    </div>
  );
};

export default PriceSection;

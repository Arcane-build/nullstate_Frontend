"use client";
import React from "react";
import { NFTData } from "../../nftpage/[nftAssetId]/page";
import NFTHeader from "./NFTHeader";
import PriceSection from "./PriceSection";
import LastActivity from "./LastActivity";
import AdditionalInfo from "./AdditionalInfo";
import TraitTable from "./TraitTable";

interface NFTDetailsProps {
  nftData: NFTData;
}
// price, askAsset, tokenId, seller

const NFTDetails: React.FC<NFTDetailsProps> = ({ nftData }) => {
  console.log("NFTData", nftData);
  const spliceAssetId = (assetId: string) => {
    if (!assetId || assetId.length <= 8) return assetId;
    return `${assetId.substring(0, 4)}...${assetId.substring(
      assetId.length - 4
    )}`;
  };
  return (
    <div>
      {/* Header: Title and Owner */}
      <NFTHeader title={nftData.title} owner={nftData.owner} />

      {/* Price and Purchase Buttons */}
      <PriceSection
        price={nftData.price}
        askAsset={nftData.askAsset}
        tokenId={nftData.tokenId}
        seller={nftData.owner}
      />

      {/* Last Activity */}
      <LastActivity activity={nftData.lastActivity} />

      {/* Traits */}
      <TraitTable traits={nftData.traits} />

      {/* Additional Information */}
      <AdditionalInfo
        contactAddress={nftData.contactAddress}
        tokenId={spliceAssetId(nftData.tokenId)}
        creator={nftData.creator}
        creatorFee={nftData.creatorFee}
      />
    </div>
  );
};

export default NFTDetails;

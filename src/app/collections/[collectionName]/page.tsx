"use client";
import React ,{useEffect, useState} from "react";
import ProfileStats from "../../components/Collection/ProfileStats";
import SidebarFilters from "../../components/Collection/SidebarFilters";
import NFTCollectionDisplay from "../../components/Collection/NFTCollectionDisplay";
import SearchHeader from "../../components/Collection/SearchHeader";
import { Afacad } from "next/font/google";


import { profileStatsData } from "../../../data/profileStatsData";
import {
  traits,
  traitOptions,
  rarityData,
  priceData,
} from "../../../data/sidebarFiltersData";
import { useParams } from "next/navigation";


interface NFTMinting {
  collectionName: string;
  id: number;
  nftCreatedAt: string;
  nftCreatorAddress: string;
  nftDescription: string;
  nftId: string;
  nftImage: string;
  nftName: string;
  nftOwnerAddress: string;
  nftPrice: string; // Keeping as string since API returns it as a string
  nftStatus: string;
  nftUpdatedAt: string;
}

interface Config {
  ASK_AMOUNT: string;
  ASK_ASSET: string;
  FEE_AMOUNT: string;
  FEE_ASSET: string;
  NFT_ASSET_ID: string;
  TREASURY_ADDRESS: string;
}

interface PredicateEntry {
  id: number;
  nftId: string;
  predicateId: string;
  sellerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  NFTMinting: NFTMinting;
  config: Config;
}

const afacad = Afacad({ subsets: ["latin"], weight: ["400", "600", "700"] });
// {
//   id: 1,
//   title: "THE SISTERS #1234",
//   price: 0.0074,
//   tokenId: "#4567",
//   imageUrl: "/images/image 212.png",
// },
interface PredicateNFT{
  id: number;
  title: string;
  price: number;
  tokenId: string;
  imageUrl: string;
}


const NFTCollectionPage: React.FC = () => {

  const params = useParams(); // e.g. { collectionName: 'Azuki' }
  const [predicateEntries, setPredicateEntries] = useState<PredicateNFT[]>([]);
  const collectionName = params?.collectionName as string | undefined;

  useEffect(() => {
    if (!collectionName) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/collections/${encodeURIComponent(collectionName)}/predicates`);
        console.log("Fetching data for collection:", collectionName);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log("Data is",data);
        const mappedData = data.map((entry:PredicateEntry) => {
            return {
                id: entry.id,
                title: entry.NFTMinting.nftName,
                price: entry.NFTMinting.nftPrice,
                tokenId: entry.nftId,
                imageUrl: entry.NFTMinting.nftImage
            }
        })
        setPredicateEntries(mappedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [collectionName]);




  return (
    <div
      className={`${afacad.className} min-h-screen pt-16 bg-black text-white font-sans flex flex-col overflow-auto custom-scrollbar`}
    >
      <img src="/images/image 216.png" alt="Banner" />
      <ProfileStats data={profileStatsData} />

      <div className="h-20 bg-[#131419]">
        <SearchHeader />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 overflow-y-auto border-r border-gray-700 custom-scrollbar">
          <SidebarFilters
            traits={traits}
            traitOptions={traitOptions}
            rarityData={rarityData}
            priceData={priceData}
          />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar ml-20">
            <NFTCollectionDisplay nfts={predicateEntries} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NFTCollectionPage;

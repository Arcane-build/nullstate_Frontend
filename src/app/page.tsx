"use client"
import React, {useState, useEffect} from "react";
import TrendingNFT from "./components/TrendingNFT/TrendingNFT";
import ImageOverlay from "./components/Dashboard/ImageOverlay";
import NFTCollection from "../data/TableData";
import CreatorBanner from "./components/Dashboard/CreatorBanner";
import ExperiencePage from "./components/Dashboard/ExperiencePage";
import { FaTwitter, FaDiscord, FaInstagram } from "react-icons/fa";


interface NFTCollection {
  collectionName: string;
  floorPrice: string;
  volume: string;
  sales: string;
  imageUrl: string;
  lastSoldImageUrls: string[];
}


const HomePage: React.FC = () => {
  const [nftCollection, setNftCollection] = useState<NFTCollection[]>([]);
 


  useEffect(() => {
    const fetchNFTCollections = async () => {
      try {
        const response = await fetch("/api/nft-collections");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data: NFTCollection[] = await response.json();
        console.log(data);
        setNftCollection(data);
      } catch (error) {
        console.error("Error fetching NFT collections:", error);
      }
    };

    fetchNFTCollections();
  }, []);

  return (
    <div className="min-h-screen overflow-auto text-[#E0D9F5] font-w95 custom-scrollbar bg-black">
      <div className="relative bg-gradient-to-b from-[#5539A8] via-[rgba(116,14,63,40%)] to-black">
        <ImageOverlay />

        <section className="relative flex flex-col items-center justify-center text-center pt-10 pb-16 px-4">
          <div className="w-full mt-56 flex justify-end mr-16">
            <h1 className="text-7xl md:text-[120px] leading-tight mb-48 text-right max-w-3xl">
              nullstate
            </h1>
          </div>
        </section>
        <CreatorBanner />
        {/* <section className="px-4 py-8 m-4 md:m-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-items-center">
            {nftCollection && nftCollection.map((nft, index) => (
              <NFTCard key={index} imageSrc={nft.imageUrl} title={nft.collectionName} />
            ))}
          </div>
        </section> */}
      </div>

      <div className="mb-8 bg-black"></div>
      <TrendingNFT data={nftCollection} limit={10} />
      <ExperiencePage />

      {/* FOOTER */}
      <footer className="bg-black py-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={28} />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={28} />
            </a>
          </div>
          <p className="text-sm">&copy; NullState 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

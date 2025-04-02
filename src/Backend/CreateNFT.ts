"use server"
import { prisma } from "@/lib/prisma";

interface NFTType {
    nftId: string;
    nftName: string;
    nftDescription: string;
    nftImage: string;
    nftPrice: string;
    nftOwnerAddress: string;
    nftCreatorAddress: string;
    nftStatus: string;
    collectionName: string;
    transactionHash:string;
}

export default async function createNFT(input: NFTType) {
    try {
        const { nftId, nftName, nftDescription, nftImage, nftPrice, nftOwnerAddress, nftCreatorAddress, nftStatus, collectionName, transactionHash } = input;
        const newNFT = await prisma.nFTMinting.create({
            data: {
                nftId,
                nftName,
                nftDescription,
                nftImage,
                nftPrice,
                nftOwnerAddress,
                nftCreatorAddress,
                nftStatus,
                collectionName
            }
        });
        const transaction = await prisma.nFTTransaction.create({
            data:{
                nftId:nftId,
                fromAddress:"0xbcd6b6790d35474a72091db0f0efb570bbf51228d680f5322011dc566c5ca16e",
                toAddress:nftOwnerAddress,
                price: nftPrice,
                transactionType:"Mint",
                transactionHash:transactionHash
            }
        })
        console.log("Transaction is ",transaction)
        return newNFT;

    } catch (error) {
        throw new Error(`Error creating NFT: ${error}`);
    }

}
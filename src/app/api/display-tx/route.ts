import {NextResponse, NextRequest} from "next/server";
import {prisma} from "@/lib/prisma";


// tokenId: string;
// Item: string;
// Price: string;
// Status: string;
// From: string;
// To: string;
// Clock: string;
// imageUrl?: string;

export async function GET(request : NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const address = searchParams.get('address');
        if(!address){
            return NextResponse.json(
                {message: "Missing address Parameter"},
                {status: 400}

            );
        }

        const allTransactions = await prisma.nFTTransaction.findMany({
            where: {
                NFTMinting:{
                    nftCreatorAddress:address
                }
            },
            orderBy: {timestamp:"desc"},
            take:10,
            include :{
                NFTMinting:true,
            }
        });
        const transformedTransactions = allTransactions.map(tx => ({
            tokenId: tx.nftId,
            Item: tx.NFTMinting.nftName,
            Price: tx.price,
            Status: tx.NFTMinting.nftStatus,
            From: tx.fromAddress,
            To: tx.toAddress,
            Clock: new Date(tx.timestamp).toLocaleString(), 
            imageUrl: tx.NFTMinting.nftImage,
        }));
    
        return NextResponse.json(transformedTransactions);
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Error fetching collection predicates"}, {status: 500});
    }
}
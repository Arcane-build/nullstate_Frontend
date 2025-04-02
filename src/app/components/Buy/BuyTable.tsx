"use client";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useWallet } from "@fuels/react";

interface TableItem {
  tokenId: number;
  Item: string;
  From: string;
  To: string;
  Clock: string;
  imageUrl?: string;
}

const items: TableItem[] = [
  {
    tokenId: 6771,
    Item: "Azuki #6771",
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  // ... other items
];

const BuyTable: React.FC = () => {
  const { wallet } = useWallet();
  const [transactions, setTransactions] = useState<TableItem[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (wallet?.address) {
          const address = wallet.address.toString();
          const response = await fetch(`/api/display-tx?address=${address}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [wallet?.address]);

  return (
    <div className="overflow-x-auto text-white pb-4 px-6 font-mono w-full">
      <table className="min-w-full text-left table-fixed">
        <thead className="border-b border-gray-700 bg-[#121111]">
          <tr className="uppercase text-xs text-gray-400">
            <th className="py-3 font-medium pl-2 w-40">Item</th>
            <th className="py-3 font-medium pl-2 w-72">From</th>
            <th className="py-3 font-medium pl-2 w-72">To</th>
            <th className="py-3 font-medium pl-2 w-24">
              <Clock className="w-4 h-auto" />
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 text-[16px]">
          {transactions.map((item) => (
            <tr key={item.tokenId}>
              <td className="px-2 py-3 flex items-center text-sm font-medium whitespace-nowrap w-40">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.Item}
                    className="w-8 h-8 object-cover rounded mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-700 rounded mr-2" />
                )}
                {item.Item}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap w-72">
                {item.From}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap w-72">
                {item.To}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap w-24">
                {item.Clock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuyTable;

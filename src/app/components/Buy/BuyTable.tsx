import { Checkbox } from "@/app/components/ui/checkbox";
import { Clock } from "lucide-react";
import Eth from "../../../assets/icons/Eth.svg";
import React from "react";

interface TableItem {
  tokenId: number;
  Item: string;
  Price: string;
  Rarity: number;
  Quantity: number;
  From: string;
  To: string;
  Clock: string;
  imageUrl?: string;
}

const items: TableItem[] = [
  {
    tokenId: 6771,
    Item: "Azuki #6771",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6772,
    Item: "Azuki #6772",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6773,
    Item: "Azuki #6773",
    Price: "0.030",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6774,
    Item: "Azuki #6774",
    Price: "0.032",
    Rarity: 3100,
    Quantity: 3,
    From: "0xSeller4",
    To: "0xBuyer4",
    Clock: "15m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    Item: "Azuki #6771",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6772,
    Item: "Azuki #6772",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6773,
    Item: "Azuki #6773",
    Price: "0.030",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6774,
    Item: "Azuki #6774",
    Price: "0.032",
    Rarity: 3100,
    Quantity: 3,
    From: "0xSeller4",
    To: "0xBuyer4",
    Clock: "15m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    Item: "Azuki #6771",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6772,
    Item: "Azuki #6772",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6773,
    Item: "Azuki #6773",
    Price: "0.030",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6774,
    Item: "Azuki #6774",
    Price: "0.032",
    Rarity: 3100,
    Quantity: 3,
    From: "0xSeller4",
    To: "0xBuyer4",
    Clock: "15m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6771,
    Item: "Azuki #6771",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6772,
    Item: "Azuki #6772",
    Price: "0.026",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6773,
    Item: "Azuki #6773",
    Price: "0.030",
    Rarity: 3373,
    Quantity: 1,
    From: "0xSeller1",
    To: "0xBuyer1",
    Clock: "4m ago",
    imageUrl: "/images/Azuki.png",
  },
  {
    tokenId: 6774,
    Item: "Azuki #6774",
    Price: "0.032",
    Rarity: 3100,
    Quantity: 3,
    From: "0xSeller4",
    To: "0xBuyer4",
    Clock: "15m ago",
    imageUrl: "/images/Azuki.png",
  },
];

const BuyTable: React.FC = () => {
  return (
    <div className="overflow-x-auto text-white pb-4 px-6 font-mono w-full">
      <table className="min-w-full text-left table-fixed">
        <thead className="border-b border-gray-700 bg-[#121111] w-full">
          <tr className="uppercase text-xs text-gray-400">
            <th scope="col" className="py-3 font-medium pl-3 w-24"></th>
            <th scope="col" className="py-3 font-medium pl-2 w-40">
              Item
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-24">
              Price
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-24">
              Rarity
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-24">
              Quantity
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-24">
              From
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-24">
              To
            </th>
            <th scope="col" className="py-3 font-medium pl-2 w-16">
              <Clock className="w-4 h-auto" />
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 text-[16px]">
          {items.map((item) => (
            <tr key={item.tokenId}>
              <td className="p-3">
                <span className="flex ">
                  <span className="mr-[10px] mt-[3px]">
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9422 6.44219L9.8836 8.5L11.9422 10.5578C12.0003 10.6159 12.0463 10.6848 12.0777 10.7607C12.1092 10.8366 12.1254 10.9179 12.1254 11C12.1254 11.0821 12.1092 11.1634 12.0777 11.2393C12.0463 11.3152 12.0003 11.3841 11.9422 11.4422C11.8841 11.5003 11.8152 11.5463 11.7393 11.5777C11.6634 11.6092 11.5821 11.6253 11.5 11.6253C11.4179 11.6253 11.3366 11.6092 11.2607 11.5777C11.1848 11.5463 11.1159 11.5003 11.0578 11.4422L9 9.38359L6.94219 11.4422C6.88412 11.5003 6.81518 11.5463 6.73931 11.5777C6.66344 11.6092 6.58213 11.6253 6.5 11.6253C6.41788 11.6253 6.33656 11.6092 6.26069 11.5777C6.18482 11.5463 6.11588 11.5003 6.05782 11.4422C5.99975 11.3841 5.95368 11.3152 5.92226 11.2393C5.89083 11.1634 5.87466 11.0821 5.87466 11C5.87466 10.9179 5.89083 10.8366 5.92226 10.7607C5.95368 10.6848 5.99975 10.6159 6.05782 10.5578L8.11641 8.5L6.05782 6.44219C5.94054 6.32491 5.87466 6.16585 5.87466 6C5.87466 5.83415 5.94054 5.67509 6.05782 5.55781C6.17509 5.44054 6.33415 5.37465 6.5 5.37465C6.66586 5.37465 6.82492 5.44054 6.94219 5.55781L9 7.61641L11.0578 5.55781C11.1159 5.49974 11.1848 5.45368 11.2607 5.42225C11.3366 5.39083 11.4179 5.37465 11.5 5.37465C11.5821 5.37465 11.6634 5.39083 11.7393 5.42225C11.8152 5.45368 11.8841 5.49974 11.9422 5.55781C12.0003 5.61588 12.0463 5.68482 12.0777 5.76069C12.1092 5.83656 12.1254 5.91788 12.1254 6C12.1254 6.08212 12.1092 6.16344 12.0777 6.23931C12.0463 6.31518 12.0003 6.38412 11.9422 6.44219ZM17.125 8.5C17.125 10.107 16.6485 11.6779 15.7557 13.014C14.8629 14.3502 13.594 15.3916 12.1093 16.0065C10.6247 16.6215 8.99099 16.7824 7.4149 16.4689C5.8388 16.1554 4.39106 15.3815 3.25476 14.2452C2.11846 13.1089 1.34463 11.6612 1.03112 10.0851C0.717618 8.50901 0.87852 6.87535 1.49348 5.3907C2.10844 3.90605 3.14985 2.6371 4.486 1.74431C5.82214 0.851523 7.39303 0.375 9 0.375C11.1542 0.377275 13.2195 1.23403 14.7427 2.75727C16.266 4.28051 17.1227 6.34581 17.125 8.5ZM15.875 8.5C15.875 7.14025 15.4718 5.81104 14.7164 4.68045C13.9609 3.54987 12.8872 2.66868 11.631 2.14833C10.3747 1.62798 8.99238 1.49183 7.65876 1.7571C6.32514 2.02237 5.10013 2.67716 4.13864 3.63864C3.17716 4.60013 2.52238 5.82513 2.2571 7.15875C1.99183 8.49237 2.12798 9.87471 2.64833 11.1309C3.16868 12.3872 4.04987 13.4609 5.18046 14.2164C6.31105 14.9718 7.64026 15.375 9 15.375C10.8227 15.3729 12.5702 14.6479 13.8591 13.3591C15.1479 12.0702 15.8729 10.3227 15.875 8.5Z"
                        fill="red"
                      />
                    </svg>
                  </span>
                  Cancel
                </span>
              </td>
              <td className="px-2 py-3 flex items-center text-sm font-medium whitespace-nowrap space-x-3">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.Item}
                    className="w-8 h-8 object-cover rounded mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-700 rounded" />
                )}
                {item.Item}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap border-gray-500 rounded-lg">
                <span className="flex">
                  <Eth className="h-3 mt-1 mr-1" />
                  {item.Price}
                </span>
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap">
                {item.Rarity}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap">
                {item.Quantity}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap">
                {item.From}
              </td>
              <td className="px-2 py-3 text-sm whitespace-nowrap">{item.To}</td>
              <td className="px-2 py-3 text-sm whitespace-nowrap">
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

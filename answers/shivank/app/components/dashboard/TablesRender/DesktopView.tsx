import { CoinDataType } from "../DataExporter";
import { ParseVal, ShareText } from "./module";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { log } from "console";
import Image from 'next/image'
import logo from "../../logo.png";



export default function TDesktop({
  sort,
  setSort,
  CoinData,
}: {
  CoinData: CoinDataType[];
  sort: "asc" | "desc" | "none";
  setSort: React.Dispatch<React.SetStateAction<"asc" | "desc" | "none">>;
}) {
  return (
    <div>



      

    <table className="mt-2 mx-auto table-fixed max-lg:hidden">
      <thead>
        <tr className="text-white">
          <th className="px-4 py-1 border-b ">Symbol Name</th>
          <th className="px-4 py-1 border-b ">Last Price</th>
          <th className="px-4 py-1 border-b ">
            <button
              className="relative bg-gray-700 px-4 py-1 rounded-lg hover:bg-gray-600 transition-all"
              onClick={() => {
                if (sort == "none") {
                  setSort("asc");
                } else if (sort == "asc") {
                  setSort("desc");
                } else if (sort == "desc") {
                  setSort("none");
                }
              }}
            >
              <div className="absolute top-0 right-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              </div>
              24H Change Percentage
              {sort == "asc" ? "🔼" : sort == "desc" ? "🔽" : ""}
            </button>
          </th>
          <th className="px-4 py-1 border-b ">24 Hour Volume</th>
          <th className="px-4 py-1 border-b ">24 Hour High</th>
          <th className="px-4 py-1 border-b ">24 Hour Low</th>
          <th className="px-4 py-1 border-b ">Share</th>
        </tr>
      </thead>
      <tbody className="">
        {CoinData.sort((data) => {
          if (sort == "asc") {
            return parseFloat(data._24HourChangePercentage);
          } else if (sort == "desc") {
            return -parseFloat(data._24HourChangePercentage);
          } else {
            return 0;
          }
        }).map((coin) => (
          <tr key={coin.Coin} className="text-gray-400">
            <td className="text-center ">{coin.Coin}</td>
            <td className="text-center">{ParseVal(coin.LastPrice)}</td>
            <td
              className={`text-center ${
                parseFloat(coin._24HourChangePercentage) > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {ParseVal(coin._24HourChangePercentage, true)}
            </td>
            <td className="text-center">{ParseVal(coin._24HourVolume)}</td>
            <td className="text-center">{ParseVal(coin._24HourHigh)}</td>
            <td className="text-center">{ParseVal(coin._24HourLow)}</td>
            <td className="text-center">
              <button
                className="bg-blue-400 px-2 py-0.5 my-1 hover:brightness-50 transition-all rounded-md text-white"
                onClick={() => {
                  ShareText(coin);
                }}
              >
                Share
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  );
}

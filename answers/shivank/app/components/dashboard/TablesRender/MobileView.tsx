"use client";
import { useEffect, useRef, useState } from "react";
import { CoinDataType } from "../DataExporter";
import { ParseVal, ShareText } from "./module";

export default function MTable({
  sort,
  setSort,
  CoinData,
}: {
  CoinData: CoinDataType[];
  sort: "asc" | "desc" | "none";
  setSort: React.Dispatch<React.SetStateAction<"asc" | "desc" | "none">>;
}) {
  return (
    <div className="block lg:hidden px-2 mt-4">
      <button
        className="bg-white mb-3 px-2 py-1 rounded-lg"
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
        SORT BY
        {sort == "asc" ? "🔼" : sort == "desc" ? "🔽" : ""}
      </button>
      <div>
        {CoinData.sort((data) => {
          if (sort == "asc") {
            return parseFloat(data._24HourChangePercentage);
          } else if (sort == "desc") {
            return -parseFloat(data._24HourChangePercentage);
          } else {
            return 0;
          }
        }).map((coin) => {
          return <Container key={coin.Coin} coin={coin} />;
        })}
      </div>
    </div>
  );
}

function Container({
  coin,
}: {
  coin: {
    Coin: string;
    LastPrice: string;
    _24HourChangePercentage: string;
    _24HourVolume: string;
    _24HourHigh: string;
    _24HourLow: string;
    isIncrease: boolean;
  };
}) {
  const Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function isClickedInside(e: MouseEvent) {
      if (Ref.current && !Ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", isClickedInside);

    return () => {
      document.removeEventListener("click", isClickedInside);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        ref={Ref}
        className="border bg-white mb-4 px-2 py-1 rounded-md flex flex-col"
      >
        <div className="text-lg font-medium flex justify-between items-center">
          {coin.Coin}
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="flex justify-between">
          <div>
            Last Price : <span>{ParseVal(coin.LastPrice)}</span>
          </div>
          <div>
            24H %age
            <span
              title="change_percentage"
              className={`text-center ${
                parseFloat(coin._24HourChangePercentage) > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {ParseVal(coin._24HourChangePercentage, true)}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            24H Volume : <span>{ParseVal(coin._24HourVolume)}</span>
          </div>
          <div>
            24H High : <span>{ParseVal(coin._24HourHigh)}</span>
          </div>
        </div>
        {isOpen && (
          <div className="flex justify-between">
            <div>
              24H Low : <span>{ParseVal(coin._24HourLow)}</span>
            </div>
            <button
              className="bg-blue-400 px-2 py-0.5 my-1 hover:brightness-50 transition-all rounded-md text-white"
              onClick={() => {
                ShareText(coin);
              }}
            >
              Share
            </button>
          </div>
        )}
      </div>
    </>
  );
}

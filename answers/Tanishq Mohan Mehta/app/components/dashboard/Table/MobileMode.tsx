"use client";
import { useEffect, useRef, useState } from "react";
import { DataType } from "../ParseData";
import { ParseVal, ParseText } from "./module";

export default function MobileTable({
  sort,
  setSort,
  Data,
}: {
  Data: DataType[];
  sort: "increasing" | "decreasing" | "none";
  setSort: React.Dispatch<
    React.SetStateAction<"increasing" | "decreasing" | "none">
  >;
}) {
  return (
    <div className="block lg:hidden px-2 mt-4">
      <button
        className="bg-white mb-3 px-2 py-1 rounded-lg"
        onClick={() => {
          if (sort == "none") {
            setSort("increasing");
          } else if (sort == "increasing") {
            setSort("decreasing");
          } else if (sort == "decreasing") {
            setSort("none");
          }
        }}
      >
        SORT BY
        {sort == "increasing" ? "🔼" : sort == "decreasing" ? "🔽" : ""}
      </button>
      <div>
        {Data.sort((a, b) => {
          if (sort === "increasing") {
            return (
              parseFloat(a.cur24HourChangePercentage) -
              parseFloat(b.cur24HourChangePercentage)
            );
          } else if (sort === "decreasing") {
            return (
              parseFloat(b.cur24HourChangePercentage) -
              parseFloat(a.cur24HourChangePercentage)
            );
          } else {
            return 0;
          }
        }).map((tempData) => {
          return <Container key={tempData.name} tempData={tempData} />;
        })}
      </div>
    </div>
  );
}

function Container({
  tempData,
}: {
  tempData: {
    name: string;
    LastPrice: string;
    cur24HourChangePercentage: string;
    cur24HourVolume: string;
    cur24HourHigh: string;
    cur24HourLow: string;
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
          {tempData.name}
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
            Last Price : <span>{ParseVal(tempData.LastPrice)}</span>
          </div>
          <div>
            24H% :
            <span
              title="change_percentage"
              className={`text-center ${
                parseFloat(tempData.cur24HourChangePercentage) > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {ParseVal(tempData.cur24HourChangePercentage, true)}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            24H Volume : <span>{ParseVal(tempData.cur24HourVolume)}</span>
          </div>
          <div>
            24H High : <span>{ParseVal(tempData.cur24HourHigh)}</span>
          </div>
        </div>
        {isOpen && (
          <div className="flex justify-between">
            <div>
              24H Low : <span>{ParseVal(tempData.cur24HourLow)}</span>
            </div>
            <button
              className="bg-blue-800 px-2 py-0.5 my-1 hover:brightness-50 transition-all rounded-md text-white"
              onClick={() => {
                ParseText(tempData);
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

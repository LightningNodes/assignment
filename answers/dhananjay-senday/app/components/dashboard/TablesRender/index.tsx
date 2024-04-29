"use client";
import { useState } from "react";
import { CoinDataType } from "../DataExporter";
import TDesktop from "./DesktopView";
import MTable from "./MobileView";
export default function DataTable({ CoinData }: { CoinData: CoinDataType[] }) {
  const [sort, setSort] = useState<"asc" | "desc" | "none">("none");
  return (
    <>
      <TDesktop sort={sort} setSort={setSort} CoinData={CoinData} />
      <MTable sort={sort} setSort={setSort} CoinData={CoinData} />
    </>
  );
}

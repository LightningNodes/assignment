"use client";
import { useState } from "react";
import { DataType } from "../ParseData";
import DesktopTable from "./DesktopMode";
import MobileTable from "./MobileMode";
export default function DataTable({ Data }: { Data: DataType[] }) {
  const [sort, setSort] = useState<"increasing" | "decreasing" | "none">(
    "none"
  );
  return (
    <>
      <DesktopTable sort={sort} setSort={setSort} Data={Data} />
      <MobileTable sort={sort} setSort={setSort} Data={Data} />
    </>
  );
}

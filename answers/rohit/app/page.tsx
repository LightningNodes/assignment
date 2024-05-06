"use client";
import ContractTable from "@/components/ContractTable";
import { useState } from "react";
import ShareDialog from "@/components/ShareDialog";
import { Row } from "@tanstack/react-table";
import { formatCurrency } from "@/lib/utils";
import { Contract } from "@/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/store/auth";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [sharedContract, setSharedContract] = useState<Contract | null>(null);
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/signin");
    }
  }, [router, user]);

  const shareContract = (row: Row<Contract>) => {
    setSharedContract({
      lastPrice: formatCurrency(Number(row.original.lastPrice)),
      marketPrice: formatCurrency(Number(row.original.marketPrice)),
      priceChangePercent: row.original.priceChangePercent,
      baseAssetVolume: formatCurrency(Number(row.original.baseAssetVolume)),
      symbol: row.original.symbol,
      high: formatCurrency(Number(row.original.high)),
      low: formatCurrency(Number(row.original.low)),
    });
    setOpen(true);
  };
  return (
    user &&
    !loading && (
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-center text-4xl font-bold underline mb-8 mx-4">
          Pi42 Assignment
        </h1>
        <ShareDialog open={open} setOpen={setOpen} contract={sharedContract} />
        <ContractTable shareContract={shareContract} />
      </div>
    )
  );
}

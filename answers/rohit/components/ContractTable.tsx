"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculate24hrHighLow, formatCurrency, getImageUrl } from "@/lib/utils";
import {
  ColumnDef,
  Row,
  SortingFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "./ui/button";
import { CaretSortIcon, Share1Icon } from "@radix-ui/react-icons";
import { Contract, SocketData } from "@/types";

type Props = {
  shareContract: (row: Row<Contract>) => void;
};

export default function ContractTable({ shareContract }: Props) {
  const [data, setData] = useState<Contract[]>([]);

  //custom sorting logic for one of 24H Change column
  const sortPriceChangePercentFn: SortingFn<Contract> = (
    rowA,
    rowB,
    _columnId
  ) => {
    const statusA = rowA.original.priceChangePercent;
    const statusB = rowB.original.priceChangePercent;
    return Number(statusA) - Number(statusB);
  };

  const columns: ColumnDef<Contract>[] = [
    {
      accessorKey: "symbol",
      header: "Symbol",
      enableSorting: false,
      cell: ({ cell, row }) => {
        return (
          <div className="flex gap-2">
            <Image
              width={25}
              height={25}
              src={getImageUrl(row.original.symbol)}
              alt={row.original.symbol}
              unoptimized={true}
            />
            <p>{row.original.symbol}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "baseAssetVolume",
      header: "Volume (Base Asset)",
      enableSorting: false,
      cell: ({ cell, row }) => (
        <div>{formatCurrency(Number(row.original.baseAssetVolume))}</div>
      ),
    },
    {
      accessorKey: "lastPrice",
      header: "Last Price",
      enableSorting: false,
      cell: ({ cell, row }) => (
        <div>{formatCurrency(Number(row.original.lastPrice))}</div>
      ),
    },
    {
      accessorKey: "priceChangePercent",
      header: "24H Change",
      sortingFn: sortPriceChangePercentFn,
      cell: ({ cell, row }) => {
        return <div>{row.original.priceChangePercent}%</div>;
      },
    },
    {
      accessorKey: "high",
      header: "24H High",
      enableSorting: false,
      cell: ({ cell, row }) => (
        <div>{formatCurrency(Number(row.original.high))}</div>
      ),
    },
    {
      accessorKey: "low",
      header: "24H Low",
      enableSorting: false,
      cell: ({ cell, row }) => (
        <div>{formatCurrency(Number(row.original.low))}</div>
      ),
    },
    {
      accessorKey: "share",
      header: "Share",
      enableSorting: false,
      cell: ({ cell, row }) => {
        return (
          <Button
            className="select-none"
            variant="outline"
            onClick={() => shareContract(row)}
          >
            <Share1Icon />
            <span className="ml-2">Share</span>
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    const socket = io("https://fawss.pi42.com", { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("connected to socket!");
    });

    socket.on("allContractDetails", (data: SocketData) => {
      setData(
        Object.keys(data).map((key) => ({
          symbol: key,
          ...data[key],
          ...calculate24hrHighLow(
            Number(data[key]["lastPrice"]),
            Number(data[key]["priceChangePercent"])
          ),
        }))
      );
    });

    return () => {
      socket.close();
    };
  }, []);
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ??
                        (header.column.columnDef.header === "24H Change" ? (
                          <CaretSortIcon className="inline" />
                        ) : null)}
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

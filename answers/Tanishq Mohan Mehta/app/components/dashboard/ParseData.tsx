"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("wss://fawss.pi42.com", {
  transports: ["websocket"],
  upgrade: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 3000,
  reconnectionAttempts: 2,
});

export type DataType = {
  name: string;
  LastPrice: string;
  cur24HourChangePercentage: string;
  cur24HourVolume: string;
  cur24HourHigh: string;
  cur24HourLow: string;
  isIncrease: boolean;
};

export default function ParseData({
  children,
}: {
  children: (
    socketConnectionDone: boolean,
    Data: DataType[]
  ) => React.ReactNode;
}) {
  const [socketConnectionDone, setsocketConnectionDone] = useState(false);
  const [tempDatasTracking, setnamesTracking] = useState<string[]>([]);
  const [C1D, setC1D] = useState<
    Pick<DataType, "name" | "LastPrice" | "cur24HourChangePercentage">[]
  >([]);
  const [C2D, setC2D] = useState<
    Omit<DataType, "LastPrice" | "cur24HourChangePercentage">[]
  >([]);
  const [Data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    setData(
      C1D.map((tempData) => {
        const index = C2D.findIndex(
          (tempData2) =>
            tempData2.name.toLowerCase() == tempData.name.toLowerCase()
        );
        if (index != -1) {
          return {
            ...tempData,
            ...C2D[index],
          };
        } else {
          return tempData;
        }
      }) as DataType[]
    );
  }, [C2D, C1D]);

  useEffect(() => {
    if (tempDatasTracking.length != 0 && socketConnectionDone) {
      socket.emit("subscribe", {
        params: tempDatasTracking.map(
          (tempData) => `${tempData.toLowerCase()}@ticker`
        ),
      });
    }
  }, [tempDatasTracking, socketConnectionDone]);
  useEffect(() => {
    socket.on("connect", () => {
      setsocketConnectionDone(true);
    });

    socket.on(
      "24hrTicker",
      (data: { l: string; h: string; s: string; p: string; v: string }) => {
        const LowPrice = data.l;
        const HighPrice = data.h;
        const Volume = data.v;
        const ChangePercentage = data.p;
        const name = data.s;

        setC2D((prev) => [
          ...prev.filter(
            (tempData) => tempData.name.toLowerCase() != name.toLowerCase()
          ),
          {
            name: name,
            cur24HourHigh: HighPrice,
            cur24HourLow: LowPrice,
            cur24HourVolume: Volume,
            isIncrease: ChangePercentage[0] == "-",
          },
        ]);
      }
    );

    socket.once(
      "allContractDetails",
      (
        data: Record<
          string,
          {
            baseAssetVolume: string;
            lastPrice: string;
            marketPrice: string;
            priceChangePercent: string;
          }
        >
      ) => {
        if (tempDatasTracking.length == 0) {
          setnamesTracking(Object.keys(data));
        }
      }
    );

    socket.on(
      "allContractDetails",
      (
        data: Record<
          string,
          {
            baseAssetVolume: string;
            lastPrice: string;
            marketPrice: string;
            priceChangePercent: string;
          }
        >
      ) => {
        let TransformedData = Object.keys(data).map((tempDatad) => {
          return {
            name: tempDatad,
            LastPrice: data[tempDatad].lastPrice,
            cur24HourChangePercentage: data[tempDatad].priceChangePercent,
          };
        });
        setC1D(TransformedData);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children(socketConnectionDone, Data)}</>;
}

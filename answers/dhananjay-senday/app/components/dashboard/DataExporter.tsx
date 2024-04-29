"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("wss://fawss.pi42.com", {
  transports: ["websocket"],
  upgrade: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 3,
});

export type CoinDataType = {
  Coin: string;
  LastPrice: string;
  _24HourChangePercentage: string;
  _24HourVolume: string;
  _24HourHigh: string;
  _24HourLow: string;
  isIncrease: boolean;
};

export default function DataExporter({
  children,
}: {
  children: (
    isSocketConnected: boolean,
    CoinData: CoinDataType[]
  ) => React.ReactNode;
}) {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [coinsTracking, setCoinsTracking] = useState<string[]>([]);
  const [C1D, setC1D] = useState<
    Pick<CoinDataType, "Coin" | "LastPrice" | "_24HourChangePercentage">[]
  >([]);
  const [C2D, setC2D] = useState<
    Omit<CoinDataType, "LastPrice" | "_24HourChangePercentage">[]
  >([]);
  const [CoinData, setCoinData] = useState<CoinDataType[]>([]);
  useEffect(() => {
    setCoinData(
      C1D.map((coin) => {
        const index = C2D.findIndex(
          (coin2) => coin2.Coin.toLowerCase() == coin.Coin.toLowerCase()
        );
        if (index != -1) {
          return {
            ...coin,
            ...C2D[index],
          };
        } else {
          return coin;
        }
      }) as CoinDataType[]
    );
  }, [C2D, C1D]);

  useEffect(() => {
    if (coinsTracking.length != 0 && isSocketConnected) {
      socket.emit("subscribe", {
        params: coinsTracking.map((coin) => `${coin.toLowerCase()}@ticker`),
      });
    }
  }, [coinsTracking, isSocketConnected]);
  useEffect(() => {
    socket.on("connect", () => {
      setIsSocketConnected(true);
    });

    socket.on(
      "24hrTicker",
      (data: { l: string; h: string; s: string; p: string; v: string }) => {
        const LowPrice = data.l;
        const HighPrice = data.h;
        const Volume = data.v;
        const ChangePercentage = data.p;
        const Coin = data.s;

        setC2D((prev) => [
          ...prev.filter(
            (coin) => coin.Coin.toLowerCase() != Coin.toLowerCase()
          ),
          {
            Coin: Coin,
            _24HourHigh: HighPrice,
            _24HourLow: LowPrice,
            _24HourVolume: Volume,
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
        if (coinsTracking.length == 0) {
          setCoinsTracking(Object.keys(data));
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
        let TransformedData = Object.keys(data).map((coind) => {
          return {
            Coin: coind,
            LastPrice: data[coind].lastPrice,
            _24HourChangePercentage: data[coind].priceChangePercent,
          };
        });
        setC1D(TransformedData);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children(isSocketConnected, CoinData)}</>;
}

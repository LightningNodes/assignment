export type Contract = {
  lastPrice: string;
  marketPrice: string;
  priceChangePercent: string;
  baseAssetVolume: string;
  symbol: string;
  high: string;
  low: string;
};

export type SocketData = {
  [key: string]: {
    lastPrice: string;
    marketPrice: string;
    priceChangePercent: string;
    baseAssetVolume: string;
  };
};

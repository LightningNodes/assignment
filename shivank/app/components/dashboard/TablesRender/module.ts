import { CoinDataType } from "../DataExporter";

export function ShareText(coin: CoinDataType) {
  try {
    const csv = `symbol name,last price,24 hour change percentage,24 hour volume,24 hour high,24 hour low
${coin.Coin},${ParseVal(coin.LastPrice)},${ParseVal(coin._24HourChangePercentage)},${ParseVal(coin._24HourVolume)},${ParseVal(coin._24HourHigh)},${ParseVal(coin._24HourLow)}`;
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${coin.Coin}-CoinData.csv`;
    a.click();
  } catch (e) {
    console.error("Error while downloading CSV:", e);
    // Handle error if any
  }
}


export function ParseVal(StrValue: string, isPercentage = false) {
  return StrValue
    ? parseFloat(StrValue).toLocaleString() + (isPercentage ? " %" : "")
    : "fetching...";
}

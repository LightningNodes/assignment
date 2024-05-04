import { DataType } from "../ParseData";
export function ParseText(tempData: DataType) {
  try {
    navigator.share({
      text: `Welcome to Pi42! Today's update on CryptoMarket
            symbol name: ${tempData.name}
            last price: ₹${ParseVal(tempData.LastPrice)}
            24 hour change percentage: ${ParseVal(
              tempData.cur24HourChangePercentage
            )}%
            24 hour volume: ${ParseVal(tempData.cur24HourVolume)}
            24 hour high: ${ParseVal(tempData.cur24HourHigh)}
            24 hour low: ${ParseVal(tempData.cur24HourLow)}
`,
    });
  } catch (e) {
    const csv = `symbol name,last price,24 hour change percentage,24 hour volume,24 hour high,24 hour low
${tempData.name},${ParseVal(tempData.LastPrice)},${ParseVal(
      tempData.cur24HourChangePercentage
    )},${ParseVal(tempData.cur24HourVolume)},${ParseVal(tempData.cur24HourHigh)},${ParseVal(
      tempData.cur24HourLow
    )} `;
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tempData.name}-Data.csv`;
    a.click();
  }
}

export function ParseVal(StrValue: string, isPercentage = false) {
  return StrValue
    ? parseFloat(StrValue).toLocaleString() + (isPercentage ? " %" : "")
    : "loading..";
}

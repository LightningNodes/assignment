import { DataType } from "../ParseData";

import { ParseVal, ParseText } from "./module";

export default function DesktopTable({
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
    <table className="mt-2 mx-auto table-fixed max-lg:hidden bg-cyan border border-black rounded-lg">
      <thead>
        <tr className="text-white border border-black rounded-lg">
          <th className="px-4 py-1 border-b bg-blue-700 ">Symbol Name</th>
          <th className="px-4 py-1 border-b bg-blue-700 ">Last Price</th>
          <th className="px-4 py-1 border-b bg-blue-700 ">
            <button
              className="relative bg-blue-700 px-4 py-1 rounded-lg hover:bg-blue-600 transition-all"
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
              <div className="absolute top-0 right-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
              </div>
              24H Change
              {sort == "increasing" ? "🔼" : sort == "decreasing" ? "🔽" : ""}
            </button>
          </th>
          <th className="px-4 py-1 border-b bg-blue-700">24H Volume</th>
          <th className="px-4 py-1 border-b bg-blue-700">24H High</th>
          <th className="px-4 py-1 border-b bg-blue-700">24H Low</th>
          <th className="px-4 py-1 border-b bg-blue-700">Share</th>
        </tr>
      </thead>
      <tbody className="">
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
        }).map((tempData) => (
          <tr key={tempData.name} className="text shadow-lg cursor-pointer" >
            <td className="text-center ">{tempData.name}</td>
            <td className="text-center">{ParseVal(tempData.LastPrice)}</td>
            <td
              className={`text-center ${
                parseFloat(tempData.cur24HourChangePercentage) > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {ParseVal(tempData.cur24HourChangePercentage, true)}
            </td>
            <td className="text-center">
              {ParseVal(tempData.cur24HourVolume)}
            </td>
            <td className="text-center">{ParseVal(tempData.cur24HourHigh)}</td>
            <td className="text-center">{ParseVal(tempData.cur24HourLow)}</td>
            <td className="text-center">
              {/* <button
                className="bg-blue-800 px-2 py-0.5 my-1 hover:brightness-50 transition-all rounded-md text-white"
                onClick={() => {
                  ParseText(tempData);
                }}
              >
                Share
              </button> */}
              <button onClick={() => {
                  ParseText(tempData);
                }} className="sharebtn flex items-center justify-center bg-white border rounded-md p-2 opacity-50 hover:opacity-100 focus:outline-none focus:border-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 512 512">
<path fill="#25B7D3" d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"></path><path fill="#FFF" d="M154.4 203.09999999999997A53.8 53.8 0 1 0 154.4 310.7 53.8 53.8 0 1 0 154.4 203.09999999999997zM318.7 107.39999999999999A53.8 53.8 0 1 0 318.7 215 53.8 53.8 0 1 0 318.7 107.39999999999999zM318.7 297A53.8 53.8 0 1 0 318.7 404.6 53.8 53.8 0 1 0 318.7 297z"></path><g><path fill="#FFF" d="M222.1 112.2H251V302.3H222.1z" transform="rotate(59.786 236.552 207.272)"></path></g><g><path fill="#FFF" d="M141.5 288.5H331.6V317.4H141.5z" transform="rotate(30.214 236.576 302.965)"></path></g>
</svg>
</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

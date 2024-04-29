import { describe, expect, it, test } from "vitest";
import {
  findAllByText,
  fireEvent,
  getAllByText,
  getByLabelText,
  getByTitle,
  render,
  screen,
} from "@testing-library/react";
import { CoinDataType } from "../app/components/dashboard/DataExporter";
import MTable from "../app/components/dashboard/TablesRender/MobileView";
import TDesktop from "../app/components/dashboard/TablesRender/DesktopView";
describe("MTable", () => {
  const coinData: CoinDataType[] = [
    {
      Coin: "Bitcoin",
      LastPrice: "10000",
      _24HourChangePercentage: "10",
      _24HourVolume: "100000",
      _24HourHigh: "11000",
      _24HourLow: "9000",
      isIncrease: true,
    },
    {
      Coin: "Ethereum",
      LastPrice: "500",
      _24HourChangePercentage: "-5",
      _24HourVolume: "50000",
      _24HourHigh: "550",
      _24HourLow: "450",
      isIncrease: false,
    },
  ];

  it("renders Mobile View coin data", () => {
    const { getByText } = render(<MTable CoinData={coinData} sort="asc" />);
    expect(getByText("Bitcoin")).toBeDefined();
    expect(getByText("Ethereum")).toBeDefined();
  });

  it("renders Desktop coin data", () => {
    const { getByText } = render(<TDesktop CoinData={coinData} sort="asc" />);
    expect(
      findAllByText(document.getElementsByTagName("div")[0], "Bitcoin")
    ).toBeDefined();
    expect(
      findAllByText(document.getElementsByTagName("div")[0], "Ethereum")
    ).toBeDefined();
  });
});

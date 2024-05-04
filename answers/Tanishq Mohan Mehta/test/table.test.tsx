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
import { DataType } from "../app/components/dashboard/ParseData";
import MobileTable from "../app/components/dashboard/Table/MobileMode";
import DesktopTable from "../app/components/dashboard/Table/DesktopMode";
describe("MobileTable", () => {
  const Data: DataType[] = [
    {
      name: "BittempData",
      LastPrice: "10500",
      cur24HourChangePercentage: "8",
      cur24HourVolume: "95000",
      cur24HourHigh: "11200",
      cur24HourLow: "9200",
      isIncrease: true,
    },
    {
      name: "Ethereum",
      LastPrice: "510",
      cur24HourChangePercentage: "-3",
      cur24HourVolume: "52000",
      cur24HourHigh: "560",
      cur24HourLow: "440",
      isIncrease: false,
    },
  ];

  it("renders Mobile View tempData data", () => {
    const { getByText } = render(<MobileTable Data={Data} sort="increasing" />);
    expect(getByText("BittempData")).toBeDefined();
    expect(getByText("Ethereum")).toBeDefined();
  });

  it("renders Desktop tempData data", () => {
    const { getByText } = render(<DesktopTable Data={Data} sort="increasing" />);
    expect(
      findAllByText(document.getElementsByTagName("div")[0], "BittempData")
    ).toBeDefined();
    expect(
      findAllByText(document.getElementsByTagName("div")[0], "Ethereum")
    ).toBeDefined();
  });
});

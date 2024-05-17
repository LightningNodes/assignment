import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CryptoContractsPage from "../CryptoContractsPage";

describe("CryptoContractsPage Component", () => {
  let server;

  beforeAll(() => {
    server = new WebSocket(
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
    );
    server.onopen = () => server.send("40");
  });

  afterAll(() => {
    server.close();
  });

  test("renders CryptoContractsPage component", async () => {
    render(<CryptoContractsPage />);

    await waitFor(() => expect(server.readyState).toBe(1));

    const mockData = {
      BTC: {
        lastPrice: 40000,
        priceChangePercent: 2,
        baseAssetVolume: 10000,
        marketPrice: 42000,
      },
    };

    server.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      expect(message[0]).toBe("message"); 
      expect(message[1]).toEqual(mockData);    });

    const messageData = JSON.stringify(["message", mockData]);

    const messageEvent = new MessageEvent("message", { data: messageData });

    server.dispatchEvent(messageEvent);
  });

  test("sorts data based on 24 hour change percentage", async () => {
    const mockCryptos = [
      {
        symbol: "BTC",
        lastPrice: 40000,
        changePercent: 2,
        volume: 10000,
        high: 42000,
        low: 39000,
      },
      {
        symbol: "ETH",
        lastPrice: 2000,
        changePercent: -1,
        volume: 5000,
        high: 2100,
        low: 1900,
      },
      {
        symbol: "ADA",
        lastPrice: 1.5,
        changePercent: 5,
        volume: 2000,
        high: 1.6,
        low: 1.4,
      },
    ];

    const mockWebSocket = jest.fn(() => ({
      send: jest.fn(),
      close: jest.fn(),
      onopen: jest.fn(),
      onclose: jest.fn(),
      onerror: jest.fn(),
      onmessage: jest.fn((event) => {
        const data = `42["message",{"BTC":{"lastPrice":40000,"priceChangePercent":2,"baseAssetVolume":10000,"marketPrice":42000},"ETH":{"lastPrice":2000,"priceChangePercent":-1,"baseAssetVolume":5000,"marketPrice":2100},"ADA":{"lastPrice":1.5,"priceChangePercent":5,"baseAssetVolume":2000,"marketPrice":1.6}}]`;
        const messageEvent = { data: data };
        mockWebSocket.mock.calls[0][0].onmessage(messageEvent);
      }),
    }));

    global.WebSocket = mockWebSocket;

    render(<CryptoContractsPage />);
    setTimeout(() => {
      const changePercentHeader = screen.getByText(
        /24 Hour Change Percentage/i
      );
      fireEvent.click(changePercentHeader);
      const sortedCryptoRows = screen.getAllByTestId("crypto-row");

      expect(sortedCryptoRows[0]).toHaveTextContent("ADA");
      expect(sortedCryptoRows[1]).toHaveTextContent("BTC"); 
      expect(sortedCryptoRows[2]).toHaveTextContent("ETH");
    }, 1000);
  });
});
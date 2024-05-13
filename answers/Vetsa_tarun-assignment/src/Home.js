import React, { useState, useEffect } from "react";
import "./Home.css"; 

function Home({handleLogout}) {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortByChange, setSortByChange] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
    );
    socket.onopen = () => socket.send("40");
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data.slice(2))[1];
        const cryptoData = Object.entries(data).map(([key, value]) => ({
          symbol: key,
          lastPrice: value.lastPrice,
          changePercent: parseFloat(value.priceChangePercent),
          volume: value.baseAssetVolume,
          high: value.marketPrice,
          low: value.lastPrice,
        }));
        setCryptos(sortByChange ? sortCryptosByChange(cryptoData) : cryptoData);
        setLoading(false);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    };
    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket connection closed");

    return () => socket.close();
  }, [sortByChange]);

  const sortCryptosByChange = (cryptoData) => {
    return cryptoData.slice().sort((a, b) => a.changePercent - b.changePercent);
  };

  const handleSortByChange = () => {
    setSortByChange(!sortByChange);
  };

  const handleShare = (symbol) => {
    const shareText = `Welcome to Pi42! Today's update on ${symbol}.
      symbol name: ${symbol}
      last price: ₹${cryptos.find((crypto) => crypto.symbol === symbol)?.lastPrice}
      24 hour change percentage: ${cryptos.find((crypto) => crypto.symbol === symbol)?.changePercent}%
      24 hour volume: ${cryptos.find((crypto) => crypto.symbol === symbol)?.volume}
      24 hour high: ₹${cryptos.find((crypto) => crypto.symbol === symbol)?.high}
      24 hour low: ₹${cryptos.find((crypto) => crypto.symbol === symbol)?.low}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container">
      <h1>Cryptocurrency Prices</h1>
      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="cryptos-container">
        {loading ? (
          <p>Loading....</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last Price</th>
                <th>
                  Change (%){" "}
                  <button onClick={handleSortByChange}>
                    {sortByChange ? "▼" : "▲"}
                  </button>
                </th>
                <th>Volume</th>
                <th>24h High</th>
                <th>24h Low</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {cryptos.map((crypto) => (
                <tr key={crypto.symbol}>
                  <td>{crypto.symbol}</td>
                  <td>{crypto.lastPrice}</td>
                  <td>{crypto.changePercent}</td>
                  <td>{crypto.volume}</td>
                  <td>{crypto.high}</td>
                  <td>{crypto.low}</td>
                  <td>
                    <button onClick={() => handleShare(crypto.symbol)}>Share</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;

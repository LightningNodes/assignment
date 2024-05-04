import React from "react";
import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import './user.css';

function User() {
    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    };

    const [cryptos, setCryptos] = useState([]);
    const [sortedCryptos, setSortedCryptos] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        const socket = new WebSocket(
          "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
        );
        socket.onopen = () => socket.send("40");
        socket.onmessage = (event) => {
          const message = event.data.slice(2);
          if (message && message.startsWith('[')) {
            const data = JSON.parse(message)[1];
            if (data && typeof data === 'object') {
              setCryptos(
                Object.entries(data).map(([key, value]) => ({
                  symbol: key,
                  lastPrice: value.lastPrice,
                  changePercent: parseFloat(value.priceChangePercent),
                  volume: value.baseAssetVolume,
                  high: value.marketPrice,
                  low: value.lastPrice,
                }))
              );
              if (isSorted) {
                sortCryptos();
              }
            }
          }
        };
        socket.onerror = (error) => console.error("WebSocket error:", error);
        socket.onclose = () => console.log("WebSocket connection closed");
        return () => socket.close();
      }, [isSorted]);

    const shareOnWhatsApp = (crypto) => {
        const text = `Check out this crypto:\nSymbol: ${crypto.symbol}\nLast Price: ${crypto.lastPrice}\nChange Percent: ${crypto.changePercent}\nVolume: ${crypto.volume}\nHigh: ${crypto.high}\nLow: ${crypto.low}`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const sortCryptos = () => {
        const sorted = [...cryptos].sort((a, b) => b.changePercent - a.changePercent);
        setSortedCryptos(sorted);
        setIsSorted(true);
    };

    const liveTrack = () => {
        setIsSorted(false);
    };

    return (
        <div>
          <button onClick={sortCryptos}>Sort by 24h Change</button>
          <button onClick={liveTrack}>Live Track</button>
          <button onClick={logout}>Logout</button>
          <div className="crypto-container">
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Last Price</th>
                        <th>Change Percent</th>
                        <th>Volume</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(isSorted ? sortedCryptos : cryptos).map((crypto, index) => (
                        <tr key={index}>
                            <td>{crypto.symbol}</td>
                            <td>{crypto.lastPrice}</td>
                            <td>{crypto.changePercent}</td>
                            <td>{crypto.volume}</td>
                            <td>{crypto.high}</td>
                            <td>{crypto.low}</td>
                            <td>
                                <button style={{backgroundColor: 'green'}} onClick={() => shareOnWhatsApp(crypto)}>Share on WhatsApp</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}
export default User;

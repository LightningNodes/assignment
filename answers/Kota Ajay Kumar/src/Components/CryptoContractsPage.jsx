import React, { useState, useEffect } from "react";
import "../styles/CryptoContractsPage.css";
import whatsapp from "../img/whatsapp.jpeg";
const CryptoContractsPage = ({user, handleUserLogout }) => {
  const [cryptos, setCryptos]= useState([]);

  const [sortedCryptos, setSortedCryptos]= useState([]);
//   const [user,setUser]=useState(null);

  const [sortBy, setSortBy]=useState(null);
  const [sortDirection, setSortDirection]= useState("asc");

  useEffect(()=>{
    const socket = new WebSocket(
      "wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket"
    );
    socket.onopen=()=> socket.send("40");
    socket.onmessage=(event)=>{
    try{
      const data =JSON.parse(event.data.slice(2))[1];
      setCryptos(
        Object.entries(data).map(([key,value])=>({
          symbol:key,
          lastPrice:value.lastPrice,
          changePercent: parseFloat(value.priceChangePercent),
          volume:value.baseAssetVolume,
          high:value.marketPrice,
          low:value.lastPrice,
        }))
      );
    }catch(error){
        console.error("Error parsing data:",error);
    }
    };
    socket.onerror=(error)=>console.error("WebSocket error:",error);
    socket.onclose=()=>console.log("WebSocket connection closed");

    return ()=>socket.close();
  }, []);

  useEffect(() => {
    if (sortBy) {
      const sorted =[...cryptos].sort((a, b) => {
        if (sortBy ==="changePercent") {
          return sortDirection==="asc"
            ? a.changePercent-b.changePercent
            : b.changePercent-a.changePercent;
        }
        return sortDirection=== "asc"
          ? a[sortBy]-b[sortBy]
          : b[sortBy]-a[sortBy];
      });
      setSortedCryptos(sorted);
    } else {
      setSortedCryptos(cryptos);
    }
  }, [cryptos, sortBy, sortDirection]);

  const handleSort= (key) => {
    if (sortBy=== key) {
      setSortDirection(sortDirection=== "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const shareCrypto= (crypto) => {
    const symbol = crypto.symbol;
    const content=`Welcome to Pi42! Today's update on ${crypto.symbol}.
    Symbol Name: ${crypto.symbol}
    Last Price: ${crypto.lastPrice}
    24 Hour Change Percentage: ${crypto.changePercent}%
    24 Hour Volume: ${crypto.volume}
    24 Hour High: ${crypto.high}
    24 Hour Low: ${crypto.low}`;

    if (navigator.share) {
      navigator
        .share({
          title:"Pi42 Crypto Update",
          text:content,
        })
        .then(()=> console.log("Shared successfully"))
        .catch((error)=> console.error("Error sharing:", error));
    } else {
      const wannaDown = window.confirm(`Do you want to download the update for ${symbol} ?`);
      if (wannaDown){
        const blob= new Blob([content],{type:"text/plain"});
        const url= URL.createObjectURL(blob);

        const link= document.createElement("a");
        link.href= url;
        link.download= symbol+ "_update.txt";
        link.textContent= "Download "+symbol+ " Update";
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
      
    }
  };
  const shareWhatsapp=(crypto)=>{

    const symbol = crypto.symbol;
    const content=`Welcome to Pi42! Today's update on ${crypto.symbol}.
    Symbol Name: ${crypto.symbol}
    Last Price: ${crypto.lastPrice}
    24 Hour Change Percentage: ${crypto.changePercent}%
    24 Hour Volume: ${crypto.volume}
    24 Hour High: ${crypto.high}
    24 Hour Low: ${crypto.low}`;

    const whatsappMessage = encodeURIComponent(
        "Check out the latest update on " + symbol + ":\n\n" + content
      );
    const whatsappUrl = "https://api.whatsapp.com/send?text=" + whatsappMessage;
    window.open(whatsappUrl, "_blank");
    };

  return (
    <div>
      {user && (
          <div className="logoutuser">
            <h2>Crypto Contracts</h2>
            <p>Welcome, {user.displayName || user.email}!</p>
            <button style={{marginLeft: '20px'}} onClick={handleUserLogout}>Logout</button>
          </div>
        )}
      <div>
      
        <table>
          <thead>
            <tr>
              <th
                onClick={()=> handleSort("symbol")}
                className={sortBy==="symbol"?`sorted ${sortDirection}` : ""}
              >
                Symbol
              </th>
              <th
                onClick={()=> handleSort("lastPrice")}
                className={
                  sortBy=== "lastPrice"?`sorted ${sortDirection}` : ""
                }
              >
                Last Price
              </th>
              <th
                onClick={()=> handleSort("changePercent")}
                className={
                  sortBy=== "changePercent"?`sorted ${sortDirection}` : ""
                }
              >
                24 Hour Change %
              </th>
              <th
                onClick={()=> handleSort("volume")}
                className={sortBy=== "volume"? `sorted ${sortDirection}` : ""}
              >
                24 Hour Volume
              </th>
              <th
                onClick={()=> handleSort("high")}
                className={sortBy==="high"? `sorted ${sortDirection}` : ""}
              >
                24 Hour High
              </th>
              <th
                onClick={()=> handleSort("low")}
                className={sortBy=== "low"? `sorted ${sortDirection}` : ""}
              >
                24 Hour Low
              </th>
              <th>Share</th>
              
            </tr>
          </thead>
          <tbody>
            {sortedCryptos.map((crypto) => (
              <tr key={crypto.symbol}>
                <td>{crypto.symbol}</td>
                <td>{crypto.lastPrice}</td>
                <td>{crypto.changePercent}</td>
                <td>{crypto.volume}</td>
                <td>{crypto.high}</td>
                <td>{crypto.low}</td>
                <td>
                  <button onClick={() => shareCrypto(crypto)}>Share</button>
                  <button
                    onClick={()=> shareWhatsapp(crypto)}
                  >
                    <img
                      src={whatsapp}
                      alt="WhatsApp"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoContractsPage;

"use client";
import { useEffect, useState } from 'react';
import auth from '../firebase';
import { useRouter } from 'next/navigation';

interface CryptoDataType {
  symbol: string;
  lastPrice: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}

export default function Home() {
  const router = useRouter();
  const [cryptoData, setCryptoData] = useState<CryptoDataType[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    })
  }, []);

  useEffect(() => {
    const socket = new WebSocket("wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket");

    socket.onopen = () => socket.send("40");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data.slice(2))[1];
      if (data) {
        let cryptoData = Object.entries(data).map(([symbol, value]: [string, any]) => ({
          symbol: symbol,
          lastPrice: value.lastPrice,
          changePercent: parseFloat(value.priceChangePercent),
          volume: value.baseAssetVolume,
          high: value.marketPrice,
          low: value.lastPrice,
        }));
        setCryptoData(cryptoData);
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket connection closed");

    return () => socket.close();
  }, []);

  const sortData = () => {
    const sortedData = [...cryptoData];
    if (sortDirection === 'asc') {
      sortedData.sort((a, b) => a.changePercent - b.changePercent);
      setSortDirection('desc');
    } else {
      sortedData.sort((a, b) => b.changePercent - a.changePercent);
      setSortDirection('asc');
    }
    setCryptoData(sortedData);
  };

  const shareContract = (contract: CryptoDataType) => {
    const { symbol, lastPrice, changePercent, volume, high, low } = contract;
    const message = `Welcome to Pi42! Today's update on ${symbol}.\n` +
      `symbol name: ${symbol}\n` +
      `last price: ₹${lastPrice}\n` +
      `24 hour change percentage: ${changePercent}%\n` +
      `24 hour volume: ${volume}\n` +
      `24 hour high: ₹${high}\n` +
      `24 hour low: ₹${low}`;

    if (navigator.share) {
      navigator.share({
        title: 'Crypto Contract Details',
        text: message
      }).then(() => {
        console.log('Contract details shared successfully');
      }).catch((error) => {
        console.error('Error sharing contract details:', error);
      });
    } else {
      const element = document.createElement('a');
      const file = new Blob([message], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'contract_details.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleLogout = async () => {
    await auth.signOut()
      .then(() => {
        router.replace("/login")
      })
      .catch((e) => {
        console.error("Logout error: ", e)
      })
  }

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex items-center justify-center mt-4">
            <span className="mr-2 text-gray-500">User not logged in!</span>
            <a href="/login" className="text-blue-500 hover:underline">Login here</a>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col p-8 bg-white text-black'>
      <div className='flex flex-row justify-between'>
        <h1 className="text-2xl font-bold mb-4">Crypto Contracts</h1>
        <button
          className="font-semibold text-red-400 hover:text-red-500 focus:outline-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {cryptoData && cryptoData.length > 0 ? (
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Symbol Name</th>
              <th className="border border-gray-400 px-4 py-2">Last Price (₹)</th>
              <th className="border border-gray-400 px-2 py-2 cursor-pointer" onClick={sortData}>
                24H Change (%)
                {sortDirection === 'asc' ? ' ↓' : ' ↑'}
              </th>
              <th className="border border-gray-400 px-4 py-2">24H Volume</th>
              <th className="border border-gray-400 px-4 py-2">24H High (₹)</th>
              <th className="border border-gray-400 px-4 py-2">24H Low (₹)</th>
              <th className="border border-gray-400 px-4 py-2">Share</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.symbol}>
                <td className="border border-gray-400 px-4 py-2">{crypto.symbol}</td>
                <td className="border border-gray-400 px-4 py-2 text-green-500">{crypto.lastPrice}</td>
                <td className={`border border-gray-400 px-2 py-2 ${crypto.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.changePercent.toFixed(2)}%
                </td>
                <td className="border border-gray-400 px-4 py-2">{crypto.volume}</td>
                <td className="border border-gray-400 px-4 py-2">{crypto.high}</td>
                <td className="border border-gray-400 px-4 py-2">{crypto.low}</td>
                <td className="border border-gray-400 px-4 py-2 flex align-middle justify-center">
                  <button
                    className=" text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => shareContract(crypto)}
                  >
                    Share
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

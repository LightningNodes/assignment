"use client";
import { useEffect, useState } from 'react';
import auth from '../firebase';
import { useRouter } from 'next/navigation';

export interface CryptoDataType {
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | 'none'>('none');
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
    let socket: WebSocket | null = null;

    const connectWebSocket = () => {
      socket = new WebSocket("wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket");

      socket.onopen = () => {
        socket?.send("40");
        setInterval(() => {
          if (socket?.readyState === WebSocket.OPEN) {
            console.log("pinging")
            socket.send("2");
          }
        }, 30000);
      };

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

      socket.onclose = () => {
        console.log("WebSocket connection closed");
        setTimeout(connectWebSocket, 2000);
      };
    };

    connectWebSocket();

    return () => {
      if (socket !== null) {
        socket.close();
      }
    };
  }, []);

  const sortData = () => {
    setSortDirection(prevDirection => prevDirection === 'none' ? 'asc' : prevDirection === 'asc' ? 'desc' : 'none');
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Price (₹)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={sortData}>
                  24H Change (%)
                  {sortDirection === 'none' ? ' =' : sortDirection === 'asc' ? ' ↑' : ' ↓'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24H Volume
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24H High (₹)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24H Low (₹)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Share
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cryptoData.slice()
                .sort((a, b) => {
                  if (sortDirection === 'asc') {
                    return a.changePercent - b.changePercent;
                  } else if (sortDirection === 'desc') {
                    return b.changePercent - a.changePercent;
                  } else {
                    return 0;
                  }
                }).map((crypto) => (
                  <tr key={crypto.symbol}>
                    <td className="px-6 py-4 whitespace-nowrap">{crypto.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-500">{crypto.lastPrice}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${crypto.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {crypto.changePercent.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{crypto.volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{crypto.high}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{crypto.low}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                        onClick={() => shareContract(crypto)}
                      >
                        Share
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

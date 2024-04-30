// pages/dashboard.tsx
import { useEffect, useState, useCallback  } from 'react';
import { subscribeToTickers, unsubscribeFromTickers, socket } from '../utils/socket';
import useRequireAuth from '../utils/requireAuth';
import LogoutButton from '../components/LogoutButton';

interface CryptoDetail {
  s: string;  // Symbol
  c: string;  // Last price
  P: string;  // 24-hour change percentage
  h: string;  // 24-hour high
  l: string;  // 24-hour low
  v: string;  // 24-hour volume
}

function isKeyOfCryptoDetail(key: any): key is keyof CryptoDetail {
  return ['s', 'c', 'P', 'h', 'l', 'v'].includes(key);
}

const Dashboard = () => {
    const user = useRequireAuth();
    console.log("back to dash")
    const [cryptoData, setCryptoData] = useState<Record<string, CryptoDetail>>({});
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoDetail | null>(null);
    const [sortBy, setSortBy] = useState<string>('P');
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const handleTickerUpdate = useCallback((data: CryptoDetail) => {
        console.log("handleTicker")
        setCryptoData((prevData) => ({
            ...prevData,
            [data.s]: data
        }));
    }, []);
    
    useEffect(() => {
        if (user) {
          // Setup WebSocket listeners once the user is authenticated and the socket is connected
            const setupSocketListeners = () => {
                unsubscribeFromTickers();  // Ensure no duplicates
                subscribeToTickers();      // Subscribe to desired tickers
                socket.on("24hrTicker", handleTickerUpdate);  // Listen for ticker updates
            };
            
            if (socket.connected) {
                setupSocketListeners();
            } else {
                socket.on("connect", setupSocketListeners);
            }
        
            return () => {
                // Cleanup WebSocket listeners
                unsubscribeFromTickers();
                socket.off("connect", setupSocketListeners);
                socket.off("24hrTicker", handleTickerUpdate);
            };
        }
    }, [user, handleTickerUpdate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  const formatNumber = (num: string) => {
    let [integer, decimal] = num.split('.');
    if (integer.length > 3) {
        const lastThree = integer.slice(-3);
        const rest = integer.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        integer = `${rest},${lastThree}`;
    }
    return decimal ? `${integer}.${decimal}` : integer;
  };

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(key);
      setSortAscending(true);
    }
  };

  const sortedData = Object.entries(cryptoData).sort(([_, a], [__, b]) => {
    if (isKeyOfCryptoDetail(sortBy)) {
      const valueA = parseFloat(a[sortBy]);
      const valueB = parseFloat(b[sortBy]);
      return sortAscending ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  const handleShare = async (data: CryptoDetail) => {
    const message = `Welcome to Pi42! Today's update on ${data.s}.\n` +
                    `Symbol name: ${data.s}\n` +
                    `Last price: ₹${formatNumber(data.c)}\n` +
                    `24 hour change percentage: ${data.P}%\n` +
                    `24 hour volume: ${formatNumber(data.v)}\n` +
                    `24 hour high: ₹${formatNumber(data.h)}\n` +
                    `24 hour low: ₹${formatNumber(data.l)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.s} Crypto Details`,
          text: message
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const downloadData = (data: CryptoDetail) => {
    const message = `Welcome to Pi42! Today's update on ${data.s}.\n` +
                    `Symbol name: ${data.s}\n` +
                    `Last price: ₹${formatNumber(data.c)}\n` +
                    `24 hour change percentage: ${data.P}%\n` +
                    `24 hour volume: ${formatNumber(data.v)}\n` +
                    `24 hour high: ₹${formatNumber(data.h)}\n` +
                    `24 hour low: ₹${formatNumber(data.l)}`;
    const element = document.createElement("a");
    const file = new Blob([message], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${data.s}_details.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-sky-900 text-white">
      {/* Header bar */}
      <div className="flex justify-between items-center bg-gray-800 p-4">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold text-cyan-400">Crypto Rate Dashboard</h1>
        </div>
        <LogoutButton />
      </div>
  
      {/* Main content area */}
      <div className="p-5 flex justify-center">
        <div className="flex flex-col lg:flex-row">
          {/* Details table */}
          <div className="mr-8 flex flex-col justify-start">
            {selectedCrypto && (
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <p><strong>Symbol:</strong> {selectedCrypto.s}</p>
                <p><strong>Last Price:</strong> ₹{formatNumber(selectedCrypto.c)}</p>
                <p><strong>24h Change:</strong> {selectedCrypto.P}%</p>
                <p><strong>24h High:</strong> ₹{formatNumber(selectedCrypto.h)}</p>
                <p><strong>24h Low:</strong> ₹{formatNumber(selectedCrypto.l)}</p>
                <p><strong>24h Volume:</strong> {formatNumber(selectedCrypto.v)}</p>
              </div>
            )}
          </div>
  
          {/* Main table */}
          <div className="full-table shadow-2xl rounded-xl max-w-6xl">
            <table className="table-scroll w-full text-sm lg:text-base">
              <thead className="text-lg font-bold text-gray-200 bg-zinc-950 sticky top-0 z-50">
                <tr>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('s')}>Symbol {sortBy === 's' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('c')}>Last Price {sortBy === 'c' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('P')}>24h Change {sortBy === 'P' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('v')}>24h Volume {sortBy === 'v' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('h')}>24h High {sortBy === 'h' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('l')}>24h Low {sortBy === 'l' ? (sortAscending ? '▲' : '▼') : ''}</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="adjust-table-height bg-gray-800 overflow-y-auto">
                {sortedData.map(([symbol, details]) => (
                  <tr key={symbol} onClick={() => setSelectedCrypto(details)} className="hover:bg-gray-700 cursor-pointer">
                    <td className="border-b border-gray-700 px-4 py-2">{symbol}</td>
                    <td className="border-b border-gray-700 px-4 py-2">₹ {formatNumber(details.c)}</td>
                    <td className="border-b border-gray-700 px-4 py-2">
                      <span className={`${details.P.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                        {details.P}% {details.P.startsWith('-') ? '↓' : '↑'}
                      </span>
                    </td>
                    <td className="border-b border-gray-700 px-4 py-2">{formatNumber(details.v)}</td>
                    <td className="border-b border-gray-700 px-4 py-2">{formatNumber(details.h)}</td>
                    <td className="border-b border-gray-700 px-4 py-2">{formatNumber(details.l)}</td>
                    <td className="border-b border-gray-700 px-4 py-2 flex justify-start items-center space-x-2">
                      <button onClick={() => handleShare(details)} className="p-1">
                        <img src="/send.svg" alt="Share" className="invert brightness-0 opacity-30 hover:scale-110 hover:opacity-100 w-6 h-6" />
                      </button>
                      <button onClick={() => downloadData(details)} className="p-1">
                        <img src="/download.svg" alt="Download" className="invert brightness-0 opacity-30 hover:scale-110 hover:opacity-100 w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
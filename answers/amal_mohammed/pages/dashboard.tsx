// pages/dashboard.tsx
import { useEffect, useState, useCallback  } from 'react';
import { subscribeToTickers, unsubscribeFromTickers, socket } from '../utils/socket';
import { sortCryptoData, handleSort } from '../utils/sorting';
import { formatNumber } from '../utils/formatting'; 
import useRequireAuth from '../utils/requireAuth';
import { CryptoDetail } from '../utils/types';
import ActionButtons from '../components/ActionButtons';
import SelectedCryptoDetails from '../components/SelectedCryptoDetails';
import LogoutButton from '../components/LogoutButton';

const Dashboard = () => {
    const user = useRequireAuth();
    const [cryptoData, setCryptoData] = useState<Record<string, CryptoDetail>>({});
    const [selectedCrypto, setSelectedCrypto] = useState<CryptoDetail | null>(null);
    const [sortBy, setSortBy] = useState<string>('P');
    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const handleTickerUpdate = useCallback((data: CryptoDetail) => {
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

  const sortedData = sortCryptoData(cryptoData, sortBy, sortAscending);

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
          {selectedCrypto && (
          <div className="mr-8 flex flex-col justify-start">
            <SelectedCryptoDetails crypto={selectedCrypto} formatNumber={formatNumber} />
          </div>
          )}
  
          {/* Main table */}
          <div className="full-table shadow-2xl rounded-xl max-w-6xl">
            <table className="table-scroll w-full text-sm lg:text-base">
            <thead className="text-lg font-bold text-gray-200 bg-zinc-950 sticky top-0 z-50">
              <tr>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('s', sortBy, setSortBy, sortAscending, setSortAscending)}>Symbol {sortBy === 's' ? (sortAscending ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('c', sortBy, setSortBy, sortAscending, setSortAscending)}>Last Price {sortBy === 'c' ? (sortAscending ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('P', sortBy, setSortBy, sortAscending, setSortAscending)}>24h Change {sortBy === 'P' ? (sortAscending ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('v', sortBy, setSortBy, sortAscending, setSortAscending)}>24h Volume {sortBy === 'v' ? (sortAscending ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('h', sortBy, setSortBy, sortAscending, setSortAscending)}>24h High {sortBy === 'h' ? (sortAscending ? '▲' : '▼') : ''}</th>
                <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('l', sortBy, setSortBy, sortAscending, setSortAscending)}>24h Low {sortBy === 'l' ? (sortAscending ? '▲' : '▼') : ''}</th>
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
                    <td className="border-b border-gray-700 px-4 py-2">
                      <ActionButtons data={details} formatNumber={formatNumber} />
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
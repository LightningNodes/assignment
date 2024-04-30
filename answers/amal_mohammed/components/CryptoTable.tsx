// components/CryptoTable.tsx
import React from 'react';

interface CryptoDetail {
  s: string;  // Symbol
  c: string;  // Last price
  P: string;  // 24-hour change percentage
  h: string;  // 24-hour high
  l: string;  // 24-hour low
  v: string;  // 24-hour volume
}

interface CryptoTableProps {
  cryptoData: [string, CryptoDetail][];
  onSelectCrypto: (crypto: CryptoDetail) => void;
  onSort: (key: keyof CryptoDetail) => void;
  sortBy: keyof CryptoDetail;
  sortAscending: boolean;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ cryptoData, onSelectCrypto, onSort, sortBy, sortAscending }) => {
  if (cryptoData.length === 0) {
    return <div>No data available</div>; // Or any other placeholder content
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead className="text-xs text-gray-500 bg-gray-700">
          <tr>
            {Object.keys(cryptoData[0][1]).map((key) => (
              <th key={key} className="px-4 py-2 cursor-pointer" onClick={() => onSort(key as keyof CryptoDetail)}>
                {key.toUpperCase()} {sortBy === key ? (sortAscending ? '▲' : '▼') : ''}
              </th>
            ))}
            <th className="px-4 py-2">Share</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map(([symbol, details]) => (
            <tr key={symbol} onClick={() => onSelectCrypto(details)} className="bg-gray-800 hover:bg-gray-700 transition duration-300">
              <td className="border-b border-gray-700 px-4 py-2">{details.s}</td>
              <td className="border-b border-gray-700 px-4 py-2">{details.c}</td>
              <td className="border-b border-gray-700 px-4 py-2">{details.P}</td>
              <td className="border-b border-gray-700 px-4 py-2">{details.h}</td>
              <td className="border-b border-gray-700 px-4 py-2">{details.l}</td>
              <td className="border-b border-gray-700 px-4 py-2">{details.v}</td>
              <td className="border-b border-gray-700 px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

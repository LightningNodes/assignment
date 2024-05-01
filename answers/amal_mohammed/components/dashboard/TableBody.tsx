import React from 'react';
import { formatNumber } from '../../utils/formatting';
import ActionButtons from './ActionButtons';
import { CryptoDetail } from '../../utils/types';

// Define a type for the props expected by CryptoTable
interface CryptoTableProps {
  sortedData: [string, CryptoDetail][];
  setSelectedCrypto: React.Dispatch<React.SetStateAction<CryptoDetail | null>>;
}

const CryptoTable: React.FC<CryptoTableProps> = ({ sortedData, setSelectedCrypto }) => {
  return (
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
  );
};

export default CryptoTable;

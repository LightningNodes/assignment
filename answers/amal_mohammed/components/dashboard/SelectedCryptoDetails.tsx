// components/SelectedCryptoDetails.tsx
import React from 'react';
import { CryptoDetail } from '../../utils/types';  // Ensure the path to types.ts is correct

interface CryptoDetailsProps {
  crypto: CryptoDetail;
  formatNumber: (num: string) => string;
}

const SelectedCryptoDetails: React.FC<CryptoDetailsProps> = ({ crypto, formatNumber }) => {
  return (
    <div className="crypto__details mr-8 flex flex-col justify-start bg-gray-800 p-4 rounded-lg shadow-lg">
      <p><strong>Symbol:</strong> {crypto.s}</p>
      <p><strong>Last Price:</strong> ₹{formatNumber(crypto.c)}</p>
      <p><strong>24h Change:</strong> {crypto.P}%</p>
      <p><strong>24h High:</strong> ₹{formatNumber(crypto.h)}</p>
      <p><strong>24h Low:</strong> ₹{formatNumber(crypto.l)}</p>
      <p><strong>24h Volume:</strong> {formatNumber(crypto.v)}</p>
    </div>
  );
};

export default SelectedCryptoDetails;

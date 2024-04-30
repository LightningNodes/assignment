// components/CryptoDetails.tsx
import React from 'react';

interface CryptoDetail {
  s: string;
  c: string;
  P: string;
  h: string;
  l: string;
  v: string;
}

interface CryptoDetailsProps {
  selectedCrypto: CryptoDetail | null;
}

const CryptoDetails: React.FC<CryptoDetailsProps> = ({ selectedCrypto }) => {
  if (!selectedCrypto) return <div>Select a crypto to see the details.</div>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <p><strong>Symbol:</strong> {selectedCrypto.s}</p>
      <p><strong>Last Price:</strong> ₹{selectedCrypto.c}</p>
      <p><strong>24h Change:</strong> {selectedCrypto.P}</p>
      <p><strong>24h High:</strong> ₹{selectedCrypto.h}</p>
      <p><strong>24h Low:</strong> ₹{selectedCrypto.l}</p>
      <p><strong>24h Volume:</strong> {selectedCrypto.v}</p>
    </div>
  );
};

export default CryptoDetails;

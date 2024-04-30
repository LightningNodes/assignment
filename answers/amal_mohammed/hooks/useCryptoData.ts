// hooks/useCryptoData.ts
import { useState, useEffect } from 'react';
import { subscribeToTickers, unsubscribeFromTickers } from '../services/socketService';

interface CryptoDetail {
  s: string;
  c: string;
  P: string;
  h: string;
  l: string;
  v: string;
}

const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoDetail>>({});
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoDetail | null>(null);
  const [sortBy, setSortBy] = useState<keyof CryptoDetail>('s');
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  useEffect(() => {
    const handleData = (data: CryptoDetail) => {
      setCryptoData(prev => ({ ...prev, [data.s]: data }));
    };

    subscribeToTickers(handleData);
    return () => unsubscribeFromTickers();
  }, []);

  const handleSort = (key: keyof CryptoDetail) => {
    if (sortBy === key) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(key);
      setSortAscending(true);
    }
  };

  const sortedData = Object.entries(cryptoData).sort((a, b) => {
    const valueA = parseFloat(a[1][sortBy]);
    const valueB = parseFloat(b[1][sortBy]);
    return sortAscending ? valueA - valueB : valueB - valueA;
  });

  return { sortedData, selectedCrypto, setSelectedCrypto, handleSort, sortBy, sortAscending };
};

export default useCryptoData;

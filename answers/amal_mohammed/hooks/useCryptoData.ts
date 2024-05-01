// hooks/useCryptoData.ts
import { useState, useEffect, useCallback } from 'react';
import { subscribeToTickers, unsubscribeFromTickers, socket } from '../utils/socket';
import { sortCryptoData } from '../utils/sorting';
import { CryptoDetail, User } from '../utils/types'; // Ensure correct import paths

interface CryptoData {
  [key: string]: CryptoDetail;
}

export const useCryptoData = (user: User | null) => {
  const [cryptoData, setCryptoData] = useState<CryptoData>({});
  const [sortBy, setSortBy] = useState<string>('P');
  const [sortAscending, setSortAscending] = useState<boolean>(true);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoDetail | null>(null);

  const handleTickerUpdate = useCallback((data: CryptoDetail) => {
    setCryptoData(prevData => ({
      ...prevData,
      [data.s]: data
    }));
  }, []);

  useEffect(() => {
    if (user && socket.connected) {
      unsubscribeFromTickers();
      subscribeToTickers();
      socket.on("24hrTicker", handleTickerUpdate);

      return () => {
        unsubscribeFromTickers();
        socket.off("24hrTicker", handleTickerUpdate);
      };
    }
  }, [user, handleTickerUpdate]);

  const sortedData = sortCryptoData(cryptoData, sortBy, sortAscending);

  return { sortedData, sortBy, setSortBy, sortAscending, setSortAscending, selectedCrypto, setSelectedCrypto };
};

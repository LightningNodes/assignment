// hooks/useCryptoData.ts
import { useState, useEffect, useCallback } from 'react';
import { subscribeToTickers, unsubscribeFromTickers, socket } from '../utils/socket';
import { sortCryptoData } from '../utils/sorting';
import { CryptoDetail, User } from '../utils/types';
import fetchInitialData from '../utils/fetchInitialData';

export const useCryptoData = (user: User | null) => {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoDetail>>({});
  const [isLoading, setIsLoading] = useState(true);
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
      fetchInitialData().then((data) => {
        const typedData = data as Record<string, CryptoDetail>;  // Type assertion here
        setCryptoData(typedData);  // Using the typed data
        setIsLoading(false);
      }).catch(error => {
        console.error("Failed to fetch initial data:", error);
        setIsLoading(false);
      });

      subscribeToTickers();
      socket.on("24hrTicker", handleTickerUpdate);

      return () => {
        unsubscribeFromTickers();
        socket.off("24hrTicker", handleTickerUpdate);
      };
    }
  }, [user, socket.connected, handleTickerUpdate]);

  const sortedData = sortCryptoData(cryptoData, sortBy, sortAscending);

  return { isLoading, sortedData, sortBy, setSortBy, sortAscending, setSortAscending, selectedCrypto, setSelectedCrypto };
};
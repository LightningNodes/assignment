// utils/sorting.ts
import { Dispatch, SetStateAction } from 'react';
import { CryptoDetail } from './types';

function isKeyOfCryptoDetail(key: any): key is keyof CryptoDetail {
    return ['s', 'c', 'P', 'h', 'l', 'v'].includes(key);
}

export const sortCryptoData = (cryptoData: Record<string, CryptoDetail>, sortBy: string, sortAscending: boolean) => {
    return Object.entries(cryptoData).sort(([_, a], [__, b]) => {
        if (isKeyOfCryptoDetail(sortBy)) {
            const valueA = parseFloat(a[sortBy]);
            const valueB = parseFloat(b[sortBy]);
            return sortAscending ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });
};

export const handleSort = (key: string, sortBy: string, setSortBy: Dispatch<SetStateAction<string>>, sortAscending: boolean, setSortAscending: Dispatch<SetStateAction<boolean>>): void => {
    if (sortBy === key) {
        setSortAscending(!sortAscending);
    } else {
        setSortBy(key);
        setSortAscending(true);
    }
};

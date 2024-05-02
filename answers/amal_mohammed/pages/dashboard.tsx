// pages/dashboard.tsx
import React from 'react';
import useRequireAuth from '../utils/requireAuth';
import { useCryptoData } from '../hooks/useCryptoData';
import SelectedCryptoDetails from '../components/dashboard/SelectedCryptoDetails';
import Header from '../components/dashboard/Header';
import SortableHeader from '../components/dashboard/SortableTableHeader';
import TableBody from '../components/dashboard/TableBody';
import { formatNumber } from '../utils/formatting';

const Dashboard = () => {
    const user = useRequireAuth();
    const {
        sortedData,
        sortBy,
        setSortBy,
        sortAscending,
        setSortAscending,
        selectedCrypto,
        setSelectedCrypto
    } = useCryptoData(user);

    const headers = [
        { text: "Symbol", key: "s" },
        { text: "Last Price", key: "c" },
        { text: "24h Change", key: "P" },
        { text: "24h Volume", key: "v" },
        { text: "24h High", key: "h" },
        { text: "24h Low", key: "l" },
        { text: "Actions", key: null }
    ];

    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortAscending(!sortAscending);
        } else {
            setSortBy(key);
            setSortAscending(true);
        }
    };

    return (
        <div className="min-h-screen bg-sky-900 text-white">
            <Header />
            <div className="p-5 flex justify-center flex-col lg:flex-row">
                {selectedCrypto && (
                    <SelectedCryptoDetails crypto={selectedCrypto} formatNumber={formatNumber} />
                )}
                <div className="full-table shadow-2xl rounded-xl max-w-6xl">
                    <table className="table-scroll w-full text-sm lg:text-base">
                        <SortableHeader
                            headers={headers}
                            sortBy={sortBy}
                            sortAscending={sortAscending}
                            onSort={handleSort}
                        />
                        <TableBody sortedData={sortedData.map(([symbol, details]) => ([symbol, details]))} setSelectedCrypto={setSelectedCrypto} />
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

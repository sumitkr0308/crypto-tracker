import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortByField, setFilter, fetchCryptoData } from './CryptoSlice';
import MiniChart from './MiniChart';

const CryptoTable = () => {
  const { data, filter, darkMode, sortBy, sortOrder, status } = useSelector((state) => state.crypto);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const filtered = data.filter(
    (asset) =>
      asset.name.toLowerCase().includes(filter.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSort = (field) => {
    dispatch(sortByField({ field }));
  };

  if (status === 'loading') return <div className="text-center py-4">Fetching latest crypto data...</div>;
  if (status === 'failed') return <div className="text-center py-4 text-red-500">Failed to load data. Please try again later.</div>;

  return (
    <div className={`overflow-x-auto ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-md`}>
      <input
        type="text"
        placeholder="Search by name or symbol..."
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-xs"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left text-xs uppercase tracking-wider">
            <th onClick={() => handleSort('id')} className="p-3 cursor-pointer"># {sortBy === 'id' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th className="p-3">Logo</th>
            <th onClick={() => handleSort('name')} className="p-3 cursor-pointer">Name {sortBy === 'name' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th onClick={() => handleSort('symbol')} className="p-3 cursor-pointer">Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th onClick={() => handleSort('price')} className="p-3 cursor-pointer">Price ($) {sortBy === 'price' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th className="p-3 text-center">1h %</th>
            <th className="p-3 text-center">24h %</th>
            <th className="p-3 text-center">7d %</th>
            <th onClick={() => handleSort('marketCap')} className="p-3 cursor-pointer">Market Cap {sortBy === 'marketCap' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th onClick={() => handleSort('volume24h')} className="p-3 cursor-pointer">24h Volume {sortBy === 'volume24h' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
            <th className="p-3">Circulating Supply</th>
            <th className="p-3">Max Supply</th>
            <th className="p-3">7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="13" className="text-center py-4 text-gray-500">
                No cryptocurrencies match your search.
              </td>
            </tr>
          ) : (
            filtered.map((c, idx) => (
              <tr key={c.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b dark:border-gray-800">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">
                  <img src={c.logo} alt={c.symbol} className="w-6 h-6 mx-auto" />
                </td>
                <td className="p-3 font-medium">{c.name}</td>
                <td className="p-3">{c.symbol}</td>
                <td className="p-3">${c.price.toFixed(2)}</td>
                <td className={`p-3 text-center ${c.change1h >= 0 ? 'text-green-600' : 'text-red-500'}`}>{c.change1h.toFixed(2)}%</td>
                <td className={`p-3 text-center ${c.change24h >= 0 ? 'text-green-600' : 'text-red-500'}`}>{c.change24h.toFixed(2)}%</td>
                <td className={`p-3 text-center ${c.change7d >= 0 ? 'text-green-600' : 'text-red-500'}`}>{c.change7d.toFixed(2)}%</td>
                <td className="p-3">${c.marketCap.toLocaleString()}</td>
                <td className="p-3">${c.volume24h.toLocaleString()}</td>
                <td className="p-3">{c.supply.toLocaleString()}</td>
                <td className="p-3">{c.maxSupply ? c.maxSupply.toLocaleString() : '∞'}</td>
                <td className="p-3"><MiniChart data={c.chartData} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

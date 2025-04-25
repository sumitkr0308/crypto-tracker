import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoTable from './features/crypto/CryptoTable';
import { toggleDarkMode } from './features/crypto/CryptoSlice';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.crypto.darkMode);

  return (
    <>
    <div className={`p-4 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold font-poppins">Crypto Tracker</h1>
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="px-4 py-2 border rounded shadow"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <CryptoTable />
      </React.Suspense>
  </div>
  <div className='text-center'> &copy;All Copyrights Reserved To MR. SUMIT KUMAR </div>
    </>
  );
}

export default App;
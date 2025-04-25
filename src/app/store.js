import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/CryptoSlice';


export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

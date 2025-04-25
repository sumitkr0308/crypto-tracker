import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const coinArray = [
  'bitcoin',
  'ethereum',
  'litecoin',
  'ripple',
  'cardano',
  'dogecoin',
  'polkadot',
  'binancecoin',
  'solana',
  'avalanche',
  'tron',

 
]

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const ids = coinArray.join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
    );
    const data = await response.json();
    return data.map((coin) => ({
      id: coin.market_cap_rank,
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: coin.current_price,
      change1h: coin.price_change_percentage_1h_in_currency ?? 0,
      change24h: coin.price_change_percentage_24h,
      change7d: coin.price_change_percentage_7d_in_currency ?? 0,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      supply: coin.circulating_supply,
      maxSupply: coin.max_supply,
      logo: coin.image,
      chartData: [
        coin.current_price * 0.95,
        coin.current_price * 0.8,
        coin.current_price * 1.02,
        coin.current_price * 1.12,
        coin.current_price * 0.99,
        coin.current_price,
        coin.current_price * 1.2,
      ],
    }));
  }
);
const CryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    sortBy: null,
    sortOrder: 'asc',
    filter: '',
    darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
    status: 'idle',
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    sortByField: (state, action) => {
      const { field } = action.payload;
      if (state.sortBy === field) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = field;
        state.sortOrder = 'asc';
      }
      state.data.sort((a, b) => {
        const valA = a[field];
        const valB = b[field];
        if (typeof valA === 'number') {
          return state.sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return state.sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleDarkMode, setFilter, sortByField } = CryptoSlice.actions;
export default CryptoSlice.reducer;

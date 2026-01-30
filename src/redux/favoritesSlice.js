import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  items: [],           // Array of favorite tank IDs
  lastUpdated: null,   // Timestamp of last update
  count: 0            // Total count of favorites
};

// Create slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Add tank to favorites
    addFavorite: (state, action) => {
      const tankId = action.payload;
      if (!state.items.includes(tankId)) {
        state.items.push(tankId);
        state.count = state.items.length;
        state.lastUpdated = new Date().toISOString();
      }
    },
    
    // Remove tank from favorites
    removeFavorite: (state, action) => {
      const tankId = action.payload;
      state.items = state.items.filter(id => id !== tankId);
      state.count = state.items.length;
      state.lastUpdated = new Date().toISOString();
    },
    
    // Toggle favorite (add if not present, remove if present)
    toggleFavorite: (state, action) => {
      const tankId = action.payload;
      if (state.items.includes(tankId)) {
        state.items = state.items.filter(id => id !== tankId);
      } else {
        state.items.push(tankId);
      }
      state.count = state.items.length;
      state.lastUpdated = new Date().toISOString();
    },
    
    // Clear all favorites
    clearFavorites: (state) => {
      state.items = [];
      state.count = 0;
      state.lastUpdated = new Date().toISOString();
    },
    
    // Load favorites from localStorage (for hydration)
    loadFavorites: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.length;
      state.lastUpdated = new Date().toISOString();
    }
  }
});

// Export actions
export const { 
  addFavorite, 
  removeFavorite, 
  toggleFavorite, 
  clearFavorites,
  loadFavorites 
} = favoritesSlice.actions;

// Selectors
export const selectAllFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.count;
export const selectIsFavorite = (tankId) => (state) => 
  state.favorites.items.includes(tankId);

// Export reducer
export default favoritesSlice.reducer;

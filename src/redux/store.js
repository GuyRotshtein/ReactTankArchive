import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { loadFavorites } from './favoritesSlice';

// Middleware to save favorites to localStorage
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  // Save favorites to localStorage whenever they change
  if (action.type?.startsWith('favorites/')) {
    const favorites = store.getState().favorites.items;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  return result;
};

// Create store with favorites reducer and middleware
const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware)
});

// Load favorites from localStorage on initialization
const savedFavorites = localStorage.getItem('favorites');
if (savedFavorites) {
  store.dispatch(loadFavorites(JSON.parse(savedFavorites)));
}

export default store;

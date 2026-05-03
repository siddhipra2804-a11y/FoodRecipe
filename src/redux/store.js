import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice'; // Adjust the path if your slice file has a different name

export const store = configureStore({
  reducer: {
    // This maps the favoritesReducer to the 'favorites' state slice
    favorites: favoritesReducer,
  },
});

// Optional: If you need to use the store in your index.js/App.js
export default store;
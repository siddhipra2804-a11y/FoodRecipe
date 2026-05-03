import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriterecipes: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const food = action.payload;
      // Check if the recipe already exists in favorites by comparing idFood
      const isExist = state.favoriterecipes.some(item => item.idFood === food.idFood);

      if (isExist) {
        // If it exists, remove it from the array
        state.favoriterecipes = state.favoriterecipes.filter(
          item => item.idFood !== food.idFood
        );
      } else {
        // If it doesn't exist, add the new food item to the list
        state.favoriterecipes.push(food);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
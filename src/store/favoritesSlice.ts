// favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Movie {
  id: number;
  name: string;
  year: number;
  genres: { name: string }[];
  rating: { kp: number };
  poster: { url: string; previewUrl: string };
}

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;

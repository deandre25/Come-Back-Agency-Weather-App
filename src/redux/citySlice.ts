import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/types';

const initialState: City[] = [];

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      state.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      return state.filter((city) => city.id !== action.payload);
    },
    updateWeather: (state, action: PayloadAction<City>) => {
      const index = state.findIndex((city) => city.id === action.payload.id);
      if (index !== -1) {
        state[index].weather = action.payload.weather;
      }
    },
  },
});

export const { addCity, removeCity, updateWeather } = citySlice.actions;

// src/app/reducers/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const petsSlice = createSlice({
  name: "pets",
  initialState: {
    pets: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPets: (state, action) => {
      state.pets.push(...action.payload);
      state.loading = false;
      state.error = null;
    },
    setPetsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setPetsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPets: (state) => {
      state.pets = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setPets, setPetsLoading, setPetsError, clearPets } =
  petsSlice.actions;

export default petsSlice.reducer;

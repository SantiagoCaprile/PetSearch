// src/app/reducers/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const mypetsSlice = createSlice({
    name: "mypets",
    initialState: {
        mypets: [],
        loading: false,
        error: null,
    },
    reducers: {
        setMyPets: (state, action) => {
            state.mypets = action.payload;
            state.loading = false;
            state.error = false;
        },
        setMyPetsLoading: (state) => {
            state.loading = true;
            state.error = false;
        },
        setMyPetsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearMyPets: (state) => {
            state.mypets = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const { setMyPets, setMyPetsLoading, setMyPetsError, clearMyPets } =
    mypetsSlice.actions;

export default mypetsSlice.reducer;

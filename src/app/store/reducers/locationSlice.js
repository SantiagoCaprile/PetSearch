// src/app/reducers/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        location: {
            province: "",
            city: {
                name: "",
                lng: 0,
                lat: 0,
            }
        },
        loading: false,
        error: null,
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
            state.loading = false;
            state.error = false;
        },
        setLocationLoading: (state) => {
            state.loading = true;
            state.error = false;
        },
        setLocationError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearLocation: (state) => {
            state.location = null;
            state.loading = false;
            state.error = false;
        },
    },
});

export const { setLocation, setLocationLoading, setLocationError, clearLocation } =
    locationSlice.actions;

export default locationSlice.reducer;
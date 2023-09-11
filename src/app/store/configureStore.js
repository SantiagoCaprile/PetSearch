// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import petsReducer from "./reducers/petsSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Agrega otros reductores aquí si es necesario
    pets: petsReducer,
  },
});

export default store;

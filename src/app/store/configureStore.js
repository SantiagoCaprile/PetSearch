// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import petsReducer from "./reducers/petsSlice";
import mypetsReducer from "./reducers/mypetsSlice";
import locationReducer from "./reducers/locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Agrega otros reductores aquí si es necesario
    pets: petsReducer,
    mypets: mypetsReducer,
    location: locationReducer,
  },
});

export default store;

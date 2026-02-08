import baseApi from "./api/baseApi";
import { settingSlice } from "./settingSlice";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import searchSlice from "./../search/searchSlice";
import locationSlice from "../location/locationSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    settingSlice: settingSlice,
    auth: authReducer,
    searchSlice:searchSlice,
    locationSlice:locationSlice

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

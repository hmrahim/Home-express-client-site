import baseApi from "./api/baseApi";
import { settingSlice } from "./settingSlice";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    settingSlice: settingSlice,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

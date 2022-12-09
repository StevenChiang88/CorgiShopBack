import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducer/authSlice";
import productApi from "./productApi";
import authApi from "./authApi";
import orderApi from "./orderApi";
import userApi from "./userApi";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(orderApi.middleware),
});

export default store;

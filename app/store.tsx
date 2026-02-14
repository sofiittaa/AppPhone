import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../components/features/CounterSlice";
import { ShopServices } from "../services/ShopServices";

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
    [ShopServices.reducerPath]: ShopServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ShopServices.middleware),
});

export default store;

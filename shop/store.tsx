import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "../components/features/CounterSlice";
import { ShopServices } from "../services/ShopServices";
import { shopReducer } from "../shop/shopSlice";

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    shop: shopReducer,
    [ShopServices.reducerPath]: ShopServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ShopServices.middleware),
});

export default store;

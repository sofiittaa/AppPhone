import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import authReducer from "../auth/authSlice";
import { ShopServices } from "../services/ShopServices";
import { userApi } from "../services/userServices";
import cartReducer from "../shop/cartSlice";
import recentlyViewedReducer from "../shop/recentlyViewedSlice";
import { shopReducer } from "../shop/shopSlice";
import { CounterReducer } from "./CounterSlice";
import orderReducer from "./orderSlice";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    shop: shopReducer,
    auth: persistedAuthReducer,
    cart: cartReducer,
    order: orderReducer,
    address: orderReducer,
    recentlyViewed: recentlyViewedReducer,
    [ShopServices.reducerPath]: ShopServices.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ShopServices.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;

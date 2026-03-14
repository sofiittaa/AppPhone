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
import { CounterReducer } from "../components/features/CounterSlice";
import { ShopServices } from "../services/ShopServices";
import { userApi } from "../services/userServices";
import { shopReducer } from "../shop/shopSlice";
import cartReducer from "../shop/cartSlice";

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

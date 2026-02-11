import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../components/features/CounterSlice";

export const store = configureStore({
  reducer: {
    counter: CounterSlice,
  },
});

export default store;

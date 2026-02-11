const initialState = {
  value: 0,
};

import { createSlice } from "@reduxjs/toolkit";

export const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },

    
  },
});

export const { increment, decrement, incrementByAmount, decrementByAmount } =
  CounterSlice.actions;

export default CounterSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../services/ShopServices";

type RecentlyViewedState = {
  products: Product[];
};

const initialState: RecentlyViewedState = {
  products: [],
};

const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<Product>) => {
      const existing = state.products.find((p) => p.id === action.payload.id);
      if (!existing) {
        state.products = [action.payload, ...state.products].slice(0, 5);
      }
    },
    clearRecentlyViewed: (state) => {
      state.products = [];
    },
  },
});

export const { addToRecentlyViewed, clearRecentlyViewed } =
  recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;

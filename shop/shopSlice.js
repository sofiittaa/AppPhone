import { createSlice } from "@reduxjs/toolkit";
import allCategories from "../constants/categories.json";
import allProducts from "../constants/products.json";

const initialState = {
  categories: allCategories,
  products: Object.entries(allProducts).map(([id, product]) => ({
    id,
    ...product,
  })),
  selectedCategory: null,
  selectedProduct: null,
  productsFilteredByCategory: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.productsFilteredByCategory = state.products.filter(
        (p) => p.categories === action.payload?.name
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setSelectedCategory, setSelectedProduct, setProducts } =
  shopSlice.actions;

export const shopReducer = shopSlice.reducer;
export default shopSlice.reducer;

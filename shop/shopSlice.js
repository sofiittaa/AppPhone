import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
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
        (p) => p.categories === action.payload?.name,
      );
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setSelectedCategory, setSelectedProduct, setProducts, setCategories } =
  shopSlice.actions;

export const shopReducer = shopSlice.reducer;
export default shopSlice.reducer;

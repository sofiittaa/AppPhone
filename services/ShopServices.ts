import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase";

export interface Product {
  id: string;
  name: string;
  categories: string;
  image: string;
  price: number;
}

export interface Category {
  id: string;
  name: string;
}

export const ShopServices = createApi({
  reducerPath: "ShopServices",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products.json",
      transformResponse: (response: any) =>
        response
          ? Object.entries(response)
              .filter(([, product]) => product != null)
              .map(([id, product]) => ({
                id,
                ...(product as any),
              }))
          : [],
    }),
    
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) =>
        `products.json?orderBy="categories"&equalTo="${category}"`,
      transformResponse: (response: any) =>
        response
          ? Object.entries(response)
              .filter(([, product]) => product != null)
              .map(([id, product]) => ({
                id,
                ...(product as any),
              }))
          : [],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = ShopServices;

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
                name: (product as any).nombre || (product as any).name,
                image: (product as any).imagen || (product as any).image,
                categories:
                  (product as any).categoria || (product as any).categories,
                price: (product as any).precio || (product as any).price,
                ...((product as any).descripcion
                  ? { description: (product as any).descripcion }
                  : {}),
              }))
          : [],
    }),
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) =>
        `products.json?orderBy="categoria"&equalTo="${category}"`,
      transformResponse: (response: any) =>
        response
          ? Object.entries(response)
              .filter(([, product]) => product != null)
              .map(([id, product]) => ({
                id,
                name: (product as any).nombre || (product as any).name,
                image: (product as any).imagen || (product as any).image,
                categories:
                  (product as any).categoria || (product as any).categories,
                price: (product as any).precio || (product as any).price,
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

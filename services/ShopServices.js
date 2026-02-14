import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ShopServices = createApi({
  reducerPath: "ShopServices",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app-phone-d354f-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products.json",
      transformResponse: (response) =>
        response ? Object.values(response) : [],
    }),
  }),
});

export const { useGetProductsQuery } = ShopServices;
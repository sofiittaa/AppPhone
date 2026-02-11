export const ShopServices = createApi({
  reducerPath: "ShopServices",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
  }),
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ShopServices.middleware), 
  
});

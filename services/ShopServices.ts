import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { base_url } from "../firebase/dataBase";

export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  precio: number;
  descripcion?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  address: { calle: string; numero: string; ciudad: string };
  date: string;
  status: "pending" | "approved" | "rejected";
}
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imagen?: string;
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
              .filter(([, producto]) => producto != null)
              .map(([id, producto]) => ({
                id,
                nombre: (producto as any).nombre,
                imagen: (producto as any).imagen,
                categoria: (producto as any).categoria,
                precio: (producto as any).precio,
                ...((producto as any).descripcion
                  ? { descripcion: (producto as any).descripcion }
                  : {}),
              }))
          : [],
    }),
    getCategorias: builder.query({
      query: () => "categories.json",
    }),
    getProductosPorCategoria: builder.query<Product[], string>({
      query: (categoria) =>
        `products.json?orderBy="categoria"&equalTo="${categoria}"`,
      transformResponse: (response: any) =>
        response
          ? Object.entries(response)
              .filter(([, producto]) => producto != null)
              .map(([id, producto]) => ({
                id,
                nombre: (producto as any).nombre,
                imagen: (producto as any).imagen,
                categoria: (producto as any).categoria,
                precio: (producto as any).precio,
              }))
          : [],
    }),

    addOrder: builder.mutation({
      query: (order) => ({
        url: "orders.json",
        method: "POST",

        body: order,
      }),
    }),

    addDirection: builder.mutation({
      query: (direction) => ({
        url: "directions.json",
        method: "POST",

        body: direction,
      }),
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "orders.json",
      transformResponse: (response: any) =>
        response
          ? Object.entries(response).map(([id, order]) => ({
              id,
              ...(order as any),
            }))
          : [],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriasQuery,
  useGetProductosPorCategoriaQuery,
  useAddOrderMutation,
  useAddDirectionMutation,
  useGetOrdersQuery,
} = ShopServices;

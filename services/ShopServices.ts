import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { base_url } from "../firebase/dataBase";
import { auth } from "../firebase/fireBaseConfig";

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
  userId: string;
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
  tagTypes: ["Orders"],
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
      async queryFn(order, _api, _extraOptions, baseQuery) {
        try {
          await auth.authStateReady();
          const currentUser = auth.currentUser;
          if (!currentUser || currentUser.uid !== order.userId) {
            return {
              error: {
                status: 401,
                data: { error: "Usuario no autenticado." },
              } as FetchBaseQueryError,
            };
          }

          const idToken = await currentUser.getIdToken();
          return baseQuery({
            url: `orders.json?auth=${encodeURIComponent(idToken)}`,
            method: "POST",
            body: order,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : JSON.stringify(error);
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: message,
            } as FetchBaseQueryError,
          };
        }
      },
      invalidatesTags: ["Orders"],
    }),

    addDirection: builder.mutation({
      query: (direction) => ({
        url: "directions.json",
        method: "POST",

        body: direction,
      }),
    }),
    getOrders: builder.query<Order[], string>({
      async queryFn(userId, _api, _extraOptions, baseQuery) {
        await auth.authStateReady();
        const currentUser = auth.currentUser;
        if (!currentUser || currentUser.uid !== userId) {
          return { error: { status: 401, data: { message: "Usuario no autenticado." } } };
        }

        const idToken = await currentUser.getIdToken();
        const response = await baseQuery({
          url: `orders.json?orderBy=${encodeURIComponent(JSON.stringify("userId"))}&equalTo=${encodeURIComponent(JSON.stringify(userId))}&auth=${encodeURIComponent(idToken)}`,
        });
        if (response.error) return { error: response.error };

        const orders = response.data as Record<string, Omit<Order, "id">> | null;
        return {
          data: orders
            ? Object.entries(orders)
                .filter(([, order]) => order.userId === userId)
                .map(([id, order]) => ({ id, ...order }))
            : [],
        };
      },
      providesTags: ["Orders"],
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../firebase/fireBaseConfig";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://app-phone-d354f-default-rtdb.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    upsertUserProfile: builder.mutation({
      async queryFn({ localId, profile }) {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return {
              error: { status: 401, data: { message: "Usuario no autenticado." } },
            };
          }

          const idToken = await currentUser.getIdToken();
          const response = await fetch(
            `https://app-phone-d354f-default-rtdb.firebaseio.com/profiles/${localId}.json?auth=${idToken}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(profile),
            },
          );

          const data = await response.json().catch(() => null);
          if (!response.ok) {
            return {
              error: { status: response.status, data: data || { message: "Error RTDB" } },
            };
          }

          return { data };
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              data: { message: error?.message || "Error de red" },
            },
          };
        }
      },
    }),
    putProfilePicture: builder.mutation({
      async queryFn({ image, localId }) {
        try {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return {
              error: { status: 401, data: { message: "Usuario no autenticado." } },
            };
          }

          const idToken = await currentUser.getIdToken();
          const response = await fetch(
            `https://app-phone-d354f-default-rtdb.firebaseio.com/profiles/${localId}.json?auth=${idToken}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image }),
            },
          );

          const data = await response.json().catch(() => null);
          if (!response.ok) {
            return {
              error: { status: response.status, data: data || { message: "Error RTDB" } },
            };
          }

          return { data };
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              data: { message: error?.message || "Error de red" },
            },
          };
        }
      },
    }),
  }),
});

export const { usePutProfilePictureMutation, useUpsertUserProfileMutation } =
  userApi;

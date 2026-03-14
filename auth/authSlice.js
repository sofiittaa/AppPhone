import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    email: "",
    password: "",
    image: "",
    localId: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.name = action.payload.name || "";
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
      state.value.localId = action.payload.localId;
    },
    setProfilePicture: (state, action) => {
      state.value.image = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setUser, setProfilePicture, logout } = authSlice.actions;

export default authSlice.reducer;

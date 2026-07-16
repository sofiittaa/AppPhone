import { createSlice } from "@reduxjs/toolkit";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imagen?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  address: {
    calle: string;
    numero: string;
    ciudad: string;
  };
  date: string;
  status: string;
}

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [] as Order[],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    removeFromOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload,
      );
    },
    clearOrder: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, removeFromOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;


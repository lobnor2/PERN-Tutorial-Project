import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
});

export const useProductStore = create((set, get) => ({
  //product state
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/api/products");
      set({ products: res.data.data, error: null });
    } catch (error) {
      if (error.status === 429) set({ error: "Rate limit exceeded" });
      else set({ error: "Something went wrong" });
    } finally {
      set({ loading: false });
    }
  },
}));

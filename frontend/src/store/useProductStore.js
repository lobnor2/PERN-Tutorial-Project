import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";
const api = axios.create({
  baseURL: BASE_URL,
});

export const useProductStore = create((set, get) => ({
  //product state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),

  //form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();

    const { formData } = get(); //Get formData from state first
    console.log("formdata => ", formData);

    //Validate form data
    if (!formData.name || !formData.price || !formData.image) {
      toast.error("All fields are required");
      return;
    }

    set({ loading: true });

    try {
      //   await api.post("/api/products", formData);
      //convert price to number
      await api.post("/api/products", {
        ...formData,
        price: parseFloat(formData.price),
      });
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");

      // close the dialog
      get().setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/api/products");
      set({ products: res.data.data, error: null });
    } catch (error) {
      if (error.status === 429)
        set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ loading: true });
      await api.delete(`/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      //   console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await api.get(`/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, //pre-fill form with current product data
        error: null,
      });
    } catch (error) {
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      await api.put(`/api/products/${id}`, formData);
      await get().fetchProducts();
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));

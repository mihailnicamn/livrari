import { create } from "zustand";
import axios from "axios";
interface ProductsState {
  category?: string;
  products: any[];
  loading: boolean;
  error: string;
  setCategory: (category: string) => void;
  fetchProducts: () => Promise<void>;
}
const API = "https://livrari-back.onrender.com";
export const useProducts = create<ProductsState>((set, get) => ({
  category: undefined,
  products: [],
  loading: false,
  error: "",
  setCategory: (category: string) => {
    set({ category });
  },
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const url = get().category
        ? `${API}/products/${get().category}`
        : `${API}/products`;
      const { data } = await axios.get(url);
      set({ products: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

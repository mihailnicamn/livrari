import { StateCreator, create } from "zustand";
import axios from "axios";
import { API } from "@/env";
import { persist } from "zustand/middleware";
interface ProductsState {
  search: string;
  category?: string;
  products: any[];
  loading: boolean;
  error: string;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  fetchProducts: (category?: string) => Promise<any[]>;
}
const productsState = (): StateCreator<ProductsState> => (set, get) => ({
  search: "",
  category: undefined,
  products: [],
  loading: false,
  error: "",
  setCategory: (category: string) => {
    set({ category });
  },
  setSearch: (search: string) => {
    set({ search });
  },
  fetchProducts: async (category: string = get().category!) => {
    set({ loading: true });
    try {
      const url = category ? `${API}/products/${category}` : `${API}/products`;
      console.log(url);
      const { data } = await axios.get(url, {
        params: { search: get().search },
      });
      set({ products: data, loading: false });
      return data;
    } catch (error: any) {
      set({ error: error.message, loading: false });
      return [];
    }
  },
});

export const useProducts = create<ProductsState>(
  persist(productsState(), { name: "products" }) as any
);

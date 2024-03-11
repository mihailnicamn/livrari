import { create } from "zustand";
import axios from "axios";
import { API } from "@/env";
interface CategoriesState {
  category?: string;
  categories: any[];
  loading: boolean;
  error: string;
  setCategory: (category: string) => void;
  fetchCategories: () => Promise<void>;
}
export const useCategories = create<CategoriesState>((set, get) => ({
  category: undefined,
  categories: [],
  loading: false,
  error: "",
  setCategory: (category: string) => {
    set({ category });
  },
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const url = `${API}/categories`;
      console.log(url);
      const { data } = await axios.get(url);
      set({ categories: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

import { StateCreator, create } from "zustand";
import axios from "axios";
import { API } from "@/env";
import { persist } from "zustand/middleware";
interface CategoriesState {
  category?: string;
  categories: any[];
  loading: boolean;
  error: string;
  setCategory: (category: string) => void;
  fetchCategories: () => Promise<void>;
}
const categoriesState = (): StateCreator<CategoriesState> => (set, get) => ({
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
});

export const useCategories = create<CategoriesState>(
  persist(categoriesState(), { name: "categories" }) as any
);

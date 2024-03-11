import { create } from "zustand";
interface ProductState {
  open: boolean;
  product?: any;
  display: (product: any) => void;
  hide: () => void;
  onSwitch: (product?: any) => void;
}
export const useProduct = create<ProductState>((set, get) => ({
  open: false,
  product: undefined,
  display: (product) => set({ open: true, product }),
  hide: () => set({ open: false }),
  onSwitch: (product) => {
    set({ open: false, product: undefined });
    setTimeout(() => {
      set({ open: true, product });
    }, 500);
  },
}));

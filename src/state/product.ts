import { create } from "zustand";
interface ProductState {
  open: boolean;
  product?: any;
  display: (product: any) => void;
  hide: () => void;
  onSwitch: () => void;
}
export const useProduct = create<ProductState>((set, get) => ({
  open: false,
  product: undefined,
  display: (product) => set({ open: true, product }),
  hide: () => set({ open: false }),
  onSwitch: () => {
    set({ open: false });
    setTimeout(() => {
      set({ open: true });
    }, 500);
  },
}));

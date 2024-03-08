import { create } from "zustand";
interface ProductState {
  open: boolean;
  display: () => void;
  hide: () => void;
  onSwitch: () => void;
}
export const useProduct = create<ProductState>((set, get) => ({
  open: false,
  display: () => set({ open: true }),
  hide: () => set({ open: false }),
  onSwitch: () => {
    set({ open: false });
    setTimeout(() => {
      set({ open: true });
    }, 500);
  },
}));

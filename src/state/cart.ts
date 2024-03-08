import { create } from "zustand";
interface CartState {
  open: boolean;
  display: () => void;
  hide: () => void;
  onSwitch: () => void;
}
export const useCart = create<CartState>((set) => ({
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

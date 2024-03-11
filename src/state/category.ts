import { create } from "zustand";
interface CategoryState {
  open: boolean;
  selected?: string;
  isSelected: (id: string) => boolean;
  select: (id: string) => void;
  deselect: (id: string) => void;
  display: () => void;
  hide: () => void;
  onSwitch: () => void;
}
export const useCategory = create<CategoryState>((set, get) => ({
  open: false,
  selected: undefined,
  isSelected: (id: string) => get().selected === id,
  select: (id: string) => set({ selected: id }),
  deselect: () => set({ selected: undefined }),
  display: () => set({ open: true }),
  hide: () => set({ open: false }),
  onSwitch: () => {
    set({ open: false });
    setTimeout(() => {
      set({ open: true });
    }, 500);
  },
}));

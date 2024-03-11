import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
interface CartState {
  open: boolean;
  products: any[];
  product?: any;
  inCart: (id: string) => boolean;
  getQuantity: (id: string) => number;
  setQuantity: (id: string, quantity: number | string) => void;
  display: (product?: any) => void;
  hide: () => void;
  onSwitch: () => void;
  setProduct: (product: any) => void;
}

const cartState = (): StateCreator<CartState> => (set, get) => ({
  open: false,
  products: [],
  product: undefined,
  inCart: (id: string) => get().products.some((p) => p._id === id),
  getQuantity: (id: string) => {
    const product = get().products.find((p) => p._id === id);
    return product?.quantity || 0;
  },
  setQuantity: (id: string, quantity: number | string) => {
    let { product, products } = get();
    const cmds = {
      "+": 1,
      "-": -1,
    } as any;
    if (product) {
      let _quantity = product.quantity;
      if (cmds[quantity]) {
        _quantity = _quantity + cmds[quantity];
      }
      if (_quantity < 0) _quantity = 0;
      product.quantity = _quantity;
      if (product.quantity > 0) {
        products = products.filter((p) => p._id !== id);
        products.push(product);
      } else {
        products = products.filter((p) => p._id !== id);
      }
    }
    set({ product, products });
  },
  display: (product) => {
    set({
      open: true,
      product: product
        ? { ...product, quantity: get().getQuantity(product._id) }
        : undefined,
    });
  },
  hide: () => set({ open: false }),
  onSwitch: () => {
    set({ open: false });
    setTimeout(() => {
      set({ open: true });
    }, 500);
  },
  setProduct: (product) => {
    set({ product });
  },
});

export const useCart = create<CartState>(
  persist(cartState(), { name: "cart" }) as any
);

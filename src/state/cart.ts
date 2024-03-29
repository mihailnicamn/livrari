import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
interface CartState {
  open: boolean;
  products: any;
  productsMap: any;
  product?: any;
  getTotal: () => number;
  resetCart: () => void;
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
  productsMap: {},
  products: [],
  product: undefined,
  getTotal: () => {
    return parseFloat(
      get()
        .products.reduce(
          (acc: number, { price, quantity }: any) => acc + price * quantity,
          0
        )
        .toFixed(2)
    );
  },
  resetCart: () => {
    set({ productsMap: {}, products: [] });
  },
  inCart: (id: string) => get().productsMap?.[id],
  getQuantity: (id: string) => {
    return get().productsMap[id]?.quantity || 0;
  },
  setQuantity: (id: string, quantity: number | string) => {
    let { product, productsMap } = get();
    if (!productsMap?.[id]) {
      productsMap[id] = { ...product, quantity: 0 };
    }
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
        if (productsMap[id]) {
          productsMap[id].quantity = product.quantity;
        }
      } else {
        delete productsMap[id];
      }
    }
    console.log("productsMap", productsMap);
    set({ product, productsMap, products: Object.values(productsMap) });
  },
  display: (product) => {
    const { getQuantity, setQuantity } = get();
    const q = getQuantity(product._id);
    set({
      open: true,
      product: product
        ? { ...product, quantity: getQuantity(product._id) || 1 }
        : undefined,
    });

    if (!q) {
      setQuantity(product._id, 1);
    }
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

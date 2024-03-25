import { API } from "@/env";
import axios from "axios";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
interface OrderState {
  open: boolean;
  products: any;
  productsMap: any;
  product?: any;
  sendOrder: (
    products: any,
    user: any,
    method: any,
    date: any,
    time: any
  ) => Promise<void>;
  inOrder: (id: string) => boolean;
  getQuantity: (id: string) => number;
  setQuantity: (id: string, quantity: number | string) => void;
  display: (product?: any) => void;
  hide: () => void;
  onSwitch: () => void;
  setProduct: (product: any) => void;
  setProducts: (products: any) => void;
}

const orderState = (): StateCreator<OrderState> => (set, get) => ({
  open: false,
  productsMap: {},
  products: [],
  product: undefined,
  sendOrder: async (
    products: any,
    user: any,
    method: any,
    date: any,
    time: any
  ) => {
    const total = products.reduce(
      (acc: number, { price, quantity }: any) => acc + price * quantity,
      0
    );
    try {
      const { data } = await axios.post(`${API}/users/order`, {
        products,
        method,
        date,
        time,
        user,
        total,
      });
    } catch (error: any) {}
  },
  inOrder: (id: string) => get().productsMap?.[id],
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
  setProducts: (products) => {
    let productsMap = {} as any;
    products.forEach((product: any) => {
      productsMap[product._id] = product;
    });
    set({ productsMap, products });
  },
});

export const useOrder = create<OrderState>(orderState());

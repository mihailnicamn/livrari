import { StateCreator, create } from "zustand";
import axios from "axios";
import { API } from "@/env";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
export interface IAddress {
  id?: string;
  nume: string;
  strada: string;
  numar: string;
  bloc: string;
  apartament: string;
  scara: string;
  cartier: string;
}
interface AccountState {
  _id: string;
  registered: boolean;
  fullName: string;
  email: string;
  telefon: string;
  image: string;
  addresses: IAddress[];
  orders: any[];
  fetchOrders: () => Promise<void>;
  sync: (update?: boolean) => Promise<void>;
  addAddress: (address: IAddress) => void;
  register: (data: any) => Promise<void>;
}
const accountState = (): StateCreator<AccountState> => (set, get) => ({
  _id: "",
  registered: false,
  fullName: "",
  addresses: [],
  email: "",
  telefon: "",
  image: "",
  orders: [],
  addAddress: (address: IAddress) => {
    address.id = uuid();
    set({ addresses: [...get().addresses, address] });
    get().sync(true);
    return address;
  },
  setName: (fullName: string) => {
    set({ fullName });
    get().sync(true);
  },
  setEmail: (email: string) => {
    set({ email });
    get().sync(true);
  },
  setTelefon: (telefon: string) => {
    set({ telefon });
    get().sync(true);
  },
  fetchOrders: async () => {
    try {
      const { data } = await axios.get(`${API}/users/orders/${get()._id}`);
      set({ orders: data });
    } catch (error: any) {}
  },
  sync: async (update = false) => {
    let registered = false;
    try {
      const { data } = await axios.post(`${API}/users/sync/${get()._id}`, {
        update,
        fullName: get().fullName,
        email: get().email,
        telefon: get().telefon,
        addresses: get().addresses,
        image: get().image,
      });
      if (data && !update) {
        set((state) => ({ ...state, ...data }));
        registered = true;
      }
    } catch (error: any) {
      set({ registered: false });
    }
  },
  register: async (data: any) => {
    await axios.post(`${API}/users/register`, data).then(({ data }) => {
      set({
        ...data,
        registered: true,
        _id: data._id,
        addresses: data.addresses,
        image: data.image,
        fullName: data.fullName,
        email: data.email,
        telefon: data.telefon,
      });
    });
  },
});

export const useAccount = create<AccountState>(
  persist(accountState(), { name: "account" }) as any
);

import React from "react";
import { create } from "zustand";
const sanitize = (hash: string) => hash.replace(/[^a-z0-9-]/gi, "");
if (window.location.hash.length === 0) {
  window.location.hash = "magazin";
}
interface NavState {
  tab: string;
  setTab: (tab: string) => void;
  updateTab: (value: string) => void;
}
export const useNav = create<NavState>((set) => ({
  tab: sanitize(window.location.hash),
  setTab: (tab: string) => {
    window.location.hash = tab;
    set({ tab });
  },
  updateTab: (value: string) => set({ tab: value }),
}));

export const navMonitor = () => {
  const { tab, setTab, updateTab } = useNav();
  const handler = () => {
    const hash = sanitize(window.location.hash);
    const change = hash !== tab;
    if (change) {
      updateTab(hash);
    }
  };
  React.useEffect(() => {
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
};

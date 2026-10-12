// Node module
import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

// Project files
import { CartItem } from "../types/types";
import onAddItem from "./cart-store/onAddItem";
import onUpdateQuantity from "./cart-store/onUpdateQuantity";

interface Store {
  cart: CartItem[];
  addItem: (id: string, sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  emptyCart: () => void;
}

const store: StateCreator<Store> = (set) => ({
  cart: [],
  addItem: (id, sku) =>
    set((state) => ({ cart: onAddItem(state.cart, id, sku) })),
  updateQuantity: (sku, quantity) =>
    set((state) => ({ cart: onUpdateQuantity(state.cart, sku, quantity) })),
  emptyCart: () => set({ cart: [] }),
});

const persistOptions: PersistOptions<Store> = { name: "zustand-store" };
const useCartStore = create<Store>()(persist(store, persistOptions));

export default useCartStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProduct } from "@/lib/shopify";

const MAX_COMPARE = 3;

interface CompareStore {
  items: ShopifyProduct[];
  toggle: (product: ShopifyProduct) => { added: boolean; full: boolean };
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = get().items;
        const exists = items.find((p) => p.node.id === product.node.id);
        if (exists) {
          set({ items: items.filter((p) => p.node.id !== product.node.id) });
          return { added: false, full: false };
        }
        if (items.length >= MAX_COMPARE) return { added: false, full: true };
        set({ items: [...items, product] });
        return { added: true, full: false };
      },
      remove: (id) => set({ items: get().items.filter((p) => p.node.id !== id) }),
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((p) => p.node.id === id),
    }),
    {
      name: "dermatek-compare",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { MAX_COMPARE };
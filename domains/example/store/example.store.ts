/**
 * Example Domain Zustand Store
 * 
 * This store holds state ONLY. No business logic.
 * Business logic lives in hooks (useExample.ts).
 * 
 * One store per domain - no global app-wide store.
 */

import { create } from 'zustand';
import type { ExampleItem } from '../types/example.types';

interface ExampleStore {
  // State
  items: ExampleItem[];
  selectedItem: ExampleItem | null;
  isLoading: boolean;
  error: string | null;

  // Actions (pure state updates only)
  setItems: (items: ExampleItem[]) => void;
  addItem: (item: ExampleItem) => void;
  updateItem: (id: string, item: Partial<ExampleItem>) => void;
  removeItem: (id: string) => void;
  setSelectedItem: (item: ExampleItem | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

export const useExampleStore = create<ExampleStore>((set) => ({
  ...initialState,

  setItems: (items) => set({ items }),
  
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  
  updateItem: (id, partialItem) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...partialItem } : item
      ),
      selectedItem:
        state.selectedItem?.id === id
          ? { ...state.selectedItem, ...partialItem }
          : state.selectedItem,
    })),
  
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedItem: state.selectedItem?.id === id ? null : state.selectedItem,
    })),
  
  setSelectedItem: (item) => set({ selectedItem: item }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  reset: () => set(initialState),
}));


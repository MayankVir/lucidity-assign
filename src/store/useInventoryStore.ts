import { create } from 'zustand';
import { Product } from '../types/inventory';

interface InventoryStore {
  // Admin state
  isAdmin: boolean;
  toggleAdminMode: () => void;

  // Editing state
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;

  // Disabled rows
  disabledProductIds: Set<number>;
  toggleProductDisabled: (productId: number) => void;

  // Product operations
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;
  getStats: () => {
    totalProducts: number;
    totalStoreValue: number;
    outOfStock: number;
    numberOfCategories: number;
  };
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  // Admin state
  isAdmin: true,
  toggleAdminMode: () => set((state) => ({ isAdmin: !state.isAdmin })),

  // Editing state
  editingProduct: null,
  setEditingProduct: (product) => set({ editingProduct: product }),

  // Disabled rows
  disabledProductIds: new Set<number>(),
  toggleProductDisabled: (productId) =>
    set((state) => {
      const newDisabledIds = new Set(state.disabledProductIds);
      if (newDisabledIds.has(productId)) {
        newDisabledIds.delete(productId);
      } else {
        newDisabledIds.add(productId);
      }
      return { disabledProductIds: newDisabledIds };
    }),
  // Product operations
  updateProduct: (updatedProduct) => {
    set((state:any) => {
      if (state.editingProduct?.id === updatedProduct.id) {
        state.editingProduct = null;
      }
    });
  },

  deleteProduct: (productId) => {
    set((state) => {
      const newDisabledIds = new Set(state.disabledProductIds);
      newDisabledIds.delete(productId);
      return { disabledProductIds: newDisabledIds };
    });
  },

  products: [],

  setProducts: (products) => set({ products }),

  getStats: () => {
    const products = get().products;
    const activeProducts = products.filter(p => !p.isDisabled);

    return {
      totalProducts: activeProducts.length,
      totalStoreValue: activeProducts.reduce((sum, product) => sum + product.value, 0),
      outOfStock: activeProducts.filter((product) => product.quantity === 0).length,
      numberOfCategories: new Set(activeProducts.map((product) => product.category)).size,
    };
  },
}));
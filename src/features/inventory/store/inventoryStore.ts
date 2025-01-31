import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { InventoryState, InventoryActions, Product } from '../types/inventory.types';

type State = InventoryState;
type Actions = InventoryActions;

const updateProductsImmutably = (
  products: Product[],
  updatedProduct: Product
): Product[] => {
  return products.map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
};

/**
 * Inventory store with state management and actions
 */
export const useInventoryStore = create<State & Actions>()(
  devtools(
    (set) => ({
      // Initial state
      products: [],
      disabledProductIds: new Set<number>(),
      editingProduct: null,
      isAdmin: true,

      // Actions
      setProducts: (products) => {
        set({ products }, false, 'setProducts');
      },

      updateProduct: (updatedProduct) => {
        set(
          (state) => ({
            products: updateProductsImmutably(state.products, updatedProduct),
            editingProduct: null,
          }),
          false,
          'updateProduct'
        );
      },

      deleteProduct: (productId) => {
        set(
          (state) => ({
            products: state.products.filter((product) => product.id !== productId),
            disabledProductIds: new Set(
              Array.from(state.disabledProductIds).filter((id) => id !== productId)
            ),
            editingProduct: state.editingProduct?.id === productId ? null : state.editingProduct,
          }),
          false,
          'deleteProduct'
        );
      },

      
      toggleProductDisabled: (productId) => {
        set(
          (state) => {
            const newDisabledIds = new Set(state.disabledProductIds);
            if (newDisabledIds.has(productId)) {
              newDisabledIds.delete(productId);
            } else {
              newDisabledIds.add(productId);
            }
            return { 
              disabledProductIds: newDisabledIds,
              editingProduct: state.editingProduct?.id === productId ? null : state.editingProduct,
            };
          },
          false,
          'toggleProductDisabled'
        );
      },

      setEditingProduct: (product) => {
        set({ editingProduct: product }, false, 'setEditingProduct');
      },

      toggleAdminMode: () => {
        set(
          (state) => ({ 
            isAdmin: !state.isAdmin,
            editingProduct: !state.isAdmin ? null : state.editingProduct,
          }),
          false,
          'toggleAdminMode'
        );
      },
    }),
    { name: 'inventory-store' }
  )
); 
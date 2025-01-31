
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
}


export interface InventoryStats {
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategories: number;
}


export interface InventoryState {
  products: Product[];
  disabledProductIds: Set<number>;
  editingProduct: Product | null;
  isAdmin: boolean;
}


export interface InventoryActions {
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  toggleProductDisabled: (productId: number) => void;
  setEditingProduct: (product: Product | null) => void;
  toggleAdminMode: () => void;
} 
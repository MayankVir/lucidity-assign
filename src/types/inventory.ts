export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  value: number;
  isDisabled?: boolean;
}

export interface InventoryStats {
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategories: number;
} 
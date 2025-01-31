export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  quantity: number;
  value: string;
  isDisabled?: boolean;
}

export interface InventoryStats {
  totalProducts: number;
  totalStoreValue: number;
  outOfStock: number;
  numberOfCategories: number;
} 
import { useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { InventoryStats } from '../types/inventory.types';

/**
 * Custom hook for calculating inventory statistics
 * Uses memoization to prevent unnecessary recalculations
 */
export const useInventoryStats = (): InventoryStats => {
  const { products, disabledProductIds } = useInventoryStore();

  return useMemo(() => {
    const activeProducts = products.filter(
      (product) => !disabledProductIds.has(product.id)
    );

    return {
      totalProducts: activeProducts.length,
      totalStoreValue: activeProducts.reduce(
        (sum, product) =>
          sum + Number(product.price?.replace("$", "")) * product.quantity,
        0
      ),
      outOfStock: activeProducts.filter(
        (product) => product.quantity === 0
      ).length,
      numberOfCategories: new Set(
        activeProducts.map((product) => product.category)
      ).size,
    };
  }, [products, disabledProductIds]);
}; 
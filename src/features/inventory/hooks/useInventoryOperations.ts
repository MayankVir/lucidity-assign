import { useCallback, useEffect, useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useInventoryStore } from '../store/inventoryStore';
import { Product } from '../types/inventory.types';
import { fetchInventory } from '../../../services/api';

/**
 * Custom hook for handling inventory operations with proper error handling
 */
export const useInventoryOperations = () => {
  const {
    products,
    isAdmin,
    disabledProductIds,
    setProducts,
    updateProduct,
    deleteProduct,
    toggleProductDisabled,
    setEditingProduct,
    toggleAdminMode,
  } = useInventoryStore();

  const queryOptions: UseQueryOptions<Product[], Error> = {
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  };

  const { isLoading, isError, error, data } = useQuery(queryOptions);


  useEffect(() => {
    if (data) {
      setProducts(data.map((product, index) => ({ ...product, id: index + 1 })));
    }
  }, [data, setProducts]);

  const columns = useMemo(() => [
    { header: 'Name', accessor: 'name' as keyof Product },
    { header: 'Category', accessor: 'category' as keyof Product },
    { header: 'Price', accessor: 'price' as keyof Product },
    { header: 'Quantity', accessor: 'quantity' as keyof Product },
    { header: 'Value', accessor: 'value' as keyof Product },
  ], []);

  const handleEdit = useCallback((product: Product) => {
    if (!isAdmin) return;
    setEditingProduct(product);
  }, [isAdmin, setEditingProduct]);

  const handleUpdate = useCallback((updatedProduct: Product) => {
    if (!isAdmin) return;
    updateProduct(updatedProduct);
  }, [isAdmin, updateProduct]);

  const handleDelete = useCallback((productId: number) => {
    if (!isAdmin) return;
    deleteProduct(productId);
  }, [isAdmin, deleteProduct]);

  const handleToggleDisabled = useCallback((productId: number) => {
    if (!isAdmin) return;
    toggleProductDisabled(productId);
  }, [isAdmin, toggleProductDisabled]);

  return {
    // State
    products,
    isAdmin,
    disabledProductIds,
    columns,
    status: {
      isLoading,
      isError,
      error: error as Error | null,
      isSuccess: !isLoading && !isError,
    },

    // Actions
    handleEdit,
    handleUpdate,
    handleDelete,
    handleToggleDisabled,
    toggleAdminMode,

  };
}; 
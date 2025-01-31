import { useQuery } from '@tanstack/react-query';
import { fetchInventory } from '../services/api';

export const useInventoryQuery = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  });
}; 
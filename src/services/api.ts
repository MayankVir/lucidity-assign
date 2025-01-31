import axios from 'axios';
import { Product } from '../types/inventory';

const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

export const fetchInventory = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

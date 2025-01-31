import axios from 'axios';
import { Product } from '../types/inventory';

const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

export const fetchInventory = async (): Promise<Product[]> => {
  // const response = await axios.get<Product[]>(API_URL);
  // return response.data;

  return Promise.resolve([
    {
        "name": "Bluetooth",
        "category": "Electronic",
        "value": "$150",
        "quantity": 5,
        "price": "$30",
        "id": 1
    },
    {
        "name": "Edifier M43560",
        "category": "Electronic",
        "value": "0",
        "quantity": 0,
        "price": "$0",
        "id": 2
    },
    {
        "name": "Sony 4k ultra 55 inch TV",
        "category": "Electronic",
        "value": "$1190",
        "quantity": 17,
          "price": "$70",
        "id": 3
    },
    {
        "name": "Samsumg 55 inch TV",
        "category": "Electronic",
        "value": "$600",
        "quantity": 50,
        "price": "$12",
        "id": 4
    },
    {
        "name": "samsumg S34 Ultra",
        "category": "phone",
        "value": "$0",
      quantity: 0,
      price: "$0",
      id: 5
    },
  ]);
};

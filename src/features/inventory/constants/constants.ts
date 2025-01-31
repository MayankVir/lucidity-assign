import { Product } from "../types/inventory.types";


export const columns = [
  { header: 'Name', accessor: 'name' as keyof Product },
  { header: 'Category', accessor: 'category' as keyof Product },
  { header: "Price", accessor: "price" as keyof Product },
  { header: "Quantity", accessor: "quantity" as keyof Product },
  { header: "Value", accessor: "value" as keyof Product },
];

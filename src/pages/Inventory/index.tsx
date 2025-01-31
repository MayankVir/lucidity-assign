import { useMemo } from "react";
import Card from "../../components/Card";

import Table from "../../components/Table";
import { Product } from "../../types/inventory";

import CartIcon from "../../assets/svgs/CartIcon";
import StockIcon from "../../assets/svgs/StockIcon";
import CategoryIcon from "../../assets/svgs/CategoryIcon";

import { columns } from "../../features/inventory/constants/constants";
import ValueIcon from "../../assets/svgs/ValueIcon";
import { useInventoryOperations } from "../../features/inventory/hooks/useInventoryOperations";
import { useInventoryStore } from "../../features/inventory/store/inventoryStore";
import EditProductModal from "./components/EditProductModal";

const InventoryPage = () => {
  const { products, isAdmin, disabledProductIds } = useInventoryOperations();

  const {
    editingProduct,
    setEditingProduct,
    toggleProductDisabled,
    deleteProduct,
  } = useInventoryStore();

  const activeProducts = useMemo(() => {
    return products.filter((product) => !disabledProductIds.has(product.id));
  }, [products, disabledProductIds]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  // Compute inventory stats
  const stats = {
    totalProducts: activeProducts.length,
    totalStoreValue: activeProducts.reduce(
      (sum, product) =>
        sum + Number(product.price?.replace("$", "")) * product.quantity,
      0
    ),
    outOfStock: activeProducts.filter((product) => product.quantity === 0)
      .length,
    numberOfCategories: new Set(
      activeProducts.map((product) => product.category)
    ).size,
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          icon={<CartIcon />}
          title="Total product"
          value={stats.totalProducts}
        />
        <Card
          icon={<ValueIcon />}
          title="Total store value"
          value={stats.totalStoreValue}
        />
        <Card
          icon={<StockIcon />}
          title="Out of stocks"
          value={stats.outOfStock}
        />
        <Card
          icon={<CategoryIcon />}
          title="No of Category"
          value={stats.numberOfCategories}
        />
      </div>

      <Table
        columns={columns}
        data={products}
        onEdit={isAdmin ? handleEdit : undefined}
        onView={
          isAdmin
            ? (product: Product) => toggleProductDisabled(product.id)
            : undefined
        }
        onDelete={
          isAdmin ? (product: Product) => deleteProduct(product.id) : undefined
        }
        disabledRows={disabledProductIds}
      />

      {editingProduct && <EditProductModal />}
    </>
  );
};

export default InventoryPage;

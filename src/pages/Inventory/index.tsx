import { useMemo } from "react";
import Card from "../../components/Card";

import { useInventoryStore } from "../../store/useInventoryStore";
import Table from "../../components/Table";
import { Product } from "../../types/inventory";
import Modal from "../../components/Modal";
import { useInventoryQuery } from "../../http-hooks/useInventoryQuery";

import CartIcon from "../../assets/cart.svg";
import ValueIcon from "../../assets/value.svg";
import StockIcon from "../../assets/stock.svg";
import CategoryIcon from "../../assets/category.svg";

const InventoryPage = () => {
  const { data: products = [], isLoading } = useInventoryQuery();

  const {
    isAdmin,
    editingProduct,
    setEditingProduct,
    disabledProductIds,
    toggleProductDisabled,
    deleteProduct,
    updateProduct,
  } = useInventoryStore();

  const activeProducts = useMemo(() => {
    return products.filter((product) => !disabledProductIds.has(product.id));
  }, [products, disabledProductIds]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  // Compute inventory stats
  const stats = useMemo(() => {
    return {
      totalProducts: activeProducts.length,
      totalStoreValue: activeProducts.reduce(
        (sum, product) => sum + product.value,
        0
      ),
      outOfStock: activeProducts.filter((product) => product.quantity === 0)
        .length,
      numberOfCategories: new Set(
        activeProducts.map((product) => product.category)
      ).size,
    };
  }, [activeProducts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

      {editingProduct && (
        <Modal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          title="Edit product"
          onSave={() => {
            if (editingProduct) {
              handleSave(editingProduct);
            }
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-custom-lime mb-1">
                Category
              </label>
              <input
                type="text"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    category: e.target.value,
                  })
                }
                className="w-full bg-custom-forest rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-custom-lime mb-1">
                Price
              </label>
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                className="w-full bg-custom-forest rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-custom-lime mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={editingProduct.quantity}
                onChange={(e) => {
                  const quantity = Number(e.target.value);
                  setEditingProduct({
                    ...editingProduct,
                    quantity,
                    value: quantity * editingProduct.price,
                  });
                }}
                className="w-full bg-custom-forest rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-custom-lime mb-1">
                Value
              </label>
              <input
                type="number"
                value={editingProduct.value}
                disabled
                className="w-full bg-custom-forest/50 rounded p-2 text-gray-400"
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InventoryPage;

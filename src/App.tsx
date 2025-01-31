import { useMemo } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useInventoryQuery } from "./http-hooks/useInventoryQuery";
import { useInventoryStore } from "./store/useInventoryStore";
import { Product } from "./types/inventory";
import Card from "./components/Card";
import Table from "./components/Table";
import Modal from "./components/Modal";

// Icons
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"
      fill="currentColor"
    />
  </svg>
);

const ValueIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z"
      fill="currentColor"
    />
  </svg>
);

const StockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 2H4C3 2 2 2.9 2 4V7.01C2 7.73 2.43 8.35 3 8.7V20C3 21.1 4.1 22 5 22H19C19.9 22 21 21.1 21 20V8.7C21.57 8.35 22 7.73 22 7.01V4C22 2.9 21 2 20 2ZM19 20H5V9H19V20ZM20 7H4V4H20V7Z"
      fill="currentColor"
    />
    <path d="M9 12H15V14H9V12Z" fill="currentColor" />
  </svg>
);

const CategoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L6.5 11H17.5L12 2ZM12 5.84L13.93 9H10.06L12 5.84ZM17.5 13C15.01 13 13 15.01 13 17.5C13 19.99 15.01 22 17.5 22C19.99 22 22 19.99 22 17.5C22 15.01 19.99 13 17.5 13ZM17.5 20C16.12 20 15 18.88 15 17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5C20 18.88 18.88 20 17.5 20ZM3 21.5H11V13.5H3V21.5ZM5 15.5H9V19.5H5V15.5Z"
      fill="currentColor"
    />
  </svg>
);

const queryClient = new QueryClient();

function InventoryApp() {
  const {
    isAdmin,
    toggleAdminMode,
    editingProduct,
    setEditingProduct,
    disabledProductIds,
    toggleProductDisabled,
    updateProduct,
    deleteProduct,
  } = useInventoryStore();

  const { data: products = [], isLoading } = useInventoryQuery();

  // Compute active products (not disabled)
  const activeProducts = useMemo(() => {
    return products.filter((product) => !disabledProductIds.has(product.id));
  }, [products, disabledProductIds]);

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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  const columns = [
    { header: "Name", accessor: "name" as keyof Product },
    { header: "Category", accessor: "category" as keyof Product },
    { header: "Price", accessor: "price" as keyof Product },
    { header: "Quantity", accessor: "quantity" as keyof Product },
    { header: "Value", accessor: "value" as keyof Product },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-custom-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-white">Inventory stats</h1>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">admin</span>
            <button
              onClick={toggleAdminMode}
              className={`w-12 h-6 rounded-full ${
                isAdmin ? "bg-custom-lime" : "bg-gray-600"
              } relative`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all ${
                  isAdmin ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-gray-400">user</span>
          </div>
        </div>

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
            isAdmin
              ? (product: Product) => deleteProduct(product.id)
              : undefined
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
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <InventoryApp />
    </QueryClientProvider>
  );
}

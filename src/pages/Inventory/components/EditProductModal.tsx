import Modal from "../../../components/Modal";
import { useInventoryStore } from "../../../features/inventory/store/inventoryStore";
import { Product } from "../../../types/inventory";

const EditProductModal = () => {
  const { editingProduct, setEditingProduct, updateProduct } =
    useInventoryStore();

  const handleSave = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    setEditingProduct(null);
  };

  if (!editingProduct) return null;

  return (
    <Modal
      isOpen={true}
      onClose={() => setEditingProduct(null)}
      title="Edit product"
      onSave={() => handleSave(editingProduct)}
    >
      <div className="text-sm  text-white mb-6">{editingProduct.name}</div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex  gap-4">
          <div className="w-full">
            <label className="block text-sm text-neutral-200 mb-1">
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
              className="w-full bg-neutral-700 rounded p-2 text-neutral-300"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm text-neutral-200 mb-1">Price</label>
            <input
              type="text"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                  value: `$${
                    Number(e.target.value?.replace("$", "")) *
                    Number(editingProduct.quantity)
                  }`,
                })
              }
              className="w-full bg-neutral-700 rounded p-2 text-neutral-300"
            />
          </div>
        </div>

        <div className="flex  gap-4">
          <div className="w-full">
            <label className="block text-sm text-neutral-200 mb-1">
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
                  value: `$${
                    Number(editingProduct.price?.replace("$", "")) * quantity
                  }`,
                });
              }}
              className="w-full bg-neutral-700 rounded p-2 text-neutral-300"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm text-neutral-200 mb-1">Value</label>
            <input
              type="text"
              value={editingProduct.value}
              disabled
              className="w-full bg-neutral-700/50 rounded p-2 text-gray-400"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProductModal;

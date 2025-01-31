import { useInventoryStore } from "../../store/useInventoryStore";

const Header = () => {
  const { isAdmin, toggleAdminMode } = useInventoryStore();

  return (
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
  );
};

export default Header;

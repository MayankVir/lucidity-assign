import Header from "./components/shared/Header";
import InventoryPage from "./pages/Inventory";

export default function App() {
  return (
    <div className="min-h-screen bg-custom-black p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <InventoryPage />
      </div>
    </div>
  );
}

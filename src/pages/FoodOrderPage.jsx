// pages/FoodOrderPage.js
import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import FoodCard from "../components/FoodCard";
import OrderSummary from "../components/OrderSummary";
import { FaSearch } from "react-icons/fa";
import { getFoods } from "../api/foodApi";
import { useOrder } from "../context/OrderContext";

const FoodOrderPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addItem } = useOrder();

  // Map backend data to frontend structure
  const mapBackendToFrontend = (backendFood) => ({
    id: backendFood.foodId,
    name: backendFood.foodName || "",
    category: backendFood.foodCategory || "",
    price: backendFood.foodPrice || 0,
    description: backendFood.foodDescription || "",
    image: backendFood.foodImageUrl || "/assets/default-food.jpg",
    stock: backendFood.foodStock || 0,
    state: backendFood.states || "A",
    initStock: backendFood.initialStock || 0,
  });

  // Load foods by category or all foods
  const loadFoods = useCallback(async (category = null) => {
    try {
      setLoading(true);
      const data = await getFoods(category);

      // Map backend fields to frontend expected fields
      const mappedFoods = data.map(mapBackendToFrontend);
      setFoods(mappedFoods);
    } catch (error) {
      console.error("Error loading foods:", error);
      setFoods([]); // Set empty array on error to prevent crashes
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since getFoods is imported

  useEffect(() => {
    loadFoods(); // Load all foods on initial render
  }, [loadFoods]);

  // Filter foods by search query in real-time
  const filteredFoods = foods.filter(
    (food) =>
      food?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food?.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar onSelectCategory={loadFoods} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Уншиж байна...</div>
        </div>
        <OrderSummary />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for categories */}
      <Sidebar onSelectCategory={loadFoods} />

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 m-10 border rounded-lg shadow-md">
        <SearchBar onSearch={setSearchQuery} />

        {/* If no foods found */}
        {filteredFoods.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            {searchQuery ? "Хайлтын үр дүн олдсонгүй" : "Хоол олдсонгүй"} 😕
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} onAdd={addItem} />
            ))}
          </div>
        )}
      </div>

      {/* Order summary */}
      <OrderSummary />
    </div>
  );
};

// 🔎 Search Bar Component
function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full mx-auto">
      <input
        type="text"
        placeholder="Хайх..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
}

export default FoodOrderPage;

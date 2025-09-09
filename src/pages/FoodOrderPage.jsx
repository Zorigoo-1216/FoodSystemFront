// pages/FoodOrderPage.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import FoodCard from "../components/FoodCard";
import OrderSummary from "../components/OrderSummary";
import { FaSearch } from "react-icons/fa";

import { getFoods } from "../api/foodApi";
import { useOrder } from "../context/OrderContext";

const FoodOrderPage = () => {
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useOrder();

  const loadFoods = (category) => {
    getFoods(category).then(setFoods);
  };

  useEffect(() => {
    loadFoods(); // Load all foods on initial render
  }, []);

  // Filter foods by search query
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelectCategory={loadFoods} />
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 m-10 border rounded-lg shadow-md ">
        <SearchBar onSearch={setSearchQuery} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} onAdd={addItem} />
          ))}
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};

function SearchBar({ onSearch }) {
  return (
    <div className="relative w-full mx-auto ">
      <input
        type="text"
        placeholder="Хайх..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-3 text-gray-400" />
    </div>
  );
}

export default FoodOrderPage;

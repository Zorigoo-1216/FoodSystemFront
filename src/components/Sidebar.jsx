// Sidebar.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { CATEGORY_MAP } from "../api/categoryApi";
const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    onSelectCategory(catName === "all" ? null : catName);
    // pass null for all foods
  };

  return (
    <div
      className={`relative bg-gray-100 p-4 h-[800px] m-10 border rounded-2xl shadow-lg transition-all duration-300 
      ${collapsed ? "w-24" : "w-[320px]"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-4 bg-white border rounded-full shadow-md p-1 hover:bg-gray-200 transition"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Title */}
      {!collapsed && (
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <List size={20} /> Ангилал
        </h2>
      )}

      {/* Categories */}
      <div className="space-y-2">
        {/* All Foods Category */}
        <button
          className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 transition
            ${collapsed ? "justify-center" : "text-left"}
            ${
              selectedCategory === "all"
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "hover:bg-gray-200"
            }`}
          onClick={() => handleCategoryClick("all")}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              selectedCategory === "all" ? "bg-orange-500" : "bg-gray-400"
            }`}
          ></span>
          {!collapsed && <span>Бүх хоол</span>}
        </button>

        {/* Dynamic Categories */}
        {categories.map((cat) => {
          const displayName = CATEGORY_MAP[cat.name] || cat.name;

          return (
            <button
              key={cat.id}
              className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 transition
        ${collapsed ? "justify-center" : "text-left"}
        ${
          selectedCategory === cat.name
            ? "bg-orange-100 text-orange-700 font-semibold border-l-4 border-orange-500"
            : "hover:bg-gray-100 text-gray-700"
        }`}
              onClick={() => handleCategoryClick(cat.name)}
              title={collapsed ? displayName : ""}
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  selectedCategory === cat.name
                    ? "bg-orange-500"
                    : "bg-gray-400"
                }`}
              ></span>
              {!collapsed && (
                <span className="flex-1 truncate">{displayName}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

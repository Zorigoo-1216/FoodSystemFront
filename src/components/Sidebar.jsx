// Sidebar.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";

const Sidebar = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="w-1/5 bg-gray-100 p-4 h-[800px] m-10 border rounded-lg shadow-md overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="block w-full text-left p-2 hover:bg-gray-200"
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;

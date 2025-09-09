// OrderedFoodCard.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";
const OrderedFoodCard = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex justify-between items-center border p-3 rounded-lg mb-5 bg-white">
      <div className="flex flex-col items-start">
        <h4 className="font-semibold">{item.name}</h4>
        <p>
          {item.quantity} × {item.price} ₮
        </p>
      </div>
      <div className="flex items-center gap-3 rounded">
        <button
          className="bg-slate-300 w-8 h-8 rounded-full text-white"
          onClick={() => onDecrease(item.id)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          className="bg-orange-400 w-8 h-8 rounded-full text-white"
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 p-2"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderedFoodCard;

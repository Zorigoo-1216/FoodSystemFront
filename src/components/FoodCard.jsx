// FoodCard.jsx
import React from "react";

const FoodCard = ({ food, onAdd }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center h bg-white h-[300px]">
      <img
        src={food.image}
        alt={food.name}
        className="w-24 h-44 object-cover"
      />
      <h3 className="mt-2 font-semibold">{food.name}</h3>
      <div className="flex justify-between w-full px-4 mt-2">
        <p className="text-gray-600 ">{food.price}₮</p>
        <p className="text-gray-600">{food.stock}/20</p>
      </div>
      <button
        onClick={() => onAdd(food)}
        className="mt-4 bg-orange-500 w-full text-white px-4 py-2 rounded-full hover:bg-orange-600 duration-100"
      >
        Нэмэх
      </button>
    </div>
  );
};

export default FoodCard;

// FoodCard.jsx
import React, { useState } from "react";
const FoodCard = ({ food, onAdd }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // const isOutOfStock = food.stock <= 0;
  const isOutOfStock = food.availableStock <= 0;

  const handleClick = () => {
    if (!isOutOfStock) {
      onAdd(food);
    }
  };
  return (
    <div
      className={`border rounded-lg p-4 flex flex-col items-center w-50 bg-white h-[300px] transition-all ${
        isOutOfStock
          ? "opacity-50 cursor-not-allowed bg-gray-100"
          : "cursor-pointer hover:shadow-lg"
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full h-44 mb-2">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
          </div>
        )}

        <img
          src={imageError ? "/assets/default.jpg" : food.image}
          alt={food.name}
          className={`w-full h-full object-cover rounded ${
            imageLoading ? "opacity-0" : "opacity-100"
          } transition-opacity ${isOutOfStock ? "grayscale" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
            <span className="text-white text-xs font-semibold">ДУУССАН</span>
          </div>
        )}
      </div>

      <h3
        className={`mt-2 font-semibold text-center text-sm line-clamp-2 ${
          isOutOfStock ? "text-gray-400" : ""
        }`}
      >
        {food.name}
      </h3>
      <div className="flex justify-between w-full px-2 mt-auto">
        <p
          className={`text-sm ${
            isOutOfStock
              ? "text-red-500 font-semibold"
              : food.availableStock <= 5
              ? "text-orange-500 font-semibold"
              : "text-gray-600"
          }`}
        >
          Үлдэгдэл: {food.availableStock}
        </p>
        <p
          className={`font-semibold text-sm ${
            isOutOfStock ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {food.price}₮
        </p>
      </div>
      {/* <div className="flex justify-between w-full px-2 mt-auto">
        <p className="text-gray-600 text-sm">Үлдэгдэл: {food.stock}</p>
        <p className="text-gray-800 font-semibold text-sm">{food.price}₮</p>
      </div> */}
    </div>
  );
};

export default FoodCard;

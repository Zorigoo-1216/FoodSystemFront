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

  return (
    <div
      className="border rounded-lg p-4 flex flex-col items-center bg-white h-[300px] cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onAdd(food)}
    >
      <div className="relative w-24 h-44 mb-2">
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
          } transition-opacity`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <h3 className="mt-2 font-semibold text-center text-sm line-clamp-2">
        {food.name}
      </h3>

      <div className="flex justify-between w-full px-2 mt-auto">
        <p className="text-gray-600 text-sm">Үлдэгдэл: {food.stock}</p>
        <p className="text-gray-800 font-semibold text-sm">{food.price}₮</p>
      </div>
    </div>
  );
};

export default FoodCard;

// OrderSummary.jsx
import React, { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderedFoodCard from "./OrderedFoodCard";

const OrderSummary = () => {
  const { orderItems, increaseQuantity, decreaseQuantity, removeItem } =
    useContext(OrderContext);

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-1/4 bg-gray-50 p-4 m-10 border rounded-lg shadow-md h-[600px] flex flex-col">
      <h2 className="text-lg font-bold mb-4">Таны захиалга</h2>
      <div className="overflow-y-auto flex-1">
        {orderItems.map((item) => (
          <OrderedFoodCard
            key={item.id}
            item={item}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <hr className="my-4" />
      <div className="text-lg font-semibold">Нийт: {total}₮</div>
      <div className="flex gap-2 mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-full w-1/2">
          Захиалга үүсгэх
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-full w-1/2">
          Цуцлах
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

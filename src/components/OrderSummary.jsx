import React, { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import OrderedFoodCard from "./OrderedFoodCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const OrderSummary = () => {
  const {
    orderItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearOrder,
  } = useContext(OrderContext);

  const [collapsed, setCollapsed] = useState(false);

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`relative bg-gray-50 p-4 m-10 border rounded-2xl shadow-lg h-[600px] flex flex-col transition-all duration-300
        ${collapsed ? "w-5" : "w-[400px]"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-4 bg-white border rounded-full shadow-md p-1 hover:bg-gray-200 transition"
      >
        {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Header */}
      {!collapsed && <h2 className="text-lg font-bold mb-4">Таны захиалга</h2>}

      {/* Order Items */}
      <div className="overflow-y-auto flex-1 mt-2">
        {orderItems.length === 0
          ? !collapsed && (
              <div className="text-center text-gray-500 mt-10">
                Захиалга хоосон байна🤔
              </div>
            )
          : orderItems.map((item) => (
              <OrderedFoodCard
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
      </div>

      {/* Total & Actions */}
      {!collapsed && orderItems.length > 0 && (
        <>
          <hr className="my-4" />
          <div className="text-lg font-semibold">Нийт: {total}₮</div>
          <div className="flex gap-2 mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-full w-1/2">
              Захиалга үүсгэх
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full w-1/2"
              onClick={clearOrder}
            >
              Цуцлах
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;

// pages/FoodManagePage.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { getFoods } from "../api/foodApi";
import { API_BASE_URL } from "../api/foodApi";
import FoodForm from "../components/FoodForm";
import InitStockForm from "../components/InitStockForm";
import OrderList from "../components/OrderList";
import { CATEGORY_MAP } from "../api/categoryApi";
const FoodManagePage = () => {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showInitStockModal, setShowInitStockModal] = useState(false);
  const [showOrderListModal, setShowOrderListModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    state: "A",
    stock: "",
    initQuantity: "",
    image: null,
    createdAt: "",
  });
  const [editingFood, setEditingFood] = useState(null);
  const [initStockData, setInitStockData] = useState({});

  useEffect(() => {
    getFoods()
      .then((data) => {
        const mappedFoods = data.map((f) => ({
          id: f.foodId,
          name: f.foodName,
          category: f.foodCategory,
          price: f.foodPrice,
          description: f.foodDescription,
          stock: f.foodStock,
          initQuantity: f.initialStock,
          state: f.states,
          image: f.foodImageUrl || "/assets/default.jpg",
          createdAt: f.createdAt,
        }));
        setFoods(mappedFoods);
      })
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      state: "A",
      stock: "",
      initQuantity: "",
      image: null,
    });
    setEditingFood(null);
  };

  const handleAddFood = async () => {
    if (editingFood) {
      // Update existing food locally
      const updatedFoods = foods.map((food) =>
        food.id === editingFood.id
          ? {
              ...formData,
              id: editingFood.id,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock) || food.stock,
              initQuantity:
                parseInt(formData.initQuantity) || food.initQuantity,
              image: formData.image
                ? URL.createObjectURL(formData.image)
                : food.image,
            }
          : food
      );
      setFoods(updatedFoods);
      resetForm();
      setShowForm(false);
      return;
    }

    if (!formData.name || !formData.price) {
      alert("Хоолны нэр болон үнийг оруулна уу");
      return;
    }
    const foodFormData = new FormData();
    foodFormData.append("FoodName", formData.name);
    foodFormData.append("FoodCategory", formData.category || "");
    foodFormData.append("FoodPrice", parseFloat(formData.price).toString());
    foodFormData.append("FoodDescription", formData.description || "");
    foodFormData.append(
      "InitialStock",
      (parseInt(formData.initQuantity) || 0).toString()
    );
    foodFormData.append("State", formData.state || "A");

    if (formData.image) {
      foodFormData.append("FoodImage", formData.image);
    }
    try {
      const response = await fetch(`${API_BASE_URL}/Food/add`, {
        method: "POST",
        body: foodFormData,
      });
      if (!response.ok) throw new Error("Failed to add food");
      const result = await response.json();

      const foodItem = {
        id: result.id,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        initQuantity: parseInt(formData.initQuantity) || 0,
        state: formData.state,
        stock: parseInt(formData.initQuantity) || 0,
        // Backend-ээс ирсэн image URL-г шууд ашиглах
        image: result.imageUrl || "/assets/default.jpg",
      };

      setFoods([...foods, foodItem]);
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Error adding food:", err);
      alert("Сервертэй холбогдох үед алдаа гарлаа");
    }

    resetForm();
    setShowForm(false);
    window.location.reload();
  };

  // Handle edit food
  const handleEditFood = (food) => {
    setFormData({
      ...food,
      price: food.price.toString(),
      stock: food.stock.toString(),
      initQuantity: food.initQuantity.toString(),
      image: null, // Reset image file input
    });
    setEditingFood(food);
    setShowForm(true);
  };

  // Handle init stock modal
  const handleOpenInitStock = () => {
    const stockData = {};
    foods.forEach((food) => {
      stockData[food.id] = food.initQuantity || "";
    });
    setInitStockData(stockData);
    setShowInitStockModal(true);
  };

  // Handle init stock change
  const handleInitStockChange = (foodId, value) => {
    setInitStockData({
      ...initStockData,
      [foodId]: value,
    });
  };

  // Handle save init stock
  const handleSaveInitStock = () => {
    //const hasExistingStock = foods.some((food) => food.initQuantity > 0);
    const stockList = foods.map((food) => ({
      foodId: food.id,
      initQuantity: parseInt(initStockData[food.id]) || 0,
    }));

    console.log(
      "📦 Init Stock Request Body:",
      JSON.stringify(stockList, null, 2)
    );
    confirmSaveInitStock();
    window.location.reload();
  };
  const closeOrderList = () => {
    setShowOrderListModal(false);
  };
  const openOrderList = () => {
    setShowOrderListModal(true);
  };
  // Confirm save init stock
  const confirmSaveInitStock = async () => {
    const stockList = foods.map((food) => ({
      foodId: food.id,
      initQuantity: parseInt(initStockData[food.id]) || 0,
    }));
    const response = await fetch(`${API_BASE_URL}/Food/init-stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stockList),
    });
    if (!response.ok) {
      const err = await response.text();
      console.error(err);
      alert("Эхний үлдэгдлийг хадгалах үед алдаа гарлаа");
      return;
    }
    const updatedFoods = foods.map((food) => ({
      ...food,
      initQuantity: parseInt(initStockData[food.id]) || food.initQuantity,
      stock: parseInt(initStockData[food.id]) || food.stock,
    }));

    setFoods(updatedFoods);
    setShowInitStockModal(false);
  };

  const handleBackdropClick = (e, closeModal) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🍽️ Хоолны менежмент
          </h1>
          {/* <p className="text-gray-600 text-sm mt-1">Хоолны цэсээ удирдах</p> */}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleOpenInitStock}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium">Эхний үлдэгдэл</span>
          </button>

          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaPlus className="w-4 h-4" />
            <span className="font-medium">Шинэ хоол</span>
          </button>

          <button
            onClick={openOrderList}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span className="font-medium">Захиалгууд</span>
          </button>
        </div>
      </div>
      {showOrderListModal && (
        <OrderList isOpen={showOrderListModal} onClose={closeOrderList} />
      )}
      {showForm && (
        <FoodForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddFood}
          onClose={() => setShowForm(false)}
          editingFood={editingFood}
        />
      )}

      <InitStockForm
        foods={foods}
        initStockData={initStockData}
        handleInitStockChange={handleInitStockChange}
        handleSaveInitStock={handleSaveInitStock}
        setShowInitStockModal={setShowInitStockModal}
        handleBackdropClick={handleBackdropClick}
        showInitStockModal={showInitStockModal}
      />

      {/* Food Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Зураг
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Нэр
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Тайлбар
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Үнэ
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ангилал
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Төлөв
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Анхны үлдэгдэл
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Үлдэгдэл
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Огноо
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Үйлдэл
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foods.map((food) => (
              <tr
                key={food.id}
                className={`transition-colors duration-150 ${
                  food.stock <= 5
                    ? "bg-red-50 hover:bg-red-100"
                    : food.stock <= 10
                    ? "bg-orange-50 hover:bg-orange-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm border border-gray-200"
                      // onError={(e) => {
                      //   e.target.src = "/assets/default.jpg";
                      // }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {food.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-xs truncate">
                    {food.description || "Тайлбаргүй"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-blue-600">
                    {food.price?.toLocaleString?.() || "0"}₮
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {CATEGORY_MAP[food.category] || "Ангилалгүй"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      food.state === "A"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {food.state === "A" ? "✅ Боломжтой" : "❌ Дууссан"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 font-medium">
                    {food.initQuantity?.toLocaleString?.() || "0"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`text-sm font-bold ${
                      food.stock <= 5
                        ? "text-red-600"
                        : food.stock <= 10
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {food.stock?.toLocaleString?.() || "0"}
                  </div>
                  {food.stock <= 10 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {food.stock <= 5 ? "⚠️ Яаралтай" : "⏳ Дуусах ойролцоо"}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {new Date(food.createdAt).toLocaleDateString("mn-MN", {}) ||
                      "Огноо мэдэгдэхгүй"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFood(food)}
                      className="inline-flex items-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <FaEdit className="w-4 h-4 mr-1" />
                      Засах
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Энэ хоолыг устгахдаа итгэлтэй байна уу?\n\nУстгасан хоолыг дахин сэргээх боломжгүй."
                          )
                        ) {
                          setFoods(foods.filter((f) => f.id !== food.id));
                        }
                      }}
                      className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Устгах
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodManagePage;

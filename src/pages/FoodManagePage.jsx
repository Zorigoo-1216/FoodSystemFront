// pages/FoodManagePage.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { addFood } from "../api/foodApi";
import { getFoods } from "../api/foodApi";
import { API_BASE_URL } from "../api/foodApi";
import FoodForm from "../components/FoodForm";
import InitStockForm from "../components/InitStockForm";
const FoodManagePage = () => {
  const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showInitStockModal, setShowInitStockModal] = useState(false);
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
        body: foodFormData, // Send as FormData
      });
      if (!response.ok) throw new Error("Failed to add food");
      const result = await response.json(); // API call

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Хоол</h1>
        <div className="flex gap-2">
          <button
            onClick={handleOpenInitStock}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaPlus />
            Эхний үлдэгдэл оруулах
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            <FaPlus /> Шинэ хоол нэмэх
          </button>
        </div>
      </div>
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
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Зураг</th>
              <th className="border px-4 py-2">Нэр</th>
              <th className="border px-4 py-2">Тайлбар</th>
              <th className="border px-4 py-2">Үнэ</th>
              <th className="border px-4 py-2">Ангилал</th>
              <th className="border px-4 py-2">Төлөв</th>
              <th className="border px-4 py-2">Анхны үлдэгдэл</th>
              <th className="border px-4 py-2">Үлдэгдэл</th>
              <th className="border px-4 py-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr
                key={food.id}
                className={`${food.stock <= 10 ? "" : ""} hover:bg-gray-100`}
              >
                <td className="border px-4 py-2">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{food.name}</td>
                <td className="border px-4 py-2">{food.description}</td>
                <td className="border px-4 py-2">{food.price}₮</td>
                <td className="border px-4 py-2">{food.category}</td>
                <td className="border px-4 py-2">
                  {food.state === "A" ? "Боломжтой" : "Дууссан"}
                </td>
                <td className="border px-4 py-2">{food.initQuantity}</td>
                <td className="border px-4 py-2">{food.stock}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFood(food)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                    >
                      <FaEdit /> Засах
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Энэ хоолыг устгахдаа итгэлтэй байна уу?"
                          )
                        ) {
                          setFoods(foods.filter((f) => f.id !== food.id));
                        }
                      }}
                    >
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

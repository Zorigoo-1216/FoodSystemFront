import React from "react";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";

const FoodForm = ({
  formData,
  setFormData,
  onSubmit,
  onClose,
  editingFood,
}) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Sample category options
  const categoryOptions = [
    { value: "main-1", label: "1-р хоол" },
    { value: "main-2", label: "2-р хоол" },
    { value: "dessert", label: "Амттан" },
    { value: "drink", label: "Уух зүйл" },
    { value: "salad", label: "Салад" },
    { value: "minced-meat", label: "Ширхэгийн хоол" },
    { value: "breakfast", label: "Өглөөний цай" },
    { value: "vegan", label: "Цагаан хоол" },
    { value: "children", label: "Хүүхдийн хоол" },
    { value: "special", label: "Тусгай хоол" },
    { value: "combo", label: "Багц хоол" },
  ];

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {editingFood ? "Хоол засах" : "Шинэ хоол нэмэх"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Хоолны нэр"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Үнэ"
            value={formData.price}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <Select
            name="category"
            options={categoryOptions}
            value={
              categoryOptions.find((opt) => opt.value === formData.category) ||
              null
            }
            onChange={handleCategoryChange}
            isClearable
            isSearchable
            placeholder="Ангилал сонгох..."
            classNamePrefix="react-select"
            styles={{
              control: (base) => ({
                ...base,
                padding: "2px",
                borderRadius: "0.5rem",
                borderColor: "#d1d5db",
                boxShadow: "none",
                minHeight: "48px",
              }),
            }}
          />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="A">Боломжтой</option>
            <option value="B">Хүлээгдэж буй</option>
          </select>
          <input
            type="number"
            name="initQuantity"
            placeholder="Эхний үлдэгдэл"
            value={formData.initQuantity}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            name="stock"
            placeholder="Одоогийн үлдэгдэл"
            value={formData.stock}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Тайлбар"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Цуцлах
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            {editingFood ? "Хадгалах" : "Нэмэх"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodForm;

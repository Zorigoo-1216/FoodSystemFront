// components/InitStockForm.js
import React from "react";
import { FaTimes } from "react-icons/fa";

const InitStockForm = ({
  foods,
  initStockData,
  handleInitStockChange,
  handleSaveInitStock,
  setShowInitStockModal,
  handleBackdropClick,
  showInitStockModal,
}) => {
  if (!showInitStockModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) =>
        handleBackdropClick(e, () => setShowInitStockModal(false))
      }
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // modal дотор дарахад хаагдахгүй
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Эхний үлдэгдэл оруулах</h2>
          <button
            onClick={() => setShowInitStockModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Зураг</th>
                <th className="border px-4 py-2">Нэр</th>
                <th className="border px-4 py-2">Ангилал</th>
                <th className="border px-4 py-2">Одоогийн эхний үлдэгдэл</th>
                <th className="border px-4 py-2">Шинэ эхний үлдэгдэл</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{food.name}</td>
                  <td className="border px-4 py-2">{food.category}</td>
                  <td className="border px-4 py-2 text-center">
                    {food.initQuantity}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={initStockData[food.id] || ""}
                      onChange={(e) =>
                        handleInitStockChange(food.id, e.target.value)
                      }
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Эхний үлдэгдэл оруулах"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowInitStockModal(false)}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Цуцлах
          </button>
          <button
            onClick={handleSaveInitStock}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitStockForm;

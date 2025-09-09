// src/api/categoryApi.js
export const getCategories = async () => {
  const categories = [
    { id: 1, name: "Burger" },
    { id: 2, name: "Pizza" },
    { id: 3, name: "Salad" },
    { id: 4, name: "Seafood" },
    { id: 5, name: "Snacks" },
    { id: 6, name: "Vegetables" },
    { id: 7, name: "Meat" },
    { id: 8, name: "Drinks" },
    { id: 9, name: "Desserts" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 200); // Simulate API delay
  });
};

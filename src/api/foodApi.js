// src/api/foodApi.js
export const getFoods = async (category) => {
  const allFoods = [
    {
      id: 1,
      name: "Chicken Burger",
      price: 10000,
      category: "Burger",
      image: "/images/chicken-burger.jpg",
    },
    {
      id: 2,
      name: "Grilled Burger",
      price: 12000,
      category: "Burger",
      image: "/images/grilled-burger.jpg",
    },
    {
      id: 3,
      name: "Vegetable Pizza",
      price: 15000,
      category: "Pizza",
      image: "/images/veg-pizza.jpg",
    },
    {
      id: 4,
      name: "Shrimp Basil Salad",
      price: 11000,
      category: "Salad",
      image: "/images/shrimp-salad.jpg",
    },
    {
      id: 5,
      name: "Fish & Chips",
      price: 13000,
      category: "Seafood",
      image: "/images/fish-chips.jpg",
    },
    {
      id: 6,
      name: "Onion Rings",
      price: 8000,
      category: "Snacks",
      image: "/images/onion-rings.jpg",
    },
    {
      id: 7,
      name: "Red Onion Rings",
      price: 9000,
      category: "Snacks",
      image: "/images/red-onion-rings.jpg",
    },
    {
      id: 8,
      name: "Smoked Bacon",
      price: 14000,
      category: "Meat",
      image: "/images/smoked-bacon.jpg",
    },
    {
      id: 9,
      name: "Fresh Tomatoes",
      price: 6000,
      category: "Vegetables",
      image: "/images/fresh-tomatoes.jpg",
    },
    {
      id: 10,
      name: "Beef Burger",
      price: 13000,
      category: "Burger",
      image: "/images/beef-burger.jpg",
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      if (category) {
        resolve(allFoods.filter((f) => f.category === category));
      } else {
        resolve(allFoods);
      }
    }, 300); // Simulate API delay
  });
};

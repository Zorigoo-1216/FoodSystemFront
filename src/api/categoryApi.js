// Category code to human-readable name mapping

// src/api/categoryApi.js
import axios from "axios";
import { getFoodCategories } from "./foodApi";

// Replace with your actual backend URL
const API_URL = "https://localhost:7048/Food/categories";
export const CATEGORY_MAP = {
  "main-1": "1-р хоол",
  "main-2": "2-р хоол",
  drink: "Уух зүйл",
  dessert: "Амттан",
  // Add more mappings as needed
};
export const getCategories = async () => {
  try {
    // Use the getFoodCategories function from foodApi
    const data = await getFoodCategories();

    // If backend returns array of strings, convert to objects with id
    if (Array.isArray(data) && typeof data[0] === "string") {
      return data.map((name, index) => ({ id: index + 1, name }));
    }

    // If backend returns array of objects with {id, name}, return as is
    if (Array.isArray(data) && data[0]?.name) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

// Alternative: If you want to keep using axios directly, here's the updated version
export const getCategoriesWithAxios = async () => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    // If backend returns array of strings, convert to objects with id
    if (Array.isArray(data) && typeof data[0] === "string") {
      return data.map((name, index) => ({ id: index + 1, name }));
    }

    // If backend returns array of objects with {id, name}, return as is
    if (Array.isArray(data) && data[0]?.name) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

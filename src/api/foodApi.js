// src/api/foodApi.js

// Base URL for your API - adjust this to match your backend URL
const API_BASE_URL = "https://localhost:7048";

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }
  return response.json();
};

// Get all foods or foods by category
export const getFoods = async (category = null) => {
  try {
    let url = `${API_BASE_URL}/Food`;

    // If category is provided, use the by-category endpoint
    if (category) {
      url = `${API_BASE_URL}/Food/by-category?category=${encodeURIComponent(
        category
      )}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

// Get food by ID
export const getFoodById = async (foodId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/${foodId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    throw error;
  }
};
// export API_BASE_URL if needed elsewhere
export { API_BASE_URL };
// Add new food
// export const addFood = async (foodData) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/Food`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         foodName: foodData.foodName,
//         foodCategory: foodData.foodCategory,
//         foodPrice: foodData.foodPrice,
//         foodDescription: foodData.foodDescription,
//         foodImageUrl: foodData.foodImageUrl,
//       }),
//     });

//     return await handleResponse(response);
//   } catch (error) {
//     console.error("Error adding food:", error);
//     throw error;
//   }
// };
export const addFood = async (foodData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error adding food:", error);
    throw error;
  }
};

// Update existing food
export const updateFood = async (food) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Food`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // PUT returns NoContent (204), so no JSON to parse
    return true;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
};

// Delete food
export const deleteFood = async (foodId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/${foodId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // DELETE returns NoContent (204), so no JSON to parse
    return true;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw error;
  }
};

// Get foods by category (alternative method if you prefer separate function)
export const getFoodsByCategory = async (category) => {
  return getFoods(category);
};

// Get all food categories
export const getFoodCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Food/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching food categories:", error);
    return [];
  }
};

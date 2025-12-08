import api from "../Api/axios";

// ✅ Fetch user profile by slug
export const fetchUserCart = async (payload) => {
  try {
    const response = await api.post(`/stripe-payments`, payload, {
      withCredentials: true,
    });
    return response.data; // includes { data: {...}, success: true, status: 200 }
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};
// https://nfc.aardana.com/api/stripe-payments

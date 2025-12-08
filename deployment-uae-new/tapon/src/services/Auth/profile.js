import api from "../Api/axios";

// ✅ Fetch user profile by slug
export const fetchUserProfile = async (slug) => {
  try {
    const response = await api.get(`/user-profiles/${slug}`, {
      withCredentials: true,
    });
    return response.data; // includes { data: {...}, success: true, status: 200 }
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

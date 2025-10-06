import api from "../Api/axios";

// ✅ Login
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Register
export const registerUser = async (data) => {
  const response = await api.post("/users", data, { withCredentials: true });
  return response.data;
};

// ✅ Logout
export const logoutUser = async () => {
  const response = await api.post("/logout/me", {}, { withCredentials: true });
  return response.data;
};

// ✅ Get user details
export const getUser = async () => {
  const response = await api.get("/get-user-details", {
    withCredentials: true,
  });
  return response.data;
};

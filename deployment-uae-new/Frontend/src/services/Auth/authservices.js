import api from "../Api/axios";

// ✅ Login
export const loginUser = async (credentials) => {
  const response = await api.post("/api/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Register
export const registerUser = async (data) => {
  const response = await api.post("/api/users", data, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Logout
export const logoutUser = async () => {
  const response = await api.post(
    "/api/logout/me",
    {},
    { withCredentials: true }
  );
  return response.data;
};

// ✅ Get user details
export const getUser = async () => {
  const response = await api.get("/api/get-user-details", {
    withCredentials: true,
  });
  return response.data;
};

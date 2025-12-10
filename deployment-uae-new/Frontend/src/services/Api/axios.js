import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true, // ✅ send HTTP-only cookies automatically
});

api.interceptors.request.use((req) => {
  return req;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log("API error:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

export default api;

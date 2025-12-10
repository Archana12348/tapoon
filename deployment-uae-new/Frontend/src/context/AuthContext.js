import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser, logoutUser, getUser } from "../services/Auth/authservices";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      if (res.success) setUser(res.data);
      else setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (payload) => {
    try {
      const res = await loginUser(payload);
      console.log("Login response:", res);
      debugger;
      if (res.success) {
        setUser(res.user);
        toast.success(res.message || "Logged in successfully!");
        return true;
      } else {
        toast.error(res.message || "Login failed");
        return false;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      const res = await logoutUser();
      if (res.success) {
        setUser(null);
        toast.success("Logged out successfully!");
      } else {
        toast.error(res.message || "Logout failed");
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

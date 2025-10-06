import { useState } from "react";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const { setUser, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const login_type = /^\d{10,15}$/.test(data.email) ? "mobile" : "email";
      const payload = {
        username: data.email,
        password: data.password,
        user_type: "User",
        login_type,
      };

      const success = await login(payload); // ✅ uses authservice + sets user
      console.log("Login success:", success);
      debugger;
      if (success) navigate("/");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockedAction = (action) => {
    toast.warn(
      `You cannot ${action} in the password field for security reasons`,
      {
        position: "top-center",
        autoClose: 3000,
      }
    );
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm shadow-lg border border-sky-200 p-8">
          <h1 className="text-3xl font-bold text-center text-sky-900 mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email / Username */}
            <div>
              <label className="block text-sky-800 mb-2">Email or Mobile</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type="text"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="you@example.com or 9876543210"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sky-800 mb-0">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="••••••••"
                  disabled={loading}
                  onCopy={(e) => {
                    e.preventDefault();
                    handleBlockedAction("copy");
                  }}
                  onCut={(e) => {
                    e.preventDefault();
                    handleBlockedAction("cut");
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    handleBlockedAction("paste");
                  }}
                />

                {showPassword ? (
                  <EyeOff
                    className="absolute right-3 top-3 h-5 w-5 text-sky-500 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 h-5 w-5 text-sky-500 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <div className="text-right mt-0 mb-0">
                <Link
                  to="/forgot-password"
                  className="text-sm text-sky-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-sky-700 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-sky-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

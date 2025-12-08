"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, AlertCircle, CheckCircle, KeyRound } from "lucide-react";
import axios from "axios";
import Button from "../../components/ui/Button";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Get email & token directly from URL params
  useEffect(() => {
    const emailFromUrl = searchParams.get("email") || "";
    const tokenFromUrl = searchParams.get("token") || "";

    console.log("Email from URL:", emailFromUrl);
    console.log("Token from URL:", tokenFromUrl);

    setFormData((prev) => ({
      ...prev,
      email: decodeURIComponent(emailFromUrl),
      token: tokenFromUrl,
    }));
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Submitting reset password:", {
        email: formData.email,
        token: formData.token,
        password: formData.newPassword,
        password_confirmation: formData.confirmPassword,
      });

      const res = await axios.post(
        "https://nfc.premierwebtechservices.com/api/reset-password-new",
        {
          email: formData.email,
          token: formData.token,
          password: formData.newPassword,
          password_confirmation: formData.confirmPassword, // ✅ fixed key
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${formData.token}`, // ✅ include token in headers
          },
        }
      );

      console.log("Response from server:", res.data);

      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error submitting reset password:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error?.password?.[0] ||
          "Failed to reset password. Try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Success screen
  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 p-6">
        <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
        <h2 className="text-2xl font-bold text-sky-900 mb-2">
          Password Reset Successful
        </h2>
        <p className="text-sky-800 text-center max-w-sm">
          Your password has been reset successfully. Redirecting to login...
        </p>
      </div>
    );
  }

  // ✅ Reset form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <KeyRound className="h-8 w-8 text-sky-600 mr-2" />
          <span className="text-2xl font-bold text-sky-700">Tapoon</span>
        </div>

        <h2 className="text-2xl font-semibold text-sky-900 text-center mb-2">
          Reset Your Password
        </h2>
        <p className="text-center text-sky-700 text-sm mb-6">
          Enter your new password below to regain access.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center justify-center p-3 text-sm text-red-600 bg-red-50 rounded-md">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sky-900 mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full border border-sky-200 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sky-900 mb-1 text-sm">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                className="w-full border border-sky-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sky-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sky-900 mb-1 text-sm">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full border border-sky-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-sky-400 outline-none pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sky-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>

          <p className="text-center text-sm text-sky-800">
            Remember your password?{" "}
            <Link
              to="/sign-in"
              className="text-sky-600 hover:text-sky-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

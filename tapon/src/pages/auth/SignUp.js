import { useState } from "react";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  User,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { registerUser } from "../../services/Auth/authservices";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    avatar: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatarBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        avatar: avatarBase64,
      };

      const res = await registerUser(payload);
      if (res.success) {
        toast.success(res.message || "Signup successful!");
        setUser(res.user);
        navigate("/sign-in");
      } else {
        toast.error(res.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
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
            Sign Up
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sky-800 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type="text"
                  {...register("name")}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sky-800 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type="text"
                  {...register("email")}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sky-800 mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type="text"
                  {...register("phone")}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="1234567890"
                  disabled={loading}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
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
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sky-800 mb-0">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-sky-500" />
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
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

                {showConfirm ? (
                  <EyeOff
                    className="absolute right-3 top-3 h-5 w-5 text-sky-500 cursor-pointer"
                    onClick={() => setShowConfirm(false)}
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 h-5 w-5 text-sky-500 cursor-pointer"
                    onClick={() => setShowConfirm(true)}
                  />
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Avatar Upload with Drag & Drop & Full-Height Preview */}
            <div>
              <label className="block text-sky-800 mb-2">Avatar</label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) =>
                  e.currentTarget.classList.add("ring-2", "ring-sky-500")
                }
                onDragLeave={(e) =>
                  e.currentTarget.classList.remove("ring-2", "ring-sky-500")
                }
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  handleAvatarChange({ target: { files: [file] } });
                  e.currentTarget.classList.remove("ring-2", "ring-sky-500");
                }}
                className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer group h-64 overflow-hidden"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  {...register("avatar")}
                  onChange={handleAvatarChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={loading}
                />

                {/* Show this only if no image is selected */}
                {!avatarPreview && (
                  <>
                    <ImageIcon className="h-6 w-6 text-sky-500 mb-2" />
                    <p className="text-sm text-sky-700 text-center">
                      Drag & drop or{" "}
                      <span className="text-sky-600 font-semibold underline cursor-pointer">
                        click to upload
                      </span>
                    </p>
                  </>
                )}

                {/* Full cover image preview */}
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition flex justify-center items-center"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-sky-800 mt-6">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-sky-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

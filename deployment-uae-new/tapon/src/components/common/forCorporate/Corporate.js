import React, { useState } from "react";
import axios from "axios";
import {
  Briefcase,
  ShoppingCart,
  Utensils,
  Users,
  GraduationCap,
  Building2,
  Plane,
  Laptop,
  Mail,
  Store,
  Code2,
  ClipboardCheck,
  Share2,
  HeartPulse,
  Car,
  FileText,
} from "lucide-react";
import Button from "../../ui/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import WhatsAppButton from "../../sections/WhatsAppButtton";

const products = [
  {
    icon: <Briefcase className="h-8 w-8 text-cyan-400" />,
    title: "CRM",
    desc: "Integrated CRM with efficient process management.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-cyan-400" />,
    title: "B2B OMS",
    desc: "Simplified B2B order management & payments.",
  },
  {
    icon: <Utensils className="h-8 w-8 text-cyan-400" />,
    title: "Food Ordering",
    desc: "Manage orders from Kitchen to customer.",
  },
  {
    icon: <Users className="h-8 w-8 text-cyan-400" />,
    title: "Recruitment Agency",
    desc: "Manage end to end employee life cycle.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-cyan-400" />,
    title: "Edtech Institutions",
    desc: "Manage online & offline classes with student assessments.",
  },
  {
    icon: <Building2 className="h-8 w-8 text-cyan-400" />,
    title: "Hotel & Resorts",
    desc: "Manage day out packages, activities and room bookings.",
  },
  {
    icon: <Plane className="h-8 w-8 text-cyan-400" />,
    title: "Travel Agency",
    desc: "Sell and manage packages & ticketing system.",
  },
  {
    icon: <Laptop className="h-8 w-8 text-cyan-400" />,
    title: "Job Portal",
    desc: "Solution to connect talent with opportunity.",
  },
  {
    icon: <Mail className="h-8 w-8 text-cyan-400" />,
    title: "Email Marketing",
    desc: "Transform emails into opportunities with inbox delivery.",
  },
  {
    icon: <Store className="h-8 w-8 text-cyan-400" />,
    title: "Retail eCommerce",
    desc: "Grow your business with eCommerce solutions.",
  },
  {
    icon: <Code2 className="h-8 w-8 text-cyan-400" />,
    title: "Travel API, GDS",
    desc: "Integrate technology of the future in your system.",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-cyan-400" />,
    title: "Candidate Assessments",
    desc: "Discover the best fit with confidence.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-cyan-400" />,
    title: "Affiliate Marketing",
    desc: "Boost profits with smart affiliations.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-cyan-400" />,
    title: "Diagnostic Centre",
    desc: "Manage and sell health checkup packages.",
  },
  {
    icon: <Car className="h-8 w-8 text-cyan-400" />,
    title: "Car Rental",
    desc: "Expand your car rental business with ease.",
  },
  {
    icon: <FileText className="h-8 w-8 text-cyan-400" />,
    title: "Online Test Management",
    desc: "Online test series and quiz simulator app.",
  },
];

export default function ProductsSolutions() {
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    company: "",
    quantity: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData.phone);
    debugger;

    // ✅ Simple validation
    if (!formData.name) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email address.");
      return;
    }

    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // ✅ Show loading spinner with Swal
    Swal.fire({
      title: "Sending...",
      text: "Please wait while we send your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      setLoading(true);

      const response = await axios.post(
        "https://nfc.premierwebtechservices.com/api/nfc-bulk-order",
        {
          name: formData.name,
          company: formData.company || "",
          manager: formData.manager || "",
          quantity: Number(formData.quantity) || 1,
          email: formData.email || "",
          phone: formData.phone || "",
          message: formData.message || "",
          address: formData.address || "",
        }
      );

      console.log("Response:", response);
      debugger;

      Swal.close(); // close loader

      if (response.data?.success || response.status === 200) {
        // ✅ Success popup
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Your bulk order request was sent successfully.",
          timer: 2500,
          showConfirmButton: false,
        });

        // Reset form
        setFormData({
          name: "",
          manager: "",
          company: "",
          quantity: "",
          phone: "",
          email: "",
          address: "",
          message: "",
        });
      } else {
        // ❌ Error popup
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            response.data?.message ||
            "Failed to send your request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text:
          error?.response?.data?.message ||
          "Failed to send your request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white text-slate-900 py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-16 text-center">
          PRODUCTS & SOLUTIONS BY INDUSTRIES
        </h2>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
          {products.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div>{item.icon}</div>
              <div>
                <h3 className="text-[16px] font-semibold text-sky-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-[14px] text-gray-700 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Order Form */}
        <div className="mt-16 border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8 rounded-lg text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Bulk Orders</h2>
          <p className="text-slate-700 mb-6">
            For bulk orders, please contact our sales team. We offer custom
            pricing and dedicated support for large volume orders.
          </p>

          <div className="mt-10 bg-white/80 shadow-md p-8 rounded-lg max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: "Name", name: "name", type: "text", require: true },
                { label: "Manager Name", name: "manager", type: "text" },
                { label: "Company Name", name: "company", type: "text" },
                { label: "Quantity", name: "quantity", type: "number" },
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "tel",
                  require: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  require: true,
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sky-900 text-left mb-1 font-medium">
                    {field.label}
                    {field.require && (
                      <span className="text-red-600 text-lg leading-none ml-1">
                        *
                      </span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Your ${field.label}`}
                    required={field.required || false}
                    className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sky-900 text-left mb-1 font-medium">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  rows={3}
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>

              <div>
                <label className="block text-sky-900 text-left mb-1 font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md transition w-full flex justify-center items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      {/* <a
        href="https://wa.me/971581770786" // 👈 Replace with your WhatsApp number (no + or spaces)
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="h-7 w-7"
        >
          <path d="M16.66 13.83c-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.51.12-.15.23-.58.75-.72.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.84-1.14-.68-.6-1.14-1.33-1.27-1.55-.13-.23-.01-.35.1-.47.1-.1.23-.26.34-.38.11-.13.15-.21.23-.36.08-.15.04-.28-.02-.4-.06-.12-.51-1.22-.7-1.67-.19-.45-.38-.38-.51-.38h-.43c-.15 0-.4.06-.61.28-.21.23-.8.77-.8 1.88s.82 2.18.94 2.33c.12.15 1.6 2.44 3.87 3.42.54.23.96.36 1.29.46.54.17 1.03.15 1.42.09.43-.06 1.36-.56 1.55-1.11.19-.55.19-1.02.13-1.11-.06-.09-.21-.15-.43-.26zM12 2C6.48 2 2 6.48 2 12c0 1.97.58 3.8 1.57 5.34L2 22l4.83-1.53A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
      </a> */}
      <div>
        {/* WhatsApp Floating Button */}
        <WhatsAppButton
          phoneNumber="971581770786"
          message="Hi! I’m interested in your services."
        />
      </div>
    </section>
  );
}

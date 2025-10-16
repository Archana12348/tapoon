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

    // Simple validation
    if (
      !formData.name ||
      !formData.manager ||
      !formData.company ||
      !formData.quantity ||
      !formData.phone ||
      !formData.email
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://nfc.premierwebtechservices.com/api/nfc-bulk-order",
        {
          name: formData.name,
          company: formData.company,
          manager: formData.manager,
          quantity: Number(formData.quantity),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          address: formData.address,
        }
      );
      console.log("response", response);
      debugger;
      if (response.data?.success || response.status === 200) {
        toast.success("Your bulk order request was sent successfully!", {
          autoClose: 2000, // 2000ms = 2 seconds
        });

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
        toast.error("Failed to send your request. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.", {
        autoClose: 2000,
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
                { label: "Name", name: "name", type: "text" },
                { label: "Manager Name", name: "manager", type: "text" },
                { label: "Company Name", name: "company", type: "text" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Phone", name: "phone", type: "tel" },
                { label: "Email", name: "email", type: "email" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sky-900 text-left mb-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Your ${field.label}`}
                    className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sky-900 text-left mb-1">
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
                <label className="block text-sky-900 text-left mb-1">
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
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-md transition w-full"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

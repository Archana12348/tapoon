import React from "react";
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
    desc: "Manage orders from from Kitchen to customer.",
  },
  {
    icon: <Users className="h-8 w-8 text-cyan-400" />,
    title: "Recruitment Agency",
    desc: "Manage end to end employee life cycle.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-cyan-400" />,
    title: "Edtech Institutions",
    desc: "Manage online live and f2f classes with student assesment.",
  },
  {
    icon: <Building2 className="h-8 w-8 text-cyan-400" />,
    title: "Hotel & Resorts",
    desc: "Efficiently manage day out packages, activities and room booking.",
  },
  {
    icon: <Plane className="h-8 w-8 text-cyan-400" />,
    title: "Travel Agency",
    desc: "Sell and manage your packages, & ticking system.",
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
    desc: "Grow your business with conversion friendly eCommerce store.",
  },
  {
    icon: <Code2 className="h-8 w-8 text-cyan-400" />,
    title: "Travel API, GDS",
    desc: "Integrate technology of the future in your system.",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-cyan-400" />,
    title: "Candidate Assessments",
    desc: "Discover the best fit asses with confidence.",
  },
  {
    icon: <Share2 className="h-8 w-8 text-cyan-400" />,
    title: "Affiliate Marketing",
    desc: "Boost profits, reward customers with smart affiliations.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-cyan-400" />,
    title: "Diagnostic Centre",
    desc: "Collect manage, sell health checkup packages.",
  },
  {
    icon: <Car className="h-8 w-8 text-cyan-400" />,
    title: "Car Rental",
    desc: "Expand your car rental business with cab booking app.",
  },
  {
    icon: <FileText className="h-8 w-8 text-cyan-400" />,
    title: "Online Test Management",
    desc: "Online test series, quiz simulator application.",
  },
];

export default function ProductsSolutions() {
  return (
    <section className="bg-white text-slate-900 py-10 md:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Products Grid */}
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-16 text-center">
          PRODUCTS & SOLUTIONS BY INDUSTRIES
        </h2>
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

        {/* Bulk Order Section */}
        <div className="mt-16 border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8 rounded-lg text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Bulk Orders</h2>
          <p className="text-slate-700 mb-6">
            For bulk orders, please contact our sales team. We offer custom
            pricing and dedicated support for large volume orders.
          </p>
          {/* Mail Section */}
          <div className="mt-14 border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8 rounded-lg max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center"></h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sky-900 text-left mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              <div>
                <label className="block text-sky-900 text-left mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              <div>
                <label className="block text-sky-900 text-left mb-1">
                  Message
                </label>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                ></textarea>
              </div>
              <Button
                type="submit"
                className=" text-white px-6 py-2 rounded-md  transition"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

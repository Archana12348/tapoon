import React, { useState } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "../../ui/Button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "https://nfc.premierwebtechservices.com/api/contact",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      debugger;
      if (response.data.success) {
        setResponseMessage("✅ Message sent successfully!");
        setTimeout(() => {
          setResponseMessage("");
        }, 2000);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setResponseMessage("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setResponseMessage("⚠️ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-black md:text-5xl">
            Contact Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-sky-900">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 shadow-md p-8">
              <h3 className="mb-6 text-2xl font-bold text-black">
                Get in touch
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/50">
                    <Mail className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-sky-900">Email</h4>
                    <p className="text-gray-700">taponnsolutions@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/50">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-sky-900">Phone</h4>
                    <p className="text-gray-700">971581770786</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/50">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-sky-900">Office</h4>
                    <p className="text-gray-700">
                      Block B - B49 - 189 - Dubai - United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 shadow-md p-8">
              <h3 className="mb-4 text-xl font-bold text-black">
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "phone", "subject"].map((field) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-medium text-sky-900">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    placeholder={`Your ${field}`}
                    className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                  />
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium text-sky-900">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your message..."
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700 transition"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-5 w-5" />
              </Button>

              {responseMessage && (
                <p className="text-center mt-4 font-medium text-sky-900">
                  {responseMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

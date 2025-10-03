import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "../../ui/Button";

// Agar aapke paas Button component nahi hai to normal button use karein
// import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // phone field add kiya
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Yahan API ya backend call kar sakte ho
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 md:py-32 ">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block rounded-full bg-cyan-900 px-4 py-2 text-sm text-cyan-400">
            Get In Touch
          </div>
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
            {/* Contact Info */}
            <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8">
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
                    <p className="text-gray-700">support@nfcard.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/50">
                    <Phone className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-sky-900">Phone</h4>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-950/50">
                    <MapPin className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-sky-900">Office</h4>
                    <p className="text-gray-700">
                      123 Tech Street, San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8">
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
          <div className="rounded-2xl border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-sky-900">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-sky-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              {/* Phone Number */}
              <div>
                <label className="mb-2 block text-sm font-medium text-sky-900">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-sky-900">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
                />
              </div>
              {/* Message */}
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
              {/* Submit Button */}
              <Button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-700 transition"
              >
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

export default function DetailsStep({ details, onChange, errors }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Enter your details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sky-900">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={details.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sky-900">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sky-900">
            Confirm Email
          </label>
          <input
            type="email"
            name="email"
            value={details.confirmEmail}
            onChange={(e) => onChange("confirmEmail", e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
          />
          {errors.confirmEmail && (
            <p className="text-red-500 text-sm">{errors.confirmEmail}</p>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-sky-900">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={details.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            required
            placeholder="+91 9876543210"
            className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-sky-900">
            Address
          </label>
          <textarea
            name="message"
            value={details.address}
            onChange={(e) => onChange("address", e.target.value)}
            required
            rows={5}
            placeholder="Your Address..."
            className="w-full rounded-lg border border-cyan-900/20 bg-slate-900/50 px-4 py-3 text-white placeholder-white focus:ring-2 focus:ring-cyan-700/50"
          />
        </div>
      </div>
    </div>
  );
}

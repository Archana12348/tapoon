import React from "react";

export default function StepContact({
  data,
  handleChange,
  handleNext,
  handleBack,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>

      <div className="space-y-3">
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={data.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={data.phone_number || ""}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block mb-1 font-medium">WhatsApp Number</label>
          <input
            type="text"
            name="whatsapp_number"
            value={data.whatsapp_number || ""}
            onChange={handleChange}
            placeholder="Enter WhatsApp number"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block mb-1 font-medium">Website</label>
          <input
            type="text"
            name="website_url"
            value={data.website_url || ""}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"
            value={data.city || ""}
            onChange={handleChange}
            placeholder="Enter your city"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* State */}
        <div>
          <label className="block mb-1 font-medium">State</label>
          <input
            type="text"
            name="state"
            value={data.state || ""}
            onChange={handleChange}
            placeholder="Enter your state"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={data.country || ""}
            onChange={handleChange}
            placeholder="Enter your country"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Area */}
        <div>
          <label className="block mb-1 font-medium">Area</label>
          <input
            type="text"
            name="area"
            value={data.area || ""}
            onChange={handleChange}
            placeholder="Enter your area"
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

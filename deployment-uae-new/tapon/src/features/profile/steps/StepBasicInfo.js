import React, { useEffect } from "react";

export default function StepBasicInfo({
  data,
  handleChange,
  handleNext,
  loading,
}) {
  // Auto-generate slug when username changes
  useEffect(() => {
    if (data.username) {
      const slug = data.username
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, ""); // Remove invalid characters

      if (slug !== data.slug) {
        handleChange({ target: { name: "slug", value: slug } });
      }
    }
  }, [data.username]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-sky-900 border-b border-sky-200 pb-2">
        Basic Information
      </h3>

      <div className="space-y-3">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={data.name || ""}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="border p-2 rounded w-full"
            disabled={loading}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={data.username || ""}
            onChange={handleChange}
            placeholder="Enter a username"
            className="border p-2 rounded w-full"
            disabled={loading}
          />
        </div>

        {/* Slug (auto-generated) */}
        <div>
          <label className="block mb-1 font-medium">
            Slug (auto-generated)
          </label>
          <input
            type="text"
            name="slug"
            value={data.slug || ""}
            readOnly
            className="border p-2 rounded w-full bg-gray-100 text-gray-600"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block mb-1 font-medium">Headline</label>
          <input
            type="text"
            name="headline"
            value={data.headline || ""}
            onChange={handleChange}
            placeholder="Enter headline"
            className="border p-2 rounded w-full"
            disabled={loading}
          />
        </div>

        {/* About */}
        <div>
          <label className="block mb-1 font-medium">About</label>
          <textarea
            name="about"
            value={data.about || ""}
            onChange={handleChange}
            placeholder="Enter about yourself"
            className="border p-2 rounded w-full resize-none"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            value={data.bio || ""}
            onChange={handleChange}
            placeholder="Enter your bio"
            className="border p-2 rounded w-full resize-none"
            rows={3}
            disabled={loading}
          />
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

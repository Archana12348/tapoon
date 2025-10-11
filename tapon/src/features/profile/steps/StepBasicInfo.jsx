import React, { useState, useEffect } from "react";

export default function StepBasicInfo({
  data,
  handleChange,
  handleNext,
  loading,
}) {
  console.log("StepBasicInfo data:", data);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  // ✅ When editing: show existing image previews (if available)
  useEffect(() => {
    if (data.profile_picture && typeof data.profile_picture === "string") {
      setAvatarPreview(data.profile_picture);
    }
    if (data.cover_photo && typeof data.cover_photo === "string") {
      setCoverPreview(data.cover_photo);
    }
  }, [data.profile_picture, data.cover_photo]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      if (name === "profile_picture") setAvatarPreview(previewUrl);
      if (name === "cover_photo") setCoverPreview(previewUrl);
      handleChange(e);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Basic Information</h3>

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

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={data.slug || ""}
            onChange={handleChange}
            placeholder="Enter slug"
            className="border p-2 rounded w-full"
            disabled={loading}
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

        {/* Profile Picture */}
        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Profile Preview"
              className="h-24 w-24 rounded-full object-cover mb-2 border"
            />
          )}
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            disabled={loading}
          />
        </div>

        {/* Cover Photo */}
        <div>
          <label className="block mb-1 font-medium">Cover Photo</label>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="h-24 w-full object-cover mb-2 border rounded"
            />
          )}
          <input
            type="file"
            name="cover_photo"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
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

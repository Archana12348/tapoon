import React from "react";

export default function StepPreview({
  data,
  handleSubmit,
  handleBack,
  status,
  error,
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Preview Data</h3>

      {/* Preview basic info */}
      <div className="space-y-2 border p-3 rounded">
        <p>
          <strong>Full Name:</strong> {data.name}
        </p>
        <p>
          <strong>Username:</strong> {data.username}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone_number}
        </p>
        <p>
          <strong>WhatsApp Phone:</strong> {data.whatsapp_phone_number}
        </p>
        <p>
          <strong>Profile Type:</strong> {data.profile_type}
        </p>
        <p>
          <strong>Skills:</strong> {data.skills?.join(", ")}
        </p>
      </div>

      <div className="space-y-2 border p-3 rounded ">
        <p>
          <strong>Social Links:</strong>
        </p>
        <p>
          <strong>LinkedIn:</strong> {data?.linkedin_url}
        </p>
        <p>
          <strong>Instagram:</strong> {data?.instagram_url}
        </p>
        <p>
          <strong>Facebook:</strong> {data?.facebook_url}
        </p>
        <p>
          <strong>Twitter:</strong> {data?.twitter_url}
        </p>
        <p>
          <strong>YouTube:</strong> {data?.youtube_url}
        </p>
        <p>
          <strong>TikTok:</strong> {data?.tiktok_url}
        </p>
        <p>
          <strong>Snapchat:</strong> {data?.snapchat_url}
        </p>
        <p>
          <strong>GitHub:</strong> {data?.github_url}
        </p>
        <p>
          <strong>Behance:</strong> {data?.behance_url}
        </p>
        <p>
          <strong>Dribbble:</strong> {data?.dribbble_url}
        </p>
        <p>
          <strong>Pinterest:</strong> {data?.pinterest_url}
        </p>
        <p>
          <strong>Threads:</strong> {data?.threads_url}
        </p>
      </div>

      <div className="space-y-2 border p-3 rounded ">
        SEO
        <p>
          <strong> Seo Title </strong>
          {data?.seo_title}
        </p>
        <p>
          <strong> Seo Description </strong>
          {data?.seo_description}
        </p>
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
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </div>

      {status === "succeeded" && (
        <p className="text-green-600 mt-2">Profile submitted successfully!</p>
      )}
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
}

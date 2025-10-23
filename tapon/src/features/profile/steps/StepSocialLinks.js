import React, { useState } from "react";

function StepSocialLinks({ data, handleBack, handleNext, handleChange }) {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="url"
              name="linkedin_url"
              value={data.linkedin_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter LinkedIn URL"
            />
          </div>

          {/* Instagram */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Instagram</label>
            <input
              type="url"
              name="instagram_url"
              value={data.instagram_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Instagram URL"
            />
          </div>

          {/* Facebook */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Facebook</label>
            <input
              type="url"
              name="facebook_url"
              value={data.facebook_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Facebook URL"
            />
          </div>

          {/* Twitter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Twitter</label>
            <input
              type="url"
              name="twitter_url"
              value={data.twitter_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Twitter URL"
            />
          </div>

          {/* YouTube */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">YouTube</label>
            <input
              type="url"
              name="youtube_url"
              value={data.youtube_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter YouTube URL"
            />
          </div>

          {/* TikTok */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">TikTok</label>
            <input
              type="url"
              name="tiktok_url"
              value={data.tiktok_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter TikTok URL"
            />
          </div>

          {/* Snapchat */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Snapchat</label>
            <input
              type="url"
              name="snapchat_url"
              value={data.snapchat_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Snapchat URL"
            />
          </div>

          {/* GitHub */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">GitHub</label>
            <input
              type="url"
              name="github_url"
              value={data.github_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter GitHub URL"
            />
          </div>

          {/* Behance */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Behance</label>
            <input
              type="url"
              name="behance_url"
              value={data.behance_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Behance URL"
            />
          </div>

          {/* Dribbble */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Dribbble</label>
            <input
              type="url"
              name="dribbble_url"
              value={data.dribbble_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Dribbble URL"
            />
          </div>

          {/* Pinterest */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Pinterest</label>
            <input
              type="url"
              name="pinterest_url"
              value={data.pinterest_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Pinterest URL"
            />
          </div>

          {/* Threads */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Threads</label>
            <input
              type="url"
              name="threads_url"
              value={data.threads_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter Threads URL"
            />
          </div>
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
    </>
  );
}

export default StepSocialLinks;

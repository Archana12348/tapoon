import React, { useState } from "react";

function StepSeo({ handleBack, handleNext }) {
  const [seoData, setSeoData] = useState({
    seo_title: "",
    seo_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">SEO Settings</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* SEO Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">SEO Title</label>
            <input
              type="text"
              name="seo_title"
              value={seoData.seo_title}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter SEO Title"
            />
          </div>

          {/* SEO Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">SEO Description</label>
            <textarea
              name="seo_description"
              value={seoData.seo_description}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded resize-none"
              placeholder="Enter SEO Description"
              rows={4}
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
          onClick={() => handleNext(seoData)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StepSeo;

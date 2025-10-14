import React, { useState } from "react";

function StepCustom({ data, handleBack, handleNext }) {
  const [customSettings, setCustomSettings] = useState({
    nfc_card_id: "",
    is_public: true,
    allow_contact_form: true,
    dark_mode_enabled: true,
    custom_theme_color: "#333333",
    qr_code_url: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Custom Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NFC Card ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">NFC Card ID</label>
            <input
              type="text"
              name="nfc_card_id"
              value={customSettings.nfc_card_id}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter NFC Card ID"
            />
          </div>

          {/* QR Code URL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">QR Code URL</label>
            <input
              type="url"
              name="qr_code_url"
              value={customSettings.qr_code_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter QR Code URL"
            />
          </div>
          {/*  VCard ID */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">VCard ID</label>
            <input
              type="text"
              name="vcard_url"
              value={customSettings.vcard_id}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter VCard ID"
            />
          </div>

          {/* PDF Resume URL */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">PDF Resume URL</label>
            <input
              type="url"
              name="pdf_resume_url"
              value={customSettings.pdf_resume_url}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter PDF Resume URL"
            />
          </div>

          {/* Is Public */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-xl font-medium">Profile is Public</label>
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center gap-0 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_public"
                  checked={customSettings.is_public}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </label>
              <span className="text-xl">
                {customSettings.is_public ? "On" : "Off"}
              </span>
            </div>
          </div>

          {/* Allow Contact Form */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-xl font-medium">Allow Contact Form</label>
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="allow_contact_form"
                  checked={customSettings.allow_contact_form}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </label>
              <span className="text-xl">
                {customSettings.allow_contact_form ? "On" : "Off"}
              </span>
            </div>
          </div>

          {/* Status Mode Enabled */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-xl font-medium">Status Mode Enabled</label>
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={data.status}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </label>
              <span className="text-xl">
                {customSettings.dark_mode_enabled ? "On" : "Off"}
              </span>
            </div>
          </div>
          {/* Dark Mode Enabled */}
          <div className="flex items-center gap-4 mt-6">
            <label className="text-xl font-medium">Enable Dark Mode</label>
            <div className="flex items-center space-x-2">
              <label className="relative inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  name="dark_mode_enabled"
                  checked={customSettings.dark_mode_enabled}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
              </label>
              <span className="text-xl">
                {customSettings.dark_mode_enabled ? "On" : "Off"}
              </span>
            </div>
          </div>

          {/* Custom Theme Color */}
          <div className="flex items-center space-x-4">
            <label className="text-xl font-medium">Custom Theme Color</label>
            <input
              type="color"
              name="custom_theme_color"
              value={customSettings.custom_theme_color}
              onChange={handleChange}
              className="w-24 h-16 p-1 border border-gray-300 rounded"
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
          onClick={() => handleNext(customSettings)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StepCustom;

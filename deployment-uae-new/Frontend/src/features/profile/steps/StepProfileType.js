import React, { useState } from "react";

function StepCustom({ handleBack, handleNext }) {
  const [formData, setFormData] = useState({
    area: "",
    website_url: "",
    headline: "",
    bio: "",
    company_name: "",
    job_title: "",
    industry: "",
    skills: [],
    services: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    if (serviceInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()],
      }));
      setServiceInput("");
    }
  };

  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Custom Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Headline */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter headline"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded resize-none"
              placeholder="Enter bio"
              rows={3}
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
          onClick={() => handleNext(formData)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StepCustom;

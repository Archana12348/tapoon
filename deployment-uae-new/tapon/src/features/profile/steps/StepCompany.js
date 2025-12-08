import React from "react";

function StepCustom({ data, handleBack, handleChange, handleNext }) {
  console.log("Rendering StepCustom with data:", data);

  // Add Skill
  const addSkill = () => {
    if (data.skillInput.trim()) {
      handleChange({
        target: {
          name: "skills",
          value: [...data.skills, data.skillInput.trim()],
        },
      });
      handleChange({
        target: {
          name: "skillInput",
          value: "", // Reset input after adding
        },
      });
    }
  };

  // Remove Skill
  const removeSkill = (index) => {
    handleChange({
      target: {
        name: "skills",
        value: data.skills.filter((_, i) => i !== index),
      },
    });
  };

  // Add Service
  const addService = () => {
    if (data.serviceInput.trim()) {
      handleChange({
        target: {
          name: "services",
          value: [...data.services, data.serviceInput.trim()],
        },
      });
      handleChange({
        target: {
          name: "serviceInput",
          value: "", // Reset input after adding
        },
      });
    }
  };

  // Remove Service
  const removeService = (index) => {
    handleChange({
      target: {
        name: "services",
        value: data.services.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={data.company_name}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter company name"
            />
          </div>

          {/* Job Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="job_title"
              value={data.job_title}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter job title"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={data.industry}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter industry"
            />
          </div>

          {/* Profile Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Profile Type</label>
            <input
              type="text"
              name="profile_type"
              value={data.profile_type}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded"
              placeholder="Enter profile type"
            />
          </div>

          {/* Skills (Array) */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium mb-1">Skills</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.skillInput}
                onChange={(e) => handleChange(e)}
                name="skillInput"
                className="border border-gray-300 px-3 py-2 rounded flex-1"
                placeholder="Enter a skill"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Add Skill
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Services (Array) */}
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium mb-1">Services</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.serviceInput}
                onChange={(e) => handleChange(e)}
                name="serviceInput"
                className="border border-gray-300 px-3 py-2 rounded flex-1"
                placeholder="Enter a service"
              />
              <button
                type="button"
                onClick={addService}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Add Service
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                >
                  {service}
                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    className="text-red-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
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
          onClick={() => handleNext(data)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StepCustom;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextStep,
  prevStep,
  updateField,
  submitProfile,
  fetchProfile,
  updateProfile,
} from "./profileSlice";
import { useParams } from "react-router-dom";

import StepBasicInfo from "./steps/StepBasicInfo";
import StepContact from "./steps/StepContact";
import StepGallery from "./steps/StepGallery";
import StepPreview from "./steps/StepPreview";
import StepSeo from "./steps/StepSeo";
import SocialMedia from "./steps/StepSocialLinks";
import CustomLink from "./steps/StepCustom";
import StepCompanyDetails from "./steps/StepCompany";

export default function MultiStepProfileForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const profile = useSelector((state) => state.profile);
  const { step, data, status, error } = profile;

  const [submitted, setSubmitted] = useState(false);

  // Fetch existing profile if editing
  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchProfile(id));
    }
  }, [dispatch, id, isEditMode]);

  // Safe error rendering function
  const renderError = (err) => {
    if (!err) return null;

    if (typeof err === "string") return err;

    if (err.message) return err.message;

    if (err.errors) {
      if (typeof err.errors === "string") return err.errors;
      if (Array.isArray(err.errors)) return err.errors.join(", ");
      if (typeof err.errors === "object")
        return Object.values(err.errors).flat().join(", ");
    }

    // If it's an object with status/success/message
    if (err.status && err.success !== undefined && err.message)
      return err.message;

    return "An unexpected error occurred";
  };

  const handleChange = (eOrName, maybeValue) => {
    let name, value;

    // Case 1: called from normal <input onChange={handleChange}>
    if (typeof eOrName === "object" && eOrName.target) {
      const { target } = eOrName;
      const { type, checked, files } = target;

      name = target.name;
      value =
        type === "file"
          ? files?.[0]
          : type === "checkbox"
          ? checked
          : target.value;
    }
    // Case 2: called manually, e.g. handleChange("avatar", file)
    else {
      name = eOrName;
      value = maybeValue;
    }

    dispatch(updateField({ [name]: value }));
  };

  const handleFileChange = (name, files) => {
    dispatch(updateField({ [name]: files }));
  };

  const handleNext = () => dispatch(nextStep());
  const handleBack = () => step > 1 && dispatch(prevStep());

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isEditMode) {
      // Ensure the ID from URL or fetched data is included
      const profileId = data?.id;
      console.log(
        "Submitting updated profile with ID:",
        profileId,
        "and data:",
        data
      );

      dispatch(
        updateProfile({
          id: profileId,
          profileData: { ...data, id: profileId },
        })
      );
    } else {
      dispatch(submitProfile(data));
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <StepBasicInfo
            data={data}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <StepContact
            data={data}
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        return (
          <StepGallery
            data={data}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 4:
        return (
          <StepCompanyDetails
            data={data}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 5:
        return (
          <CustomLink
            data={data}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 6:
        return (
          <SocialMedia
            data={data}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 7:
        return (
          <StepSeo
            data={data}
            handleChange={handleChange}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      case 8:
        return (
          <StepPreview
            data={data}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            status={status}
            error={error}
            isEditMode={isEditMode}
          />
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 mt-6 mb-6 border-2 border-blue-600">
      <h2 className="text-2xl font-bold text-center">
        {isEditMode ? "Edit Profile" : "Create Profile"} — Step {step} of 8
      </h2>

      <form onSubmit={handleSubmit}>{renderStep()}</form>

      {/* Status */}
      {status === "loading" && (
        <p className="text-blue-500 text-center mt-2">Processing...</p>
      )}

      {/* Success */}
      {submitted && status === "succeeded" && (
        <p className="text-green-600 text-center mt-2">
          {isEditMode
            ? "Profile updated successfully!"
            : "Profile created successfully!"}
        </p>
      )}

      {/* Error */}
      {submitted && error && (
        <p className="text-red-500 text-center mt-2">
          Error: {renderError(error)}
        </p>
      )}
    </div>
  );
}

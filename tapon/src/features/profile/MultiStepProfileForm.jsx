import React, { useEffect } from "react";
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
  const { id } = useParams(); // If present, edit mode
  const isEditMode = Boolean(id);

  const profile = useSelector((state) => state.profile);
  const { step, data, status, error } = profile;

  useEffect(() => {
    if (isEditMode) {
      console.log("Fetching profile for edit, ID:", id);
      dispatch(fetchProfile(id));
    }
  }, [dispatch, id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    dispatch(updateField({ [name]: type === "file" ? files[0] : value }));
  };

  const handleFileChange = (name, files) => {
    dispatch(updateField({ [name]: files }));
  };

  const handleNext = () => dispatch(nextStep());
  const handleBack = () => step > 1 && dispatch(prevStep());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateProfile({ id, profileData: data }));
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

      {status === "loading" && (
        <p className="text-blue-500 text-center mt-2">Processing...</p>
      )}
      {status === "succeeded" && (
        <p className="text-green-600 text-center mt-2">
          {isEditMode
            ? "Profile updated successfully!"
            : "Profile created successfully!"}
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-2">Error: {error}</p>}
    </div>
  );
}

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
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
  const navigate = useNavigate();
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

  // Handle backend response
  useEffect(() => {
    if (!submitted) return;
    console.log("Full backend response:", profile.response); // <-- full response
    console.log("Profile data in state:", data); // <-- merged profile data
    debugger;
    // Success response from backend
    if (status === "succeeded") {
      if (profile.response?.success) {
        Swal.fire({
          icon: "success",
          title: isEditMode ? "Profile updated!" : "Profile created!",
          text: "Redirecting to home...",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      } else {
        // Backend returned failure (success=0)
        let errMessages = "Something went wrong";

        if (profile.response?.message) {
          errMessages = profile.response.message;
        } else if (Array.isArray(profile.response?.errors)) {
          errMessages = profile.response.errors
            .map((err) => err.message || JSON.stringify(err))
            .join("\n");
        }

        Swal.fire({
          icon: "error",
          title: "Failed to save profile",
          text: errMessages,
        });

        // Keep user form data intact
        setSubmitted(false);
      }
    }

    // Rejected API call
    if (status === "failed") {
      let errMessages = "Something went wrong";

      if (error?.message) {
        errMessages = error.message;
      } else if (Array.isArray(error?.errors)) {
        errMessages = error.errors
          .map((err) => err.message || JSON.stringify(err))
          .join("\n");
      } else if (typeof error?.errors === "object") {
        errMessages = Object.values(error.errors).flat().join("\n");
      }

      Swal.fire({
        icon: "error",
        title: "Failed to save profile",
        text: errMessages,
      });

      // Keep user form data intact
      setSubmitted(false);
    }
  }, [submitted, status, data, error, isEditMode, navigate]);

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
    return "An unexpected error occurred";
  };

  // Form field change handlers
  const handleChange = (eOrName, maybeValue) => {
    let name, value;

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
    } else {
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

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (isEditMode) {
      const profileId = data?.id;
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

  // Render each step
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

      {/* Error */}
      {submitted && error && (
        <p className="text-red-500 text-center mt-2">
          Error: {renderError(error)}
        </p>
      )}
    </div>
  );
}

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
  const { step, data, status } = profile;

  const [submitted, setSubmitted] = useState(false);
  const [backendErrors, setBackendErrors] = useState({}); // ✅ Store backend errors

  // ✅ Fetch existing profile if editing
  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchProfile(id));
    }
  }, [dispatch, id, isEditMode]);

  // ✅ Handle backend success/failure response
  useEffect(() => {
    if (!submitted) return;

    const backendRes = data;

    if (status === "succeeded" && backendRes?.success) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title:
          backendRes?.message ||
          (isEditMode ? "Profile updated!" : "Profile created!"),
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
      setBackendErrors({}); // clear previous errors
    } else if (
      status === "failed" ||
      backendRes?.success === false ||
      backendRes?.success === 0 ||
      backendRes?.status >= 400
    ) {
      // ✅ Collect all backend error messages
      let messages = [];

      if (backendRes.message) messages.push(backendRes.message);
      console.log("backend meggage", backendRes);
      debugger;
      // let messages = []; // existing messages array

      if (backendRes.errors) {
        if (Array.isArray(backendRes.errors)) {
          // If errors is an array, push all items
          messages.push(...backendRes.errors);
        } else if (typeof backendRes.errors === "object") {
          // If errors is an object, push each field's messages
          Object.entries(backendRes.errors).forEach(([field, errs]) => {
            if (Array.isArray(errs)) {
              errs.forEach((msg) => messages.push(`${field}: ${msg}`));
            } else if (typeof errs === "string") {
              messages.push(`${field}: ${errs}`);
            }
          });
        } else if (typeof backendRes.errors === "string") {
          messages.push(backendRes.errors);
        }
      }

      // Now messages array contains all backend validation messages
      console.log("messagejdkfhj", messages.errors);
      debugger;

      // Remove duplicates
      messages = [...new Set(messages)];

      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: `<ul style="text-align:left; margin-left:10px;">${messages
          .map((msg) => `<li>${msg}</li>`)
          .join("")}</ul>`,
        confirmButtonColor: "#d33",
      });
    }
  }, [submitted, status, data, isEditMode, navigate]);

  // ✅ Robust error parser (Laravel compatible)
  const renderError = (err) => {
    if (!err) return "Unknown error occurred.";

    const messages = [];

    if (err.message && typeof err.message === "string") {
      messages.push(err.message);
    }

    if (err.errors && typeof err.errors === "object") {
      Object.entries(err.errors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((msg) => messages.push(msg));
        } else if (typeof value === "string") {
          messages.push(value);
        }
      });
    }

    const uniqueMessages = [...new Set(messages)];
    return uniqueMessages.join("\n");
  };

  // ✅ Handle input change
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

  // ✅ Handle file change
  const handleFileChange = (name, files) => {
    dispatch(updateField({ [name]: files }));
  };

  // ✅ Navigation handlers
  const handleNext = () => dispatch(nextStep());
  const handleBack = () => step > 1 && dispatch(prevStep());

  // ✅ Submit handler
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

  // ✅ Step renderer with backend errors
  const renderStep = () => {
    const stepProps = {
      data,
      handleChange,
      handleFileChange,
      handleNext,
      handleBack,
      backendErrors, // ✅ pass errors to step
    };

    switch (step) {
      case 1:
        return <StepBasicInfo {...stepProps} />;
      case 2:
        return <StepContact {...stepProps} />;
      case 3:
        return <StepGallery {...stepProps} />;
      case 4:
        return <StepCompanyDetails {...stepProps} />;
      case 5:
        return <CustomLink {...stepProps} />;
      case 6:
        return <SocialMedia {...stepProps} />;
      case 7:
        return <StepSeo {...stepProps} />;
      case 8:
        return (
          <StepPreview
            data={data}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            status={status}
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
    </div>
  );
}

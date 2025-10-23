// import React from "react";

// export default function StepPreview({
//   data,
//   handleSubmit,
//   handleBack,
//   status,
//   error,
//   isEditMode,
//   submitted,
// }) {
//   console.log("Preview Data:", data);

//   // Helper to safely render errors from backend
//   const renderError = (err) => {
//     if (!err) return null;
//     if (typeof err === "string") return err;
//     if (err.message) return err.message;
//     if (err.errors) {
//       if (typeof err.errors === "string") return err.errors;
//       if (Array.isArray(err.errors)) return err.errors.join(", ");
//       if (typeof err.errors === "object")
//         return Object.values(err.errors).flat().join(", ");
//     }
//     if (err.status && err.success !== undefined && err.message)
//       return err.message;
//     return "An unexpected error occurred";
//   };

//   // Helper to get image preview from File or URL
//   const getImagePreview = (img) => {
//     if (!img) return null;
//     if (img instanceof File) return URL.createObjectURL(img);
//     if (typeof img === "string") return img;
//     if (img.url) return img.url;
//     return null;
//   };

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">Preview Data</h3>

//       {/* --- Basic Info --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Basic Details
//         </h1>
//         <p>
//           <strong>Full Name:</strong> {data.name}
//         </p>
//         <p>
//           <strong>Username:</strong> {data.username}
//         </p>
//         <p>
//           <strong>Slug:</strong> {data.slug}
//         </p>
//         <p>
//           <strong>About:</strong> {data.about}
//         </p>
//         <p>
//           <strong>Bio:</strong> {data.bio}
//         </p>
//       </div>

//       {/* --- Contact Details --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Contact Details
//         </h1>
//         <p>
//           <strong>Email:</strong> {data.email}
//         </p>
//         <p>
//           <strong>Phone:</strong> {data.phone}
//         </p>
//         <p>
//           <strong>WhatsApp Phone:</strong> {data.whatsapp_number}
//         </p>
//         <p>
//           <strong>Website:</strong> {data.website_url}
//         </p>
//         <p>
//           <strong>Address:</strong> {data.area}, {data.city}, {data.state},{" "}
//           {data.country}
//         </p>
//       </div>

//       {/* --- Company Details --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Company Details
//         </h1>
//         <p>
//           <strong>Company:</strong> {data.company}
//         </p>
//         <p>
//           <strong>Job Title:</strong> {data.job_title}
//         </p>
//         <p>
//           <strong>Industry:</strong> {data.industry}
//         </p>
//         <p>
//           <strong>Profile Type:</strong> {data.profile_type}
//         </p>
//         <p>
//           <strong>Skills:</strong> {data.skills?.join(", ")}
//         </p>
//         <p>
//           <strong>Services:</strong> {data.services?.join(", ")}
//         </p>
//       </div>

//       {/* --- Custom Details --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Custom Details
//         </h1>
//         <p>
//           <strong>NFC Card ID:</strong> {data?.nfc_card_id}
//         </p>
//         <p>
//           <strong>QR Code:</strong> {data?.qr_code_url}
//         </p>
//         <p>
//           <strong>VCard ID:</strong> {data?.vcard_id}
//         </p>
//         <p>
//           <strong>PDF Resume URL:</strong> {data?.pdf_resume_url}
//         </p>

//         <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
//           <p>
//             <strong>Public:</strong> {data?.is_public ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Status:</strong> {data?.status ? "Active" : "Inactive"}
//           </p>
//           <p>
//             <strong>Contact Form:</strong>{" "}
//             {data?.allow_contact_form ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Dark Mode:</strong> {data?.dark_mode_enabled ? "On" : "Off"}
//           </p>
//           <p>
//             <strong>Theme Color:</strong>{" "}
//             <span
//               className="inline-block w-4 h-4 rounded-full border"
//               style={{ backgroundColor: data?.custom_theme_color || "#000" }}
//               title={data?.custom_theme_color}
//             />
//           </p>
//         </div>
//       </div>

//       {/* --- Social Media Links --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Social Media Links
//         </h1>
//         {[
//           "linkedin_url",
//           "instagram_url",
//           "facebook_url",
//           "twitter_url",
//           "youtube_url",
//           "tiktok_url",
//           "snapchat_url",
//           "github_url",
//           "behance_url",
//           "dribbble_url",
//           "pinterest_url",
//           "threads_url",
//         ].map((key) => (
//           <p key={key}>
//             <strong>{key.replace("_url", "").replace(/_/g, " ")}:</strong>{" "}
//             {data?.[key]}
//           </p>
//         ))}
//       </div>

//       {/* --- SEO Details --- */}
//       <div className="space-y-2 border p-3 rounded">
//         <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           SEO Details
//         </h1>
//         <p>
//           <strong>SEO Title:</strong> {data?.seo_title}
//         </p>
//         <p>
//           <strong>SEO Description:</strong> {data?.seo_description}
//         </p>
//       </div>

//       {/* --- Images (Avatar, Cover, Gallery) --- */}
//       <div className="flex flex-col gap-6 space-y-2 border p-3 rounded">
//         <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
//           Images Preview
//         </h1>
//         {/* Row 1: Avatar */}
//         {getImagePreview(data.avatar) && (
//           <div>
//             <p>
//               <strong>Avatar:</strong>
//             </p>
//             <img
//               src={getImagePreview(data.avatar)}
//               alt="Avatar Preview"
//               className="w-80 h-64 object-cover rounded"
//             />
//           </div>
//         )}

//         {/* Row 2: Cover */}
//         {getImagePreview(data.avatar_original) && (
//           <div>
//             <p>
//               <strong>Cover Image:</strong>
//             </p>
//             <img
//               src={getImagePreview(data.avatar_original)}
//               alt="Cover Preview"
//               className="w-80 h-64 object-cover rounded"
//             />
//           </div>
//         )}

//         {/* Row 3: Gallery */}
//         {data.gallery &&
//           Array.isArray(data.gallery) &&
//           data.gallery.length > 0 && (
//             <div>
//               <p>
//                 <strong>Gallery:</strong>
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 {Array.from(data.gallery).map((file, index) => (
//                   <div key={index}>
//                     <p className="text-sm text-center">Gallery {index + 1}</p>
//                     <img
//                       src={getImagePreview(file)}
//                       alt={`Gallery ${index + 1}`}
//                       className="w-32 h-32 object-cover rounded"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//       </div>

//       {/* --- Navigation Buttons --- */}
//       <div className="flex justify-between mt-6">
//         <button
//           type="button"
//           onClick={handleBack}
//           className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//         >
//           Previous
//         </button>

//         <button
//           type="submit"
//           onClick={handleSubmit}
//           disabled={status === "loading"}
//           className={`px-4 py-2 rounded text-white ${
//             status === "loading"
//               ? "bg-gray-400 cursor-not-allowed"
//               : isEditMode
//               ? "bg-blue-500 hover:bg-blue-600"
//               : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {status === "loading"
//             ? isEditMode
//               ? "Updating..."
//               : "Submitting..."
//             : isEditMode
//             ? "Update"
//             : "Submit"}
//         </button>
//       </div>

//       {/* --- Messages --- */}
//       {submitted && status === "succeeded" && (
//         <p className="text-green-600 mt-2 text-center">
//           {isEditMode
//             ? "Profile updated successfully!"
//             : "Profile created successfully!"}
//         </p>
//       )}

//       {error && (
//         <p className="text-red-500 mt-2 text-center">
//           Error: {renderError(error)}
//         </p>
//       )}
//     </div>
//   );
// }

import React from "react";

export default function StepPreview({
  data,
  handleSubmit,
  handleBack,
  status,
  error,
  isEditMode,
  submitted,
}) {
  console.log("Preview Data:", data);

  // Helper to safely render errors from backend
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
    if (err.status && err.success !== undefined && err.message)
      return err.message;
    return "An unexpected error occurred";
  };

  // Helper to get image preview from File or URL
  const getImagePreview = (img) => {
    if (!img) return null;
    if (img instanceof File) return URL.createObjectURL(img);
    if (typeof img === "string") return img;
    if (img.url) return img.url;
    return null;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Preview Data</h3>

      {/* --- Basic Info --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Basic Details
        </h1>
        <p>
          <strong>Full Name:</strong> {data.name}
        </p>
        <p>
          <strong>Username:</strong> {data.username}
        </p>
        <p>
          <strong>Slug:</strong> {data.slug}
        </p>
        <p>
          <strong>About:</strong> {data.about}
        </p>
        <p>
          <strong>Bio:</strong> {data.bio}
        </p>
      </div>

      {/* --- Contact Details --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Contact Details
        </h1>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
        <p>
          <strong>WhatsApp Phone:</strong> {data.whatsapp_number}
        </p>
        <p>
          <strong>Website:</strong> {data.website_url}
        </p>
        <p>
          <strong>Address:</strong> {data.area}, {data.city}, {data.state},{" "}
          {data.country}
        </p>
      </div>

      {/* --- Company Details --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Company Details
        </h1>
        <p>
          <strong>Company:</strong> {data.company}
        </p>
        <p>
          <strong>Job Title:</strong> {data.job_title}
        </p>
        <p>
          <strong>Industry:</strong> {data.industry}
        </p>
        <p>
          <strong>Profile Type:</strong> {data.profile_type}
        </p>
        <p>
          <strong>Skills:</strong> {data.skills?.join(", ")}
        </p>
        <p>
          <strong>Services:</strong> {data.services?.join(", ")}
        </p>
      </div>

      {/* --- Custom Details --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Custom Details
        </h1>
        <p>
          <strong>NFC Card ID:</strong> {data?.nfc_card_id}
        </p>
        <p>
          <strong>QR Code:</strong> {data?.qr_code_url}
        </p>
        <p>
          <strong>VCard ID:</strong> {data?.vcard_id}
        </p>
        <p>
          <strong>PDF Resume URL:</strong> {data?.pdf_resume_url}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
          <p>
            <strong>Public:</strong> {data?.is_public ? "Yes" : "No"}
          </p>
          <p>
            <strong>Status:</strong> {data?.status ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Contact Form:</strong>{" "}
            {data?.allow_contact_form ? "Yes" : "No"}
          </p>
          <p>
            <strong>Dark Mode:</strong> {data?.dark_mode_enabled ? "On" : "Off"}
          </p>
          <p>
            <strong>Theme Color:</strong>{" "}
            <span
              className="inline-block w-4 h-4 rounded-full border"
              style={{ backgroundColor: data?.custom_theme_color || "#000" }}
              title={data?.custom_theme_color}
            />
          </p>
        </div>
      </div>

      {/* --- Social Media Links --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Social Media Links
        </h1>
        {[
          "linkedin_url",
          "instagram_url",
          "facebook_url",
          "twitter_url",
          "youtube_url",
          "tiktok_url",
          "snapchat_url",
          "github_url",
          "behance_url",
          "dribbble_url",
          "pinterest_url",
          "threads_url",
        ].map((key) => (
          <p key={key}>
            <strong>{key.replace("_url", "").replace(/_/g, " ")}:</strong>{" "}
            {data?.[key]}
          </p>
        ))}
      </div>

      {/* --- SEO Details --- */}
      <div className="space-y-2 border p-3 rounded">
        <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          SEO Details
        </h1>
        <p>
          <strong>SEO Title:</strong> {data?.seo_title}
        </p>
        <p>
          <strong>SEO Description:</strong> {data?.seo_description}
        </p>
      </div>

      {/* --- Images (Avatar, Cover, Gallery) --- */}
      <div className="flex flex-col gap-6 space-y-2 border p-3 rounded">
        <h1 className="text-2xl font-semibold text-sky-900 border-b border-sky-200 pb-2 mb-4">
          Images Preview
        </h1>
        {/* Row 1: Avatar */}
        {getImagePreview(data.avatar) && (
          <div>
            <p>
              <strong>Avatar:</strong>
            </p>
            <img
              src={getImagePreview(data.avatar)}
              alt="Avatar Preview"
              className="w-80 h-64 object-cover rounded"
            />
          </div>
        )}

        {/* Row 2: Cover */}
        {getImagePreview(data.avatar_original) && (
          <div>
            <p>
              <strong>Cover Image:</strong>
            </p>
            <img
              src={getImagePreview(data.avatar_original)}
              alt="Cover Preview"
              className="w-80 h-64 object-cover rounded"
            />
          </div>
        )}

        {/* Row 3: Gallery */}
        {data.gallery &&
          Array.isArray(data.gallery) &&
          data.gallery.length > 0 && (
            <div>
              <p>
                <strong>Gallery:</strong>
              </p>
              <div className="flex flex-wrap gap-3">
                {Array.from(data.gallery).map((file, index) => (
                  <div key={index}>
                    <p className="text-sm text-center">Gallery {index + 1}</p>
                    <img
                      src={getImagePreview(file)}
                      alt={`Gallery ${index + 1}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* --- Navigation Buttons --- */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          Previous
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={status === "loading"}
          className={`px-4 py-2 rounded text-white ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : isEditMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {status === "loading"
            ? isEditMode
              ? "Updating..."
              : "Submitting..."
            : isEditMode
            ? "Update"
            : "Submit"}
        </button>
      </div>

      {/* --- Messages --- */}
      {submitted && status === "succeeded" && (
        <p className="text-green-600 mt-2 text-center">
          {isEditMode
            ? "Profile updated successfully!"
            : "Profile created successfully!"}
        </p>
      )}

      {error && (
        <div className="text-red-500 mt-2 text-center">
          <p>Error:</p>
          <p>{renderError(error)}</p>

          {/* Field-specific errors */}
          {error?.errors && typeof error.errors === "object" && (
            <ul className="text-left list-disc list-inside mt-1">
              {Object.entries(error.errors).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong>{" "}
                  {Array.isArray(messages) ? messages.join(", ") : messages}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

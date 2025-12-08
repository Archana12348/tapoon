// import React, { useState, useEffect } from "react";
// import { Image as ImageIcon, X } from "lucide-react";

// export default function StepGallery({
//   data,
//   handleChange,
//   handleFileChange,
//   handleNext,
//   handleBack,
//   loading,
// }) {
//   // Helper to generate preview
//   const getPreview = (fileOrUrl) =>
//     fileOrUrl instanceof File
//       ? URL.createObjectURL(fileOrUrl)
//       : fileOrUrl || null;

//   // Local states for previews
//   const [avatarPreview, setAvatarPreview] = useState(getPreview(data.avatar));
//   const [coverPreview, setCoverPreview] = useState(
//     getPreview(data.avatar_original)
//   );
//   const [galleryPreviews, setGalleryPreviews] = useState(
//     (data.gallery || [])
//       .filter(Boolean)
//       .map((file) => ({ file, preview: getPreview(file) }))
//   );

//   // Sync previews if data changes externally
//   useEffect(() => {
//     setAvatarPreview(getPreview(data.avatar));
//     setCoverPreview(getPreview(data.avatar_original));
//     setGalleryPreviews(
//       (data.gallery || [])
//         .filter(Boolean)
//         .map((file) => ({ file, preview: getPreview(file) }))
//     );
//   }, [data.avatar, data.avatar_original, data.gallery]);

//   // Cleanup object URLs
//   useEffect(() => {
//     return () => {
//       if (data.avatar instanceof File) URL.revokeObjectURL(avatarPreview);
//       if (data.avatar_original instanceof File)
//         URL.revokeObjectURL(coverPreview);
//       galleryPreviews.forEach(
//         (g) => g.file instanceof File && URL.revokeObjectURL(g.preview)
//       );
//     };
//   }, [
//     avatarPreview,
//     coverPreview,
//     galleryPreviews,
//     data.avatar,
//     data.avatar_original,
//   ]);

//   // Upload handlers
//   const handleAvatarUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setAvatarPreview(getPreview(file));
//     handleChange("avatar", file); // ✅ works with new handleChange
//   };

//   const handleCoverUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setCoverPreview(getPreview(file));
//     handleChange("avatar_original", file);
//   };

//   const handleGalleryUpload = (files) => {
//     const newFiles = Array.from(files).filter((f) =>
//       f.type.startsWith("image/")
//     );
//     const newPreviews = newFiles.map((file) => ({
//       file,
//       preview: getPreview(file),
//     }));
//     const updatedGallery = [...galleryPreviews, ...newPreviews];
//     setGalleryPreviews(updatedGallery);

//     // ✅ Use handleFileChange (still fine)
//     handleFileChange(
//       "gallery",
//       updatedGallery.map((g) => g.file)
//     );
//   };

//   const removeGalleryImage = (index) => {
//     const updated = [...galleryPreviews];
//     const removed = updated.splice(index, 1)[0];
//     if (removed.file instanceof File) URL.revokeObjectURL(removed.preview);
//     setGalleryPreviews(updated);
//     handleFileChange(
//       "gallery",
//       updated.map((g) => g.file)
//     );
//   };

//   // Dropzone renderer
//   const renderDropzone = (label, preview, onUpload) => (
//     <div>
//       <label className="block text-sky-800 mb-2">{label}</label>
//       <div
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           const file = e.dataTransfer.files?.[0];
//           if (file) onUpload({ target: { files: [file] } });
//         }}
//         className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer group h-64 overflow-hidden"
//       >
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onUpload}
//           className="absolute inset-0 opacity-0 cursor-pointer"
//           disabled={loading}
//         />
//         {!preview ? (
//           <>
//             <ImageIcon className="h-6 w-6 text-sky-500 mb-2" />
//             <p className="text-sm text-sky-700 text-center">
//               Drag & drop or{" "}
//               <span className="text-sky-600 font-semibold underline cursor-pointer">
//                 click to upload
//               </span>
//             </p>
//           </>
//         ) : (
//           <img
//             src={preview}
//             alt={`${label} Preview`}
//             className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none"
//           />
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold">Gallery / Media</h3>

//       <div className="space-y-6">
//         {renderDropzone("Avatar", avatarPreview, handleAvatarUpload)}
//         {renderDropzone("Cover Image", coverPreview, handleCoverUpload)}

//         {/* Gallery Upload */}
//         <div>
//           <label className="block text-sky-800 mb-2">Gallery Images</label>
//           <div
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => handleGalleryUpload(e.dataTransfer.files)}
//             className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer min-h-[10rem] p-4"
//           >
//             <input
//               type="file"
//               name="gallery"
//               multiple
//               accept="image/*"
//               onChange={(e) => handleGalleryUpload(e.target.files)}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               disabled={loading}
//             />
//             <ImageIcon className="h-6 w-6 text-sky-500 mb-2" />
//             <p className="text-sm text-sky-700 text-center">
//               Drag & drop multiple images or{" "}
//               <span className="text-sky-600 font-semibold underline cursor-pointer">
//                 click to upload
//               </span>
//             </p>
//           </div>

//           {/* Gallery Preview */}
//           {galleryPreviews.length > 0 && (
//             <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//               {galleryPreviews.map((g, index) => (
//                 <div
//                   key={index}
//                   className="relative w-full h-32 rounded overflow-hidden border"
//                 >
//                   <img
//                     src={g.preview}
//                     alt={`Gallery ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeGalleryImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                   >
//                     <X className="h-3 w-3" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex justify-between mt-6">
//         <button
//           type="button"
//           onClick={handleBack}
//           className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
//         >
//           Previous
//         </button>
//         <button
//           type="button"
//           onClick={handleNext}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Image as ImageIcon, X } from "lucide-react";

export default function StepGallery({
  data,
  handleChange,
  handleFileChange,
  handleNext,
  handleBack,
  loading,
}) {
  const getPreview = (fileOrBase64) =>
    fileOrBase64 instanceof File
      ? URL.createObjectURL(fileOrBase64)
      : fileOrBase64 || null;

  const [avatarPreview, setAvatarPreview] = useState(getPreview(data.avatar));
  const [coverPreview, setCoverPreview] = useState(
    getPreview(data.avatar_original)
  );
  const [galleryPreviews, setGalleryPreviews] = useState(
    (data.gallery || [])
      .filter(Boolean)
      .map((file) => ({ file, preview: getPreview(file) }))
  );

  useEffect(() => {
    setAvatarPreview(getPreview(data.avatar));
    setCoverPreview(getPreview(data.avatar_original));
    setGalleryPreviews(
      (data.gallery || [])
        .filter(Boolean)
        .map((file) => ({ file, preview: getPreview(file) }))
    );
  }, [data.avatar, data.avatar_original, data.gallery]);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // base64 string
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatarPreview(base64);
    handleChange("avatar", base64); // ✅ store base64 string
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setCoverPreview(base64);
    handleChange("avatar_original", base64);
  };

  const handleGalleryUpload = async (files) => {
    const validFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    const base64Files = await Promise.all(validFiles.map(fileToBase64));
    const newGallery = [
      ...galleryPreviews,
      ...base64Files.map((b64) => ({ file: b64, preview: b64 })),
    ];
    setGalleryPreviews(newGallery);
    handleFileChange(
      "gallery",
      newGallery.map((g) => g.file) // ✅ base64 strings
    );
  };

  const removeGalleryImage = (index) => {
    const updated = [...galleryPreviews];
    updated.splice(index, 1);
    setGalleryPreviews(updated);
    handleFileChange(
      "gallery",
      updated.map((g) => g.file)
    );
  };

  const renderDropzone = (label, preview, onUpload) => (
    <div>
      <label className="block text-sky-800 mb-2">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) onUpload({ target: { files: [file] } });
        }}
        className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer group h-64 overflow-hidden"
      >
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={loading}
        />
        {!preview ? (
          <>
            <ImageIcon className="h-6 w-6 text-sky-500 mb-2" />
            <p className="text-sm text-sky-700 text-center">
              Drag & drop or{" "}
              <span className="text-sky-600 font-semibold underline cursor-pointer">
                click to upload
              </span>
            </p>
          </>
        ) : (
          <img
            src={preview}
            alt={`${label} Preview`}
            className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Gallery / Media</h3>

      <div className="space-y-6">
        {renderDropzone("Avatar", avatarPreview, handleAvatarUpload)}
        {renderDropzone("Cover Image", coverPreview, handleCoverUpload)}

        {/* <div>
          <label className="block text-sky-800 mb-2">Gallery Images</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleGalleryUpload(e.dataTransfer.files)}
            className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer min-h-[10rem] p-4"
          >
            <input
              type="file"
              name="gallery"
              multiple
              accept="image/*"
              onChange={(e) => handleGalleryUpload(e.target.files)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={loading}
            />
            <ImageIcon className="h-6 w-6 text-sky-500 mb-2" />
            <p className="text-sm text-sky-700 text-center">
              Drag & drop multiple images or{" "}
              <span className="text-sky-600 font-semibold underline cursor-pointer">
                click to upload
              </span>
            </p>
          </div>

          {galleryPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {galleryPreviews.map((g, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 rounded overflow-hidden border"
                >
                  <img
                    src={g.preview}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div> */}
      </div>

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
    </div>
  );
}

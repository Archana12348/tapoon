import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function StepGallery({
  data,
  handleFileChange,
  handleChange,
  handleNext,
  handleBack,
  loading,
}) {
  // Local state for previews
  const [avatarPreview, setAvatarPreview] = useState(
    data.profile_picture?.preview || null
  );
  const [coverPreview, setCoverPreview] = useState(
    data.cover_photo?.preview || null
  );

  // Keep previews in sync if Redux updates externally
  useEffect(() => {
    if (data.profile_picture)
      setAvatarPreview(
        data.profile_picture.preview ||
          URL.createObjectURL(data.profile_picture)
      );
    if (data.cover_photo)
      setCoverPreview(
        data.cover_photo.preview || URL.createObjectURL(data.cover_photo)
      );
  }, [data.profile_picture, data.cover_photo]);

  // File upload handlers
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    handleChange({ target: { name: "profile_picture", files: [file] } });
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setCoverPreview(preview);
    handleChange({ target: { name: "cover_photo", files: [file] } });
  };

  // Dropzone renderer
  const renderDropzone = (label, preview, onUpload) => (
    <div>
      <label className="block text-sky-800 mb-2">{label}</label>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) =>
          e.currentTarget.classList.add("ring-2", "ring-sky-500")
        }
        onDragLeave={(e) =>
          e.currentTarget.classList.remove("ring-2", "ring-sky-500")
        }
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          onUpload({ target: { files: [file] } });
          e.currentTarget.classList.remove("ring-2", "ring-sky-500");
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
        {/* Avatar Upload */}
        {renderDropzone("Avatar", avatarPreview, handleAvatarUpload)}

        {/* Cover Image Upload */}
        {renderDropzone("Cover Image", coverPreview, handleCoverUpload)}

        {/* Gallery Images Upload */}
        <div>
          <label className="block text-sky-800 mb-2">Gallery Images</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = Array.from(e.dataTransfer.files).filter((file) =>
                file.type.startsWith("image/")
              );
              handleFileChange("gallery", files);
            }}
            className="relative flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg hover:border-sky-400 transition cursor-pointer group min-h-[10rem] p-4"
          >
            <input
              type="file"
              name="gallery"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange("gallery", e.target.files)}
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

          {/* Gallery Preview */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from(data.gallery).map((file, index) => {
                const preview =
                  file.preview ||
                  (file instanceof File ? URL.createObjectURL(file) : file.url);
                return (
                  <div
                    key={index}
                    className="relative w-full h-32 rounded overflow-hidden border"
                  >
                    <img
                      src={preview}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}
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
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

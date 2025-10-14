import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/Auth/profile";
import { useParams } from "react-router-dom";
import SocialMediaLinks from "./socialmedia";
import { format } from "date-fns";
import {
  Whatsapp,
  CheckCircle,
  Mail,
  Phone,
  Link, // Using the lucide-react Link icon for custom links now
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon from react-icons

export default function UserProfilePage() {
  const { slug } = useParams(); // Route: /user/srk
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetchUserProfile(slug);
        setProfile(res.data);
      } catch (err) {
        setError(
          err.message || "Failed to load user profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [slug]);

  // Loading/Error States
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-medium text-gray-600">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-xl font-medium text-red-600 p-4 border border-red-300 rounded-lg">
          Error: {error}
        </p>
      </div>
    );

  // Helper component for a section wrapper
  const SectionCard = ({ title, children, className = "" }) => (
    <div
      className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 ${className}`}
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );

  // ✅ Detect if profile is empty
  const isProfileEmpty =
    !profile ||
    (Array.isArray(profile) && profile.length === 0) ||
    Object.keys(profile).length === 0;

  const emailVerifiedDate = profile?.email_verified_at
    ? format(new Date(profile.email_verified_at), "MMM dd, yyyy HH:mm")
    : null;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-screen-xl mx-auto space-y-10">
        {isProfileEmpty ? (
          // ✅ No Profile Found Section
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
            <div className="flex flex-col justify-center items-center h-80 bg-gray-100">
              <p className="text-gray-600 text-xl mb-4">
                No profile found for this user.
              </p>
              <button
                onClick={() => (window.location.href = "/profile/create")}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Add Profile
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ✅ Edit Profile Button (Top Right) */}
            <div className="flex justify-end">
              <button
                onClick={() =>
                  (window.location.href = `/profile/edit/${profile.slug}`)
                }
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Edit Profile
              </button>
            </div>

            <div className="max-w-screen-xl mx-auto space-y-10">
              {/* Profile Header */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={profile.avatar_original}
                  alt="Cover"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-center md:items-end md:space-x-6 p-4 md:pb-6">
                  {/* Avatar */}
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-2xl mb-4 md:mb-0"
                  />

                  {/* Profile Info */}
                  <div className="text-white text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                      {profile.name}
                    </h1>
                    <p className="text-lg md:text-xl font-light opacity-80 mt-1">
                      @{profile.username}
                    </p>
                    <p className="text-lg md:text-xl font-light opacity-80 mt-1">
                      {profile.area}
                    </p>
                    <p className="text-md md:text-lg opacity-70">
                      {profile.city}, {profile.state}, {profile.country}
                    </p>
                    <p className="text-md md:text-lg opacity-70 mt-2">
                      <strong className="font-semibold">NFC Card ID:</strong>{" "}
                      {profile.nfc_card_id}
                    </p>
                    <p className="text-md md:text-lg opacity-70 mt-1">
                      <strong className="font-semibold">Views Count:</strong>{" "}
                      {profile.views_count}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Column */}
                <div className="lg:col-span-2 space-y-10">
                  {/* About Section */}
                  <SectionCard title="Headline">
                    <div
                      className="text-gray-600 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: profile.headline }}
                    />
                  </SectionCard>
                  <SectionCard title="About">
                    <div
                      className="text-gray-600 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: profile.about }}
                    />
                  </SectionCard>
                  <SectionCard title="Bio">
                    <div
                      className="text-gray-600 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: profile.bio }}
                    />
                  </SectionCard>

                  {/* Skills Section */}
                  {profile.skills && profile.skills.length > 0 && (
                    <SectionCard title="Skills">
                      <div className="flex flex-wrap gap-3">
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-indigo-50 text-indigo-700 font-medium py-2 px-5 rounded-full text-sm shadow-md transition duration-200 hover:bg-indigo-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </SectionCard>
                  )}

                  {/* Custom Links Section */}
                  {profile.custom_links && profile.custom_links.length > 0 && (
                    <SectionCard title="Custom Links">
                      <div className="space-y-4">
                        {profile.custom_links.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition duration-200"
                          >
                            <Link className="w-6 h-6 text-indigo-500 mr-4" />
                            <a
                              href={link.url}
                              className="text-lg font-medium text-gray-700 hover:text-indigo-600 truncate"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                              <span className="text-sm ml-2 text-gray-400">
                                ({link.url})
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </SectionCard>
                  )}

                  {/* New Section for vCard, Resume, and Gallery */}
                  <SectionCard title="Additional Information">
                    <div className="space-y-4">
                      {/* vCard URL */}
                      {profile.vcard_url && (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <Link className="w-6 h-6 text-indigo-500 mr-4" />
                          <a
                            href={profile.vcard_url}
                            className="text-lg font-medium text-gray-700 hover:text-indigo-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            vCard
                          </a>
                        </div>
                      )}

                      {/* PDF Resume URL */}
                      {profile.pdf_resume_url ? (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <Link className="w-6 h-6 text-indigo-500 mr-4" />
                          <a
                            href={profile.pdf_resume_url}
                            className="text-lg font-medium text-gray-700 hover:text-indigo-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resume (PDF)
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-500">No resume uploaded.</p>
                      )}

                      {/* Gallery */}
                      {profile.gallery && profile.gallery.length > 0 ? (
                        <div className="space-y-2">
                          {profile.gallery.map((image, index) => (
                            <div
                              key={index}
                              className="w-full h-48 bg-gray-100 rounded-md"
                            >
                              <img
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No images in gallery.</p>
                      )}

                      {/* QR Code URL */}
                      {profile.qr_code_url && (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <Link className="w-6 h-6 text-indigo-500 mr-4" />
                          <a
                            href={profile.qr_code_url}
                            className="text-lg font-medium text-gray-700 hover:text-indigo-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            QR Code
                          </a>
                        </div>
                      )}
                    </div>
                  </SectionCard>

                  <SectionCard title="SEO Settings">
                    <div className="space-y-4">
                      {/* SEO Title */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 5l7 7-7 7M5 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            SEO Title:
                          </p>
                          <p className="text-gray-600 hover:text-indigo-600 transition duration-200">
                            {profile.seo_title || "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* SEO Description */}
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-indigo-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.21 0-4 1.79-4 4s1.79 4 4 4M4 4h16M4 4v16M4 4h16"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            SEO Description:
                          </p>
                          <p className="text-gray-600 hover:text-indigo-600 transition duration-200">
                            {profile.seo_description || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionCard>
                </div>
                {/* Sidebar Column */}
                <div className="lg:col-span-1 space-y-10">
                  {/* Contact Information */}
                  <SectionCard title="Get In Touch">
                    <div className="space-y-4">
                      {/* Email */}
                      {profile.email && (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <Mail className="w-6 h-6 flex-shrink-0 text-indigo-500" />
                          <a
                            href={`mailto:${profile.email}`}
                            className="truncate"
                          >
                            {profile.email}
                          </a>
                          {emailVerifiedDate && (
                            <span className="text-sm text-green-500 flex items-center space-x-1">
                              <CheckCircle className="w-4 h-4" />
                            </span>
                          )}
                        </div>
                      )}

                      {/* Phone */}
                      {profile.phone && (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <Phone className="w-6 h-6 flex-shrink-0 text-indigo-500" />
                          <a href={`tel:${profile.phone}`} className="truncate">
                            {profile.phone}
                          </a>
                        </div>
                      )}

                      {/* WhatsApp */}
                      {profile.whatsapp_number && (
                        <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                          <FaWhatsapp className="w-6 h-6 flex-shrink-0 text-green-500" />
                          <a
                            href={`https://wa.me/${profile.whatsapp_number}`}
                            className="truncate"
                          >
                            {profile.whatsapp_number}
                          </a>
                        </div>
                      )}
                    </div>
                  </SectionCard>

                  <SocialMediaLinks profile={profile} />

                  {/* Professional Info */}
                  <SectionCard title="Professional Info">
                    <div className="mt-4 text-gray-600 space-y-3">
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Job Title:
                        </strong>{" "}
                        {profile.job_title}
                      </p>
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Company:
                        </strong>{" "}
                        {profile.company_name}
                      </p>
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Industry:
                        </strong>{" "}
                        {profile.industry}
                      </p>
                      {profile.website_url && (
                        <p>
                          <strong className="font-semibold text-gray-800">
                            Website:
                          </strong>{" "}
                          <a
                            href={profile.website_url}
                            className="text-indigo-500 hover:text-indigo-700 transition duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {profile.website_url}
                          </a>
                        </p>
                      )}
                    </div>
                  </SectionCard>

                  {/* Profile Settings */}
                  <SectionCard title="Profile Settings">
                    <div className="mt-4 text-gray-600 space-y-3">
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Profile Type:
                        </strong>{" "}
                        {profile.profile_type || "Not specified"}
                      </p>
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Public Profile:
                        </strong>{" "}
                        {profile.is_public ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Allow Contact Form:
                        </strong>{" "}
                        {profile.allow_contact_form ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong className="font-semibold text-gray-800">
                          Dark Mode Enabled:
                        </strong>{" "}
                        {profile.dark_mode_enabled ? "Yes" : "No"}
                      </p>
                      <p className="flex items-center space-x-2">
                        <strong className="font-semibold text-gray-800">
                          Theme Color:
                        </strong>
                        <div
                          style={{
                            backgroundColor:
                              profile.custom_theme_color || "#CCCCCC", // Default color if not specified
                          }}
                          className="w-6 h-6 rounded-full"
                        ></div>
                        <span className="text-gray-700">
                          {profile.custom_theme_color || "Not specified"}
                        </span>
                      </p>
                    </div>
                  </SectionCard>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

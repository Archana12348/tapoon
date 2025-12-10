import SocialMediaLinks from "../../pages/users/socialmedia";
import { format } from "date-fns";
import {
  Whatsapp,
  CheckCircle,
  Mail,
  Phone,
  Link, // Using the lucide-react Link icon for custom links now
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa"; // Importing WhatsApp icon from react-icons
import VCardDownloadButton from "./VcardButton";

function ProfileOne({ profile, loading, error }) {
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
    <div className="bg-gray-50 min-h-screen  sm:p-0 lg:p-0">
      <div className="relative w-full h-96 md:h-[28rem]">
        {/* Cover Image */}
        <img
          src={profile.avatar_original}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Desktop View (overlayed) */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 items-end space-x-6 p-4 md:pb-6 max-w-screen-xl mx-auto">
          {/* Avatar */}
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-44 h-44 rounded-full border-4 border-white object-cover shadow-2xl z-20 relative"
          />
          {/* Profile Info */}
          <div className="text-white text-left space-y-1 z-10 relative">
            <h1 className="text-5xl font-extrabold tracking-tight">
              {profile.name}
            </h1>
            <p className="text-xl font-semibold">@{profile.username}</p>
            <p className="text-xl font-semibold">{profile.area}</p>
            <p className="text-lg font-semibold">
              {profile.city}, {profile.state}, {profile.country}
            </p>
            <p className="text-lg mt-2">
              <strong>NFC Card ID:</strong> {profile.nfc_card_id}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col items-center text-center p-4 space-y-3 md:hidden">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-2xl -mt-16 z-20 relative"
        />
        <div className="text-gray-900 font-semibold space-y-1">
          <h1 className="text-3xl font-extrabold">{profile.name}</h1>
          <p className="text-lg">@{profile.username}</p>
          <p className="text-lg">{profile.area}</p>
          <p className="text-md">
            {profile.city}, {profile.state}, {profile.country}
          </p>
          <p className="text-md">
            <strong>NFC Card ID:</strong> {profile.nfc_card_id}
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto space-y-10">
        <div className="max-w-screen-xl mx-auto space-y-10">
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
                    {profile.skills
                      .filter((skill) => skill.trim() !== "") // ignore empty strings or whitespace
                      .map((skill, index) => (
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

              {/* Services Section */}
              {profile.services && profile.services.length > 0 && (
                <SectionCard title="Services">
                  <div className="flex flex-wrap gap-3">
                    {profile.services
                      .filter((service) => service.trim() !== "")
                      .map((service, index) => (
                        <span
                          key={index}
                          className="bg-indigo-50 text-indigo-700 font-medium py-2 px-5 rounded-full text-sm shadow-md transition duration-200 hover:bg-indigo-100"
                        >
                          {service}
                        </span>
                      ))}
                  </div>
                </SectionCard>
              )}

              {/* New Section for vCard, Resume, and Gallery */}
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
                      <a href={`mailto:${profile.email}`} className="truncate">
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

              <VCardDownloadButton
                user={profile}
                bgColor="bg-indigo-700"
                textColor="text-white"
                hoverColor="hover:bg-indigo-800"
                className="fixed bottom-6 right-6 z-50"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOne;

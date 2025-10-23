import React from "react";
import {
  ShoppingCart,
  UtensilsCrossed,
  Percent,
  Star,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import {
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaTelegram,
  FaWhatsapp,
  FaTiktok,
  FaSnapchat,
  FaGithub,
  FaBehance,
  FaPinterest,
  FaDribbble,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaQrcode,
  FaDownload,
  FaSearch,
  FaCogs,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import VCardDownloadButton from "./VcardButton";

const ProfileTwo = (props) => {
  const { profile, loading, error } = props;
  const user = profile;
  console.log("user ", user);

  const socialLinks = [
    { url: user.website_url, icon: <FaGlobe /> },
    { url: user.facebook_url, icon: <FaFacebook /> },
    { url: user.instagram_url, icon: <FaInstagram /> },
    { url: `https://wa.me/${user.whatsapp_number}`, icon: <FaWhatsapp /> },
    { url: user.linkedin_url, icon: <FaLinkedin /> },
    { url: user.twitter_url, icon: <FaTwitter /> },
    { url: user.threads_url, icon: <FaTelegram /> },
    { url: user.tiktok_url, icon: <FaTiktok /> },
    { url: user.snapchat_url, icon: <FaSnapchat /> },
    { url: user.github_url, icon: <FaGithub /> },
    { url: user.behance_url, icon: <FaBehance /> },
    { url: user.pinterest_url, icon: <FaPinterest /> },
    { url: user.dribbble_url, icon: <FaDribbble /> },
  ];

  const defaultProfile = {
    name: "Richard A. White",
    job_title: "Senior Chefs",
    avatar:
      "https://csspicker.dev/api/image/?q=professional+chef+portrait&image_type=photo",
    avatar_original:
      "https://csspicker.dev/api/image/?q=chef+cooking+kitchen&image_type=photo",
    bio: "Nisi tortor pretium leo aliquam urna vitae sit. Suspendisse porttitor ut id est sed at. Ullamcorper sed auctor rutrum leo. Massa cum ac fermentum mi sed blandit facilisis volutpat. Viverra mauris est in vulputate. Elementum pellentesque volutpat est nulla.",
    services: ["Online Ordering", "Fresh Food", "Special Offers", "Reviews"],
    gallery: [
      "https://csspicker.dev/api/image/?q=chef+plating+food&image_type=photo",
    ],
    linkedin_url: "#",
    instagram_url: "#",
    facebook_url: "#",
    twitter_url: "#",
    youtube_url: "#",
    behance_url: "#",
    dribbble_url: "#",
    pinterest_url: "#",
  };

  const data = profile || defaultProfile;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-full mx-auto">
        <div className="relative w-full h-96 overflow-hidden">
          <img
            src={data.avatar_original}
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>

        <div className="relative -mt-20 flex flex-col items-center px-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 mb-4">
            <img
              src={data.avatar}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-yellow-500 mb-1">
            {data.name}
          </h1>
          <p className="text-sm text-gray-300 mb-6">{data.headline}</p>

          {/* Social Icons */}
          <div className="mt-2 flex flex-wrap justify-center gap-4 px-4 mb-6 max-w-md">
            {socialLinks.map(
              (social, idx) =>
                social.url && (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-400 transition"
                  >
                    <span className="text-gray-900 text-lg">{social.icon}</span>
                  </a>
                )
            )}
          </div>

          <div className="space-y-8">
            {/* Bio Section */}
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
                Bio
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                {data.bio || "No bio available."}
              </p>
            </div>

            {/* About Section */}
            <div className="text-center">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
                About
              </h2>
              <div
                className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto"
                dangerouslySetInnerHTML={{
                  __html: data.about || "<p>No about information provided.</p>",
                }}
              />
            </div>
          </div>

          {/* NFC Card ID Section */}
          {user.nfc_card_id && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                NFC Card ID
              </h3>
              <div className="flex justify-center">
                <div className="bg-yellow-600 text-black text-sm px-6 py-2 rounded-full hover:bg-yellow-500 transition">
                  {user.nfc_card_id}
                </div>
              </div>
            </div>
          )}

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {user.skills
                  .filter((skill) => skill.trim() !== "")
                  .map((skill, index) => (
                    <span
                      key={index}
                      className="bg-yellow-600 text-gray-900 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Services Section */}
          {user.services && user.services.length > 0 && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">
                Services
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {user.services
                  .filter((service) => service.trim() !== "")
                  .map((service, index) => (
                    <span
                      key={index}
                      className="bg-yellow-600 text-black text-sm px-3 py-1 rounded-full hover:bg-yellow-500 transition"
                    >
                      {service}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Address & Contact (Business Info Card) */}
          {(user.area ||
            user.city ||
            user.state ||
            user.country ||
            user.email ||
            user.phone ||
            user.whatsapp_number) && (
            <div className="mt-8 flex justify-center px-4">
              <div className="rounded-2xl p-6 w-full max-w-3xl">
                <h3 className="text-lg font-semibold text-black-600 mb-6 text-center flex items-center justify-center gap-2">
                  <FaMapMarkerAlt className="text-black-500" />
                  Business Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black-700 dark:text-black-200 text-sm">
                  {/* Address Section */}
                  <div className="bg-yellow-600 dark:bg-yellow-400 rounded-xl p-4 shadow-inner">
                    <h4 className="font-semibold text-black mb-3 flex items-center justify-center gap-2">
                      <FaMapMarkerAlt className="text-black" /> Address
                    </h4>
                    <div className="text-center leading-relaxed">
                      {user.area && (
                        <p className="font-medium text-black">{user.area}</p>
                      )}
                      <p className="text-black">
                        {[user.city, user.state, user.country]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="bg-yellow-600 dark:bg-yellow-400 rounded-xl p-4 shadow-inner">
                    <h4 className="font-semibold text-black mb-3 flex items-center justify-center gap-2">
                      <FaPhone className="text-black rotate-90" /> Contact
                    </h4>
                    <div className="flex flex-col gap-3 items-center">
                      {user.email && (
                        <a
                          href={`mailto:${user.email}`}
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <FaEnvelope className="text-black" />
                          <span className="text-black">{user.email}</span>
                        </a>
                      )}
                      {user.phone && (
                        <a
                          href={`tel:${user.phone}`}
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <FaPhone className="text-black rotate-90" />
                          <span className="text-black">{user.phone}</span>
                        </a>
                      )}
                      {user.whatsapp_number && (
                        <a
                          href={`https://wa.me/${user.whatsapp_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-black transition"
                        >
                          <FaWhatsapp className="text-black w-4 h-6" />
                          <span className="text-black">
                            {user.whatsapp_number}
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Info Card */}
          {(user.company_name || user.website_url || user.industry) && (
            <div className="mt-8 flex justify-center px-4">
              <div className=" rounded-2xl p-6 w-full max-w-3xl">
                <h3 className="text-lg font-semibold text-black-600 mb-6 text-center flex items-center justify-center gap-2">
                  🏢 Company Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-200 text-sm">
                  {/* Company Name */}
                  {user.company_name && (
                    <div className="bg-yellow-600 dark:bg-yellow-400 rounded-xl p-4 shadow-inner text-center">
                      <h4 className="font-semibold text-black mb-2">Company</h4>
                      <p className="font-medium text-black">
                        {user.company_name}
                      </p>
                    </div>
                  )}

                  {/* Website */}
                  {user.website_url && (
                    <div className="bg-yellow-600 dark:bg-yellow-400 rounded-xl p-4 shadow-inner text-center">
                      <h4 className="font-semibold text-black mb-2">Website</h4>
                      <a
                        href={user.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline break-all"
                      >
                        {user.website_url}
                      </a>
                    </div>
                  )}

                  {/* Industry */}
                  {user.industry && (
                    <div className="bg-yellow-600 dark:bg-yellow-400 rounded-xl p-4 shadow-inner text-center">
                      <h4 className="font-semibold text-black mb-2">
                        Industry
                      </h4>
                      <p className="font-medium text-black">{user.industry}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* QR Code Card */}
          {user.qr_code_url && (
            <div className="mt-8 flex justify-center px-4">
              <div className=" rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-black-600 mb-6 text-center flex items-center justify-center gap-2">
                  <FaQrcode className="text-white" /> QR Code
                </h3>

                <div className="flex flex-col items-center gap-4">
                  {/* QR Code Image */}
                  <a
                    href={user.qr_code_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={user.qr_code_url}
                      alt="QR Code"
                      className="w-40 h-40 object-contain rounded-lg shadow-md"
                    />
                  </a>

                  {/* Download Button */}
                  <a
                    href={user.qr_code_url}
                    download="qr_code.png"
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow transition"
                  >
                    <FaDownload className="text-black" />
                    <span className="text-black">Download QR Code</span>
                  </a>
                </div>
              </div>
            </div>
          )}
          {/* SEO / Title–Description Card */}
          {(user.seo_title || user.seo_description) && (
            <div className="mt-10 flex justify-center px-4">
              <div className=" rounded-2xl p-6 w-full max-w-md  border-gray-100 hover:shadow-black-200 dark:hover:shadow-black-800 transition-all duration-300">
                {/* Card Heading */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="bg-gradient-to-r from-black-400 to-black-600 text-white p-3">
                    <span className="font-bold text-lg">🔍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide">
                    SEO Information
                  </h3>
                </div>

                {/* Title */}
                {user.seo_title && (
                  <div className="bg-yellow-50 dark:bg-yellow-600 rounded-xl p-4 shadow-inner mb-4 text-center">
                    <h4 className="font-semibold text-black mb-2 text-lg">
                      Title
                    </h4>
                    <p className="font-medium text-black  break-words">
                      {user.seo_title}
                    </p>
                  </div>
                )}

                {/* Description */}
                {user.seo_description && (
                  <div className="bg-yellow-50 dark:bg-yellow-600 rounded-xl p-4 shadow-inner text-center">
                    <h4 className="font-semibold text-black mb-2 text-lg">
                      Description
                    </h4>
                    <p className="font-medium text-black break-words">
                      {user.seo_description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Info Card */}
          {(user.is_public !== undefined ||
            user.allow_contact_form !== undefined ||
            user.dark_mode_enabled !== undefined ||
            user.custom_theme_color) && (
            <div className="mt-10 flex justify-center px-4">
              <div className=" rounded-2xl p-6 w-full max-w-lg border-gray-100 dark:border-gray-700 transition-all duration-300 ">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-black-400 to-black-600 text-white ">
                    <FaCogs className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100 dark:text-gray-100 tracking-wide">
                    Additional Info
                  </h3>
                </div>

                {/* Info Items */}
                <div className="flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-200">
                  {/* Public Profile */}
                  {user.is_public !== undefined && (
                    <div className="flex items-center justify-between bg-yellow-600  px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-black-50/50 dark:hover:bg-yellow-500">
                      <span className="font-medium text-black">
                        Public Profile
                      </span>
                      <div className="flex items-center gap-2">
                        {user.is_public ? (
                          <FaCheckCircle className="text-green-500 text-lg" />
                        ) : (
                          <FaTimesCircle className="text-red-500 text-lg" />
                        )}
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            user.is_public
                              ? "bg-white text-black"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.is_public ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Allow Contact Form */}
                  {user.allow_contact_form !== undefined && (
                    <div className="flex items-center justify-between bg-yellow-600  px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-black-50/50 dark:hover:bg-yellow-500">
                      <span className="font-medium text-black">
                        Allow Contact Form
                      </span>
                      <div className="flex items-center gap-2">
                        {user.allow_contact_form ? (
                          <FaCheckCircle className="text-green-500 text-lg" />
                        ) : (
                          <FaTimesCircle className="text-red-500 text-lg" />
                        )}
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            user.allow_contact_form
                              ? "bg-white text-black"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.allow_contact_form ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Dark Mode */}
                  {user.dark_mode_enabled !== undefined && (
                    <div className="flex items-center justify-between bg-yellow-600  px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-black-50/50 dark:hover:bg-yellow-500">
                      <span className="font-medium text-black">Dark Mode</span>
                      <div className="flex items-center gap-2">
                        {user.dark_mode_enabled ? (
                          <FaCheckCircle className="text-green-500 text-lg" />
                        ) : (
                          <FaTimesCircle className="text-red-500 text-lg" />
                        )}
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            user.dark_mode_enabled
                              ? "bg-white text-black"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.dark_mode_enabled ? "Enabled" : "Disabled"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Theme Color */}
                  {user.custom_theme_color && (
                    <div className="flex items-center justify-between bg-yellow-600  px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-black-50/50 dark:hover:bg-yellow-500">
                      <span className="font-medium text-black">
                        Theme Color
                      </span>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-black shadow-md"
                          style={{ backgroundColor: user.custom_theme_color }}
                        ></div>
                        <span className="text-xs font-semibold text-black">
                          {user.custom_theme_color}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <VCardDownloadButton
            user={user}
            bgColor="bg-yellow-600"
            textColor="text-white"
            hoverColor="hover:bg-yellow-500"
            className="fixed bottom-6 right-6 z-50"
          />
          <p className="text-xs text-gray-500 pb-8 mt-8">
            Made by Digi vCard Builder ❤️ EK Villion
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTwo;

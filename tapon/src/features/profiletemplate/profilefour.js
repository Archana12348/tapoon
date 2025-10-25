import React from "react";
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

export default function FitnessProfile({ profile }) {
  if (!profile) return null;

  const user = profile;
  console.log("company name", user.company_name);

  const socialLinks = [
    { url: user.website_url, icon: <FaGlobe /> },
    { url: user.facebook_url, icon: <FaFacebook /> },
    { url: user.instagram_url, icon: <FaInstagram /> },
    { url: `https://wa.me/${user.whatsapp_number}`, icon: <FaWhatsapp /> },
    { url: user.linkedin_url, icon: <FaLinkedin /> },
    { url: user.twitter_url, icon: <FaTwitter /> },
    { url: user.youtube_url, icon: <FaYoutube /> },
    { url: user.tiktok_url, icon: <FaTiktok /> },
    { url: user.snapchat_url, icon: <FaSnapchat /> },
    { url: user.github_url, icon: <FaGithub /> },
    { url: user.behance_url, icon: <FaBehance /> },
    { url: user.pinterest_url, icon: <FaPinterest /> },
    { url: user.dribbble_url, icon: <FaDribbble /> },
    { url: user.threads_url, icon: <FaTelegram /> },
  ];

  // Helper to print key-value pairs dynamically
  const renderData = (obj) => {
    return Object.entries(obj)
      .filter(
        ([_, value]) =>
          value !== null && value !== "" && typeof value !== "object"
      )
      .map(([key, value]) => (
        <div key={key} className="flex justify-between border-b py-2 text-sm">
          <span className="font-semibold capitalize text-gray-600 dark:text-gray-300">
            {key.replace(/_/g, " ")}:
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {value.toString()}
          </span>
        </div>
      ));
  };

  // Helper component for a section wrapper
  const SectionCard = ({ title, children, className = "" }) => (
    <div
      className={`bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-gray-100 ${className}`}
    >
      <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-6">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <section className=" bg-gray-900 text-gray-800 dark:text-white mt-2 font-sans pb-10">
      {/* Banner */}
      <div className="relative">
        <img
          src={user.avatar_original}
          alt="Cover"
          className="w-full h-96 object-cover"
        />
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-green-600 shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-2xl font-bold text-green-600">{user.name}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <p className="text-gray-400 text-sm">{user.email}</p>
        <p className="text-gray-500 text-base font-semibold tracking-wide">
          {user.headline}
        </p>
      </div>

      {/* Dynamic Data Table */}
      {/* <div className="mt-8 px-6 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4 text-green-600">
          Profile Details
        </h2>
        {renderData(user)}
      </div> */}

      {/* Bio Card */}
      {user.bio && (
        <div className="mt-8 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl hover:shadow-green-200 dark:hover:shadow-green-800 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-600 mb-3 text-center">
              Bio
            </h3>
            <p className=" text-gray-200 text-sm leading-relaxed text-center whitespace-pre-line">
              {user.bio}
            </p>
          </div>
        </div>
      )}
      {/* Bio Card */}
      {user.about && (
        <div className="mt-8 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl hover:shadow-green-200 dark:hover:shadow-green-800 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-600 mb-3 text-center">
              About
            </h3>
            <p
              className="text-gray-200 text-sm leading-relaxed text-center whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: user.about || "<p>No bio available.</p>",
              }}
            ></p>
          </div>
        </div>
      )}

      {/* Address Card */}
      {/* {(user.area || user.city || user.state || user.country) && (
        <div className="mt-8 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-5 w-full max-w-md">
            <h3 className="text-lg font-semibold text-green-600 mb-3 text-center">
              Address
            </h3>
            <div className="text-gray-700 dark:text-gray-200 text-sm text-center leading-relaxed">
              {user.area && <p className="font-medium">{user.area}</p>}
              {user.city && <p>{user.city}</p>}
              {user.state && <p>{user.state}</p>}
              {user.country && <p>{user.country}</p>}
            </div>
          </div>
        </div>
      )} */}

      {/* Skills */}
      {user.nfc_card_id?.length > 0 && (
        <div className="mt-6 px-4 text-center">
          <h3 className="text-green-600 font-semibold mb-2">NFC Card ID</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-green-50 text-green-700 font-medium py-1 px-3 rounded-full text-sm shadow">
              {user.nfc_card_id}
            </span>
          </div>
        </div>
      )}
      {/* Skills */}
      {user.skills?.length > 0 && (
        <div className="mt-6 px-4 text-center">
          <h3 className="text-green-600 font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {user.skills
              .filter((s) => s.trim() !== "")
              .map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-green-50 text-green-700 font-medium py-1 px-3 rounded-full text-sm shadow"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Services */}
      {user.services?.length > 0 && (
        <div className="mt-6 px-4 text-center">
          <h3 className="text-green-600 font-semibold mb-2">Services</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {user.services
              .filter((s) => s.trim() !== "")
              .map((service, idx) => (
                <span
                  key={idx}
                  className="bg-green-50 text-green-700 font-medium py-1 px-3 rounded-full text-sm shadow"
                >
                  {service}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      {/* {user.gallery?.length > 0 && (
        <div className="mt-8 px-4 text-center">
          <h3 className="text-green-700 font-semibold mb-2">Gallery</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {user.gallery
              .filter((img) => img.trim() !== "")
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx}`}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
              ))}
          </div>
        </div>
      )} */}

      {/* Social Links */}
      <div className="mt-8 flex flex-wrap justify-center gap-3 px-4">
        {socialLinks.map(
          (social, idx) =>
            social.url && (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-green-500 hover:bg-green-100 dark:hover:bg-green-800 transition"
              >
                <span className="text-green-600 text-lg">{social.icon}</span>
              </a>
            )
        )}
      </div>

      {/* Address & Contact (Business Info Card) */}
      {(user.area ||
        user.city ||
        user.state ||
        user.country ||
        user.email ||
        user.phone ||
        user.whatsapp_number) && (
        <div className="mt-8 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl hover:shadow-green-200 dark:hover:shadow-green-800 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-600 mb-6 text-center flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Business Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200 text-sm">
              {/* Address Section */}
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center justify-center gap-2">
                  <FaMapMarkerAlt className="text-green-500" /> Address
                </h4>
                <div className="text-center leading-relaxed">
                  {user.area && (
                    <p className="font-medium text-gray-100">{user.area}</p>
                  )}
                  <p className="text-gray-300">
                    {[user.city, user.state, user.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner ">
                <h4 className="font-semibold text-green-600 mb-3 flex items-center justify-center gap-2">
                  <FaPhone className="text-green-500 rotate-90" /> Contact
                </h4>
                <div className="flex flex-col gap-3 items-center">
                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center gap-2 hover:text-green-600 transition"
                    >
                      <FaEnvelope className="text-green-500" />
                      <span className="text-white">{user.email}</span>
                    </a>
                  )}
                  {user.phone && (
                    <a
                      href={`tel:${user.phone}`}
                      className="flex items-center gap-2 hover:text-green-600 transition"
                    >
                      <FaPhone className="text-green-500 rotate-90" />
                      <span className="text-white">{user.phone}</span>
                    </a>
                  )}
                  {user.whatsapp_number && (
                    <a
                      href={`https://wa.me/${user.whatsapp_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-green-600 transition"
                    >
                      <FaWhatsapp className="text-green-500 w-4 h-6" />
                      <span className="text-white">{user.whatsapp_number}</span>
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
        <div className="mt-8 flex justify-center px-4 ">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-3xl hover:shadow-green-200 dark:hover:shadow-green-800 transition-all duration-300">
            <h3 className="text-lg font-semibold text-green-600 mb-6 text-center flex items-center justify-center gap-2 ">
              🏢 Company Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 dark:text-gray-200 text-sm">
              {/* Company Name */}
              {user.company_name && (
                <div className="bg-gray-900 rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold text-green-600 mb-2">Company</h4>
                  <p className="font-medium text-gray-100">
                    {user.company_name}
                  </p>
                </div>
              )}

              {/* Website */}
              {user.website_url && (
                <div className="bg-gray-900 rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold text-green-600 mb-2">Website</h4>
                  <a
                    href={user.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    {user.website_url}
                  </a>
                </div>
              )}

              {/* Industry */}
              {user.industry && (
                <div className="bg-gray-900 rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold text-green-600 mb-2">
                    Industry
                  </h4>
                  <p className="font-medium text-gray-100">{user.industry}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Card */}
      {/* {user.qr_code_url && (
        <div className="mt-8 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-green-600 mb-6 text-center flex items-center justify-center gap-2">
              <FaQrcode className="text-green-500" /> QR Code
            </h3>

            <div className="flex flex-col items-center gap-4">
         
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

           
              <a
                href={user.qr_code_url}
                download="qr_code.png"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
              >
                <FaDownload />
                <span>Download QR Code</span>
              </a>
            </div>
          </div>
        </div>
      )} */}
      {/* SEO / Title–Description Card */}
      {(user.seo_title || user.seo_description) && (
        <div className="mt-10 flex justify-center px-4">
          <div className="bg-gray-800 dark:bg-gray-800 shadow-2xl rounded-2xl p-6 w-full max-w-md   hover:shadow-green-200 dark:hover:shadow-green-800 transition-all duration-300">
            {/* Card Heading */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-full shadow-md">
                <span className="font-bold text-lg">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-100 tracking-wide">
                SEO Information
              </h3>
            </div>

            {/* Title */}
            {user.seo_title && (
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner mb-4 text-center">
                <h4 className="font-semibold text-green-600 mb-2 text-lg">
                  Title
                </h4>
                <p className="font-medium text-gray-100 break-words">
                  {user.seo_title}
                </p>
              </div>
            )}

            {/* Description */}
            {user.seo_description && (
              <div className="bg-gray-900 rounded-xl p-4 shadow-inner text-center">
                <h4 className="font-semibold text-green-600 mb-2 text-lg">
                  Description
                </h4>
                <p className="font-medium text-gray-100 break-words">
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
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl rounded-2xl p-6 w-full max-w-md  transition-all duration-300 hover:shadow-green-200 dark:hover:shadow-green-800">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-full shadow-md">
                <FaCogs className="text-xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 tracking-wide">
                Additional Info
              </h3>
            </div>

            {/* Info Items */}
            <div className="flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-200">
              {/* Public Profile */}
              {user.is_public !== undefined && (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-green-50/50 dark:hover:bg-gray-700/40">
                  <span className="font-medium">Public Profile</span>
                  <div className="flex items-center gap-2">
                    {user.is_public ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        user.is_public
                          ? "bg-green-100 text-green-700"
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
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-green-50/50 dark:hover:bg-gray-700/40">
                  <span className="font-medium">Allow Contact Form</span>
                  <div className="flex items-center gap-2">
                    {user.allow_contact_form ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        user.allow_contact_form
                          ? "bg-green-100 text-green-700"
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
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-green-50/50 dark:hover:bg-gray-700/40">
                  <span className="font-medium">Dark Mode</span>
                  <div className="flex items-center gap-2">
                    {user.dark_mode_enabled ? (
                      <FaCheckCircle className="text-green-500 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        user.dark_mode_enabled
                          ? "bg-green-100 text-green-700"
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
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/60 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-green-50/50 dark:hover:bg-gray-700/40">
                  <span className="font-medium">Theme Color</span>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-md"
                      style={{ backgroundColor: user.custom_theme_color }}
                    ></div>
                    <span className="text-xs font-semibold">
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
        bgColor="bg-green-600"
        textColor="text-gray-700"
        hoverColor="hover:bg-green-400"
        className="fixed bottom-6 right-6 z-50"
      />

      {/* Footer */}
      <div className="mt-10 py-6 text-center text-gray-400 text-sm">
        Made By Digi vCard Builder 💖 Ek Villian
      </div>
    </section>
  );
}

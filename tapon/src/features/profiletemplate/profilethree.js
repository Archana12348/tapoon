import React from "react";
import About from "../../assests/svg/heartbeat.png";
// import Services from "../../assests/images/images/services/";
import About1 from "../../assests/images/images/main-img/about1.png";
import About2 from "../../assests/images/images/main-img/about2.png";
import About3 from "../../assests/images/images/main-img/about3.png";
import Shape from "../../assests/images/images/hero-sec/shape1.svg";
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

export default function DoctorProfile({ profile }) {
  const userData = profile;
  // {
  //   name: "srk",
  //   username: "srk",
  //   email: "srk@gmail.com",
  //   phone: "9999999999",
  //   whatsapp_number: "9999999999",
  //   avatar:
  //     "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/U3ZoSmaKmKd7CMIzKN1t.jpeg",
  //   avatar_original:
  //     "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/GsgeeDy4nTjAeEGuUHwp.jpg",
  //   about: "<p>testttt</p>",
  //   state: "Punjab",
  //   country: "India",
  //   city: "Jalandhar",
  //   area: "Model Town Jalandhar",
  //   website_url: "https://www.lipsum.com/",
  //   headline: "https://www.lipsum.com/",
  //   bio: "https://www.lipsum.com/",
  //   company_name: "https://www.lipsum.com/",
  //   job_title: "Punjab",
  //   industry: "Punjab",
  //   skills: ["Punjab", "Archana"],
  //   services: ["Punjab"],
  //   linkedin_url: "https://www.lipsum.com/",
  //   instagram_url: "https://www.lipsum.com/",
  //   facebook_url: "https://www.lipsum.com/",
  //   twitter_url: "https://www.lipsum.com/",
  //   youtube_url: null,
  //   telegram_url: "https://web.telegram.org",
  //   behance_url: "https://www.lipsum.com/",
  //   dribbble_url: "https://www.lipsum.com/",
  //   pinterest_url: "https://www.lipsum.com/",
  //   threads_url: "https://www.lipsum.com/",
  //   custom_links: [
  //     {
  //       label: "https://www.lipsum.com/",
  //       url: "https://www.lipsum.com/",
  //       icon: "https://www.lipsum.com/",
  //     },
  //   ],
  // };

  const socialLinks = [
    { url: userData.website_url, icon: <FaGlobe /> },
    { url: userData.facebook_url, icon: <FaFacebook /> },
    { url: userData.instagram_url, icon: <FaInstagram /> },
    { url: `https://wa.me/${userData.whatsapp_number}`, icon: <FaWhatsapp /> },
    { url: userData.linkedin_url, icon: <FaLinkedin /> },
    { url: userData.twitter_url, icon: <FaTwitter /> },
    { url: userData.threads_url, icon: <FaTelegram /> },
    { url: userData.tiktok_url, icon: <FaTiktok /> },
    { url: userData.snapchat_url, icon: <FaSnapchat /> },
    { url: userData.github_url, icon: <FaGithub /> },
    { url: userData.behance_url, icon: <FaBehance /> },
    { url: userData.pinterest_url, icon: <FaPinterest /> },
    { url: userData.dribbble_url, icon: <FaDribbble /> },
  ];

  return (
    <section id="healthcare" className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative mt-12">
        <img
          src={userData.avatar_original}
          alt="cover"
          className="w-full h-96 object-cover"
        />
        <img
          src={Shape}
          alt="shape"
          className="absolute bottom-[-1px] left-0 w-full"
        />
      </div>

      {/* Profile Info */}
      <div className="text-center -mt-[4rem] relative z-10 md:-mt-32">
        <div className="flex justify-center">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-cyan-600 mt-4">
          {userData.name}
        </h1>
        <p className="text-gray-700 mt-2">{userData.headline}</p>
      </div>

      {/* Social Icons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 px-4">
        {socialLinks.map(
          (social, idx) =>
            social.url && (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg transition"
              >
                {social.icon}
              </a>
            )
        )}
      </div>

      {/* About / Bio */}
      <div className="text-center text-gray-600 mt-6 px-6">
        <div
          dangerouslySetInnerHTML={{
            __html: userData.about || "No bio available.",
          }}
        />
      </div>

      {/* About Us Section */}
      <div className="mt-12 px-6 md:px-16">
        <div className="text-center mb-6">
          <h2 className="text-cyan-600 font-bold text-xl flex justify-center items-center gap-2">
            <img src={About} alt="heart" className="w-6" />
            About Us
            <img src={About} alt="heart" className="w-6 rotate-180" />
          </h2>
        </div>

        <p className="text-gray-600 mb-3 text-center">{userData.bio}</p>
      </div>

      {/* NFC Card ID Section */}
      {userData.nfc_card_id && (
        <div className="bg-cyan-50 py-3 px-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-cyan-600 flex justify-center items-center gap-2">
              <img src={About} alt="icon" className="w-6 inline-block" />
              NFC Card ID
              <img
                src={About}
                alt="icon"
                className="w-6 inline-block rotate-180"
              />
            </h3>
          </div>
          <div className="flex justify-center">
            <div className="bg-cyan-500 hover:bg-cyan-600 text-white  text-sm font-semibold px-6 py-2 rounded-full  transition">
              {userData.nfc_card_id}
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {userData.skills && userData.skills.length > 0 && (
        <div className="bg-cyan-50 py-3 px-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-cyan-600 flex justify-center items-center gap-2">
              <img src={About} alt="icon" className="w-6 inline-block" />
              Skills
              <img
                src={About}
                alt="icon"
                className="w-6 inline-block rotate-180"
              />
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {userData.skills
              .filter((skill) => skill.trim() !== "")
              .map((skill, index) => (
                <span
                  key={index}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-6 py-2 rounded-full  transition"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Services Section (tag format) */}
      {userData.services && userData.services.length > 0 && (
        <div className="bg-cyan-50 py-3 px-6">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-cyan-600 flex justify-center items-center gap-2">
              <img src={About} alt="icon" className="w-6 inline-block" />
              Services
              <img
                src={About}
                alt="icon"
                className="w-6 inline-block rotate-180"
              />
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {userData.services
              .filter((service) => service.trim() !== "")
              .map((service, index) => (
                <span
                  key={index}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white  text-sm font-semibold px-6 py-2 rounded-full  transition"
                >
                  {service}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Address & Contact (Business Info Card) */}
      {(userData.area ||
        userData.city ||
        userData.state ||
        userData.country ||
        userData.email ||
        userData.phone ||
        userData.whatsapp_number) && (
        <div className="pt-8 flex justify-center px-4 bg-cyan-50">
          <div className=" rounded-2xl p-6 w-full max-w-3xl">
            {/* Card Title */}
            <h3 className="text-lg text-cyan-600 font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaMapMarkerAlt className="text-cyan-600" />
              Business Info
            </h3>

            {/* Grid for Address and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white text-sm">
              {/* Address Section */}
              <div className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-4 shadow-inner">
                <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
                  <FaMapMarkerAlt /> Address
                </h4>
                <div className="text-center leading-relaxed">
                  {userData.area && (
                    <p className="font-medium">{userData.area}</p>
                  )}
                  <p>
                    {[userData.city, userData.state, userData.country]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-4 shadow-inner">
                <h4 className="font-semibold mb-3 flex items-center justify-center gap-2">
                  <FaPhone className="rotate-90" /> Contact
                </h4>
                <div className="flex flex-col gap-3 items-center">
                  {userData.email && (
                    <a
                      href={`mailto:${userData.email}`}
                      className="flex items-center gap-2 hover:text-gray-200 transition"
                    >
                      <FaEnvelope />
                      <span>{userData.email}</span>
                    </a>
                  )}
                  {userData.phone && (
                    <a
                      href={`tel:${userData.phone}`}
                      className="flex items-center gap-2 hover:text-gray-200 transition"
                    >
                      <FaPhone className="rotate-90" />
                      <span>{userData.phone}</span>
                    </a>
                  )}
                  {userData.whatsapp_number && (
                    <a
                      href={`https://wa.me/${userData.whatsapp_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gray-200 transition"
                    >
                      <FaWhatsapp className="w-4 h-6" />
                      <span>{userData.whatsapp_number}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Info Card */}
      {(userData.company_name || userData.website_url || userData.industry) && (
        <div className="pt-8 flex justify-center px-4 bg-cyan-50">
          <div className=" rounded-2xl p-6 w-full max-w-3xl">
            {/* Card Title */}
            <h3 className="text-lg text-cyan-700 font-bold mb-6 text-center flex items-center justify-center gap-2">
              🏢 Company Info
            </h3>

            {/* Grid for Company Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white text-sm">
              {/* Company Name */}
              {userData.company_name && (
                <div className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold mb-2">Company</h4>
                  <p className="font-medium">{userData.company_name}</p>
                </div>
              )}

              {/* Website */}
              {userData.website_url && (
                <div className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold mb-2">Website</h4>
                  <a
                    href={userData.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline break-all"
                  >
                    {userData.website_url}
                  </a>
                </div>
              )}

              {/* Industry */}
              {userData.industry && (
                <div className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-4 shadow-inner text-center">
                  <h4 className="font-semibold mb-2">Industry</h4>
                  <p className="font-medium">{userData.industry}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Card */}
      {/* {userData.qr_code_url && (
        <div className="pt-8 flex justify-center px-4 bg-cyan-50">
          <div className=" rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg text-cyan-800 font-bold mb-6 text-center flex items-center justify-center gap-2">
              <FaQrcode className="text-cyan-800" /> QR Code
            </h3>

            <div className="flex flex-col items-center gap-4">
      
              <a
                href={userData.qr_code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={userData.qr_code_url}
                  alt="QR Code"
                  className="w-40 h-40 object-contain rounded-lg shadow-md"
                />
              </a>

         
              <a
                href={userData.qr_code_url}
                download="qr_code.png"
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg shadow transition"
              >
                <FaDownload />
                <span>Download QR Code</span>
              </a>
            </div>
          </div>
        </div>
      )} */}

      {/* SEO / Title–Description Card */}
      {(userData.seo_title || userData.seo_description) && (
        <div className="pt-10 flex justify-center px-4 bg-cyan-50">
          <div className=" rounded-2xl p-6 w-full max-w-md">
            {/* Card Heading */}
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="text-cyan-700">
                <span className="font-bold text-lg">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-cyan-700 tracking-wide">
                SEO Information
              </h3>
            </div>

            {/* Title */}
            {userData.seo_title && (
              <div className="bg-cyan-500 dark:bg-cyan-600 rounded-xl p-4 shadow-inner mb-4 text-center">
                <h4 className="font-semibold mb-2 text-white text-lg">Title</h4>
                <p className="font-medium text-white break-words">
                  {userData.seo_title}
                </p>
              </div>
            )}

            {/* Description */}
            {userData.seo_description && (
              <div className="bg-cyan-500 dark:bg-cyan-600 rounded-xl p-4 shadow-inner text-center">
                <h4 className="font-semibold mb-2 text-white text-lg">
                  Description
                </h4>
                <p className="font-medium text-white break-words">
                  {userData.seo_description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {(userData.is_public !== undefined ||
        userData.allow_contact_form !== undefined ||
        userData.dark_mode_enabled !== undefined ||
        userData.custom_theme_color) && (
        <div className="pt-10 flex justify-center px-4 bg-cyan-50">
          <div className=" rounded-2xl p-6 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="text-cyan-700">
                <FaCogs className="text-xl" />
              </div>
              <h3 className="text-xl font-bold text-cyan-700 tracking-wide">
                Additional Info
              </h3>
            </div>

            {/* Info Items */}
            <div className="flex flex-col gap-4 text-white text-sm">
              {/* Public Profile */}
              {userData.is_public !== undefined && (
                <div className="flex items-center justify-between bg-cyan-500 dark:bg-cyan-600 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-600">
                  <span className="font-medium">Public Profile</span>
                  <div className="flex items-center gap-2">
                    {userData.is_public ? (
                      <FaCheckCircle className="text-green-400 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        userData.is_public
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {userData.is_public ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              )}

              {/* Allow Contact Form */}
              {userData.allow_contact_form !== undefined && (
                <div className="flex items-center justify-between bg-cyan-500 dark:bg-cyan-600 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-600">
                  <span className="font-medium">Allow Contact Form</span>
                  <div className="flex items-center gap-2">
                    {userData.allow_contact_form ? (
                      <FaCheckCircle className="text-green-400 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        userData.allow_contact_form
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {userData.allow_contact_form ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              )}

              {/* Dark Mode */}
              {userData.dark_mode_enabled !== undefined && (
                <div className="flex items-center justify-between bg-cyan-500 dark:bg-cyan-600 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-600">
                  <span className="font-medium">Dark Mode</span>
                  <div className="flex items-center gap-2">
                    {userData.dark_mode_enabled ? (
                      <FaCheckCircle className="text-green-400 text-lg" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        userData.dark_mode_enabled
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {userData.dark_mode_enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </div>
              )}

              {/* Theme Color */}
              {userData.custom_theme_color && (
                <div className="flex items-center justify-between bg-cyan-500 dark:bg-cyan-600 px-4 py-3 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-cyan-600">
                  <span className="font-medium">Theme Color</span>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-md"
                      style={{ backgroundColor: userData.custom_theme_color }}
                    ></div>
                    <span className="text-xs font-semibold">
                      {userData.custom_theme_color}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <VCardDownloadButton
        user={userData}
        bgColor="bg-cyan-600"
        textColor="text-white"
        hoverColor="hover:bg-cyan-500"
        className="fixed bottom-6 right-6 z-50"
      />

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-4">
        Made By{" "}
        <span className="text-cyan-500 font-medium">Digi vCard Builder</span> 💖{" "}
        The_Krishna
      </footer>
    </section>
  );
}

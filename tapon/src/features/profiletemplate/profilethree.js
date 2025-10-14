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
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

export default function DoctorProfile() {
  const userData = {
    name: "srk",
    username: "srk",
    email: "srk@gmail.com",
    phone: "9999999999",
    whatsapp_number: "9999999999",
    avatar:
      "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/U3ZoSmaKmKd7CMIzKN1t.jpeg",
    avatar_original:
      "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/GsgeeDy4nTjAeEGuUHwp.jpg",
    about: "<p>testttt</p>",
    state: "Punjab",
    country: "India",
    city: "Jalandhar",
    area: "Model Town Jalandhar",
    website_url: "https://www.lipsum.com/",
    headline: "https://www.lipsum.com/",
    bio: "https://www.lipsum.com/",
    company_name: "https://www.lipsum.com/",
    job_title: "Punjab",
    industry: "Punjab",
    skills: ["Punjab", "Archana"],
    services: ["Punjab"],
    linkedin_url: "https://www.lipsum.com/",
    instagram_url: "https://www.lipsum.com/",
    facebook_url: "https://www.lipsum.com/",
    twitter_url: "https://www.lipsum.com/",
    youtube_url: null,
    telegram_url: "https://web.telegram.org",
    behance_url: "https://www.lipsum.com/",
    dribbble_url: "https://www.lipsum.com/",
    pinterest_url: "https://www.lipsum.com/",
    threads_url: "https://www.lipsum.com/",
    custom_links: [
      {
        label: "https://www.lipsum.com/",
        url: "https://www.lipsum.com/",
        icon: "https://www.lipsum.com/",
      },
    ],
  };

  const socialLinks = [
    { icon: <FaGlobe size={20} />, url: userData.website_url },
    { icon: <FaFacebook size={20} />, url: userData.facebook_url },
    { icon: <FaInstagram size={20} />, url: userData.instagram_url },
    {
      icon: <FaWhatsapp size={20} />,
      url: `https://wa.me/${userData.whatsapp_number}`,
    },
    { icon: <FaLinkedin size={20} />, url: userData.linkedin_url },
    { icon: <FaTwitter size={20} />, url: userData.twitter_url },
    { icon: <FaTelegram size={20} />, url: userData.telegram_url },
    { icon: <FaYoutube size={20} />, url: userData.youtube_url },
    { icon: <FaPhone size={20} />, url: `tel:${userData.phone}` },
  ].filter((item) => item.url);

  return (
    <section id="healthcare" className="bg-white text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative mt-12">
        <img
          src={userData.avatar_original}
          alt="cover"
          className="w-full h-72 object-cover"
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
        <p className="text-gray-700 mt-2">{userData.job_title}</p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        {socialLinks.map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg transition"
          >
            {item.icon}
          </a>
        ))}
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

        <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-4">
          {userData.company_name || "Smart Health Can Make Your Life Easier"}
        </h3>

        <p className="text-gray-600 mb-3 text-center">{userData.bio}</p>
        <p className="text-gray-600 text-center">{userData.headline}</p>

        {/* Experience & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 items-center">
          <div className="flex justify-center md:justify-end">
            <div className="bg-cyan-50 border-2 border-cyan-500 text-center px-10 py-8 rounded-xl">
              <h1 className="text-4xl font-bold text-gray-800">20</h1>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <img src={About1} alt="about1" className="rounded-lg" />
            <img src={About2} alt="about2" className="rounded-lg" />
            <img src={About3} alt="about3" className="rounded-lg" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-cyan-50 mt-12 py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-cyan-600 font-bold text-xl flex justify-center items-center gap-2">
            <img src={About} alt="heart" className="w-6" />
            Services
            <img src={About} alt="heart" className="w-6 rotate-180" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {userData.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center"
            >
              <h3 className="text-lg font-semibold mt-4">{service}</h3>
              <p className="text-gray-600 text-sm mt-2">
                Service description not available.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 py-4">
        Made By{" "}
        <span className="text-cyan-500 font-medium">Digi vCard Builder</span> 💖{" "}
        The_Krishna
      </footer>
    </section>
  );
}

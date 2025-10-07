import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaSnapchat,
  FaGithub,
  FaWhatsapp,
  FaBehance,
  FaDribbble,
  FaPinterest,
  FaThreads,
  FaComment,
} from "react-icons/fa"; // Added new imports for Behance, Dribbble, Pinterest, and Threads

// SectionCard is a wrapper to contain social media icons (ensure it's defined or imported)
const SectionCard = ({ children }) => {
  return <div className="p-6 bg-white rounded-lg shadow-lg">{children}</div>;
};

const SocialMedia = ({ profile }) => {
  return (
    <SectionCard>
      <h2 className="text-2xl font-bold mb-4 text-center">Social Media</h2>{" "}
      {/* Added Heading */}
      <div className="flex flex-wrap justify-center gap-4 pt-2">
        {/* Facebook */}
        {profile.facebook_url && (
          <a
            href={profile.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Facebook"
          >
            <FaFacebook className="w-6 h-6 text-blue-600 group-hover:text-blue-800" />
          </a>
        )}

        {/* Instagram */}
        {profile.instagram_url && (
          <a
            href={profile.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6 text-pink-600 group-hover:text-pink-800" />
          </a>
        )}

        {/* LinkedIn */}
        {profile.linkedin_url && (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 text-blue-800 group-hover:text-blue-900" />
          </a>
        )}

        {/* Twitter */}
        {profile.twitter_url && (
          <a
            href={profile.twitter_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Twitter"
          >
            <FaTwitter className="w-6 h-6 text-blue-400 group-hover:text-blue-600" />
          </a>
        )}

        {/* YouTube */}
        {profile.youtube_url && (
          <a
            href={profile.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="YouTube"
          >
            <FaYoutube className="w-6 h-6 text-red-600 group-hover:text-red-800" />
          </a>
        )}

        {/* TikTok */}
        {profile.tiktok_url && (
          <a
            href={profile.tiktok_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="TikTok"
          >
            <FaTiktok className="w-6 h-6 text-black group-hover:text-gray-700" />
          </a>
        )}

        {/* Snapchat */}
        {profile.snapchat_url && (
          <a
            href={profile.snapchat_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Snapchat"
          >
            <FaSnapchat className="w-6 h-6 text-yellow-500 group-hover:text-yellow-600" />
          </a>
        )}

        {/* GitHub */}
        {profile.github_url && (
          <a
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 text-gray-800 group-hover:text-black" />
          </a>
        )}

        {/* WhatsApp */}
        {profile.whatsapp_url && (
          <a
            href={profile.whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-6 h-6 text-green-500 group-hover:text-green-700" />
          </a>
        )}

        {/* Behance */}
        {profile.behance_url && (
          <a
            href={profile.behance_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Behance"
          >
            <FaBehance className="w-6 h-6 text-blue-700 group-hover:text-blue-900" />
          </a>
        )}

        {/* Dribbble */}
        {profile.dribbble_url && (
          <a
            href={profile.dribbble_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Dribbble"
          >
            <FaDribbble className="w-6 h-6 text-pink-500 group-hover:text-pink-700" />
          </a>
        )}

        {/* Pinterest */}
        {profile.pinterest_url && (
          <a
            href={profile.pinterest_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Pinterest"
          >
            <FaPinterest className="w-6 h-6 text-red-600 group-hover:text-red-800" />
          </a>
        )}

        {/* Threads */}

        {profile.threads_url && (
          <a
            href={profile.threads_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group transition duration-300 transform hover:scale-110 p-3 bg-gray-50 rounded-full shadow-lg"
            aria-label="Threads"
          >
            <FaComment className="w-6 h-6 text-purple-600 group-hover:text-purple-800" />
          </a>
        )}
      </div>
    </SectionCard>
  );
};

export default SocialMedia;

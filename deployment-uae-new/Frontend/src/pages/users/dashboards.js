import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/Auth/profile";
import { useParams, Navigate } from "react-router-dom";
import SocialMediaLinks from "./socialmedia";
import format from "date-fns/format";

import { CheckCircle, Mail, Phone, Link } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import API from "../../services/Api/axios";

export default function UserProfilePage() {
  const { slug } = useParams();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = checking
  const [loadingAuth, setLoadingAuth] = useState(true);

  // ✅ Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get(`/public/api/get-user-details`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Fetch user profile once authenticated
  useEffect(() => {
    if (isAuthenticated !== true) return;

    const getProfile = async () => {
      try {
        const res = await fetchUserProfile(slug);
        setProfile(res.data);
      } catch (err) {
        setErrorProfile(
          err.message || "Failed to load user profile. Please try again."
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    getProfile();
  }, [slug, isAuthenticated]);

  // 🔹 Show auth loader
  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // 🔹 Redirect ONLY when explicitly unauthenticated
  if (isAuthenticated === false) {
    return <Navigate to="/sign-in" replace />;
  }

  // 🔹 Loading profile
  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-medium text-gray-600">Loading profile...</p>
      </div>
    );
  }

  // 🔹 Profile error
  if (errorProfile) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <p className="text-xl font-medium text-red-600 p-4 border border-red-300 rounded-lg">
          Error: {errorProfile}
        </p>
      </div>
    );
  }

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
            {/* Edit Profile Button */}
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

            {/* Profile Header */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={profile.avatar_original}
                alt="Cover"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              <div className="absolute bottom-0 left-0 right-0 flex flex-col md:flex-row items-center md:items-end md:space-x-6 p-4 md:pb-6">
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white object-cover shadow-2xl mb-4 md:mb-0"
                />
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

            {/* Main Content */}
            <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
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

                {profile.skills?.length > 0 && (
                  <SectionCard title="Skills">
                    <div className="flex flex-wrap gap-3">
                      {profile.skills
                        .filter((skill) => skill.trim() !== "")
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

                {profile.services?.length > 0 && (
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
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-10">
                <SectionCard title="Get In Touch">
                  <div className="space-y-4">
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

                    {profile.phone && (
                      <div className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 transition duration-200">
                        <Phone className="w-6 h-6 flex-shrink-0 text-indigo-500" />
                        <a href={`tel:${profile.phone}`} className="truncate">
                          {profile.phone}
                        </a>
                      </div>
                    )}

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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

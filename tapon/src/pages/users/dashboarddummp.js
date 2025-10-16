import React, { useEffect, useState } from "react";
import { fetchUserProfile } from "../../services/Auth/profile";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import TemplateOne from "../../features/profiletemplate/profileone";
import TemplateTwo from "../../features/profiletemplate/Profiletwo";
import TemplateThree from "../../features/profiletemplate/Profilethree";
import TemplateFour from "../../features/profiletemplate/Profilefour";

export default function UserProfilePage() {
  // const { slug } = useParams(); // Route: /user/srk
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // 👈 gets '1', '2', etc. from the route

  useEffect(() => {
    const getProfile = async () => {
      try {
        // console.log("Fetching user profile...", slug);
        const res = await fetchUserProfile("abheydhall");
        console.log("User Profile Data:", res.data);
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
  }, [id]);

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

  const templates = {
    1: TemplateOne,
    2: TemplateTwo,
    3: TemplateThree,
    4: TemplateFour,
  };

  // Convert to number and pick the component
  const SelectedTemplate = templates[Number(id)] || TemplateOne;

  return <SelectedTemplate profile={profile} loading={loading} error={error} />;

  return (
    <>
      <TemplateOne profile={profile} loading={loading} error={error} />
      <TemplateTwo profile={profile} loading={loading} error={error} />
      <TemplateThree profile={profile} loading={loading} error={error} />
      <TemplateFour profile={profile} loading={loading} error={error} />
    </>
  );
}

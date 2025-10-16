import React from "react";
import { FaDownload } from "react-icons/fa";

const VCardDownloadButton = ({
  user,
  buttonText = "Save Contact",
  className = "",
  bgColor = "bg-yellow-600",
  textColor = "text-black",
  hoverColor = "hover:bg-yellow-500",
}) => {
  if (!user) return null; // prevent errors if user is undefined

  const generateVCard = (profile) => {
    const escapeText = (text) =>
      text ? text.replace(/,/g, "\\,").replace(/;/g, "\\;") : "";

    const vcfLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeText(profile.name || "")}`,
      `N:${escapeText(profile.name || "")}`,
      `ORG:${escapeText(profile.company_name || "")}`,
      `TITLE:${escapeText(profile.job_title || "")}`,
      `EMAIL;TYPE=INTERNET:${escapeText(profile.email || "")}`,
      `TEL;TYPE=CELL:${escapeText(profile.phone || "")}`,
      `TEL;TYPE=WHATSAPP:${escapeText(profile.whatsapp_number || "")}`,
      `URL:${escapeText(profile.website_url || "")}`,
    ];

    // --- Social Links ---
    if (profile.linkedin_url)
      vcfLines.push(`URL;TYPE=LinkedIn:${escapeText(profile.linkedin_url)}`);
    if (profile.instagram_url)
      vcfLines.push(`URL;TYPE=Instagram:${escapeText(profile.instagram_url)}`);
    if (profile.facebook_url)
      vcfLines.push(`URL;TYPE=Facebook:${escapeText(profile.facebook_url)}`);
    if (profile.youtube_url)
      vcfLines.push(`URL;TYPE=YouTube:${escapeText(profile.youtube_url)}`);
    if (profile.snapchat_url)
      vcfLines.push(`URL;TYPE=Snapchat:${escapeText(profile.snapchat_url)}`);
    if (profile.custom_url)
      vcfLines.push(`URL;TYPE=Custom:${escapeText(profile.custom_url)}`);
    if (profile.twitter_url)
      vcfLines.push(`URL;TYPE=Twitter:${escapeText(profile.twitter_url)}`);
    if (profile.tiktok_url)
      vcfLines.push(`URL;TYPE=Tiktok:${escapeText(profile.tiktok_url)}`);
    if (profile.github_url)
      vcfLines.push(`URL;TYPE=Github:${escapeText(profile.github_url)}`);
    if (profile.behance_url)
      vcfLines.push(`URL;TYPE=Behance:${escapeText(profile.behance_url)}`);
    if (profile.dribbble_url)
      vcfLines.push(`URL;TYPE=Dribbble:${escapeText(profile.dribbble_url)}`);
    if (profile.pinterest_url)
      vcfLines.push(`URL;TYPE=Pinterest:${escapeText(profile.pinterest_url)}`);
    if (profile.threads_url)
      vcfLines.push(`URL;TYPE=Threads:${escapeText(profile.threads_url)}`);

    // --- Address ---
    if (profile.area || profile.city || profile.state || profile.country) {
      // Build the address string first, with clean commas
      const cleanAddress = [
        profile.area,
        profile.city,
        profile.state,
        profile.country,
      ]
        .filter(Boolean)
        .join(", ")
        .replace(/\\,/g, ", ");

      // ⚠️ Don't escape commas again
      vcfLines.push(`ADR;TYPE=HOME:;;${cleanAddress}`);
    }

    // --- Additional Data ---
    if (profile.bio) vcfLines.push(`NOTE:${escapeText(profile.bio)}`);
    if (profile.headline)
      vcfLines.push(`TITLE:${escapeText(profile.headline)}`);
    if (profile.industry) vcfLines.push(`ROLE:${escapeText(profile.industry)}`);
    if (profile.skills && profile.skills.length)
      vcfLines.push(`CATEGORIES:${profile.skills.map(escapeText).join(",")}`);
    if (profile.vcard_url)
      vcfLines.push(`URL;TYPE=VCARD:${escapeText(profile.vcard_url)}`);
    if (profile.pdf_resume_url)
      vcfLines.push(`URL;TYPE=RESUME:${escapeText(profile.pdf_resume_url)}`);
    if (profile.qr_code_url)
      vcfLines.push(`PHOTO;VALUE=URI:${escapeText(profile.qr_code_url)}`);
    if (profile.avatar)
      vcfLines.push(`PHOTO;VALUE=URI:${escapeText(profile.avatar)}`);
    if (profile.seo_title)
      vcfLines.push(`TITLE:${escapeText(profile.seo_title)}`);
    if (profile.seo_description)
      vcfLines.push(`NOTE:${escapeText(profile.seo_description)}`);

    vcfLines.push("END:VCARD");
    return vcfLines.join("\r\n");
  };

  const downloadVCard = () => {
    try {
      const vCard = generateVCard(user);
      const blob = new Blob([vCard], { type: "text/vcf;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${user.name || "contact"}.vcf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating vCard:", err);
      alert("Failed to generate vCard. Check console.");
    }
  };

  return (
    <button
      type="button"
      onClick={downloadVCard}
      className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-semibold shadow-md ${bgColor} ${textColor} ${hoverColor} transition-all duration-300 ${className}`}
    >
      <FaDownload className="text-lg" />
      <span>{buttonText}</span>
    </button>
  );
};

export default VCardDownloadButton;

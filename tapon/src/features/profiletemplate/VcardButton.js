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

  const generateVCard = (user) => {
    const escapeText = (text) =>
      text ? text.replace(/,/g, "\\,").replace(/;/g, "\\;") : "";

    const vcfLines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeText(user.name || "")}`,
      `N:${escapeText(user.name || "")}`,
      `ORG:${escapeText(user.company_name || "")}`,
      `TITLE:${escapeText(user.job_title || "")}`,
      `EMAIL;TYPE=INTERNET:${escapeText(user.email || "")}`,
      `TEL;TYPE=CELL:${escapeText(user.phone || "")}`,
      `TEL;TYPE=WHATSAPP:${escapeText(user.whatsapp_number || "")}`,
      `URL:${escapeText(user.website_url || "")}`,
    ];

    if (user.linkedin_url)
      vcfLines.push(`URL;TYPE=LinkedIn:${escapeText(user.linkedin_url)}`);
    if (user.instagram_url)
      vcfLines.push(`URL;TYPE=Instagram:${escapeText(user.instagram_url)}`);
    if (user.facebook_url)
      vcfLines.push(`URL;TYPE=Facebook:${escapeText(user.facebook_url)}`);
    if (user.youtube_url)
      vcfLines.push(`URL;TYPE=YouTube:${escapeText(user.youtube_url)}`);
    if (user.snapchat_url)
      vcfLines.push(`URL;TYPE=Snapchat:${escapeText(user.snapchat_url)}`);
    if (user.custom_url)
      vcfLines.push(`URL;TYPE=Custom:${escapeText(user.custom_url)}`);
    if (user.vcard_url)
      vcfLines.push(`URL;TYPE=VCARD:${escapeText(user.vcard_url)}`);

    if (user.address)
      vcfLines.push(`ADR;TYPE=HOME:;;${escapeText(user.address)}`);
    if (user.note) vcfLines.push(`NOTE:${escapeText(user.note)}`);
    if (user.role) vcfLines.push(`ROLE:${escapeText(user.role)}`);
    if (user.categories)
      vcfLines.push(`CATEGORIES:${user.categories.map(escapeText).join(",")}`);
    if (user.photo) vcfLines.push(`PHOTO;VALUE=URI:${user.photo}`);

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

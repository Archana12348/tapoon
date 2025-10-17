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
  if (!user) return null;

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
      `URL:${escapeText(user.website_url || "")}`,
    ];

    if (user.address)
      vcfLines.push(`ADR;TYPE=HOME:;;${escapeText(user.address)}`);
    if (user.note) vcfLines.push(`NOTE:${escapeText(user.note)}`);
    if (user.photo) vcfLines.push(`PHOTO;VALUE=URI:${user.photo}`);

    vcfLines.push("END:VCARD");
    return vcfLines.join("\r\n");
  };

  const openVCard = () => {
    try {
      const vCard = generateVCard(user);
      const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      // 🔹 Instead of forcing download, open the .vcf file directly
      window.location.href = url;

      // optional cleanup after few seconds
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error("Error generating vCard:", err);
      alert("Failed to open vCard.");
    }
  };

  return (
    <button
      type="button"
      onClick={openVCard}
      className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-semibold shadow-md ${bgColor} ${textColor} ${hoverColor} transition-all duration-300 ${className}`}
    >
      <FaDownload className="text-lg" />
      <span>{buttonText}</span>
    </button>
  );
};

export default VCardDownloadButton;

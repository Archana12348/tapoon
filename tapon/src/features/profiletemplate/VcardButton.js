// import React from "react";
// import { FaDownload } from "react-icons/fa";

// const VCardDownloadButton = ({
//   user,
//   buttonText = "Save Contact",
//   className = "",
//   bgColor = "bg-yellow-600",
//   textColor = "text-black",
//   hoverColor = "hover:bg-yellow-500",
// }) => {
//   if (!user) return null;

//   const generateVCard = (profile) => {
//     const escapeText = (text) =>
//       text ? text.replace(/,/g, "\\,").replace(/;/g, "\\;") : "";

//     const vcfLines = [
//       "BEGIN:VCARD",
//       "VERSION:3.0",
//       `FN:${escapeText(profile.name || "")}`,
//       `N:${escapeText(profile.name || "")}`,
//       `ORG:${escapeText(profile.company_name || "")}`,
//       `TITLE:${escapeText(profile.job_title || "")}`,
//       `EMAIL;TYPE=INTERNET:${escapeText(profile.email || "")}`,
//       `TEL;TYPE=CELL:${escapeText(profile.phone || "")}`,
//       `TEL;TYPE=WHATSAPP:${escapeText(profile.whatsapp_number || "")}`,
//       `URL:${escapeText(profile.website_url || "")}`,
//     ];

//     // --- Social Links ---
//     const socials = {
//       LinkedIn: profile.linkedin_url,
//       Instagram: profile.instagram_url,
//       Facebook: profile.facebook_url,
//       YouTube: profile.youtube_url,
//       Snapchat: profile.snapchat_url,
//       Custom: profile.custom_url,
//       Twitter: profile.twitter_url,
//       Tiktok: profile.tiktok_url,
//       Github: profile.github_url,
//       Behance: profile.behance_url,
//       Dribbble: profile.dribbble_url,
//       Pinterest: profile.pinterest_url,
//       Threads: profile.threads_url,
//     };

//     Object.entries(socials).forEach(([type, url]) => {
//       if (url) vcfLines.push(`URL;TYPE=${type}:${escapeText(url)}`);
//     });

//     // --- Address ---
//     if (profile.area || profile.city || profile.state || profile.country) {
//       const cleanAddress = [
//         profile.area,
//         profile.city,
//         profile.state,
//         profile.country,
//       ]
//         .filter(Boolean)
//         .join(", ")
//         .replace(/\\,/g, ", ");
//       vcfLines.push(`ADR;TYPE=HOME:;;${cleanAddress}`);
//     }

//     // --- Extra Info ---
//     if (profile.bio) vcfLines.push(`NOTE:${escapeText(profile.bio)}`);
//     if (profile.industry) vcfLines.push(`ROLE:${escapeText(profile.industry)}`);
//     if (profile.skills?.length)
//       vcfLines.push(`CATEGORIES:${profile.skills.map(escapeText).join(",")}`);
//     if (profile.avatar)
//       vcfLines.push(`PHOTO;VALUE=URI:${escapeText(profile.avatar)}`);
//     if (profile.pdf_resume_url)
//       vcfLines.push(`URL;TYPE=RESUME:${escapeText(profile.pdf_resume_url)}`);
//     if (profile.qr_code_url)
//       vcfLines.push(`PHOTO;VALUE=URI:${escapeText(profile.qr_code_url)}`);

//     vcfLines.push("END:VCARD");
//     return vcfLines.join("\r\n");
//   };

//   // Detect mobile platform
//   const getDeviceType = () => {
//     const ua = navigator.userAgent || navigator.vendor || window.opera;
//     if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
//     if (/Android/i.test(ua)) return "android";
//     return "desktop";
//   };

//   const downloadVCard = () => {
//     try {
//       const vCard = generateVCard(user);
//       const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
//       const url = URL.createObjectURL(blob);

//       const device = getDeviceType();

//       // --- iPhone behavior: open Contacts preview directly ---
//       if (device === "ios") {
//         window.location.href = url;
//         return;
//       }

//       // --- Android: try to open directly, else fallback download ---
//       if (device === "android") {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${user.name || "contact"}.vcf`;
//         a.type = "text/vcard";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         // Some Android browsers need a direct open trigger too
//         setTimeout(() => {
//           window.location.href = url;
//         }, 800);
//       }

//       // --- Desktop behavior: normal download ---
//       if (device === "desktop") {
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `${user.name || "contact"}.vcf`;
//         a.type = "text/vcard";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       }

//       // Cleanup URL
//       setTimeout(() => URL.revokeObjectURL(url), 3000);
//     } catch (err) {
//       console.error("Error generating vCard:", err);
//       alert("Failed to generate vCard. Check console.");
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={downloadVCard}
//       className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-full font-semibold shadow-md ${bgColor} ${textColor} ${hoverColor} transition-all duration-300 ${className}`}
//     >
//       <FaDownload className="text-lg" />
//       <span>{buttonText}</span>
//     </button>
//   );
// };

// export default VCardDownloadButton;

import React from "react";
import { FaDownload } from "react-icons/fa";

// Helper: convert Blob to Data URL
const blobToDataURL = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const VCardDownloadButton = ({
  user,
  buttonText = "Save Contact",
  className = "",
  bgColor = "bg-yellow-600",
  textColor = "text-black",
  hoverColor = "hover:bg-yellow-500",
}) => {
  if (!user) return null;

  // Generate vCard string
  const generateVCard = (profile) => {
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

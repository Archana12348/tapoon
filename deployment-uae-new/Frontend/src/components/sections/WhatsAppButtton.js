import React from "react";

const WhatsAppButton = ({
  phoneNumber = "971581770786", // ← your WhatsApp number (no + or spaces)
  message = "Hello! I’d like to know more about your services.",
  imageUrl = "images/whatsapp.jpeg", // ✅ your custom image path
  size = 80, // optional: control image size (px)
}) => {
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[9999] transition-transform duration-300 transform hover:scale-110"
    >
      <img
        src={imageUrl}
        alt="Chat on WhatsApp"
        width={size}
        height={size}
        className="rounded-full shadow-lg p-1 bg-white"
      />
    </a>
  );
};

export default WhatsAppButton;

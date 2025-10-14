import React from "react";

const userData = {
  data: {
    id: 24,
    name: "Henry Joseph",
    job_title: "Fitness Trainer",
    about: `<p>
      Nisi tortor pretium leo aliquam urna vitae sit. Suspendisse porttitor ut id est sed et. 
      Ullamcorper sed auctor rutrum leo. Massa cum ac fermentum mi sed blandit facilisi volutpat. 
      Viverra mauris est in euismod. Elementum pellentesque volutpat sit nulla.
    </p>`,
    skills: ["Strength Training", "Cardio", "Nutrition"],
    services: ["Gym Fitness Class", "Body Building", "Power Lifting"],
    avatar:
      "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/U3ZoSmaKmKd7CMIzKN1t.jpeg",
    avatar_original:
      "https://nfc.premierwebtechservices.com/storage/user-profiles/September2025/GsgeeDy4nTjAeEGuUHwp.jpg",
    whatsapp_number: "9999999999",
    website_url: "https://www.lipsum.com/",
    facebook_url: "https://www.lipsum.com/",
    instagram_url: "https://www.lipsum.com/",
    linkedin_url: "https://www.lipsum.com/",
    threads_url: "https://www.lipsum.com/",
    youtube_url: "https://www.youtube.com/",
  },
};

export default function FitnessProfile() {
  const user = userData.data;

  const socialLinks = [
    { url: user.website_url, icon: "/assets/images/social-icon/icon1.svg" },
    { url: user.facebook_url, icon: "/assets/images/social-icon/icon2.svg" },
    { url: user.instagram_url, icon: "/assets/images/social-icon/icon3.svg" },
    {
      url: `https://wa.me/${user.whatsapp_number}`,
      icon: "/assets/images/social-icon/icon4.svg",
    },
    { url: user.linkedin_url, icon: "/assets/images/social-icon/icon5.svg" },
    { url: user.threads_url, icon: "/assets/images/social-icon/icon6.svg" },
    {
      url: "https://web.telegram.org/a/",
      icon: "/assets/images/social-icon/icon7.svg",
    },
    {
      url: user.youtube_url || "#",
      icon: "/assets/images/social-icon/icon8.svg",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-sans">
      {/* Banner */}
      <div className="relative">
        <img
          src={user.avatar_original}
          alt="Cover"
          className="w-full h-60 object-cover"
        />
        <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-2xl font-bold text-green-600">{user.name}</h1>
        <p className="text-gray-500">{user.job_title}</p>
        <div className="flex justify-center mt-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
      </div>

      {/* About */}
      <div className="mt-6 px-4 text-center text-gray-600 max-w-xl mx-auto">
        <div
          className="leading-relaxed"
          dangerouslySetInnerHTML={{ __html: user.about }}
        />
      </div>

      {/* Social Icons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 px-4">
        {socialLinks.map((social, idx) => (
          <a
            key={idx}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-green-500 hover:bg-green-100 transition"
          >
            <img src={social.icon} alt="icon" className="w-5 h-5" />
          </a>
        ))}
      </div>

      {/* About Us Section */}
      <div className="mt-10 px-4 text-center">
        <h2 className="text-xl font-bold text-green-600 uppercase">About Us</h2>
        <div className="mt-4 flex flex-col items-center gap-4">
          <img
            src="/assets/images/main-img/about-us-img.png"
            alt="About"
            className="w-full max-w-md rounded-xl"
          />
          <h3 className="font-bold text-lg">Make Your Body Healthy & Fit</h3>
          <p className="text-gray-600 text-sm">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-10 px-4 text-center">
        <h2 className="text-xl font-bold text-green-600 uppercase">
          My Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {user.services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`/assets/images/services/services${idx + 1}.png`}
                alt={service}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-center -mt-10 mb-2">
                  <div className="bg-green-500 p-2 rounded-full shadow">
                    <img
                      src={`/assets/images/services/service-icon${idx + 1}.svg`}
                      alt="service-icon"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{service}</h3>
                <p className="text-gray-600 text-sm mt-2">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 py-6 text-center text-gray-400 text-sm">
        Made By Digi vCard Builder 💖 The_Krishna
      </div>
    </section>
  );
}

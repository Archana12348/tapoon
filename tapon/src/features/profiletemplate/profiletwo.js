import React from "react";
import {
  ShoppingCart,
  UtensilsCrossed,
  Percent,
  Star,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";

const ProfileTwo = (props) => {
  const { profile, loading, error } = props;

  const defaultProfile = {
    name: "Richard A. White",
    job_title: "Senior Chefs",
    avatar:
      "https://csspicker.dev/api/image/?q=professional+chef+portrait&image_type=photo",
    avatar_original:
      "https://csspicker.dev/api/image/?q=chef+cooking+kitchen&image_type=photo",
    bio: "Nisi tortor pretium leo aliquam urna vitae sit. Suspendisse porttitor ut id est sed at. Ullamcorper sed auctor rutrum leo. Massa cum ac fermentum mi sed blandit facilisis volutpat. Viverra mauris est in vulputate. Elementum pellentesque volutpat est nulla.",
    services: ["Online Ordering", "Fresh Food", "Special Offers", "Reviews"],
    gallery: [
      "https://csspicker.dev/api/image/?q=chef+plating+food&image_type=photo",
    ],
    linkedin_url: "#",
    instagram_url: "#",
    facebook_url: "#",
    twitter_url: "#",
    youtube_url: "#",
    behance_url: "#",
    dribbble_url: "#",
    pinterest_url: "#",
  };

  const data = profile || defaultProfile;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  const services = [
    {
      icon: ShoppingCart,
      title: "Online Ordering",
      description:
        "Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.",
    },
    {
      icon: UtensilsCrossed,
      title: "Fresh Food",
      description:
        "Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.",
    },
    {
      icon: Percent,
      title: "Special Offers",
      description:
        "Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.",
    },
    {
      icon: Star,
      title: "Reviews",
      description:
        "Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.",
    },
  ];

  const menuItems = [
    {
      name: "Antipasto Salad",
      description:
        "Virgin olive oil, touch of garlic, prawns, green peas, sun dried tomato, and Italian herbs.",
      price: "$20",
      image:
        "https://csspicker.dev/api/image/?q=antipasto+salad&image_type=photo",
    },
    {
      name: "Orange Juice",
      description:
        "Virgin olive oil, touch of garlic, prawns, green peas, sun dried tomato, and Italian herbs.",
      price: "$20",
      image:
        "https://csspicker.dev/api/image/?q=orange+juice+glass&image_type=photo",
    },
    {
      name: "Pineapple Cake",
      description:
        "Virgin olive oil, touch of garlic, prawns, green peas, sun dried tomato, and Italian herbs.",
      price: "$30",
      image:
        "https://csspicker.dev/api/image/?q=pineapple+cake&image_type=photo",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto">
        <div className="relative h-64 overflow-hidden">
          <img
            src={data.avatar_original}
            alt="Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
        </div>

        <div className="relative -mt-20 flex flex-col items-center px-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 mb-4">
            <img
              src={data.avatar}
              alt={data.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-yellow-500 mb-1">
            {data.name}
          </h1>
          <p className="text-sm text-gray-300 mb-6">{data.job_title}</p>

          <div className="flex gap-3 mb-6">
            {data.linkedin_url && (
              <a
                href={data.linkedin_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Linkedin size={20} className="text-gray-900" />
              </a>
            )}
            {data.facebook_url && (
              <a
                href={data.facebook_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Facebook size={20} className="text-gray-900" />
              </a>
            )}
            {data.instagram_url && (
              <a
                href={data.instagram_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Instagram size={20} className="text-gray-900" />
              </a>
            )}
            {data.twitter_url && (
              <a
                href={data.twitter_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Twitter size={20} className="text-gray-900" />
              </a>
            )}
            {data.youtube_url && (
              <a
                href={data.youtube_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Youtube size={20} className="text-gray-900" />
              </a>
            )}
            {data.behance_url && (
              <a
                href={data.behance_url}
                className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500 transition"
              >
                <Send size={20} className="text-gray-900" />
              </a>
            )}
          </div>

          <p className="text-center text-sm text-gray-300 leading-relaxed mb-12 max-w-md">
            {data.bio}
          </p>

          <h2 className="text-xl font-bold text-yellow-500 mb-8">
            MY SERVICES
          </h2>

          <div className="w-full space-y-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-yellow-600 flex items-center justify-center mb-4">
                  <service.icon size={32} className="text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 max-w-md">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-yellow-500 mb-6">GALLERY</h2>

          <div className="w-full mb-12">
            <img
              src={
                data.gallery[0] ||
                "https://csspicker.dev/api/image/?q=chef+plating+food&image_type=photo"
              }
              alt="Gallery"
              className="w-full rounded-2xl"
            />
          </div>

          <h2 className="text-xl font-bold text-yellow-500 mb-8">OUR MENU</h2>

          <div className="w-full space-y-6 mb-8">
            {menuItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-400 mb-2">
                    {item.description}
                  </p>
                  <p className="text-yellow-500 font-bold">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="bg-yellow-600 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition mb-8">
            View all
          </button>

          <p className="text-xs text-gray-500 pb-8">
            Made by Digi vCard Builder ❤️ Ex Villion
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTwo;

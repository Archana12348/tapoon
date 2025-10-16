import { useEffect, useState } from "react";
import axios from "axios";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const [menuData, setMenuData] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get(
          "https://nfc.premierwebtechservices.com/api/menu"
        );
        if (response.data.status) {
          setMenuData(response.data.data || []);
          setSettings(response.data.settings || {});
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <>
      {/* Upper Subscribe Section */}
      <div className="w-full py-12" style={{ backgroundColor: "#0086c4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          {/* Left: Newsletter */}
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-white">
              Get our emails for info on
              <br />
              new items, sales and more.
            </h2>
            <p className="mb-4 text-white">Subscribe Now</p>
            <div className="flex w-full max-w-lg">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2 rounded-l-md text-gray-800 border border-white focus:outline-none"
              />
              <button className="bg-black text-white px-6 py-2 rounded-r-md border border-white hover:bg-gray-900">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-white mt-2">
              By subscribing you agree to our Terms & Conditions and Privacy
              Policy
            </p>
          </div>

          {/* Right: Help */}
          <div
            className="md:text-left text-white"
            style={{ marginLeft: "20%" }}
          >
            <h3 className="text-xl font-semibold">Need help?</h3>
            <p className="text-lg font-medium my-2">
              {settings?.phone || "971581770786"}
            </p>
            <p className="text-sm">We are available 10:00 am – 6:00 pm</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="sticky top-0 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md py-12">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo & About */}
            <div className="space-y-4">
              <div className="flex lg:ml-[-26px] md:ml-[-25px]">
                <img
                  src={settings?.logo || "https://via.placeholder.com/150"}
                  alt="Logo"
                  className="h-10 w-[115px] md:h-12 md:w-48 object-contain"
                />
              </div>

              <p className="text-sm text-gray-800">
                Digital solutions to simplify your networking. Connect and share
                your profile instantly.
                <Link
                  to={`mailto:${settings?.email || "support@fcard.com"}`}
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                  target="_blank"
                >
                  <Mail className="h-4 w-4" />{" "}
                  {settings?.email || "support@fcard.com"}
                </Link>
              </p>

              <div className="flex gap-4 mt-2">
                {settings?.facebook_url && (
                  <Link
                    to={settings.facebook_url}
                    target="_blank"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Facebook className="h-5 w-5" />
                  </Link>
                )}
                {settings?.twitter_url && (
                  <Link
                    to={settings.twitter_url}
                    target="_blank"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                )}
                {settings?.instagram_url && (
                  <Link
                    to={settings.instagram_url}
                    target="_blank"
                    className="text-gray-400 hover:text-pink-500"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                )}
                {settings?.linkedin_url && (
                  <Link
                    to={settings.linkedin_url}
                    target="_blank"
                    className="text-gray-400 hover:text-blue-700"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>

            {/* Products (from API) */}
            <div>
              <h3 className="mb-4 font-semibold">Products</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {menuData && menuData.length > 0 ? (
                  menuData.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/products/${item.slug}`}
                        className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">Loading...</li>
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/aboutUs"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Contact
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/blog"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Blog
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/frequently-asked-questions"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/contactus"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="max-w-7xl mx-auto mt-8 pt-4 border-t text-xs flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <p>Copyright 2025 © Taponn. All right reserved.</p>
              <img
                src="/icons/mastercard.svg"
                alt="MasterCard"
                className="h-6"
              />
              <img src="/icons/visa.svg" alt="Visa" className="h-6" />
              <img src="/icons/wallet.svg" alt="Wallet" className="h-5" />
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="/terms-and-conditions" className="hover:underline">
                Terms and Conditions
              </Link>
              <span>|</span>
              <Link to="/delivery&return" className="hover:underline">
                Delivery and Returns Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

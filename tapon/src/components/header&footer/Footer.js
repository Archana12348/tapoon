import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "../../assests/images/logo.jpeg";
import { Link } from "react-router-dom";

export function Footer() {
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
            <p className="text-lg font-medium my-2">971581770786</p>
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
                  src={logo}
                  alt="Logo"
                  className="h-10 w-[115px] md:h-12 md:w-40 object-contain"
                />
              </div>

              <p className="text-sm text-gray-800">
                Digital solutions to simplify your networking. Connect and share
                your profile instantly.
                <a
                  href="mailto:support@fcard.com"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <Mail className="h-4 w-4" /> support@fcard.com
                </a>
              </p>

              <div className="flex gap-4 mt-2">
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="mb-4 font-semibold">Products</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Business Cards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Smart Standees
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Review Cards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Bundle Packs
                  </a>
                </li>
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
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <a
                    href="/frequently-asked-questions"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    FAQ
                  </a>
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
                  <a
                    href="/privacy-policy"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-and-conditions"
                    className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Row */}
          <div className="max-w-7xl mx-auto mt-8 pt-4 border-t text-xs flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <p>Copyright 2025 © TYKA Sports. All right reserved.</p>
              <img
                src="/icons/mastercard.svg"
                alt="MasterCard"
                className="h-6"
              />
              <img src="/icons/visa.svg" alt="Visa" className="h-6" />
              <img src="/icons/wallet.svg" alt="Wallet" className="h-5" />
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <a href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="/terms-and-conditions" className="hover:underline">
                Terms and Conditions
              </a>
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

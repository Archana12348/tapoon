import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "../../assests/images/logo.jpeg";

export function Footer() {
  return (
    <footer className="sticky top-0 z-50 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex ml-[-26px] mr-4 md:mr-10">
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
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
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
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-sky-900 transition-colors hover:text-sky-600"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} FCard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

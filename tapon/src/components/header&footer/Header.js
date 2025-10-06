import { useState } from "react";
import { ShoppingCart, Menu, Search, LogOut, User } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assests/images/logo.jpeg";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-[115px] md:h-12 md:w-40 object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden gap-6 md:flex">
          <Link to="/" className="text-lg text-sky-900 hover:text-sky-600">
            Home
          </Link>
          <Link
            to="/aboutUs"
            className="text-lg text-sky-900 hover:text-sky-600"
          >
            About Us
          </Link>
          <Link
            to="/product"
            className="text-lg text-sky-900 hover:text-sky-600"
          >
            Products
          </Link>
          <a
            href="#testimonials"
            className="text-lg text-sky-900 hover:text-sky-600"
          >
            Testimonials
          </a>
          <Link
            to="/contactus"
            className="text-lg text-sky-900 hover:text-sky-600"
          >
            Contact Us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-sky-900 hover:text-sky-600 md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-sky-900 hover:text-sky-600"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Auth / User Dropdown */}
          {user ? (
            <div className="relative">
              <Button
                className="hidden bg-sky-600 text-white hover:bg-sky-700 md:flex items-center gap-1"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <User className="h-4 w-4" /> {user.name || "User"}
              </Button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-sky-200 rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-sky-900 hover:bg-sky-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-sky-900 hover:bg-sky-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <Button className="hidden bg-sky-600 text-white hover:bg-sky-700 md:flex">
                SignUp / SignIn
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-sky-900 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-sky-200 bg-gradient-to-r from-sky-100 to-white md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link to="/" className="text-sm text-sky-900 hover:text-sky-600">
              Home
            </Link>
            <Link
              to="/aboutUs"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              About Us
            </Link>
            <Link
              to="/product"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              Products
            </Link>
            <a
              href="#testimonials"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              Testimonials
            </a>
            <Link
              to="/contactus"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              Contact Us
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm text-sky-900 hover:text-sky-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="text-sm text-sky-900 hover:text-sky-600"
                >
                  Orders
                </Link>
                <Button
                  className="bg-red-100 text-red-600 hover:bg-red-200"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/signup">
                <Button className="bg-sky-600 text-white hover:bg-sky-700">
                  SignUp / SignIn
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

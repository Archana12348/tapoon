import { useState } from "react";
import { ShoppingCart, Menu, Search } from "lucide-react";
import Button from "../ui/Button";
import logo from "../../assests/images/logo.jpeg";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center mr-4 md:mr-10">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-[115px] md:h-12 md:w-40 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-lg text-sky-900 transition-colors hover:text-sky-600"
            >
              Home
            </Link>
            <Link
              to="/aboutUs"
              className="text-lg text-sky-900 transition-colors hover:text-sky-600"
            >
              About Us
            </Link>
            <Link
              to="/product"
              className="text-lg text-sky-900 transition-colors hover:text-sky-600"
            >
              Products
            </Link>
            <Link
              to="/corporate"
              className="text-lg text-sky-900 transition-colors hover:text-sky-600"
            >
              For Corporate
            </Link>
            <Link
              to="/contactus"
              className="text-lg text-sky-900 transition-colors hover:text-sky-600"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-sky-900 hover:text-sky-600 md:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/information/form">
            <Button
              variant="ghost"
              size="icon"
              className="text-sky-900 hover:text-sky-600"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          <Button className="hidden bg-sky-600 text-white hover:bg-sky-700 md:flex">
            SignUp / SignIn
          </Button>

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
            <Link
              to="/corporate"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              For Corporate
            </Link>
            <Link
              to="/contactus"
              className="text-sm text-sky-900 hover:text-sky-600"
            >
              Contact Us
            </Link>
            <Button className="bg-sky-600 text-white hover:bg-sky-700">
              SignUp / SignIn
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

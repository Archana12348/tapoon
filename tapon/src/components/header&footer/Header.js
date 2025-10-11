import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, Search, User } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react"; // dropdown icon
import { useSelector } from "react-redux";
import CartDrawer from "../common/cart/CartDrawer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [siteLogo, setSiteLogo] = useState("");
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false); // toggle state
  const totalQuantity = useSelector((state) => state.cart.totalQuantity || 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await fetch(
          "https://nfc.premierwebtechservices.com/api/menu"
        );
        const result = await res.json();
        debugger;
        console.log("API Response:", result);

        if (result.status && result.data) {
          setCategories(result.data);
        }

        if (result.settings && result.settings.logo) {
          setSiteLogo(result.settings.logo);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  // Handle delayed hover for Products dropdown
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setShowProductsMenu(true), 300); // ⏳ 300ms delay
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setShowProductsMenu(false), 400); // ⏳ 400ms delay to close
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 ">
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center mr-4 md:mr-10">
              <img
                src={siteLogo || "https://via.placeholder.com/150x50?text=Logo"}
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

            {/* ✅ Dynamic Product Categories with Hover Delay */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-lg text-sky-900 hover:text-sky-600 cursor-pointer">
                Products
              </span>
              {showProductsMenu && (
                <div className="absolute bg-white border border-sky-200 rounded-md shadow-lg mt-4 z-50 min-w-[250px] transition-opacity duration-300 ease-in-out">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products/${cat.slug}`}
                        className="block px-4 py-2 text-sm text-sky-900 hover:bg-sky-100"
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading...
                    </div>
                  )}
                </div>
              )}
            </div>

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

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-sky-900 hover:text-sky-600 dark:text-white"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {/* 🔴 Cart Count Badge */}
            {totalQuantity > 0 && (
              <span className="absolute -top-0 -right-0 bg-red-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>

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
                    to={`/profile/${user.name}`}
                    className="block px-4 py-2 text-sm text-sky-900 hover:bg-sky-100"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Profile
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

            {/* ✅ Dynamic Products in Mobile */}
            <div className="flex flex-col gap-1">
              {/* Header with dropdown icon */}
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <span className="text-sm text-sky-900 font-semibold">
                  Products
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-sky-900 transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Category List (only visible when open) */}
              {open && (
                <div className="flex flex-col gap-1 mt-1 overflow-hidden animate-fadeIn">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products/${cat.slug}`}
                        className="ml-3 text-sm text-sky-800 hover:text-sky-600"
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <span className="ml-3 text-sm text-gray-400">
                      Loading...
                    </span>
                  )}
                </div>
              )}
            </div>

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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

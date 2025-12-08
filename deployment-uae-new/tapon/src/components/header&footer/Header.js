import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, Search, User, ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartDrawer from "../common/cart/CartDrawer"; // ✅ Import your CartDrawer component

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const [siteLogo, setSiteLogo] = useState("");
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity || 0);

  // ✅ State for Cart Drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const res = await fetch(
          "https://nfc.premierwebtechservices.com/api/menu"
        );
        const result = await res.json();

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
    hoverTimeoutRef.current = setTimeout(() => setShowProductsMenu(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setShowProductsMenu(false), 400);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-8 ml-4">
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
          <nav className="hidden items-center gap-6 lg:flex ml-32">
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

            {/* ✅ Products Dropdown */}
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
          {/* 🛒 Shopping Cart Button */}
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(true)} // ✅ open drawer
              className="px-4 py-2 rounded-2xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600 md:flex items-center gap-1"
            >
              <ShoppingCart className="h-5 w-5 text-lg text-white transition-colors hover:text-sky-100" />
            </button>

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
              <Button className="hidden bg-sky-600 text-white hover:bg-sky-700 md:flex ">
                SignUp / SignIn
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            variant="ghost"
            size="icon"
            className="text-yellow-900 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5 text-lg text-s transition-colors text-sky-900 hover:text-sky-600 " />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-sky-200 bg-gradient-to-r from-sky-100 to-white lg:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              to="/"
              className="text-sm text-sky-900 hover:text-sky-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/aboutUs"
              className="text-sm text-sky-900 hover:text-sky-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>

            {/* ✅ Dynamic Products in Mobile */}
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={() => setOpenProducts(!openProducts)}
              >
                <span className="text-sm text-sky-900 font-semibold">
                  Products
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-sky-900 transition-transform duration-300 ${
                    openProducts ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openProducts && (
                <div className="flex flex-col gap-1 mt-1 overflow-hidden animate-fadeIn">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.slug}`}
                      className="ml-3 text-sm text-sky-800 hover:text-sky-600"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              {open && (
                <div className="flex flex-col gap-1 mt-1 overflow-hidden animate-fadeIn">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products/${cat.slug}`}
                        className="ml-3 text-sm text-sky-800 hover:text-sky-600"
                        onClick={() => setMobileMenuOpen(false)}
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
              onClick={() => setMobileMenuOpen(false)}
            >
              For Corporate
            </Link>
            <Link
              to="/contactus"
              className="text-sm text-sky-900 hover:text-sky-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* ✅ Mobile Auth / User Section */}
            {/* ✅ Mobile Auth / User Section */}
            {user ? (
              <div className="flex flex-col gap-1 border-t border-sky-200 pt-2 mt-2">
                {/* User button */}
                <button
                  className="w-full bg-sky-600 text-white hover:bg-sky-700 py-2 px-4 text-center rounded-md flex items-center justify-center gap-1"
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                >
                  <User className="h-4 w-4" /> {user.name}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openUserMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown items */}
                {openUserMenu && (
                  <div className="flex flex-col gap-1 mt-1 overflow-hidden animate-fadeIn">
                    <Link
                      to={`/profile/${user.name}`}
                      className="text-sm text-sky-800 hover:text-sky-600 pl-4 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="text-sm text-sky-800 hover:text-sky-600 pl-4 py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      className="text-sm text-red-600 hover:bg-red-100 pl-4 py-1 text-left"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/sign-in">
                <Button className="bg-sky-600 text-white hover:bg-sky-700 w-full">
                  SignUp / SignIn
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* 🛒 Cart Drawer Integration */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

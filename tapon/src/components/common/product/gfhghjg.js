// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    // Fetch all products
    axios
      .get("https://nfc.premierwebtechservices.com/api/nfc-products")
      .then(async (res) => {
        const productList = res.data.data;
        console.log("data", productList);
        debugger;
        // Fetch detailed product info for each slug
        const detailedProducts = await Promise.all(
          productList.map((p) =>
            axios
              .get(
                `https://nfc.premierwebtechservices.com/api/nfc-products/${p.slug}`
              )
              .then((res) => res.data.data)
          )
        );
        setProducts(detailedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "Latest") return b.id - a.id;
    if (sortBy === "Older") return a.id - b.id;
    return 0;
  });

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-semibold">
          Showing {sortedProducts.length} Products
        </h2>
        <div className="relative w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none text-m text-gray-700 border border-gray-300 rounded px-3 py-2 w-full sm:w-auto pr-6 cursor-pointer focus:outline-none"
          >
            <option value="Latest">Sort by latest</option>
            <option value="Older">Sort by older</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            ⏷
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => {
          const salePrice = Number(product.sale_price) || 0;
          const discount = Number(product.discount) || 0;
          const discountedPrice =
            discount > 0 ? salePrice - (salePrice * discount) / 100 : salePrice;

          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  product.card_image || "https://via.placeholder.com/300x200"
                }
                alt={product.name || "Product"}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="font-semibold text-lg text-center">
                {product.name || "Unnamed Product"}
              </h2>
              <p className="mt-2 text-red-600 font-bold text-xl">
                ₹{discountedPrice.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="text-gray-500 line-through">
                  ₹{salePrice.toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}




import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CartDrawer from "../../common/cartpage/CartDrawer";
import { ToastContainer, toast } from "react-toastify";
import { useMenu } from "../../context/MenuContext";
import "react-toastify/dist/ReactToastify.css";
import ProductSkeleton from "../../skeletons/ProductSkeleton";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const { fetchMenuCounts, setCartCount } = useMenu(); // ✅ added setCartCount
  const [addingToCart, setAddingToCart] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [isZooming, setIsZooming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0); // decimal ratings like 3.5
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [avgRating, setAvgRating] = useState(0);
  const [comment, setComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { slug } = useParams();
  const user = JSON.parse(localStorage.getItem("authUserId"));
  const id = user;
  const token =
    localStorage.getItem("authToken") || localStorage.getItem("guest_token");

  // ✅ Get currently selected variant
  const getSelectedVariant = () => {
    return product?.variants?.find(
      (v) => v.color_id === selectedColor && v.size_id === selectedSize
    );
  };

  // ✅ Fetch product
  useEffect(() => {
    window.scrollTo(0, 0); // 👈 yahi add karna hai
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://tyka.premierhostings.com/backend/api/site-products/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        const prod = data.data;
        console.log("hwdusfhkuds", prod.Review);
        debugger;
        setProduct({
          ...prod,
          reviews: prod.Review || [],
        });

        if (prod?.variants?.length > 0) {
          const defaultVariant =
            prod.variants.find((v) => v.status === 1) || prod.variants[0];

          setSelectedColor(defaultVariant.color_id);
          setSelectedSize(defaultVariant.size_id || "");

          const defaultImage =
            defaultVariant.variant_images?.find((img) => img.is_default)
              ?.path ||
            defaultVariant.variant_images?.[0]?.path ||
            prod.default_image ||
            "";

          setMainImage(defaultImage);
        } else {
          setMainImage(prod.default_image || "");
        }
        // ✅ average rating calculate
        if (prod.Review && prod.Review.length > 0) {
          const total = prod.Review.reduce(
            (sum, r) => sum + Number(r.rating_value || 0),
            0
          );
          setAvgRating(total / prod.Review.length);
        } else {
          setAvgRating(0);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) return <ProductSkeleton />;
  if (!product) return <p style={{ textAlign: "center" }}>No product found.</p>;

  // ✅ Price calculation
  const basePrice = parseFloat(product?.cost_price) || 0;
  const sellingPrice = parseFloat(product?.selling_price) || 0;
  const hasDiscount = sellingPrice > 0 && sellingPrice < basePrice;
  const totalPrice = (
    quantity * (hasDiscount ? sellingPrice : basePrice)
  ).toFixed(2);

  const currentVariant = getSelectedVariant();
  const variantImages = currentVariant?.variant_images || [];
  const maxStock = currentVariant?.stock || 0;

  // ✅ Add to cart (Guest + Logged-in)
  const handleAddToCart = async () => {
    if (!product?.id) return;

    if (!selectedColor || !selectedSize) {
      toast.warning("Please select color and size.");
      return;
    }

    const payload = {
      product_id: product.id,
      color_id: selectedColor,
      size_id: selectedSize,
      quantity,
    };

    setAddingToCart(true);

    try {
      const authToken = localStorage.getItem("authToken");
      let guestToken = localStorage.getItem("guest_token");
      let url = `https://tyka.premierhostings.com/backend/api/cart`;
      let headers = { "Content-Type": "application/json" };

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      } else if (guestToken) {
        url += `?guest_token=${guestToken}`;
      }

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        if (!authToken && data.guest_token) {
          localStorage.setItem("guest_token", data.guest_token);
        }

        if (!authToken) {
          setCartCount((prev) => prev + 1); // ✅ instant update for guest
        } else {
          fetchMenuCounts(id, token); // ✅ logged-in user update via API
        }

        setCartOpen(true);

        toast.success(data.message || "Product added to cart!", {
          position: "top-right",
          autoClose: 700,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          closeOnClick: true,
        });
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  // ✅ Zoom Handlers

  const handleSave = async () => {
    let newErrors = {};

    // Validation for guestName
    if (!guestName.trim()) {
      newErrors.guestName = "This field is required";
    }

    // Validation for guestEmail
    if (!guestEmail.trim()) {
      newErrors.guestEmail = "This field is required";
    }

    // Validation for rating
    if (rating === 0) {
      newErrors.rating = "At least 1 rating required";
    }

    // If any errors exist, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    if (!product?.id) {
      console.error("No product selected!");
      Swal.fire("Error", "Please select a product first", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://tyka.premierhostings.com/backend/api/product-reviews",
        {
          product_id: product.id,
          rating_value: rating,
          rating_title: "Rating",
          rating_desc: comment,
          guest_name: guestName,
          guest_email: guestEmail,
          is_active: 1,
        }
      );

      console.log("Review Response:", response.data);
      Swal.fire("Success", "Review submitted successfully!", "success");

      // Reset modal fields
      setShowModal(false);
      setRating(0);
      setComment("");
      setGuestName("");
      setGuestEmail("");
    } catch (error) {
      console.error("Error submitting review:", error.response || error);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
    setZoomStyle({
      backgroundSize: "200%",
      backgroundPosition: "center",
    });
  };

  const handleMouseMove = (e) => {
    if (!isZooming) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({
      backgroundSize: "200%",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({
      backgroundSize: "contain",
      backgroundPosition: "center",
    });
  };
  const openPopup = (index) => {
    setCurrentIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

  const allImages = [mainImage, ...variantImages.map((img) => img.path)];

  return (
    <div className="product-page max-w-6xl mx-auto px-4 py-8">
      <ToastContainer />

      {/* Breadcrumb */}
      <p className="mb-4 text-sm text-gray-600">
        HOME / {product?.head_categories?.[0]?.name || "Category"} /{" "}
        <strong>{product?.name}</strong>
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Image Zoom */}
        <div className="w-full lg:w-[40%]">
          {/* Main Image Box */}
          <div
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden relative group"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: isZooming ? "250%" : "contain",
              backgroundPosition: zoomStyle.backgroundPosition || "center",
              cursor: isZooming ? "zoom-in" : "default",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={mainImage}
              alt="product"
              className="max-h-full max-w-full object-contain opacity-0"
            />

            {/* Eye Icon */}
            <button
              onClick={() => openPopup(0)}
              className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <Eye size={20} />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {variantImages.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 rounded-md overflow-hidden border cursor-pointer ${
                  mainImage === img.path ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img.path)}
              >
                <img
                  src={img.path}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Popup Modal */}
          {isPopupOpen && (
            <div
              className="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={closePopup} // overlay click → close
            >
              {/* Image Wrapper */}
              <div
                className="relative w-full max-w-4xl flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // image पर click करने से popup बंद न हो
              >
                {/* Current Image */}
                <img
                  src={allImages[currentIndex]}
                  alt="popup"
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />

                {/* Close Button (image ke upar right top) */}
                <button
                  onClick={closePopup}
                  className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
                >
                  <X size={22} />
                </button>

                {/* Left Arrow (image ke bilkul left side par) */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 sm:p-3 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Right Arrow (image ke bilkul right side par) */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 p-2 sm:p-3 rounded-full hover:bg-black/70"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right - Details */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold">{product?.name}</h2>
          <p className="text-gray-500 mt-1 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, starIdx) => (
              <FaStar
                key={starIdx}
                className={`${
                  starIdx < Math.round(product?.star || 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1">
              ({product?.total_ratings || 0} Reviews)
            </span>
          </p>

          {hasDiscount ? (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-lg text-gray-500 line-through">
                ₹{basePrice}
              </span>
              <span className="text-2xl font-bold text-black">
                ₹{totalPrice}
              </span>
            </div>
          ) : (
            <p className="text-2xl font-bold text-black mt-2">₹{totalPrice}</p>
          )}
          <p className="text-sm text-gray-500">Inclusive of all taxes</p>

          <div
            className="mt-3 text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: product?.short_description || "",
            }}
          />

          {/* Colors */}
          {product?.variants?.length > 0 && (
            <div className="mt-4">
              <strong>
                Color:{" "}
                {
                  product?.variants.find((v) => v.color_id === selectedColor)
                    ?.color_name
                }
              </strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  ...new Map(
                    product.variants.map((v) => [v.color_id, v])
                  ).values(),
                ].map((color) => (
                  <button
                    key={color.color_id}
                    className={`w-8 h-8 rounded-full border transition-all duration-150 ${
                      selectedColor === color.color_id
                        ? "ring-2 ring-black"
                        : "border-gray-400"
                    }`}
                    style={{
                      background: color.color_code_2
                        ? `linear-gradient(135deg, ${color.color_code} 50%, ${color.color_code_2} 50%)`
                        : color.color_code || "#ccc",
                    }}
                    onClick={() => {
                      setSelectedColor(color.color_id);
                      const sizesForColor = product.variants.filter(
                        (v) => v.color_id === color.color_id
                      );
                      if (sizesForColor.length > 0) {
                        setSelectedSize(sizesForColor[0].size_id);
                        const defImg =
                          sizesForColor[0].variant_images.find(
                            (i) => i.is_default
                          )?.path ||
                          sizesForColor[0].variant_images[0]?.path ||
                          product.default_image;
                        setMainImage(defImg);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product?.variants?.length > 0 && (
            <div className="mt-4">
              <strong>
                Size:{" "}
                {
                  product?.variants.find((v) => v.size_id === selectedSize)
                    ?.size_name
                }
              </strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  ...new Map(
                    product.variants
                      .filter((v) => v.color_id === selectedColor)
                      .map((v) => [v.size_id, v])
                  ).values(),
                ].map((size, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size.size_id
                        ? "border-black font-semibold"
                        : "border-gray-400"
                    }`}
                    onClick={() => {
                      setSelectedSize(size.size_id);
                      const defImg =
                        size.variant_images.find((i) => i.is_default)?.path ||
                        size.variant_images[0]?.path ||
                        product.default_image;
                      setMainImage(defImg);
                    }}
                  >
                    {size.size_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Cart */}
          <div className="flex items-center gap-3 mt-6">
            <strong>Qty:</strong>
            <button
              className="px-2 border rounded"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="px-2 border rounded disabled:opacity-50"
              onClick={() => setQuantity((q) => q + 1)}
              disabled={quantity >= maxStock}
            >
              +
            </button>
            <span
              className={`ml-3 ${
                currentVariant?.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {currentVariant?.stock > 0 ? `In stock` : "Out of stock"}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-5 py-2 rounded font-semibold disabled:opacity-50"
              disabled={
                !currentVariant || currentVariant.stock <= 0 || addingToCart
              }
            >
              {addingToCart ? "ADDING..." : "ADD TO CART"}
            </button>
          </div>

          {/* Info */}
          <div className="mt-4 text-sm text-gray-600 space-y-2">
            <p>
              <span className="text-gray-500">SKU:</span>{" "}
              <strong className="text-black">
                <Link to={`/products/sku/${product?.sku}`}>
                  {product?.sku?.toUpperCase() || "N/A"}
                </Link>
              </strong>
            </p>
            <p>
              <span className="text-gray-500">Categories:</span>{" "}
              <strong className="text-black">
                {(product?.head_categories || [])
                  .concat(product?.parent_categories || [])
                  .concat(product?.child_categories || [])
                  .map((c, i, arr) => (
                    <span key={i}>
                      <Link className="hover:underline hover:text-blue-600">
                        {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                      </Link>
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </strong>
            </p>
            <p>
              <span className="text-gray-500">Tags:</span>{" "}
              <strong className="text-black">
                {(product?.tags || []).map((t, i) => (
                  <span key={i}>
                    <Link className="hover:underline hover:text-blue-600">
                      {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                    </Link>
                    {i < product.tags.length - 1 ? ", " : ""}
                  </span>
                ))}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b">
          {["description", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 ${
                tab === t
                  ? "border-b-2 border-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              {t === "description" ? "Description" : "Reviews"}
            </button>
          ))}
        </div>
        <div className="mt-4">
          {tab === "description" && (
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product?.description || "" }}
            />
          )}
          {/* {tab === "info" && (
            <p>
              Material: {product?.fabric?.name || "N/A"} | Fit: Regular |
              Washable: Yes
            </p>
          )} */}
          {tab === "reviews" && (
            <div>
              <div className="mb-4">
                {product?.reviews?.length > 0 ? (
                  product.reviews.map((r, idx) => (
                    <div key={idx} className="border-b py-2">
                      <div className="flex items-center gap-2">
                        {/* ⭐ rating show */}
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <FaStar
                            key={starIdx}
                            className={`${
                              starIdx < r.rating_value
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {/* <p className="font-semibold">{r.rating_title}</p> */}
                      <p className="text-gray-600">{r.rating_desc}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
              </div>

              {/* Add Review Button */}
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-[rgb(255,0,25)] border text-white hover:bg-[rgb(200,0,20)] hover:text-white transition-colors rounded-full text-md font-bold"
              >
                Add Review
              </button>

              {/* Modal */}
              {showModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0"
                  onClick={() => setShowModal(false)} // click outside closes modal
                >
                  <div
                    className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md p-6 relative"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                  >
                    <h2 className="text-xl font-bold mb-4 text-center">
                      Write a Review
                    </h2>

                    {/* Guest Name */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Your Name"
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          errors.guestName ? "border-red-500" : ""
                        }`}
                      />
                      {errors.guestName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.guestName}
                        </p>
                      )}
                    </div>

                    {/* Guest Email */}
                    <div className="mb-4">
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="Your Email"
                        className={`w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                          errors.guestEmail ? "border-red-500" : ""
                        }`}
                      />
                      {errors.guestEmail && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.guestEmail}
                        </p>
                      )}
                    </div>

                    {/* Star Rating */}
                    <div className="flex justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const fill =
                          star <= (hoverRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-300";
                        return (
                          <FaStar
                            key={star}
                            className={`cursor-pointer ${fill} text-3xl`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        );
                      })}
                    </div>

                    {/* Comment Box */}
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your review..."
                      className="w-full border rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    {/* Save Button */}
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-[rgb(255,0,25)] border text-white hover:bg-[rgb(200,0,20)] hover:text-white transition-colors rounded-full text-md font-bold"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && <CartDrawer open={cartOpen} setOpen={setCartOpen} />}
    </div>
  );
};

export default ProductPage;

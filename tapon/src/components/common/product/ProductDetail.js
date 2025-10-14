// src/pages/SingleProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";

export default function SingleProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSmartCard, setSelectedSmartCard] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://nfc.premierwebtechservices.com/api/nfc-products/${slug}`
        );
        const prod = res.data.data;
        setProduct(prod);
        setSelectedImage(
          prod.card_image || "https://via.placeholder.com/400x400"
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const salePrice = Number(product.sale_price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice =
    discount > 0 ? salePrice - (salePrice * discount) / 100 : salePrice;

  const stock = product.quantity || 0;

  const galleryImages = [
    product.card_image,
    product.card_back_image,
    ...(product.additional_images?.map(
      (img) => `https://nfc.premierwebtechservices.com/storage/${img}`
    ) || []),
  ];

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  // ✅ UPDATED handleAdd: includes selected options and quantity
  const handleAdd = async () => {
    setLoadingAdd(true);

    const itemToAdd = {
      ...product,
      quantity,
      selectedColor,
      selectedPack,
      selectedMaterial,
      selectedType,
      selectedSmartCard,
    };

    try {
      dispatch(addToCart(itemToAdd));

      // Simulate short delay for UX feedback
      setTimeout(() => {
        setLoadingAdd(false);
      }, 800);
    } catch (err) {
      console.error("Error adding to cart:", err);
      setLoadingAdd(false);
    }
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-10 flex flex-col items-center ">
        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">
          {/* Left Section - Image Gallery */}
          <div className="lg:w-1/2">
            <div className="border rounded-xl overflow-hidden shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[450px] object-cover"
              />
            </div>
            {/* ✅ Fixed mobile horizontal scroll by enforcing inline scroll behavior */}
            <div className="flex gap-2 mt-4 w-full sm:w-auto overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 snap-x snap-mandatory pb-2">
              {galleryImages.map(
                (img, idx) =>
                  img && (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name}-${idx}`}
                      onClick={() => setSelectedImage(img)}
                      className={`min-w-[90px] h-24 object-cover rounded-lg cursor-pointer border-2 snap-start ${
                        selectedImage === img
                          ? "border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                    />
                  )
              )}
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FaStar
                  key={idx}
                  className={`${
                    idx < Math.round(product?.average_rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-500 text-sm ml-1">
                ({product.total_rating || 0} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              {product.regular_price > product.sale_price && (
                <span className="text-gray-400 text-lg line-through">
                  ₹{Number(product.regular_price).toFixed(2)}
                </span>
              )}
              <span className="text-3xl font-semibold text-sky-600">
                ₹{Number(product.sale_price).toFixed(2)}
              </span>
              {product.regular_price > product.sale_price && (
                <span className="bg-sky-100 text-sky-600 px-2 py-1 rounded text-sm font-medium">
                  {Math.round(
                    ((product.regular_price - product.sale_price) /
                      product.regular_price) *
                      100
                  )}
                  % OFF
                </span>
              )}
            </div>

            {/* Colors */}
            {product.nfc_colors?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.nfc_colors.map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`border rounded-[40px] py-[10px] px-[20px] tracking-[1px] leading-[1] text-center cursor-pointer relative transition-[border] duration-150 ease-in-out mt-[7px] mr-[5px] mb-[2px] capitalize
            ${
              selectedColor === color
                ? "bg-sky-600 border-sky-600 text-white"
                : "bg-transparent border-[#04cefa] text-[#04cefa]"
            }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Packs */}
            {product.packs?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Available Packs</h3>
                <div className="flex flex-wrap gap-2">
                  {product.packs.map((pack, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPack(pack)}
                      className={`border rounded-[40px] py-[10px] px-[20px] tracking-[1px] leading-[1] text-center cursor-pointer relative transition-[border] duration-150 ease-in-out mt-[7px] mr-[5px] mb-[2px] capitalize
            ${
              selectedPack === pack
                ? "bg-sky-600 border-sky-600 text-white"
                : "bg-transparent border-[#04cefa] text-[#04cefa]"
            }`}
                    >
                      {pack}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Material */}
            {product.card_material?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Material</h3>
                <div className="flex flex-wrap gap-2">
                  {product.card_material.map((mat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedMaterial(mat)}
                      className={`border rounded-[40px] py-[10px] px-[20px] tracking-[1px] leading-[1] text-center cursor-pointer relative transition-[border] duration-150 ease-in-out mt-[7px] mr-[5px] mb-[2px] capitalize
          ${
            selectedMaterial === mat
              ? "bg-sky-600 border-sky-600 text-white"
              : "bg-transparent border-[#04cefa] text-[#04cefa]"
          }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Type */}
            {product.type?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Type</h3>
                <div className="flex flex-wrap gap-2">
                  {product.type.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedType(t)}
                      className={`border rounded-[40px] py-[10px] px-[20px] tracking-[1px] leading-[1] text-center cursor-pointer relative transition-[border] duration-150 ease-in-out mt-[7px] mr-[5px] mb-[2px] capitalize
          ${
            selectedType === t
              ? "bg-sky-600 border-sky-600 text-white"
              : "bg-transparent border-[#04cefa] text-[#04cefa]"
          }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Cards */}
            {product.smart_cards?.length > 0 && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-2">Smart Cards</h3>
                <div className="flex flex-wrap gap-2">
                  {product.smart_cards.map((card, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSmartCard(card)}
                      className={`border rounded-[40px] py-[10px] px-[20px] tracking-[1px] leading-[1] text-center cursor-pointer relative transition-[border] duration-150 ease-in-out mt-[7px] mr-[5px] mb-[2px] capitalize
          ${
            selectedSmartCard === card
              ? "bg-sky-600 border-sky-600 text-white"
              : "bg-transparent border-[#04cefa] text-[#04cefa]"
          }`}
                    >
                      {card}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-1 text-lg border-r hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center text-lg font-medium"
                  />
                  <button
                    onClick={handleIncrease}
                    className={`px-3 py-1 text-lg border-l ${
                      quantity >= stock
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={quantity >= stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                className="text-white px-8 py-3 rounded-full text-lg transition w-full sm:w-auto flex items-center justify-center"
                onClick={handleAdd}
                disabled={loadingAdd}
              >
                {loadingAdd ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                      ></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  "Add To Cart"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {product.description && (
          <div className="mt-12 border-t pt-8 max-w-6xl w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Description
            </h2>
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        )}
        {/* Product Details */}
        <div className="mt-6 space-y-2 text-gray-700 text-sm">
          <p>
            <strong>SKU:</strong> {product.sku || "-"}
          </p>
          {product.nfc_product_categories?.length > 0 && (
            <p>
              <strong>Category:</strong>{" "}
              {product.nfc_product_categories.map((cat) => cat.name).join(", ")}
            </p>
          )}

          <p>
            <strong>Brand:</strong> {product.brand?.brand_name || "-"}
          </p>
          {product.offers?.length > 0 && (
            <p>
              <strong>Offer:</strong>{" "}
              {product.offers.map((offer) => offer.title).join(", ")}
            </p>
          )}
          {(!product.offers || product.offers.length === 0) && (
            <p>
              <strong>Offer:</strong> -
            </p>
          )}

          <p>
            <strong>Customizable:</strong> {product.is_customizable || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

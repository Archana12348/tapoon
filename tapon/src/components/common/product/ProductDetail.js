// src/pages/SingleProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleProductPage() {
  const { slug } = useParams(); // get slug from route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios
      .get(`https://nfc.premierwebtechservices.com/api/nfc-products/${slug}`)
      .then((res) => {
        console.log("Product Data:", res.data.data);
        setProduct(res.data.data);
        setSelectedImage(res.data.data.card_image); // default main image
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  // Calculate discounted price if applicable
  const discountedPrice =
    product.discount > 0
      ? product.sale_price - (product.sale_price * product.discount) / 100
      : product.sale_price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Images */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg border border-gray-200"
          />

          {/* Additional Images */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {[
              product.card_image,
              product.card_back_image,
              ...(product.product_galleries?.map((g) => g.image) || []),
            ].map(
              (img, index) =>
                img && (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index}`}
                    className="w-24 h-24 object-cover rounded cursor-pointer border border-gray-300"
                    onClick={() => setSelectedImage(img)}
                  />
                )
            )}
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold text-red-600">
              ₹{discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-gray-500 line-through">
                ₹{product.sale_price.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded">
                {product.discount}% Off
              </span>
            )}
          </div>

          <div className="mt-4 space-y-1">
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Stock:</strong> {product.in_stock}
            </p>
            <p>
              <strong>Customizable:</strong> {product.is_customizable}
            </p>
            <p>
              <strong>Average Rating:</strong> {product.average_rating} / 5 (
              {product.total_rating} reviews)
            </p>
          </div>

          {/* Categories */}
          {product.nfc_product_categories?.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Categories:</h2>
              <div className="flex gap-2 flex-wrap">
                {product.nfc_product_categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Specs */}
          {product.tech_speces?.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Technical Specifications:</h2>
              <ul className="list-disc list-inside text-sm">
                {product.tech_speces.map((spec) => (
                  <li key={spec.id}>
                    Chip: {spec.chip}, Memory: {spec.memory}, Scan Range:{" "}
                    {spec.scan_range}, Compatible: {spec.compatible_with}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Offers */}
          {product.offers?.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">Offers:</h2>
              <div className="flex flex-col gap-2">
                {product.offers.map((offer) => (
                  <div key={offer.id} className="border p-2 rounded text-sm">
                    <p className="font-semibold">{offer.title}</p>
                    <p
                      dangerouslySetInnerHTML={{ __html: offer.description }}
                    ></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="mt-6 bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

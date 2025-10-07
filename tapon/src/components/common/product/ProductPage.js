// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ Added for animation

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://nfc.premierwebtechservices.com/api/nfc-cards/category/${slug}`
        );
        const productList = res.data.data?.data || [];
        setProducts(productList);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!products.length)
    return <p className="text-center mt-10">No products found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        className="text-xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Showing {products.length} Products
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const salePrice = Number(product.sale_price) || 0;
          const discount = Number(product.discount) || 0;
          const discountedPrice =
            discount > 0 ? salePrice - (salePrice * discount) / 100 : salePrice;

          return (
            <motion.div
              key={product.id}
              onClick={() => navigate(`/${product.slug}`)}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer bg-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }} // ✅ Slight lift of the whole card
            >
              <motion.img
                src={
                  product.card_image || "https://via.placeholder.com/300x200"
                }
                alt={product.name || "Product"}
                className="w-full h-48 object-cover rounded mb-4"
                whileHover={{ y: -8 }} // ✅ Image lifts up on hover
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              />
              <h2 className="font-semibold text-lg text-center">
                {product.name}
              </h2>
              <p className="mt-2 text-red-600 font-bold text-xl">
                ₹{discountedPrice.toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="text-gray-500 line-through">
                  ₹{salePrice.toFixed(2)}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

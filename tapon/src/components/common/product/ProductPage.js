// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    // Step 1: Fetch all products to get slugs
    axios
      .get("https://nfc.premierwebtechservices.com/api/nfc-products")
      .then(async (res) => {
        const productList = res.data.data;
        console.log("Product List (slugs):", productList);
        debugger;

        // Step 2: Fetch each product by slug
        const detailedProducts = await Promise.all(
          productList.map((p) =>
            axios
              .get(
                `https://nfc.premierwebtechservices.com/api/nfc-products/${p.slug}`
              )
              .then((res) => res.data.data)
          )
        );

        console.log("Fetched Detailed Products:", detailedProducts);
        setProducts(detailedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // Sort products based on sortBy
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
          const discountedPrice =
            product.discount > 0
              ? product.sale_price -
                (product.sale_price * product.discount) / 100
              : product.sale_price;

          return (
            <div
              key={product.id}
              className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              <img
                src={product.card_image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="font-semibold text-lg text-center">
                {product.name}
              </h2>
              <p className="mt-2 text-red-600 font-bold text-xl">
                ₹{discountedPrice.toFixed(2)}
              </p>
              {product.discount > 0 && (
                <p className="text-gray-500 line-through">
                  ₹{product.sale_price.toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

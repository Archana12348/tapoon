import React, { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import Swal from "sweetalert2";

export function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const dispatch = useDispatch();

  // ✅ Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://nfc.premierwebtechservices.com/api/nfc-home"
        );
        const data = await res.json();
        if (data?.data) setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Handle Add to Cart
  const handleAddToCart = (product) => {
    setLoadingProduct(product.id);

    const itemToAdd = {
      ...product,
      quantity: 1,
      color: product.nfc_colors?.[0] || null,
      pack: product.packs?.[0] || null,
      material: product.card_material?.[0] || null,
      type: product.type?.[0] || null,
      smart_card: product.smart_cards?.[0] || null,
    };

    try {
      dispatch(addToCart(itemToAdd));
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        html: `<span class="font-semibold text-lg">${product.name}</span> has been added successfully.`,
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #e0f2fe 100%)",
        customClass: {
          popup: "shadow-md rounded-xl p-6 flex flex-col items-center",
          icon: "text-green-500 text-5xl",
          title: "text-xl font-bold mt-2 text-gray-800",
          htmlContainer: "mt-1 text-center text-gray-700",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setTimeout(() => setLoadingProduct(null), 800);
    }
  };

  return (
    <section id="products" className="pt-16 md:pt-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-1 text-md uppercase tracking-wider text-cyan-400">
            Our Products
          </p>
          <h2 className="mb-4 text-xl font-bold text-black sm:text-3xl md:text-4xl">
            Smart NFC Solutions for Every Need
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-sky-900">
            Premium quality cards designed for professionals who demand the best
          </p>
        </div>

        {/* ✅ Product Grid (No Swiper) */}
        <div className="flex justify-center">
          {products.length > 0 ? (
            <div
              className={
                products.length <= 2
                  ? "flex justify-center flex-wrap gap-8"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              }
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-900/20 backdrop-blur-sm transition-all hover:border-cyan-700/50 shadow-lg w-[380px] sm:w-[420px] lg:w-[440px]"
                >
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={product.card_image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md">
                    <h3 className="mb-1 text-lg font-bold text-black">
                      {product.name}
                    </h3>

                    <div className="mb-3 flex items-center gap-2 text-xl font-bold text-cyan-400 sm:text-2xl">
                      AED{product.sale_price}
                      {product.regular_price &&
                        product.sale_price !== product.regular_price && (
                          <span className="text-sm text-gray-500 line-through">
                            AED{product.regular_price}
                          </span>
                        )}
                    </div>

                    <ul className="mb-4 space-y-1 text-gray-800">
                      {product.nfc_colors?.length > 0 && (
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-gray-500" />
                          Colors: {product.nfc_colors.join(", ")}
                        </li>
                      )}
                      {product.packs?.length > 0 && (
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-gray-500" />
                          Packs: {product.packs.join(", ")}
                        </li>
                      )}
                      {product.card_material?.length > 0 && (
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-gray-500" />
                          Material: {product.card_material.join(", ")}
                        </li>
                      )}
                    </ul>

                    <Button
                      className="w-full text-white"
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingProduct === product.id}
                    >
                      {loadingProduct === product.id ? (
                        <span className="flex items-center justify-center gap-2">
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
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 w-full py-10">
              Loading products...
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;

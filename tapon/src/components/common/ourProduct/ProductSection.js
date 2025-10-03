import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Button from "../../ui/Button";
import { Check } from "lucide-react";

// Import your images from local folder
import businessCardImg from "../../../assests/images/card/card1.webp";
import smartStandeeImg from "../../../assests/images/card/card2.png";
import reviewCardImg from "../../../assests/images/card/card3.jpg";
import bundlePackImg from "../../../assests/images/card/card4.png";

export function ProductsSection() {
  const products = [
    {
      name: "Business Card",
      price: "₹29",
      image: businessCardImg,
      features: [
        "Premium metal finish",
        "Custom design",
        "Unlimited taps",
        "Analytics dashboard",
      ],
      popular: false,
    },
    {
      name: "Smart Standee",
      price: "₹49",
      image: smartStandeeImg,
      features: [
        "Desktop display",
        "Premium materials",
        "Easy setup",
        "Perfect for offices",
      ],
      popular: true,
    },
    {
      name: "Review Card",
      price: "₹39",
      image: reviewCardImg,
      features: [
        "Boost reviews",
        "Multi-platform",
        "QR backup",
        "Custom branding",
      ],
      popular: false,
    },
    {
      name: "Bundle Pack",
      price: "₹99",
      image: bundlePackImg,
      features: [
        "5 premium cards",
        "Team dashboard",
        "Priority support",
        "Best value",
      ],
      popular: false,
    },
  ];

  return (
    <section id="products" className="py-16 md:py-28">
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

        {/* Swiper Slider */}
        <div className="relative flex items-center">
          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom hidden lg:block absolute -left-8 top-[36%] z-10 text-black text-3xl">
            &#10094;
          </button>
          <button className="swiper-button-next-custom hidden lg:block absolute -right-8 top-[36%] z-10 text-black text-3xl">
            &#10095;
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "40px" }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="group relative overflow-hidden rounded-2xl border border-cyan-900/20 backdrop-blur-sm transition-all hover:border-cyan-700/50">
                  {/* Popular Badge */}
                  {product.popular && (
                    <div className="absolute right-4 top-4 z-10 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg shadow-md">
                    <h3 className="mb-1 text-lg font-bold text-black">
                      {product.name}
                    </h3>
                    <div className="mb-3 text-xl font-bold text-cyan-400 sm:text-2xl">
                      {product.price}
                    </div>

                    <ul className="mb-4 space-y-1">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-800"
                        >
                          <Check className="h-4 w-4 text-gray-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full git add Home.jsx text-white ">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;

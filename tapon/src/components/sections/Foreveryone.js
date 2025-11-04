"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import everyOneCardData from "../../data/ForEveryone";

export default function EveryOneCards() {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          NFC is for Everyone
        </h2>

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {everyOneCardData.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-md flex flex-col items-center text-center transition hover:shadow-lg h-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full bg-[#A1DCEA] h-80 object-contain mb-4"
                />
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

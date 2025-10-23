import { useEffect, useRef, useState } from "react";

const images = [
  "/images/slider/slider1.webp",
  "/images/slider/slider2.webp",
  "/images/slider/slider3.webp",
  "/images/slider/slider4.webp",
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 5000;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <section className="relative w-full aspect-[16/6.2] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover block"
          />
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-r z-20 opacity-50 shadow hover:bg-gray-100"
      >
        ❮
      </button>
      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-3 rounded-l z-20 opacity-50 shadow hover:bg-gray-100"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}

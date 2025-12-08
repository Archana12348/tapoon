// components/TestimonialCard.jsx
import { Star, Quote } from "lucide-react";

export function TestimonialCard({ testimonial }) {
  return (
    <div className="keen-slider__slide group relative rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 p-8 backdrop-blur-sm transition-all hover:border-cyan-700/50 hover:shadow-lg hover:shadow-cyan-500/10">
      <Quote className="absolute right-8 top-8 h-12 text-sky-200 w-12 " />

      <div className="relative mb-6 flex items-center gap-4">
        <img
          src={`/testimonials/${testimonial.image || "placeholder.svg"}`}
          alt={testimonial.name}
          className="h-16 w-16 rounded-full border-2 border-cyan-700"
        />
        <div>
          <h4 className="font-bold text-black">{testimonial.name}</h4>
          <p className="text-sm text-black-400">{testimonial.role}</p>
          <p className="text-sm text-black-400">{testimonial.company}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-1">
        {[...Array(5)].map((_, i) => {
          const rating = testimonial.rating || 0;
          const starValue = i + 1;
          const diff = rating - i;

          let fillPercentage = 0;
          if (diff >= 1) fillPercentage = 100; // full
          else if (diff > 0) fillPercentage = diff * 100; // partial (e.g. 0.5 => 50%)

          return (
            <div key={i} className="relative h-5 w-5">
              {/* Empty Star */}
              <Star className="absolute h-5 w-5 text-gray-300" />

              {/* Filled Portion */}
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-pretty leading-relaxed text-black-300">
        {testimonial.content}
      </p>
    </div>
  );
}

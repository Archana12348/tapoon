// "use client";

// import { useState } from "react";
// import { TestimonialCard } from "../common/testimonials/testimonialsCard";
// import SectionIntro from "../common/sectionIntro";
// import { Swiper, SwiperSlide } from "swiper/react";

// const testimonials = [
//   {
//     name: "Sarah Johnson",
//     role: "Marketing Director",
//     company: "TechCorp Inc.",
//     image: "/professional-woman-headshot.png",
//     content:
//       "These NFC cards have completely transformed how we network at events. The instant sharing is a game-changer, and our team loves the professional look.",
//     rating: 5,
//   },
//   {
//     name: "Michael Chen",
//     role: "Entrepreneur",
//     company: "StartupHub",
//     image: "/professional-asian-man-headshot.png",
//     content:
//       "I've tried many digital business card solutions, but this is by far the best. The quality is exceptional and the technology works flawlessly every time.",
//     rating: 5,
//   },
//   {
//     name: "Emily Rodriguez",
//     role: "Sales Manager",
//     company: "Global Solutions",
//     image: "/latina-professional-headshot.png",
//     content:
//       "Our sales team has seen a 40% increase in follow-up connections since switching to NFC cards. The analytics dashboard is incredibly useful too.",
//     rating: 5,
//   },
//   {
//     name: "David Park",
//     role: "Creative Director",
//     company: "Design Studio",
//     image: "/creative-professional-headshot.png",
//     content:
//       "The customization options are fantastic. We were able to create cards that perfectly match our brand identity. Clients are always impressed.",
//     rating: 5,
//   },
//   {
//     name: "Lisa Thompson",
//     role: "CEO",
//     company: "Innovation Labs",
//     image: "/professional-woman-ceo-headshot.png",
//     content:
//       "Sustainable, professional, and incredibly effective. These cards represent our commitment to innovation and environmental responsibility.",
//     rating: 5,
//   },
//   {
//     name: "James Wilson",
//     role: "Real Estate Agent",
//     company: "Premier Properties",
//     image: "/professional-realtor-headshot.png",
//     content:
//       "My clients love the wow factor of tapping my card. It's a great conversation starter and makes me stand out from other agents.",
//     rating: 5,
//   },
// ];

// export function TestimonialsSection({ label, title, subtitle }) {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section id="testimonials" className="py-20 md:py-32">
//       <div className="container mx-auto px-4">
//         <SectionIntro
//           label={label ? label : " "}
//           title={title ? title : " "}
//           subtitle={subtitle ? subtitle : " "}
//         />

//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map((testimonial, index) => (
//             <TestimonialCard key={index} testimonial={testimonial} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// export default TestimonialsSection;

"use client";

import { TestimonialCard } from "../common/testimonials/testimonialsCard";
import SectionIntro from "../common/sectionIntro";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Inc.",
    image: "/professional-woman-headshot.png",
    content:
      "These NFC cards have completely transformed how we network at events. The instant sharing is a game-changer, and our team loves the professional look.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Entrepreneur",
    company: "StartupHub",
    image: "/professional-asian-man-headshot.png",
    content:
      "I've tried many digital business card solutions, but this is by far the best. The quality is exceptional and the technology works flawlessly every time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Sales Manager",
    company: "Global Solutions",
    image: "/latina-professional-headshot.png",
    content:
      "Our sales team has seen a 40% increase in follow-up connections since switching to NFC cards. The analytics dashboard is incredibly useful too.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Creative Director",
    company: "Design Studio",
    image: "/creative-professional-headshot.png",
    content:
      "The customization options are fantastic. We were able to create cards that perfectly match our brand identity. Clients are always impressed.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "CEO",
    company: "Innovation Labs",
    image: "/professional-woman-ceo-headshot.png",
    content:
      "Sustainable, professional, and incredibly effective. These cards represent our commitment to innovation and environmental responsibility.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Real Estate Agent",
    company: "Premier Properties",
    image: "/professional-realtor-headshot.png",
    content:
      "My clients love the wow factor of tapping my card. It's a great conversation starter and makes me stand out from other agents.",
    rating: 5,
  },
];

export function TestimonialsSection({ label, title, subtitle }) {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionIntro
          label={label ?? "Customer Stories"}
          title={title ?? "What Our Clients Say"}
          subtitle={
            subtitle ??
            "Join thousands of professionals who have transformed their networking with our NFC cards."
          }
        />

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Scoped CSS for Swiper Pagination */}
      <style jsx global>{`
        /* Move pagination below cards */
        .swiper-pagination {
          position: relative !important;
          margin-top: 2rem;
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        /* Style inactive bullets */
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background-color: #94a3b8 !important; /* Tailwind slate-400 */
          opacity: 1 !important;
          transition: background-color 0.3s ease;
        }

        /* Style active bullet */
        .swiper-pagination-bullet-active {
          background-color: #06b6d4 !important; /* Tailwind cyan-400 */
        }
      `}</style>
    </section>
  );
}

export default TestimonialsSection;

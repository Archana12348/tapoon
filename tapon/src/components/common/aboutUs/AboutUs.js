import React from "react";

export default function AboutUs() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-sky-400 via-white/70 to-sky-200 text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
          About TapOnn
        </h1>

        {/* Content */}
        <div className="space-y-5 sm:space-y-6 md:space-y-8 text-justify">
          <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
            TapOnn is your trusted partner for innovative NFC card solutions. We
            specialize in premium business cards, contactless event passes,
            loyalty cards, and a variety of customized NFC-enabled cards. Our
            mission is to help businesses and individuals connect seamlessly
            through technology-driven cards that leave a lasting impression.
          </p>

          <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
            With TapOnn, you can create NFC cards that store digital contact
            information, link to websites, or provide instant access to your
            products and services. Our team combines creativity, quality
            materials, and cutting-edge technology to deliver solutions that are
            not only functional but also stylish and memorable.
          </p>

          <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
            Whether you’re a startup, a corporate professional, or an event
            organizer, TapOnn ensures your brand stands out. Experience the
            future of networking and engagement with our smart NFC card
            solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

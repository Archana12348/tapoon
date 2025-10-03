// import React from "react";
// import { Smartphone, Map as Tap, Share2, CheckCircle } from "lucide-react";

// export function HowItWorksSection() {
//   const steps = [
//     {
//       icon: Smartphone,
//       title: "Get Your Card",
//       description:
//         "Choose your design and customize your NFC card with your branding and style.",
//       step: "01",
//     },
//     {
//       icon: Share2,
//       title: "Set Up Profile",
//       description:
//         "Add your contact info, social links, portfolio, and any digital content you want to share.",
//       step: "02",
//     },
//     {
//       icon: Tap,
//       title: "Tap to Share",
//       description:
//         "Simply tap your card on any smartphone to instantly share your digital profile.",
//       step: "03",
//     },
//     {
//       icon: CheckCircle,
//       title: "Connect & Grow",
//       description:
//         "Track your connections, update your profile anytime, and grow your network effortlessly.",
//       step: "04",
//     },
//   ];

//   return (
//     <section className="">
//       <div className="container mx-auto px-4">
//         <div className="mb-16 text-center">
//           <p className="mb-1 text-md uppercase tracking-wider text-cyan-400">
//             Simple Process
//           </p>
//           <h2 className="mb-4 text-xl font-bold text-black sm:text-3xl md:text-4xl">
//             How It Works
//           </h2>
//           <p className="mx-auto max-w-2xl text-lg text-sky-900">
//             Get started with your NFC card in four simple steps and
//             revolutionize the way you network.
//           </p>
//         </div>

//         <div className="lg:flex lg:items-start lg:gap-8">
//           {/* Left: Cards container */}
//           <div className="lg:w-2/3">
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
//               {steps.map((step, index) => {
//                 const Icon = step.icon;
//                 return (
//                   <div
//                     key={index}
//                     className="group relative rounded-2xl border border-cyan-900/20 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg p-6 transition-all hover:border-cyan-700/50 hover:shadow-lg hover:shadow-cyan-500/10"
//                     style={{ minHeight: "250px" }}
//                   >
//                     <div className="absolute right-4 top-4 text-5xl font-bold text-cyan-950/50">
//                       {step.step}
//                     </div>
//                     <div className="relative mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700">
//                       <Icon className="h-6 w-6 text-white" />
//                     </div>
//                     <h3 className="mb-2 text-lg font-bold text-black">
//                       {step.title}
//                     </h3>
//                     <p className="text-pretty leading-relaxed text-gray-700">
//                       {step.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Right: Video section */}
//           <div className="lg:w-1/3 mt-8 lg:mt-0 flex items-center justify-center">
//             <div className="w-full h-[82vh] max-w-lg">
//               <iframe
//                 title="How it works video"
//                 src="https://www.youtube.com/embed/ScMzIvxBSi4"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full rounded-xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HowItWorksSection;

import React from "react";
import { Smartphone, Map as Tap, Share2, CheckCircle } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Smartphone,
      title: "Get Your Card",
      description:
        "Choose your design and customize your NFC card with your branding and style.",
      step: "01",
    },
    {
      icon: Share2,
      title: "Set Up Profile",
      description:
        "Add your contact info, social links, portfolio, and any digital content you want to share.",
      step: "02",
    },
    {
      icon: Tap,
      title: "Tap to Share",
      description:
        "Simply tap your card on any smartphone to instantly share your digital profile.",
      step: "03",
    },
    {
      icon: CheckCircle,
      title: "Connect & Grow",
      description:
        "Track your connections, update your profile anytime, and grow your network effortlessly.",
      step: "04",
    },
  ];

  return (
    <>
      <section className="">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="mb-1 text-md uppercase tracking-wider text-cyan-400">
              Simple Process
            </p>
            <h2 className="mb-4 text-xl font-bold text-black sm:text-3xl md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-sky-900">
              Get started with your NFC card in four simple steps and
              revolutionize the way you network.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-cyan-900/20 bg-gradient-to-r from-sky-200 via-white to-sky-100 backdrop-blur-lg p-6 transition-all hover:border-cyan-700/50 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="absolute right-4 top-4 text-4xl font-bold text-cyan-950/50">
                    {step.step}
                  </div>
                  <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-black">
                    {step.title}
                  </h3>
                  <p className="text-pretty leading-relaxed text-gray-800">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Container */}
      <div className="w-full pt-16 mb-3">
        <div className="w-full overflow-hidden shadow-lg">
          <video
            className="w-full h-[450px] object-cover" // yaha height increase ki
            controls
            autoPlay
            muted
            loop
            controlsList="nodownload"
          >
            <source src="/video/videoplayback.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}

export default HowItWorksSection;

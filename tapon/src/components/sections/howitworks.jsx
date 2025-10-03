import { Smartphone, Map as Tap, Share2, CheckCircle } from "lucide-react";
import SectionIntro from "../common/sectionIntro";

export function HowItWorksSection({ label, title, subtitle }) {
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
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionIntro
          label={`${label}`}
          title={`${title}`}
          subtitle={`${subtitle}`}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-200 via-white to-sky-100 p-8 backdrop-blur-sm transition-all"
              >
                <div className="absolute right-4 top-4 text-6xl font-bold text-cyan-950/50"></div>
                <div className="relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-black">
                  {step.title}
                </h3>
                <p className="text-pretty leading-relaxed text-black-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

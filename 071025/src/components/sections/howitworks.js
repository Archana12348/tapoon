import {
  Smartphone,
  Map as Tap,
  Share2,
  CheckCircle,
  CheckCheck,
  CreditCard,
} from "lucide-react";
import SectionIntro from "../common/sectionIntro";

export function HowItWorksSections({ label, title, subtitle }) {
  const steps = [
    {
      icon: CheckCheck,
      title: "100% Accuracy",
      description:
        "Our technology ensures every detail is captured perfectly, giving you reliable results every time.",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Pay with Multiple Credit Cards.",
    },
    {
      icon: Tap,
      title: "Seamless Experience",
      description:
        "Enjoy a smooth and intuitive interface that makes everything simple and fast.",
      step: "03",
    },
    {
      icon: CheckCircle,
      title: "Trusted & Reliable",
      description:
        "Our service is highly trusted and consistently delivers what you need without compromise.",
      step: "04",
    },
  ];

  return (
    <section className="pt-14 md:pt-14">
      <div className="container mx-auto px-4">
        <SectionIntro label={label} title={title} subtitle={subtitle} />

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

export default HowItWorksSections;

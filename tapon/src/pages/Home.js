// import Slider from "../components/Slider";
import { HowItWorksSection } from "../components/sections/howitworks";
import TestimonialsSection from "../components/sections/testimonialsSection";
import { CTASection } from "../components/sections/cta";

export default function Home() {
  return (
    <>
      <TestimonialsSection
        label="Customer Stories"
        title="What Our Clients Say"
        subtitle="Join thousands of professionals who have transformed their
            networking with our NFC cards."
      />
      <h1>Hello</h1>
      <HowItWorksSection
        label="Simple Process"
        title="How It Works"
        subtitle="Get started with your NFC card in four simple steps and
            revolutionize the way you network."
      />
      <CTASection />

      {/* Add more sections here */}
    </>
  );
}

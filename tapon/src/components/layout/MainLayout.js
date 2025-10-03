import { useLocation } from "react-router-dom";
import Header from "../header&footer/Header";
import { Footer } from "../header&footer/Footer";
import { ProductsSection } from "../common/ourProduct/ProductSection";
import HowItWorksSection from "../common/working/Working";
import HowItWorksSeections from "../sections/howitworks";
import TestimonialsSection from "../sections/testimonialsSection";
import CTASection from "../sections/cta";

export default function MainLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>{children}</main>

      {isHomePage && (
        <>
          <ProductsSection />
          <HowItWorksSection />
          <TestimonialsSection
            label="Customer Stories"
            title="What Our Clients Say"
            subtitle="Join thousands of professionals who have transformed their
            networking with our NFC cards."
          />
          <HowItWorksSeections
            label="Simple Process"
            title="How It Works"
            subtitle="Get started with your NFC card in four simple steps and
            revolutionize the way you network."
          />
          <CTASection />
          {/* <FeaturedProducts />
          <TopSellerCarousel />
          <BestSellerSection />
          <LatestNews /> */}
        </>
      )}

      <Footer />
    </>
  );
}

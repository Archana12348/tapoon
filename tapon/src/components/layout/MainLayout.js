import { useLocation } from "react-router-dom";
import Header from "../header&footer/Header";
import { Footer } from "../header&footer/Footer";
import { ProductsSection } from "../common/ourProduct/ProductSection";
import HowItWorksSection from "../common/working/Working";

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

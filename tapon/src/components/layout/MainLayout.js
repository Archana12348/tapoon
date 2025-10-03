import { useLocation } from "react-router-dom";
import Header from "../header&footer/Header";
import { Footer } from "../header&footer/Footer";

export default function MainLayout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>{children}</main>

      {isHomePage && (
        <>
          {/* <FeatureSection />
          <FeaturedProducts />
          <TopSellerCarousel />
          <BestSellerSection />
          <LatestNews /> */}
        </>
      )}

      <Footer />
    </>
  );
}

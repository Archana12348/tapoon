import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import About from "./pages/About";
import MainLayout from "../components/layout/MainLayout";
import ContactSection from "../components/common/contact/ContactUs";
import AboutUs from "../components/common/aboutUs/AboutUs";
import ProductPage from "../components/common/product/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Contact Page */}
        <Route
          path="/contactus"
          element={
            <MainLayout>
              <ContactSection />
            </MainLayout>
          }
        />
        {/* About Us */}
        <Route
          path="/aboutUs"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        {/* Product Page */}
        <Route
          path="/product"
          element={
            <MainLayout>
              <ProductPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

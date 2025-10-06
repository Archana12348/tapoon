import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import About from "./pages/About";
import MainLayout from "../components/layout/MainLayout";
import ContactSection from "../components/common/contact/ContactUs";
import AboutUs from "../components/common/aboutUs/AboutUs";
import ProductPage from "../components/common/product/ProductPage";
import BlogPageDummy from "../components/common/blog/AllBlogs";
import BlogDetailDummy from "../components/common/blog/Blog";
import ProductsSolutions from "../components/common/forCorporate/Corporate";
import CartPage from "../components/common/cart/CartPage";
import MultiStepForm from "../components/common/paymentprocess/MultiStepForm";

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

        {/* Blog Page */}
        <Route
          path="/blog"
          element={
            <MainLayout>
              <BlogPageDummy />
            </MainLayout>
          }
        />
        {/* Blog detail */}
        <Route
          path="/blogdetail"
          element={
            <MainLayout>
              <BlogDetailDummy />
            </MainLayout>
          }
        />
        {/* Corporate page */}
        <Route
          path="/corporate"
          element={
            <MainLayout>
              <ProductsSolutions />
            </MainLayout>
          }
        />
        {/* MultiStep Page */}
        <Route
          path="/information/form"
          element={
            <MainLayout>
              <MultiStepForm />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ScrollToTop from "../components/common/scrolltop/ScrollToTop"; // ✅ Add this line
import MainLayout from "../components/layout/MainLayout";
import ContactSection from "../components/common/contact/ContactUs";
import AboutUs from "../components/common/aboutUs/AboutUs";
import ProductPage from "../components/common/product/ProductPage";
import BlogPageDummy from "../components/common/blog/AllBlogs";
import BlogDetailDummy from "../components/common/blog/Blog";
import ProductsSolutions from "../components/common/forCorporate/Corporate";
import CartPage from "../components/common/cart/CartPage";
import MultiStepForm from "../components/common/paymentprocess/MultiStepForm";
import DeliveryReturnPolicy from "../components/common/delivery/DeliveryReturnPolicy";
import SingleProductPage from "../components/common/product/ProductDetail";
import FaqSection from "../components/sections/Faq";
import TermsAndConditions from "../components/sections/termandconditions";
import PrivacyPolicy from "../components/sections/privacy-policy";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Orders from "../pages/users/orders";
import Dashboard from "../pages/users/dashboards";
import SuccessPage from "../components/common/paymentprocess/SuccessPage";
import CancelPage from "../components/common/paymentprocess/CancelPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ Add this line just inside BrowserRouter */}
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
        {/* Faq */}
        <Route
          path="/frequently-asked-questions"
          element={
            <MainLayout>
              <FaqSection />
            </MainLayout>
          }
        />
        {/* Faq */}
        <Route
          path="/terms-and-conditions"
          element={
            <MainLayout>
              <TermsAndConditions />
            </MainLayout>
          }
        />
        {/* Privacy Policy */}
        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />
        {/* Sign Up */}
        <Route
          path="/sign-up"
          element={
            <MainLayout>
              <SignUp />
            </MainLayout>
          }
        />
        {/* Sign In */}
        <Route
          path="/sign-in"
          element={
            <MainLayout>
              <SignIn />
            </MainLayout>
          }
        />
        {/* Product Page */}
        <Route
          path="/products/:slug"
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
        {/* Success Page */}
        <Route
          path="/success"
          element={
            <MainLayout>
              <SuccessPage />
            </MainLayout>
          }
        />
        {/* Cancel Page */}
        <Route
          path="/cancel"
          element={
            <MainLayout>
              <CancelPage />
            </MainLayout>
          }
        />

        {/* Delivery and Return  */}
        <Route
          path="/delivery&return"
          element={
            <MainLayout>
              <DeliveryReturnPolicy />
            </MainLayout>
          }
        />

        {/* Single Product */}
        <Route
          path="/:slug"
          element={
            <MainLayout>
              <SingleProductPage />
            </MainLayout>
          }
        />
        {/* Order */}
        <Route
          path="/orders"
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />
        {/* Profile */}
        <Route
          path="/profile/:slug"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

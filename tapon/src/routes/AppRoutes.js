import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
// import About from "./pages/About";
import MainLayout from "../components/layout/MainLayout";
import ContactSection from "../components/common/contact/ContactUs";
import AboutUs from "../components/common/aboutUs/AboutUs";
import ProductPage from "../components/common/product/ProductPage";
import FaqSection from "../components/sections/Faq";
import TermsAndConditions from "../components/sections/termandconditions";
import PrivacyPolicy from "../components/sections/privacy-policy";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";

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

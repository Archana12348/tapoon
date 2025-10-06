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

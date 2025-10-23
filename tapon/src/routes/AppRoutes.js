import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import ScrollToTop from "../components/common/scrolltop/ScrollToTop";
import MainLayout from "../components/layout/MainLayout";
import ContactSection from "../components/common/contact/ContactUs";
import AboutUs from "../components/common/aboutUs/AboutUs";
import ProductPage from "../components/common/product/ProductPage";
import BlogPageDummy from "../components/common/blog/AllBlogs";
import BlogDetailDummy from "../components/common/blog/Blog";
import ProductsSolutions from "../components/common/forCorporate/Corporate";
import MultiStepForm from "../components/common/paymentprocess/MultiStepForm";
import DeliveryReturnPolicy from "../components/common/delivery/DeliveryReturnPolicy";
import SingleProductPage from "../components/common/product/ProductDetail";
import FaqSection from "../components/sections/Faq";
import TermsAndConditions from "../components/sections/termandconditions";
import PrivacyPolicy from "../components/sections/privacy-policy";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
// import Orders from "../pages/users/orders";
import Dashboard from "../pages/users/dashboards";
import SuccessPage from "../components/common/paymentprocess/SuccessPage";
// import CancelPage from "../components/common/paymentprocess/CancelPage";
import MultiStepProfileForm from "../features/profile/MultiStepProfileForm";
import Template from "../pages/users/dashboarddummp";
import FailurePage from "../components/common/paymentprocess/CancelPage";
import OrderDetails from "../pages/users/orderdetails";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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

        {/* FAQ */}
        <Route
          path="/frequently-asked-questions"
          element={
            <MainLayout>
              <FaqSection />
            </MainLayout>
          }
        />

        {/* Terms and Conditions */}
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
        {/* Forgot Password */}
        <Route
          path="/forgot-password"
          element={
            <MainLayout>
              <ForgotPasswordPage />
            </MainLayout>
          }
        />
        {/* Reset Password */}
        <Route
          path="/reset-password"
          element={
            <MainLayout>
              <ResetPasswordPage />
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

        {/* Blog Detail */}
        <Route
          path="/blogdetail"
          element={
            <MainLayout>
              <BlogDetailDummy />
            </MainLayout>
          }
        />

        {/* Corporate Page */}
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
          path="/cart"
          element={
            <MainLayout>
              <MultiStepForm />
            </MainLayout>
          }
        />

        {/* Success Page */}
        <Route path="/checkout-success" element={<SuccessPage />} />

        {/* Cancel Page */}
        <Route path="/checkout-cancel" element={<FailurePage />} />

        {/* Delivery and Return */}
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

        {/* Orders */}
        <Route
          path="/orders"
          element={
            <MainLayout>
              <OrderDetails />
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
        {/* Profile */}
        <Route
          path="/profile/add"
          element={
            <MainLayout>
              <MultiStepProfileForm />
            </MainLayout>
          }
        />
        {/* Profile */}
        {/* <Route
          path="/profile/template/:slug"
          element={
            <MainLayout>
              <Template />
            </MainLayout>
          }
        /> */}
        {/* Profile */}
        <Route path="/profile/template/:id" element={<Template />} />

        <Route
          path="/profile/create"
          element={
            <MainLayout>
              <MultiStepProfileForm />
            </MainLayout>
          }
        />
        <Route
          path="/profile/edit/:id"
          element={
            <MainLayout>
              <MultiStepProfileForm />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

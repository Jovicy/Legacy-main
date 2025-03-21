import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Newsletter from "./components/Newsletter";
import Plans from "./components/Plans";
import Reason from "./components/Reason";
import SuccessStories from "./components/SuccessStories";

import AboutPage from "./pages/AboutPage";
import PlansPage from "./pages/PlansPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Forbidden from "./pages/Forbidden";
import ForgetPassword from "./pages/ForgetPassword";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const location = useLocation();

  // Pages that should NOT show header/footer
  const hiddenPaths = [
    "/login",
    "/register",
    "/admin",
    "/forget-password",
    "/contact",
    "/about",
    "/blog",
    "/payment",
  ];

  const hideHeaderFooter = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <AboutUs />
              <SuccessStories />
              <Reason />
              <Plans />
              <Newsletter />
              <Footer />
            </>
          }
        />

        {/* Other Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Hidden Header/Footer Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/blog/:blogId" element={<BlogDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/not-found" element={<Forbidden />} />

        {/* 404 Page */}
        <Route path="" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Partners from "./components/Partners";
import FAQ from "./components/FAQ";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";


import Demo from "./pages/Demo";
import ServiceDetails from "./pages/ServiceDetails";
import AboutDetail from "./pages/AboutDetail"; // ✅ ADD THIS
import OurClientsPage from "./pages/OurClientsPage";
/* =========================
   SCROLL TO HASH FIX
========================= */
function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;

    if (hash) {
      const id = hash.replace("#", "");

      // Poll until the element exists — handles slow renders after navigation
      let tries = 0;
      const interval = setInterval(() => {
        const element = document.getElementById(id);
        if (element) {
          clearInterval(interval);
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (++tries > 20) {
          clearInterval(interval);
        }
      }, 80);

      return () => clearInterval(interval);
    }
  }, [location]);

  return null;
}

/* =========================
   HOME PAGE
========================= */
function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="partners">
        <Partners />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
}

/* =========================
   APP
========================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ✅ ABOUT DETAILS PAGE */}
        <Route path="/about" element={<AboutDetail />} />

        {/* OTHER PAGES */}
        <Route path="/demo" element={<Demo />} />
     
        <Route path="/contact" element={<Contact />} />

        {/* SERVICE DETAILS */}
        <Route path="/services/:slug" element={<ServiceDetails />} />
<Route path="/about-details" element={<AboutDetail />} />
        {/* 404 */}
        <Route
          path="*"
          element={
            <h2 style={{ padding: "40px", textAlign: "center" }}>
              Page Not Found
            </h2>
          }
        />
        <Route path="/our-clients" element={<OurClientsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
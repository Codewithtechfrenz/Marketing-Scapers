import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/Media.jpg";

/* ── Icons ── */
const IconAboutUs = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconTestimonials = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "translateX(3px)" }}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconContact = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg className={`chevron ${open ? "chevron-open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconClients = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3"/>
    <path d="M2 20c0-3 3-5 7-5s7 2 7 5"/>
    <circle cx="17" cy="7" r="3"/>
    <path d="M22 20c0-3-2.5-5-5-5"/>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [dropdownOpen, setDropdownOpen]     = useState(false);
  const [bnDropOpen, setBnDropOpen]         = useState(false);
  const [drawerDropOpen, setDrawerDropOpen] = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);

  const dropdownRef   = useRef(null);
  const bnDropRef     = useRef(null);
  const drawerDropRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close desktop dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close bottom-nav dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (bnDropRef.current && !bnDropRef.current.contains(e.target))
        setBnDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close drawer dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (drawerDropRef.current && !drawerDropRef.current.contains(e.target))
        setDrawerDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setBnDropOpen(false);
    setDrawerDropOpen(false);
  };

  /* ── scroll to top helper ── */
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* ── go home and scroll to top ── */
  const goHome = () => {
    closeAll();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  /* ── active state checks ── */
  const isHome       = location.pathname === "/";
  const isServices   = location.pathname.startsWith("/services");
  const isAbout      = location.pathname === "/about" || location.pathname === "/contact";
  const isDemo       = location.pathname === "/demo";
  const isOurClients = location.pathname === "/our-clients";

  /* ── scroll to testimonials ── */
  const goToTestimonials = () => {
    closeAll();
    const scrollNow = () => {
      let tries = 0;
      const t = setInterval(() => {
        const el = document.getElementById("testimonials");
        if (el) { clearInterval(t); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
        else if (++tries > 20) clearInterval(t);
      }, 80);
    };
    if (location.pathname === "/") scrollNow();
    else { navigate("/"); setTimeout(scrollNow, 100); }
  };

  return (
    <>
      {/* ── HAMBURGER ── */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen((p) => !p)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        )}
      </button>

      {/* ── OVERLAY ── */}
      {menuOpen && <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />}

      {/* ── MOBILE TOPBAR ── */}
      <div className="mobile-topbar">
        <h2 className="logo">
          <span className="logo-icon">
            <img src={logo} alt="Marketing Scapers logo" className="logo-image" />
          </span>
          <span className="brand">Marketing<span className="highlight">Scapers</span></span>
        </h2>
      </div>

      {/* ── SIDE DRAWER ── */}
      <aside className={`drawer ${menuOpen ? "drawer-open" : ""}`}>
        <ul className="nav-links">

          <li>
            <Link to="/" onClick={goHome}>Home</Link>
          </li>

          <li>
            <Link to="/services/website-development" onClick={() => { closeAll(); scrollToTop(); }}>
              Services
            </Link>
          </li>

          <li>
            <Link to="/our-clients" onClick={() => { closeAll(); scrollToTop(); }}>
              Our Clients
            </Link>
          </li>

          {/* About dropdown in drawer */}
          <li className="nav-dropdown-wrapper" ref={drawerDropRef}>
            <button
              className="nav-dropdown-trigger"
              onClick={() => setDrawerDropOpen((p) => !p)}
              aria-expanded={drawerDropOpen}
            >
              About <IconChevron open={drawerDropOpen} />
            </button>
            {drawerDropOpen && (
              <div className="nav-dropdown">
                <Link className="dropdown-item" to="/about" onClick={() => { setDrawerDropOpen(false); setMenuOpen(false); }}>
                  <span className="dropdown-icon"><IconAboutUs /></span>About Us
                </Link>
                <button className="dropdown-item testimonials" onClick={() => { setDrawerDropOpen(false); goToTestimonials(); }}>
                  <span className="dropdown-icon"><IconTestimonials /></span>
                  <span className="dropdown-text">Testimonials</span>
                </button>
                <Link className="dropdown-item" to="/contact" onClick={() => { setDrawerDropOpen(false); setMenuOpen(false); }}>
                  <span className="dropdown-icon"><IconContact /></span>Contact
                </Link>
              </div>
            )}
          </li>

          <li><Link to="/demo" className="demo-btn" onClick={closeAll}>Book Demo</Link></li>
        </ul>
      </aside>

      {/* ── BOTTOM NAV (mobile only) ── */}
      <nav className="bottom-nav">

        <button
          className={`bn-item bn-home ${isHome ? "bn-active" : ""}`}
          onClick={goHome}
        >
          <span className="bn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z"/>
              <polyline points="9 21 9 12 15 12 15 21"/>
            </svg>
          </span>
          <span className="bn-label">Home</span>
        </button>

        <Link
          to="/services/website-development"
          className={`bn-item bn-services ${isServices ? "bn-active" : ""}`}
          onClick={closeAll}
        >
          <span className="bn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </span>
          <span className="bn-label">Services</span>
        </Link>

        <Link
          to="/our-clients"
          className={`bn-item bn-clients ${isOurClients ? "bn-active" : ""}`}
          onClick={closeAll}
        >
          <span className="bn-icon"><IconClients /></span>
          <span className="bn-label">Our Clients</span>
        </Link>

        {/* About dropdown in bottom nav */}
        <div className={`bn-item bn-about-wrapper bn-about ${isAbout ? "bn-active" : ""}`} ref={bnDropRef}>
          <button className="bn-item-btn" onClick={() => setBnDropOpen((p) => !p)} aria-expanded={bnDropOpen}>
            <span className="bn-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </span>
            <span className="bn-label">About</span>
            <svg className={`bn-chevron ${bnDropOpen ? "bn-chevron-open" : ""}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {bnDropOpen && (
            <div className="bn-dropdown">
              <Link className="bn-drop-item" to="/about" onClick={() => { setBnDropOpen(false); setMenuOpen(false); }}>
                <span className="bn-drop-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </span>
                About Us
              </Link>
              <button className="bn-drop-item" onClick={() => { setBnDropOpen(false); goToTestimonials(); }}>
                <span className="bn-drop-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </span>
                Testimonials
              </button>
              <Link className="bn-drop-item" to="/contact" onClick={() => { setBnDropOpen(false); setMenuOpen(false); }}>
                <span className="bn-drop-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                Contact
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/demo"
          className={`bn-item bn-demo ${isDemo ? "bn-active" : ""}`}
          onClick={closeAll}
        >
          <span className="bn-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </span>
          <span className="bn-label">Book Demo</span>
        </Link>

      </nav>

      {/* ── DESKTOP NAVBAR ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <h2 className="logo">
          <span className="logo-icon">
            <img src={logo} alt="Marketing Scapers logo" className="logo-image" />
          </span>
          <span className="brand">Marketing<span className="highlight">Scapers</span></span>
        </h2>

        <ul className="nav-links desktop-nav">

          <li>
            <Link to="/" onClick={goHome}>Home</Link>
          </li>

          <li>
            <Link to="/services/website-development" onClick={closeAll}>Services</Link>
          </li>

          <li>
            <Link to="/our-clients" onClick={closeAll}>Our Clients</Link>
          </li>

          {/* ✅ FIXED: inline JSX instead of <AboutDropdown /> inner component */}
          <li className="nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="nav-dropdown-trigger"
              onClick={() => setDropdownOpen((p) => !p)}
              aria-expanded={dropdownOpen}
            >
              About <IconChevron open={dropdownOpen} />
            </button>
            {dropdownOpen && (
              <div className="nav-dropdown">
                <Link className="dropdown-item" to="/about" onClick={closeAll}>
                  <span className="dropdown-icon"><IconAboutUs /></span>About Us
                </Link>
                <button className="dropdown-item testimonials" onClick={() => { setDropdownOpen(false); goToTestimonials(); }}>
                  <span className="dropdown-icon"><IconTestimonials /></span>
                  <span className="dropdown-text">Testimonials</span>
                </button>
                <Link className="dropdown-item" to="/contact" onClick={closeAll}>
                  <span className="dropdown-icon"><IconContact /></span>Contact
                </Link>
              </div>
            )}
          </li>

          <li><Link to="/demo" className="demo-btn" onClick={closeAll}>Book Demo</Link></li>
        </ul>
      </nav>
    </>
  );
}

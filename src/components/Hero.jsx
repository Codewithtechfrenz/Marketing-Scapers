import "./Hero.css";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1200&q=80",
    tag: "SEO & Content",
    headline: "Rank Higher,\nGet Found First",
    desc: "Data-driven SEO strategies that put your brand on page one and keep it there — permanently.",
  },
  {
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
    tag: "Social Media",
    headline: "Communities\nThat Convert",
    desc: "Authentic storytelling and paid social that build loyalty and drive consistent sales.",
  },
  {
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    tag: "Analytics",
    headline: "Decisions Backed\nBy Real Data",
    desc: "Deep analytics dashboards that reveal what's working and where your next win is hiding.",
  },
];

const stats = [
  { value: "50+", label: "Clients Served" },
  { value: "10+", label: "AI Solutions" },
  { value: "98%", label: "Satisfaction" },
];

// Replays animation EVERY TIME element enters/leaves viewport
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);

  const [eyebrowRef, eyebrowVisible] = useScrollReveal();
  const [headingRef, headingVisible] = useScrollReveal();
  const [bodyRef, bodyVisible] = useScrollReveal();
  const [actionsRef, actionsVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();
  const [badgeRef, badgeVisible] = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((prevIndex) => (prevIndex + 1) % slides.length);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    }, 4800);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 700);
  };

  const slide = slides[current];

  return (
    <section
      className="hero"
      aria-label="Marketing Scapers — AI-Powered Digital Marketing Agency USA"
      itemScope
      itemType="https://schema.org/WPHeader"
    >
      <div className="hero-noise" />
      <div className="hero-grid" />

      <div className="hero-inner">

        {/* LEFT */}
        <div className="hero-left">

          <div
            ref={eyebrowRef}
            className={`hero-eyebrow sr sr-left ${eyebrowVisible ? "sr-show" : ""}`}
            style={{ transitionDelay: "0ms" }}
          >
            <span className="eyebrow-dot" />
            <span>AI-Powered Solutions for Modern Business</span>
          </div>

          <h1
            ref={headingRef}
            className={`hero-heading sr sr-up ${headingVisible ? "sr-show" : ""}`}
            style={{ transitionDelay: "100ms" }}
            itemProp="headline"
          >
            <span className="h-line h-line-1">
              <span className="w-green">Landscaping</span>{" "}
              <span className="w-black">Your</span>
            </span>

            <span className="h-line h-line-2">
              <span className="gradient-text">
  Sales &amp; Marketing
</span>
            </span>
          </h1>

          <p
            ref={bodyRef}
            className={`hero-body sr sr-up ${bodyVisible ? "sr-show" : ""}`}
            style={{ transitionDelay: "200ms" }}
            itemProp="description"
          >
            From AI healthcare solutions to real estate automation,
            digital marketing to clinical research—we bring innovative
            technology to businesses ready to scale in the USA market.
          </p>

          <div
            ref={actionsRef}
            className={`hero-actions sr sr-up ${actionsVisible ? "sr-show" : ""}`}
            style={{ transitionDelay: "300ms" }}
          >
            <a href="#services" className="btn-primary">
              Consult Your Product
              <svg viewBox="0 0 20 20" fill="none" width="17">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <Link to="/demo" className="btn-ghost">
              Book Demo
            </Link>
          </div>

          <div className="hero-divider" />

          <div
            ref={statsRef}
            className="hero-stats"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="stat-item"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible
                    ? "translateY(0) scale(1)"
                    : "translateY(24px) scale(0.9)",
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${400 + i * 90}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${400 + i * 90}ms`,
                }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div
          ref={rightRef}
          className={`hero-right sr sr-right ${rightVisible ? "sr-show" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >

          {/* Wrapper */}
          <div className="slide-wrapper">

            {/* Frame */}
            <div className="slide-frame">

              <div className="corner corner-tl" />
              <div className="corner corner-br" />

              {slides.map((s, i) => (
                <div
                  key={i}
                  className={`slide-img-wrap ${
                    i === current
                      ? "slide-in"
                      : i === prev
                      ? "slide-out"
                      : "slide-hidden"
                  }`}
                >
                  <img
                    src={s.img}
                    alt={s.tag}
                    className="slide-img"
                  />
                  <div className="slide-overlay" />
                </div>
              ))}

              <div className="slide-tag">
                <span className="tag-pulse" />
                {slide.tag}
              </div>

              <div className="slide-caption">
                <h3 className="caption-headline">
                  {slide.headline.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p className="caption-desc">{slide.desc}</p>
              </div>

              <div className="slide-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    className={`dot-btn ${i === current ? "dot-active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

            </div>

            {/* FLOAT BADGE */}
            <div
               ref={badgeRef}
               className={`float-badge ${badgeVisible ? "sr-show" : ""}`}
              style={{ transitionDelay: "450ms" }}
            >
              <div className="badge-icon-wrap">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a56db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>

              <div>
                <p className="badge-title">AI-Powered</p>
                <p className="badge-sub">
                  Smart Automation
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

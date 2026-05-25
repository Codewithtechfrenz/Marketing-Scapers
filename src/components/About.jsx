import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import aboutImg from "../assets/images/aboutimg.jpg";
/* ─────────────────────────────────────────
   Animated counter — counts up on scroll
───────────────────────────────────────── */
function useCounter(target, duration = 2000, started = false) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!started) return;
    const num    = parseFloat(target);
    const suffix = target.replace(/[\d.]/g, "");
    let startTs  = null;
    const tick   = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const e = 1 - Math.pow(1 - p, 4); // ease-out quart
      setDisplay(Math.floor(e * num) + suffix);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return display;
}

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const stats = [
  { emoji: "🏆", value: "500+", label: "Businesses Helped",  bar: 85, color: "#6366f1" },
  { emoji: "⚡", value: "15+",  label: "Years Experience",   bar: 75, color: "#8b5cf6" },
  { emoji: "😊", value: "98%",  label: "Satisfaction Rate",  bar: 98, color: "#06b6d4" },
  { emoji: "🌍", value: "18+",  label: "Countries Served",   bar: 60, color: "#10b981" },
];

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    title: "Precision Solutions",
    desc: "Tailored AI and marketing strategies designed specifically for your industry and business needs.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Rapid Deployment",
    desc: "Get up and running in weeks, not months, with our streamlined implementation process.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: "Compliance First",
    desc: "HIPAA-compliant, secure, and fully regulated solutions you can trust.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
    title: "Proven Results",
    desc: "Track record of helping 500+ businesses achieve measurable growth and efficiency.",
  },
];

/* ─────────────────────────────────────────
   Single stat item
───────────────────────────────────────── */
function StatItem({ emoji, value, label, bar, color, delay }) {
  const ref     = useRef(null);
  const [on, setOn] = useState(false);
  const count   = useCounter(value, 2000, on);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`sstat ${on ? "sstat--on" : ""}`}
      style={{ "--delay": `${delay}ms`, "--bar-color": color }}
    >
      {/* glow ring */}
      <div className="sstat-ring" style={{ "--c": color }} />

      {/* emoji */}
      <span className="sstat-emoji">{emoji}</span>

      {/* number */}
      <span className="sstat-num">{on ? count : "0"}</span>

      {/* label */}
      <span className="sstat-label">{label}</span>

      {/* progress bar */}
      <div className="sstat-bar-track">
        <div
          className="sstat-bar-fill"
          style={{ "--w": `${bar}%`, "--c": color }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    const els = document.querySelectorAll(".about-left, .about-right, .feature-card");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
        else e.target.classList.remove("show");
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="about">
      <div className="about-container">

        {/* LEFT */}
        <div className="about-left">
  <div className="about-img-wrapper">
  <img src={aboutImg} className="about-img" alt="about" />

  <div className="img-badge">
    <h3>15+</h3>
    <p>Years Combined Expertise</p>
  </div>
</div>
        </div>

        {/* RIGHT */}
        <div className="about-right">
          <h2 className="about-title">
            <span className="about-green">Landscaping Success in</span>{" "}
            <span className="about-dark">Sales &amp; Marketing</span>
          </h2>

          <p className="about-desc">
            MarketingScapers brings innovative AI and technology solutions to
            businesses ready to scale in the USA market. Like a landscaping
            company transforms outdoor spaces, we transform your sales and
            marketing landscape.
          </p>
          <p className="about-desc">
            We specialize in bridging international companies—especially AI and
            tech innovators—with the American market through strategic marketing,
            cutting-edge automation, and industry-specific solutions.
          </p>

          <div className="feature-grid">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="feature-card"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="feature-emoji">{f.icon}</span>
                <div className="feature-text">
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="view-btn" onClick={() => navigate("/about")}>
            View Details <span className="btn-arrow">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

import { useNavigate } from "react-router-dom";
import "./AboutDetail.css";
import { useEffect, useRef, useState } from "react";

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
      const e = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.floor(e * num) + suffix);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(target);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return display;
}

/* ─────────────────────────────────────────
   SVG Icons
───────────────────────────────────────── */
const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const PlaneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
  </svg>
);
const HandshakeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l1.06 1.06L12 21.23l7.36-7.94 1.06-1.06a5.4 5.4 0 0 0 0-7.65z"/>
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const ChartBarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
);
const RocketIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const TargetIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const LightbulbIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

/* ─────────────────────────────────────────
   Stats data
───────────────────────────────────────── */
const statsData = [
  { icon: <GlobeIcon />,      value: "3+",  label: "Clients Worldwide",     bar: 80, color: "#6366f1" },
  { icon: <PlaneIcon />,      value: "4",   label: "Countries Served",      bar: 72, color: "#8b5cf6" },
  { icon: <HandshakeIcon />,  value: "94%", label: "Client Retention Rate", bar: 94, color: "#06b6d4" },
  { icon: <TrendingUpIcon />, value: "3.8", label: "Average ROI Delivered", bar: 76, color: "#10b981" },
];

/* ─────────────────────────────────────────
   Single stat card
───────────────────────────────────────── */
function StatCard({ icon, value, label, bar, color, delay }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  const count = useCounter(value, 2000, on);

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
      className={`ad-sstat ${on ? "ad-sstat--on" : ""}`}
      style={{ "--delay": `${delay}ms`, "--bar-color": color }}
    >
      <div className="ad-sstat-ring" style={{ "--c": color }} />
      <span className="ad-sstat-icon" style={{ color }}>{icon}</span>
      <span className="ad-sstat-num">{on ? count : "0"}</span>
      <span className="ad-sstat-label">{label}</span>
      <div className="ad-sstat-bar-track">
        <div className="ad-sstat-bar-fill" style={{ "--w": `${bar}%`, "--c": color }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function AboutDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
          else entry.target.classList.remove("show");
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="detail-overlay">
      <button className="detail-back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      {/* ── OUR STORY / HERO CONTENT ── */}
      <div className="detail-body">
        <div style={{ marginBottom: 48 }}>

          {/* Heading 1 — highlighted only */}
          <h2 className="story-highlight-title fade-up">
            Navigating the U.S. Market:
            <span className="story-highlight-accent">Your Strategic Growth Partner</span>
          </h2>
          <div className="gold-line fade-up" />

          {/* Paragraph 1 — glassmorphism card */}
          <div className="story-glass fade-up">
            <p>
              Welcome to <strong>MARKETING SCAPERS</strong> — where international ambition meets American
              execution. We don't just offer marketing services; we provide a complete "go-to-market" boat,
              taking your brand from foreign shores and navigating it through the complex, competitive waters
              of the USA market to reach a successful landing.

              Many exceptional products fail in the USA not due to quality, but lack of local expertise.
              We bridge that gap. We specialize in taking companies "on board," acting as your trusted
              US-based partner to analyze, brand, launch, and sell your products to American consumers.

              We handle the entire process, allowing you to focus on product excellence while we focus on
              market dominance. Through <strong>Deep Market Analysis</strong>, we dive into consumer trends,
              competitor landscapes, and regulatory environments to identify exactly where your product fits.
              With <strong>Strategic Branding &amp; Positioning</strong>, we refine your brand story to
              resonate with American values — independence, quality, and reliability — turning your foreign
              heritage into a premium advantage.

              Our <strong>Comprehensive Marketing</strong> approach spans SEO and digital ads to influencer
              partnerships, ensuring your brand is visible to the right U.S. demographics. And through
              <strong> Sales &amp; Distribution Support</strong>, we don't just get you noticed — we get
              you sold. Our team helps you establish e-commerce channels (Amazon, Shopify) and build
              relationships with U.S.-based reps to drive consistent sales.
            </p>
          </div>

          {/* Heading 2 — highlighted only */}
          <h3 className="story-highlight-title fade-up" style={{ marginTop: 52 }}>
            Why Choose{" "}
            <span className="story-highlight-accent">MARKETING SCAPERS?</span>
          </h3>
          <div className="gold-line fade-up" />

          {/* Paragraph 2 — glassmorphism card */}
          <div className="story-glass fade-up">
            <p>
              Unlike "cookie-cutter" agencies, we provide tailored, turn-key solutions designed specifically
              for international companies entering the US. We understand the nuances of the American consumer
              and have the tactical expertise to make your product a market leader.
              Our cross-industry experience — spanning healthcare, real estate, technology, and professional
              services — means we bring proven frameworks and fresh perspectives to every engagement. We don't
              just hand you a report; we stay in the boat with you until you reach shore.
            </p>
          </div>

        </div>

        {/* ── ANIMATED STATS BAND ── */}
        <div className="ad-stats-band">
          <div className="ad-sb-blob ad-sb-blob-1" />
          <div className="ad-sb-blob ad-sb-blob-2" />
          <div className="ad-sb-blob ad-sb-blob-3" />

          <div className="ad-sb-inner">
            <div className="ad-sb-header">
              <p className="ad-sb-eyebrow">Our Impact in Numbers</p>
              <h2 className="ad-sb-title">
                Trusted by businesses{" "}
                <span className="ad-sb-gradient">across the globe</span>
              </h2>
            </div>

            <div className="ad-sb-grid">
              {statsData.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>

        {/* What Sets Us Apart */}
        <div style={{ marginBottom: 40, marginTop: 60 }}>
          <h2 className="detail-section-title fade-up">What Sets Us Apart</h2>
          <div className="gold-line fade-up" />
          <div className="detail-features">
            {[
              {
                icon: <ChartBarIcon />, title: "Data-Driven Strategy",
                desc: "Every decision we make is backed by research, analytics, and real market intelligence — not gut feelings.",
                points: ["Audience segmentation & persona research", "Competitor gap analysis", "Monthly performance reporting"],
              },
              {
                icon: <RocketIcon />, title: "Fast Business Growth",
                desc: "We move quickly and iterate faster. Our agile delivery model means campaigns go live in days, not months.",
                points: ["Rapid campaign prototyping", "A/B testing at scale", "Weekly growth reviews"],
              },
              {
                icon: <TargetIcon />, title: "Targeted Marketing",
                desc: "We put your message in front of the right people at the right time, cutting waste and maximising impact.",
                points: ["Precision paid media targeting", "SEO & content strategy", "Conversion rate optimisation"],
              },
              {
                icon: <LightbulbIcon />, title: "Creative Solutions",
                desc: "Our in-house creative team produces work that stops thumbs mid-scroll and makes your brand unforgettable.",
                points: ["Brand identity & visual design", "Video & motion graphics", "Copywriting & storytelling"],
              },
            ].map((f) => (
              <div className="detail-feature-card fade-up" key={f.title}>
                <div className="big-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul>{f.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process */}
        <div style={{ marginBottom: 60 }}>
          <h2 className="detail-section-title fade-up">Our Process</h2>
          <div className="gold-line fade-up" />
          <div className="process-steps">
            {[
              { title: "Discovery & Audit",  desc: "We deep-dive into your business, competitors, and market to uncover opportunities others miss." },
              { title: "Strategy & Roadmap", desc: "We build a custom growth plan with clear goals, channels, timelines, and KPIs tailored to your objectives." },
              { title: "Creative Execution", desc: "Our team produces compelling campaigns across every channel — search, social, email, and beyond." },
              { title: "Launch & Optimise",  desc: "We go live, monitor performance in real time, and continuously refine to improve results every week." },
              { title: "Report & Scale",     desc: "Transparent reporting keeps you informed, while proven tactics get scaled for compounding growth." },
            ].map((step, i) => (
              <div className={`process-step ${i % 2 === 0 ? "fade-left" : "fade-right"}`} key={step.title}>
                <div className="step-num">0{i + 1}</div>
                <div className="step-content">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="detail-cta fade-up">
          <h2>Ready to Grow Your Business?</h2>
          <p>
            Let's build a strategy designed around your goals. Book a free
            30-minute discovery call with our team today.
          </p>
             <button
      className="cta-btn"
      onClick={() => navigate("/demo")}
    >
      Book a Free Strategy Call →
    </button>
        </div>

      </div>
    </section>
  );
}

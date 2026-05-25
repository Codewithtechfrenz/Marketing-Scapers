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
   Stats data
───────────────────────────────────────── */
const statsData = [
  { emoji: "🌍", value: "200+", label: "Clients Worldwide",    bar: 80, color: "#6366f1" },
  { emoji: "✈️",  value: "18",   label: "Countries Served",     bar: 72, color: "#8b5cf6" },
  { emoji: "🤝", value: "94%",  label: "Client Retention Rate", bar: 94, color: "#06b6d4" },
  { emoji: "📈", value: "3.8",  label: "Average ROI Delivered", bar: 76, color: "#10b981" },
];

/* ─────────────────────────────────────────
   Single stat card
───────────────────────────────────────── */
function StatCard({ emoji, value, label, bar, color, delay }) {
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
      <span className="ad-sstat-emoji">{emoji}</span>
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

      <div className="detail-hero">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" alt="Agency" />
        <div className="detail-hero-content">
          <span className="detail-badge fade-up">Established 2015 · Award Winning</span>
          <h1 className="fade-up">We Build Brands That Mean Business</h1>
          <p className="fade-up">
            A full-service digital marketing agency turning bold ideas into
            measurable growth for ambitious companies worldwide.
          </p>
        </div>
      </div>

      <div className="detail-body">

        {/* Our Story */}
        <div style={{ marginBottom: 40 }}>
          <h2 className="detail-section-title fade-up">Our Story</h2>
          <div className="gold-line fade-up" />
          <div className="detail-intro fade-up">
            <p>
              Founded in 2015, our agency started with a single belief: that
              marketing should be honest, measurable, and relentlessly focused
              on business outcomes. We have since grown into a 60-person team
              of strategists, creatives, and technologists serving over 200
              clients across 18 countries.
            </p>
            <p>
              We don't chase vanity metrics. Every campaign we build is rooted
              in data, sharpened by creativity, and obsessed with the numbers
              that actually move your business forward — leads, conversions,
              and revenue. That philosophy has made us one of the
              fastest-growing independent agencies in the region.
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
                icon: "📊", title: "Data-Driven Strategy",
                desc: "Every decision we make is backed by research, analytics, and real market intelligence — not gut feelings.",
                points: ["Audience segmentation & persona research", "Competitor gap analysis", "Monthly performance reporting"],
              },
              {
                icon: "🚀", title: "Fast Business Growth",
                desc: "We move quickly and iterate faster. Our agile delivery model means campaigns go live in days, not months.",
                points: ["Rapid campaign prototyping", "A/B testing at scale", "Weekly growth reviews"],
              },
              {
                icon: "🎯", title: "Targeted Marketing",
                desc: "We put your message in front of the right people at the right time, cutting waste and maximising impact.",
                points: ["Precision paid media targeting", "SEO & content strategy", "Conversion rate optimisation"],
              },
              {
                icon: "💡", title: "Creative Solutions",
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

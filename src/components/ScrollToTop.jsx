import { useState, useEffect } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY    = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct        = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      setVisible(scrollY > 300);
      setProgress(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // SVG circle progress ring
  const radius      = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDash  = circumference - (progress / 100) * circumference;

  return (
    <button
      className={`stt-btn ${visible ? "stt-btn--visible" : ""}`}
      onClick={scrollUp}
      aria-label="Scroll to top"
      title="Back to top"
    >
      {/* Progress ring */}
      <svg className="stt-ring" viewBox="0 0 48 48" aria-hidden="true">
        {/* Track */}
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="3"
        />
        {/* Progress */}
        <circle
          cx="24" cy="24" r={radius}
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDash}
          transform="rotate(-90 24 24)"
          style={{ transition: "stroke-dashoffset 0.2s ease" }}
        />
      </svg>

      {/* Arrow icon */}
      <svg className="stt-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

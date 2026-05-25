import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../api.js";
import "./Demo.css";

/* ── SVG ICONS ── */
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const UserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
  </svg>
);
const PhoneIconSvg = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.57 1 1 0 01-.25 1z"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);
const NoteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M7 12.5l3.5 3.5 6.5-7"/>
  </svg>
);

/* ── CONFETTI ── */
const CONFETTI_COLORS = ["#6c63ff","#ff6b9d","#3effa0","#ffb347","#22eaff","#ffffff"];
function Confetti({ active }) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces  = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      w: Math.random() * 11 + 5,
      h: Math.random() * 6 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rot: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 3.5,
      vy: Math.random() * 4 + 2,
      vr: (Math.random() - 0.5) * 0.14,
      opacity: 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      pieces.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        if (p.y > canvas.height * 0.65) p.opacity -= 0.025;
        if (p.opacity > 0) alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      if (alive) rafRef.current = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);
  return (
    <canvas ref={canvasRef} style={{
      position:"fixed", inset:0, pointerEvents:"none",
      zIndex:9999, display: active ? "block" : "none",
    }}/>
  );
}

const FIELDS = [
  { label:"Full Name",     name:"name",    type:"text",  icon:<UserIcon /> },
  { label:"Email Address", name:"email",   type:"email", icon:<MailIcon /> },
  { label:"Phone Number",  name:"phone",   type:"tel",   icon:<PhoneIconSvg /> },
  { label:"Company",       name:"company", type:"text",  icon:<BuildingIcon /> },
];

export default function BookingDemo() {
  const [date,      setDate]      = useState(null);
  const [time,      setTime]      = useState("");
  const [timezone,  setTimezone]  = useState("IST");
  const [lockDate,  setLockDate]  = useState(false);
  const [lockTime,  setLockTime]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confetti,  setConfetti]  = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [form, setForm] = useState({ name:"", phone:"", email:"", company:"", notes:"" });

  /* auto-reset after success */
  useEffect(() => {
    if (!submitted) return;
    setConfetti(true);
    const stopConfetti = setTimeout(() => setConfetti(false), 3500);
    let secs = 4;
    setCountdown(secs);
    const tick = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(tick);
        setSubmitted(false);
        setDate(null); setTime("");
        setLockDate(false); setLockTime(false);
        setForm({ name:"", phone:"", email:"", company:"", notes:"" });
      }
    }, 1000);
    return () => { clearTimeout(stopConfetti); clearInterval(tick); };
  }, [submitted]);

  // IST slots (base)
  const istTimes = [
    "9:00 AM","10:00 AM","11:00 AM",
    "12:00 PM","1:00 PM","2:00 PM",
    "3:00 PM","4:00 PM","5:00 PM"
  ];

  // IST is UTC+5:30, EST is UTC-5:00 → difference is 10h 30m
  // EST = IST - 10h 30m
  const toEST = (istTime) => {
    const [timePart, meridiem] = istTime.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    // subtract 10h 30m
    let totalMinutes = hours * 60 + minutes - (10 * 60 + 30);
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    const h = Math.floor(totalMinutes / 60) % 24;
    const m = totalMinutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  // displayed times based on selected timezone
  const displayTimes = istTimes.map((t) =>
    timezone === "EST" ? toEST(t) : t
  );

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // converts "10:00 AM" → "10:00:00"
  const toTime24 = (t) => {
    const [timePart, meridiem] = t.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };

  // always send IST time to API regardless of display timezone
  const getISTTime = () => {
    const idx = displayTimes.indexOf(time);
    return idx !== -1 ? istTimes[idx] : time;
  };

  const handleConfirm = async () => {
    // Validate all required fields
    if (!form.name || !form.email || !form.phone || !form.company) {
      setError("Please fill in all required fields: Full Name, Email Address, Phone Number, and Company.");
      return;
    }
    if (!date) {
      setError("Please select a date for your demo.");
      return;
    }
    if (!time) {
      setError("Please select a time slot for your demo.");
      return;
    }

    setLoading(true);
    setError("");

    const payload = {
      booking_date: date.toISOString().split("T")[0],
      booking_time: toTime24(getISTTime()),
      full_name: form.name,
      email: form.email,
      phone_no: form.phone,
      company: form.company,
      notes: form.notes,
    };

    console.log("📤 Booking payload:", payload);

    try {
      const response = await api.post("/booking/demoBooking", payload);
      console.log("✅ Booking response:", response.data);
      setSubmitted(true);
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const currentStep = !lockDate ? 1 : !lockTime ? 2 : 3;

  return (
    <div className="page-wrapper">
      <Confetti active={confetti} />
      {/* Animated background orbs */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      <div className="page-inner">
        {/* HEADER */}
        <div className="page-header">
          <div className="badge-pill">✦ Live Demo</div>
          <h1 className="page-title">
            Book Hear<br />
          </h1>
          <p className="page-desc">
            Discover how our platform transforms the way you work.
            <br />Pick a slot and we'll walk you through everything.
          </p>
        </div>

        {/* STEP TRACKER */}
        <div className="stepper">
          {[
            { n: 1, label: "Pick Date" },
            { n: 2, label: "Pick Time" },
            { n: 3, label: "Your Info" },
          ].map(({ n, label }, i) => (
            <div key={n} className="stepper-item">
              <div className={`stepper-node ${currentStep >= n ? "done" : ""} ${currentStep === n ? "current" : ""}`}>
                {currentStep > n ? (
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : n}
              </div>
              <span className={`stepper-label ${currentStep >= n ? "active-label" : ""}`}>{label}</span>
              {i < 2 && <div className={`stepper-track ${currentStep > n ? "filled" : ""}`} />}
            </div>
          ))}
        </div>

        {/* BOOKING CARD */}
        <div className="booking-card">

          {/* LEFT */}
          <div className="card-left">
            <div className="section-tag">
              <span className="dot" />
              Step {lockDate ? (lockTime ? "3" : "2") : "1"}
            </div>

            <h2 className="section-title">
              {!lockDate ? "Choose a date" : !lockTime ? "Choose a time" : "Your details"}
            </h2>

            <div className="calendar-wrap">
              <Calendar
                onChange={(val) => { setDate(val); setLockDate(true); }}
                value={date}
                minDate={new Date()}
                nextLabel="›"
                prevLabel="‹"
                next2Label={null}
                prev2Label={null}
                formatShortWeekday={(_, d) =>
                  ["Su","Mo","Tu","We","Th","Fr","Sa"][d.getDay()]
                }
              />
            </div>

            {date && (
              <div className="time-section">
                <div className="time-heading-row">
                  <p className="time-heading">Available slots</p>
                  <div className="tz-toggle">
                    <button
                      className={`tz-btn ${timezone === "IST" ? "tz-active" : ""}`}
                      onClick={() => { setTimezone("IST"); setTime(""); setLockTime(false); }}
                    >
                      🇮🇳 IST
                    </button>
                    <button
                      className={`tz-btn ${timezone === "EST" ? "tz-active" : ""}`}
                      onClick={() => { setTimezone("EST"); setTime(""); setLockTime(false); }}
                    >
                      🇺🇸 EST
                    </button>
                  </div>
                </div>
                <div className="time-grid">
                  {displayTimes.map((t, i) => (
                    <button
                      key={i}
                      className={`time-btn ${time === t ? "time-active" : ""}`}
                      onClick={() => { setTime(t); setLockTime(true); }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="card-right">
            {submitted ? (
              <div className="success-panel">
                <div className="success-check-icon">
                  <CheckCircleIcon />
                </div>
                <h3 className="success-title">You're booked!</h3>
                <p className="success-desc">We've confirmed your demo slot. See you soon!</p>
                <div className="success-summary">
                  <div className="sum-row">
                    <span className="sum-icon-svg"><CalendarIcon /></span>
                    <span>{date?.toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })}</span>
                  </div>
                  <div className="sum-row">
                    <span className="sum-icon-svg"><ClockIcon /></span>
                    <span>{time} {timezone}</span>
                  </div>
                </div>
                <div className="success-countdown">
                  Returning in <strong>{countdown}s</strong>…
                </div>
              </div>
            ) : (
              <div className="form-panel">
                <div className="summary-strip">
                  <div className="sum-pill">
                    <CalendarIcon />
                    {date
                      ? date.toLocaleDateString("en-US", { month:"short", day:"2-digit", year:"numeric" })
                      : <span className="sum-placeholder">No date selected</span>
                    }
                  </div>
                  <div className="sum-pill">
                    <ClockIcon />
                    {time
                      ? `${time} ${timezone}`
                      : <span className="sum-placeholder">No time selected</span>
                    }
                  </div>
                </div>

                <h3 className="form-title">Your Details</h3>

                {/* Date & Time read-only fields */}
                <div className="form-cols">
                  <div className="field-group">
                    <label className="field-label"><CalendarIcon /> Booking Date <span className="req">*</span></label>
                    <input
                      className={`field-input field-readonly ${!date ? "field-empty" : ""}`}
                      type="text"
                      readOnly
                      value={date ? date.toLocaleDateString("en-US", { weekday:"short", month:"long", day:"numeric", year:"numeric" }) : ""}
                      placeholder="Select a date on the left"
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label"><ClockIcon /> Booking Time <span className="req">*</span></label>
                    <input
                      className={`field-input field-readonly ${!time ? "field-empty" : ""}`}
                      type="text"
                      readOnly
                      value={time ? `${time} ${timezone}` : ""}
                      placeholder="Select a time on the left"
                    />
                  </div>
                </div>

                <div className="form-cols">
                  {FIELDS.map(({ label, name, type, icon }) => (
                    <div key={name} className="field-group">
                      <label className="field-label">{icon} {label} <span className="req">*</span></label>
                      <input
                        className="field-input"
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>

                <div className="field-group full-field">
                  <label className="field-label"><NoteIcon /> Notes</label>
                  <textarea
                    className="field-textarea"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Tell us what you'd like to explore in the demo…"
                  />
                </div>

                <button
                  className="confirm-btn"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  <span>{loading ? "Booking..." : "Confirm Booking"}</span>
                  <svg viewBox="0 0 20 20" fill="none" width="18"><path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                {error && <p className="form-error">{error}</p>}

                <p className="form-note"><LockIcon /> Your information is kept private and never shared.</p>
              </div>
            )}
          </div>

        </div>

        <p className="tz-note">All times shown in {timezone === "IST" ? "Indian Standard Time (IST)" : "Eastern Standard Time (EST)"}. Need a different time? <a href="#contact">Contact us directly →</a></p>
      </div>
    </div>
  );
}

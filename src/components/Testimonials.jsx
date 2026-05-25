import { useState, useEffect } from "react";
import api from "../api.js";
import "./Testimonials.css";

const initialTestimonials = [
  {
    name: "David Kim",
    role: "Product Manager, Stackly",
    initials: "DK",
    text: "Incredible attention to detail. They understood our brand perfectly and turned our vision into reality faster than we thought possible.",
    featured: true,
    rating: 5,
  },
  {
    name: "Laura Mendes",
    role: "CTO, Flowbase",
    initials: "LM",
    text: "The team is responsive, talented and truly cares about the outcome. Our new platform has received amazing feedback from our users.",
    featured: false,
    rating: 5,
  },
  {
    name: "Tom Nguyen",
    role: "Director, CloudPeak",
    initials: "TN",
    text: "Best investment we've made for our business. The ROI was visible within weeks and the team was a joy to work with throughout.",
    featured: false,
    rating: 5,
  },
];

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function StarRatingPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-picker-wrap">
      <div className="star-picker">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn${star <= (hovered || value) ? " active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="star-label">
        {STAR_LABELS[hovered || value] || "Select a rating"}
      </span>
    </div>
  );
}

function renderStars(rating) {
  return (
    <span className="star-row">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= rating ? 1 : 0.25 }}>★</span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", text: "", rating: 0 });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const cards = document.querySelectorAll(".testi-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [testimonials]);

  const getInitials = (name) =>
    name.trim().split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.text.trim()) e.text = "Review is required";
    if (!form.rating) e.rating = "Please select a star rating";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRating = (val) => {
    setForm({ ...form, rating: val });
    setErrors({ ...errors, rating: "" });
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    setLoading(true);
    setApiError("");

    const payload = {
      full_name: form.name.trim(),
      company: form.company.trim(),
      star_rating: form.rating,
      your_review: form.text.trim(),
    };

    console.log("📤 Review payload:", payload);

    try {
      const response = await api.post("/review/reviews", payload);
      console.log("✅ Review response:", response.data);

      // add to local list on success
      setTestimonials([
        ...testimonials,
        {
          name: form.name.trim(),
          role: form.company.trim(),
          initials: getInitials(form.name),
          text: form.text.trim(),
          featured: false,
          rating: form.rating,
        },
      ]);
      setForm({ name: "", company: "", text: "", rating: 0 });
      setErrors({});
      setShowModal(false);
    } catch (err) {
      console.error("❌ Review error:", err.response?.data || err.message);
      setApiError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOverlay = (e) => {
    if (e.target.classList.contains("modal-overlay")) setShowModal(false);
  };

  return (
    <section className="testi-section" id="testimonials">

      {/* HEADER */}
      <div className="testi-header">
        <div className="testi-left-head">
          <p className="testi-eyebrow">Client voices</p>
          <h2>What our clients<br /><em>truly</em> say</h2>
        </div>
        <div className="testi-right-head">
          <p className="testi-sub">
            Trusted by hundreds of teams. Real stories, real results.
          </p>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            <span>+</span> Share your story
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="testi-grid">
        {testimonials.map((t, i) => (
          <div className={`testi-card${t.featured ? " featured" : ""}`} key={i}>
            <div className="card-tag">
              {renderStars(t.rating)}
              <span className="card-num">0{i + 1}</span>
            </div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="avatar">{t.initials}</div>
              <div className="author-info">
                <h5>{t.name}</h5>
                <p>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={handleOverlay}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            <p className="modal-eyebrow">Your experience</p>
            <h3>Share your<br />review</h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Johnson"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Acme Technologies"
              />
              {errors.company && <span className="error">{errors.company}</span>}
            </div>

            {/* STAR RATING */}
            <div className="form-group">
              <label>Star Rating</label>
              <StarRatingPicker value={form.rating} onChange={handleRating} />
              {errors.rating && <span className="error">{errors.rating}</span>}
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Share your experience working with us..."
                rows={4}
              />
              {errors.text && <span className="error">{errors.text}</span>}
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Add Review →"}
              </button>
            </div>

            {apiError && <p className="error" style={{ textAlign: "center", marginTop: "8px" }}>{apiError}</p>}
          </div>
        </div>
      )}
    </section>
  );
}
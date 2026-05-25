import { useState } from "react";
import api from "../api.js";
import "./Contact.css";

const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.6 10.8a15.2 15.2 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.57 1 1 0 01-.25 1z" />
  </svg>
);

const contactInfo = [
  {
    icon: <EmailIcon />,
    title: "Email",
    detail: "hello@example.com",
  },
  {
    icon: <PhoneIcon />,
    title: "Phone",
    detail: "+91 98765 43210",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      description: form.message,
    };

    console.log("📤 Sending payload:", payload);

    try {
      const response = await api.post("/message/messages", payload);

      console.log("✅ API Response:", response.data);

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });

      // auto close popup after 8s
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      console.error("❌ API Error:", err);
      console.error("❌ Error Response:", err.response?.data);
      console.error("❌ Status:", err.response?.status);

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-hero" id="contact">
      {/* BACKGROUND BLUR */}
      <div className="bg-blur bg1"></div>
      <div className="bg-blur bg2"></div>

      {/* SUCCESS POPUP */}
      {submitted && (
        <div className="popup-overlay">
          <div className="success-popup">
            <div className="popup-icon">✅</div>
            <h2>Message Sent!</h2>
            <p>
              Thank you for contacting us.
              <br />
              We will get back to you soon.
            </p>

            <button onClick={() => setSubmitted(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="contact-wrapper">
        {/* LEFT SIDE */}
        <div className="contact-left">
          <h1>
            Let’s Build Something <span>Amazing</span>
          </h1>

          <p>
            Have an idea? We transform your thoughts into powerful digital
            experiences.
          </p>

          <div className="info-cards">
            {contactInfo.map((item, i) => (
              <div className="info-card" key={i}>
                <div className="icon">{item.icon}</div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">
          <form onSubmit={handleSubmit} className="glass-form">
            <h2>Send Message</h2>

            <div className="row">
              <input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message 🚀"}
            </button>

            {error && <p className="form-error">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
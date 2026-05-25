import { useState } from "react";
import "./FAQ.css";
import { Link } from "react-router-dom";
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide web development, UI/UX design, and custom software solutions tailored to your needs."
    },
    {
      question: "How can I book a demo?",
      answer:
        "You can book a demo through our contact page by selecting a convenient date and time."
    },
    {
      question: "Do you offer custom development?",
      answer:
        "Yes, we build fully customized solutions based on your business requirements."
    },
    {
      question: "What is your pricing model?",
      answer:
        "Pricing depends on project scope, features, and timeline. Contact us for a quote."
    }
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <h3>{item.question}</h3>

              {/* Toggle Icon */}
             
    <span>{activeIndex === index ? "-" : "+"}</span>
            </div>

            {/* Answer */}
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔥 CTA BOX */}
      <div className="faq-cta">
        <h3>Still have questions?</h3>
        <p>Our team is here to help. Reach out anytime!</p>
       <Link to="/contact" className="faq-btn">
    Contact Us
  </Link>
      </div>
    </section>
  );
}










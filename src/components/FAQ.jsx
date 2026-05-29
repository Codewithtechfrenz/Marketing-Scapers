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
      question: "What is Market Analysis and why does my business need it?",
      answer:
        "Market Analysis is the process of evaluating your industry landscape, target audience, competitors, and growth opportunities. It gives your business a data-driven foundation to make smarter decisions, reduce risk, and identify untapped revenue streams before investing resources."
    },
    {
      question: "How do you conduct a competitive market analysis?",
      answer:
        "We use a combination of primary research (surveys, interviews) and secondary research (industry reports, competitor audits, SEO data) to map out your competitive landscape. We analyze competitor positioning, pricing, strengths, weaknesses, and market share to help you find your winning edge."
    },
    {
      question: "What does your Business Development service include?",
      answer:
        "Our Business Development service covers lead generation strategy, partnership identification, market entry planning, sales funnel optimization, and revenue growth consulting. We work alongside your team to build scalable pipelines and open new channels for sustainable growth."
    },
    {
      question: "How long does a market analysis project typically take?",
      answer:
        "A standard market analysis engagement takes 2–4 weeks depending on the scope, industry complexity, and depth of research required. We deliver a comprehensive report with actionable insights, visual data breakdowns, and a strategic roadmap tailored to your goals."
    },
    {
      question: "Can you help us enter a new market or industry vertical?",
      answer:
        "Absolutely. We specialize in market entry strategy — from validating demand and sizing the opportunity to identifying the right customer segments, pricing models, and go-to-market approach. We've helped businesses successfully expand into healthcare, real estate, SaaS, and more."
    },
    {
      question: "How do your insights translate into real business growth?",
      answer:
        "Every analysis we deliver is tied to actionable recommendations — not just data. We prioritize opportunities by ROI potential, align them with your current capabilities, and provide a clear execution roadmap so your team knows exactly what to do next to drive measurable growth."
    },
    {
      question: "Do you offer ongoing market monitoring after the initial analysis?",
      answer:
        "Yes. Markets shift constantly, and staying ahead requires continuous intelligence. We offer monthly or quarterly market monitoring retainers that track competitor moves, industry trends, emerging customer needs, and regulatory changes — keeping your strategy always current."
    },
    {
      question: "What industries do you specialize in for business development?",
      answer:
        "We have deep expertise across healthcare, real estate, digital marketing, technology, and professional services. Our cross-industry experience allows us to bring proven frameworks and fresh perspectives that drive results regardless of your sector."
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










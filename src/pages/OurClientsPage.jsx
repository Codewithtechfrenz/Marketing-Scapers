import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import alchemiLogo from "../assets/images/Alchemistudion.png";
import kairosLogo from "../assets/images/kairosfs logo.png";
import "./OurClientsPage.css";

/* ── SVG Icon Components ── */
const icons = {
  Robot: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="5" y="9" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 9V6M9 6a3 3 0 016 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 13h3M19 13h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 7 22 7 22 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ── Client Data ── */
const clientsData = [
  {
    slug: "alchemi-ai",
    name: "Alchemi AI",
    industry: "Artificial Intelligence",
    img: alchemiLogo,
    icon: <icons.Robot />,
    tagline: "Transforming businesses with cutting-edge AI solutions and intelligent automation.",
    highlights: [
      "AI-powered workflow automation",
      "Custom machine learning models",
      "Intelligent data analytics platform",
      "Seamless enterprise integration",
    ],
    detail: {
      overview:
        "Alchemi AI partnered with MarketingScapers to amplify their market presence in the USA. We built a comprehensive digital marketing strategy, optimized their online visibility, and deployed targeted campaigns that positioned Alchemi AI as a leading force in the enterprise AI space.",
      stats: [
        { value: "3×", label: "Lead Growth" },
        { value: "85%", label: "Brand Awareness Up" },
        { value: "60 days", label: "To See Results" },
      ],
      achievements: [
        "Full digital presence established in the US market",
        "SEO strategy ranked key AI-related keywords on page 1",
        "Google Ads campaign launched with strong ROAS",
        "Social media following grew by 200% in 3 months",
      ],
    },
  },
  {
    slug: "kairosfs",
    name: "KairosFS",
    industry: "Financial Services",
    img: kairosLogo,
    icon: <icons.TrendUp />,
    tagline: "Empowering financial growth with smart technology and data-driven strategies.",
    highlights: [
      "Fintech platform marketing strategy",
      "Targeted investor outreach campaigns",
      "Brand positioning in US financial market",
      "Compliance-aware digital marketing",
    ],
    detail: {
      overview:
        "KairosFS engaged MarketingScapers to establish and grow their brand in the competitive US financial services market. We crafted a compliance-aware marketing strategy, built their digital infrastructure, and executed targeted campaigns that connected them with the right investors and clients.",
      stats: [
        { value: "4×", label: "Qualified Leads" },
        { value: "92%", label: "Campaign ROI" },
        { value: "90 days", label: "Market Entry" },
      ],
      achievements: [
        "US market entry strategy successfully executed",
        "Investor-focused content marketing launched",
        "LinkedIn presence built with 1,500+ targeted connections",
        "Brand identity refined for US financial audience",
      ],
    },
  },
];

export default function OurClients() {
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".client-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;

          if (card.classList.contains("client-card--open")) {
            card.classList.add("show");
            return;
          }

          if (entry.isIntersecting) {
            card.classList.add("show");
          } else {
            card.classList.remove("show");
          }
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => {
      observer.observe(card);
      if (card.classList.contains("client-card--open")) {
        card.classList.add("show");
      }
    });

    return () => observer.disconnect();
  }, [activeCard]);

  const toggleCard = (slug) => {
    setActiveCard((prev) => (prev === slug ? null : slug));
  };

  return (
    <section
      className="clients-section"
      id="our-clients"
      aria-label="Our Clients"
    >
      {/* ── HEADER ── */}
      <div className="clients-header">
        {/* <span className="clients-eyebrow">Who We Serve</span>
        <h1 className="clients-title">
           Our{" "}
          <span className="clients-title-accent">Clients</span>
        </h1> */}
        <p className="clients-subtitle">
          From healthcare providers to real estate firms and digital agencies — here's how we've helped our clients achieve extraordinary results.
        </p>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="clients-grid" role="list">
        {clientsData.map((client) => {
          const isOpen = activeCard === client.slug;
          return (
            <article
              key={client.slug}
              className={`client-card ${isOpen ? "client-card--open" : ""}`}
              role="listitem"
              aria-expanded={isOpen}
              onClick={() => toggleCard(client.slug)}
              itemScope
              itemType="https://schema.org/Organization"
            >
              {/* Image */}
              <div className="client-img-wrap">
                <img
                  src={client.img}
                  alt={`${client.name} logo`}
                  className={`client-img ${client.isLogo ? "client-img--logo" : ""}`}
                  loading="lazy"
                  itemProp="image"
                />
                <span className="client-industry-badge">{client.industry}</span>
                <span className="client-icon" aria-hidden="true">
                  {client.icon}
                </span>
              </div>

              {/* Body */}
              <div className="client-body">
                <h2 className="client-name" itemProp="name">
                  {client.name}
                </h2>
                <p className="client-tagline" itemProp="description">
                  {client.tagline}
                </p>

                <ul className="client-highlights" aria-label={`${client.name} highlights`}>
                  {client.highlights.map((h, i) => (
                    <li key={i} className="client-highlight-item">
                      <span className="client-check" aria-hidden="true">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* ── EXPANDED DETAIL PANEL ── */}
                <div
                  className="client-detail"
                  aria-hidden={!isOpen}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="client-detail-inner">
                    <p className="client-overview">{client.detail.overview}</p>

                    {/* Stats */}
                    <div className="client-stats" role="list">
                      {client.detail.stats.map((s, i) => (
                        <div key={i} className="client-stat" role="listitem">
                          <span className="client-stat-value">{s.value}</span>
                          <span className="client-stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <ul className="client-achievements" aria-label="Key achievements">
                      {client.detail.achievements.map((a, i) => (
                        <li key={i} className="client-achievement-item">
                          <span aria-hidden="true">◈</span> {a}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/clients/${client.slug}`}
                      className="client-case-btn"
                      aria-label={`View case study for ${client.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Case Study <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                {/* Toggle hint */}
                <button
                  className="client-toggle-btn"
                  aria-label={isOpen ? "Show less" : "Show details"}
                >
                  {isOpen ? "▲ Show less" : "▼ View details"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

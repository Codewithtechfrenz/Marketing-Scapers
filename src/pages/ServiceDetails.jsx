import { useState, useEffect, useCallback, useRef } from "react";
import "./ServiceDetails.css";
import { Link } from "react-router-dom";
import healthcareImg from "../assets/images/healthcare.jpg";
import realestates from "../assets/images/realestates.jpg";
import scheduleImg from "../assets/images/schedule1.jpg";
import digitalmarketingImg from "../assets/images/digitalmarketing.jpg";
import socialmediaImg from "../assets/images/socialmedia.jpg";
import googleads from "../assets/images/googleads.jpg";
import web from "../assets/images/websitedevelopment.jpg";
import googlebusiness from "../assets/images/googlebusiness.jpg";
import medical from "../assets/images/medical.jpg"
/* ══════════════════════════════════════════
   Icons — consistent stroke-width 2.2, single blue color
   ══════════════════════════════════════════ */
const Icons = {
  WebDev: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="2" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="5" cy="5" r="0.8" fill="currentColor" />
      <circle cx="8" cy="5" r="0.8" fill="currentColor" />
      <path d="M9 12l-2.5 2.5L9 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12l2.5 2.5L15 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="11" x2="12" y2="16.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="8.5" y="17" width="7" height="2" rx="1" stroke="currentColor" strokeWidth="2" />
      <line x1="6" y1="19" x2="18" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  SEO: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="2" y="15" width="3.5" height="7" rx="1" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="7" y="11" width="3.5" height="11" rx="1" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="12" y="7" width="3.5" height="15" rx="1" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="17" y="3" width="3.5" height="19" rx="1" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="7" cy="7" r="3.5" stroke="currentColor" strokeWidth="2.2" />
      <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7" y1="5" x2="7" y2="9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="5" y1="7" x2="9" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  GoogleAds: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="10" cy="10" r="4.5" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="13.5" y1="13.5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14.5 19l3-1-1-3 5-3.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  SocialMedia: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="3.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="4.5" cy="18.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="19.5" cy="18.5" r="2.2" stroke="currentColor" strokeWidth="2.2" />
      <line x1="12" y1="5.7" x2="12" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6.4" y1="16.8" x2="9.8" y2="14.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17.6" y1="16.8" x2="14.2" y2="14.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="1.5" y="5" width="21" height="14" rx="3.5" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
      <path d="M10.5 10.3l4.5 1.7-4.5 1.7z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  GBL: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 2C8.41 2 5.5 4.91 5.5 8.5c0 5.25 6.5 13.5 6.5 13.5s6.5-8.25 6.5-13.5C18.5 4.91 15.59 2 12 2z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="12" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Healthcare: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 2C8.5 2 5.5 4.5 5.5 7.5c0 2 1 4 2.5 5.5L12 22l4-9c1.5-1.5 2.5-3.5 2.5-5.5C18.5 4.5 15.5 2 12 2z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="12" y1="5" x2="12" y2="10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="9.5" y1="7.5" x2="14.5" y2="7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  RealEstate: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="9" y="13" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M9 9h2M13 9h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Fax: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="4" y="8" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <rect x="8" y="3" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="12" r="1.2" fill="currentColor" />
    </svg>
  ),
  DocAssist: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="2" />
      <line x1="17.8" y1="17.8" x2="20" y2="20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  Scheduler: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2.2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="2" />
      <line x1="12" y1="13.5" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="15" x2="13.2" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  DigitalMarketing: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M3 8.5L20 3v18L3 15.5V8.5z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <line x1="3" y1="8.5" x2="3" y2="15.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M3 12H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 15.8l-1 4a1 1 0 001.9.6l1-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="9" x2="8" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

function ServiceIcon({ name, className = "", style = {} }) {
  const IconComp = Icons[name];
  if (!IconComp) return null;
  return (
    <span className={`svc-svg-icon ${className}`} style={style} aria-hidden="true">
      <IconComp />
    </span>
  );
}

/* ══════════════════════════════════════════
   Services Data — consistent accentColor #2563EB for all
   ══════════════════════════════════════════ */
const ACCENT = "#2563EB";
const ACCENT_LIGHT = "#EFF6FF";

const services = [
{
  title: "ALchemi AI",
  slug: "alchemi-ai",
  icon: "Healthcare",
  img: healthcareImg,
  tagline:
    "Next-generation AI innovation platform empowering businesses with intelligent automation and smart digital transformation.",
  accentColor: ACCENT,
  accentLight: ACCENT_LIGHT,

  points: [
    "Custom AI-powered business solutions",
    "Advanced automation systems",
    "Real-time intelligent analytics",
    "Scalable AI integration services"
  ],

  details: {
    description:
      "ALchemi AI delivers powerful artificial intelligence solutions designed to help businesses automate operations, improve decision-making, and unlock data-driven growth. Our intelligent systems combine cutting-edge AI models, automation, and scalable infrastructure to create future-ready digital experiences.",

    highlights: [
      {
        icon: "🤖",
        label: "AI Automation",
        desc: "Automate repetitive workflows with intelligent AI systems."
      },
      {
        icon: "📈",
        label: "Smart Analytics",
        desc: "Transform business data into actionable insights in real time."
      },
      {
        icon: "⚡",
        label: "Scalable Solutions",
        desc: "Enterprise-grade AI solutions built for performance and growth."
      },
      {
        icon: "🔗",
        label: "System Integration",
        desc: "Seamlessly integrate AI into existing business platforms."
      }
    ],

    stats: [
      { value: "85%", label: "Process Automation" },
      { value: "99.9%", label: "System Reliability" },
      { value: "24/7", label: "AI Monitoring" },
      { value: "100+", label: "Projects Delivered" }
    ],

    process: [
      "Requirement Analysis",
      "AI Strategy Planning",
      "Development & Training",
      "System Integration",
      "Deployment & Support"
    ],

    testimonial: {
      text:
        "ALchemi AI transformed our workflow efficiency and helped us scale operations faster than ever.",
      author: "Karthik S., Tech Solutions"
    },

    team: [
      {
        name: "Aarav K.",
        role: "AI Solutions Architect",
        img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"
      },
      {
        name: "Meera V.",
        role: "Machine Learning Engineer",
        img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80"
      }
    ]
  }
},


{
    title: "Lisa - AI Real Estate Assistant",
    slug: "lisa-ai-real-estate",
    icon: "RealEstate",
    img: realestates,
    tagline: "AI-powered tool empowering real estate salesmen to close deals faster.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Automated lead qualification", "Smart property matching", "Client communication automation", "Market trend analysis"],
    details: {
      description: "Lisa is an intelligent real estate assistant that helps agents qualify leads faster, match buyers to the right properties, and automate follow-up communications — so they can focus on closing, not chasing.",
      highlights: [
        { icon: "🏠", label: "Smart Matching", desc: "AI matches buyers to properties based on preferences." },
        { icon: "📞", label: "Auto Follow-up", desc: "Automated SMS/email sequences for lead nurture." },
        { icon: "📈", label: "Market Trends", desc: "Real-time area price trends and demand signals." },
        { icon: "🤝", label: "CRM Integration", desc: "Syncs with your existing CRM in minutes." },
      ],
      stats: [{ value: "3×", label: "Faster Closings" }, { value: "↓60%", label: "Lead Response Time" }, { value: "500+", label: "Agents Using Lisa" }, { value: "₹50Cr+", label: "Deals Facilitated" }],
      process: ["Onboarding", "CRM Sync", "Lead Import", "AI Training", "Live Mode"],
      testimonial: { text: "Lisa qualifies leads before I even pick up the phone. It's a game changer.", author: "Rajesh M., PropEdge Realty" },
      team: [
        { name: "Ananya P.", role: "Product Lead", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "AI Engineer", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },



  {
    title: "AI Scheduler for Providers Offices",
    slug: "ai-scheduler",
    icon: "Scheduler",
    img: scheduleImg,
    tagline: "Dynamic calendar and intelligent scheduling system for healthcare provider offices.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Smart appointment booking", "Automated reminders", "Resource optimization", "Multi-provider coordination"],
    details: {
      description: "Our AI Scheduler fills your calendar intelligently — matching patient needs with provider availability, automating reminders, and optimizing room and resource utilization across your entire practice.",
      highlights: [
        { icon: "🗓️", label: "Smart Booking", desc: "AI matches patient type to the right provider slot." },
        { icon: "📲", label: "Auto Reminders", desc: "SMS and email reminders cut no-shows by 40%." },
        { icon: "🏥", label: "Resource Mgmt", desc: "Rooms, equipment, and staff all coordinated." },
        { icon: "👥", label: "Multi-Provider", desc: "Handles complex multi-location, multi-provider setups." },
      ],
      stats: [{ value: "↓40%", label: "No-Show Rate" }, { value: "+25%", label: "Slot Utilization" }, { value: "24/7", label: "Online Booking" }, { value: "100+", label: "Clinics Deployed" }],
      process: ["Calendar Audit", "Setup & Config", "Staff Training", "Go-Live", "Ongoing Optimization"],
      testimonial: { text: "Our no-show rate dropped by half in the first month. Scheduling is effortless now.", author: "Dr. Priya N., MultiCare Clinic" },
      team: [
        { name: "Ananya P.", role: "Product Manager", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "Systems Lead", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },




{
    title: "Google Business Listing",
    slug: "google-business-listing",
    icon: "GBL",
    img: googlebusiness,
    tagline: "Own your local search presence. Get found on Google Maps.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Local business visibility", "Google Maps ranking", "Customer reviews setup", "Profile optimization", "Local SEO boost"],
    details: {
      description: "An optimized Google Business Profile is the single most cost-effective move for local businesses. We set it up, optimize every field, manage your reviews, and run local SEO to keep you at the top of Maps.",
      highlights: [
        { icon: "🗺️", label: "Maps Ranking", desc: "Dominate the local 3-pack for your service area." },
        { icon: "⭐", label: "Review Strategy", desc: "Automated review request flows and reputation mgmt." },
        { icon: "📸", label: "Photo Optimization", desc: "Professional photos and category-specific media." },
        { icon: "📢", label: "Google Posts", desc: "Weekly offers, events, and updates published for you." },
      ],
      stats: [{ value: "#1", label: "Local Pack Position" }, { value: "+200%", label: "Profile Views" }, { value: "4.8★", label: "Avg Review Score" }, { value: "3×", label: "More Calls" }],
      process: ["Profile Audit", "Optimization", "Review Setup", "Local Citations", "Monthly Updates"],
      testimonial: { text: "We now appear in the top 3 on Google Maps for all our target keywords!", author: "Suresh L., RestaurantChain" },
      team: [
        { name: "Ananya P.", role: "Local SEO Expert", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "Profile Manager", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },



  {
    title: "Fax Automation AI",
    slug: "fax-automation-ai",
    icon: "Fax",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    tagline: "Streamline medical fax processing with intelligent automation.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Automatic fax routing", "OCR document processing", "HIPAA-compliant storage", "Integration with EHR systems"],
    details: {
      description: "Our Fax Automation AI reads, classifies, and routes incoming medical faxes in seconds — eliminating manual sorting, reducing errors, and ensuring every document reaches the right destination automatically.",
      highlights: [
        { icon: "📄", label: "OCR Processing", desc: "Extracts text and data from any fax format." },
        { icon: "🔀", label: "Smart Routing", desc: "Auto-routes to the correct department or record." },
        { icon: "🔒", label: "HIPAA Secure", desc: "Encrypted storage and access controls built-in." },
        { icon: "🔗", label: "EHR Integration", desc: "Direct push to Epic, Cerner, and other EHRs." },
      ],
      stats: [{ value: "95%", label: "Routing Accuracy" }, { value: "↓80%", label: "Manual Work" }, { value: "HIPAA", label: "Compliant" }, { value: "2s", label: "Per Fax" }],
      process: ["Integration Setup", "OCR Training", "Routing Rules", "Testing", "Go-Live"],
      testimonial: { text: "We process 500 faxes a day with zero manual sorting. Incredible.", author: "Sandra L., MedCenter" },
      team: [
        { name: "Ananya P.", role: "Healthcare AI Lead", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "Integration Engineer", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },
  {
    title: "Doc Assist AI",
    slug: "doc-assist-ai",
    icon: "DocAssist",
    img: medical,
    tagline: "Your intelligent medical documentation assistant.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Clinical note generation", "Medical coding assistance", "Compliance checking", "Template management"],
    details: {
      description: "Doc Assist AI listens, transcribes, and structures clinical encounters into complete, compliant documentation — helping providers spend less time on paperwork and more time with patients.",
      highlights: [
        { icon: "🎙️", label: "Voice-to-Note", desc: "Real-time transcription of patient encounters." },
        { icon: "🏷️", label: "Medical Coding", desc: "Auto-suggests ICD-10 and CPT codes per visit." },
        { icon: "✅", label: "Compliance Check", desc: "Flags documentation gaps before submission." },
        { icon: "📁", label: "Templates", desc: "Specialty-specific templates for any practice type." },
      ],
      stats: [{ value: "↓70%", label: "Charting Time" }, { value: "99%", label: "Coding Accuracy" }, { value: "30+", label: "Specialties Supported" }, { value: "HIPAA", label: "Compliant" }],
      process: ["Setup & Config", "Template Training", "EHR Sync", "Provider Training", "Live Support"],
      testimonial: { text: "I saved 2 hours per day on documentation. My patients notice the difference.", author: "Dr. Meera K., Family Medicine" },
      team: [
        { name: "Ananya P.", role: "Clinical AI Lead", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "NLP Engineer", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },

  {
    title: "Digital Marketing Suite",
    slug: "digital-marketing-suite",
    icon: "DigitalMarketing",
    img: digitalmarketingImg,
    tagline: "Complete SEO, web building, and social media advertising solutions.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["SEO optimization", "Custom website builders", "Social media campaigns", "Analytics & reporting"],
    details: {
      description: "Our Digital Marketing Suite bundles everything a growing business needs — a high-performance website, top-ranking SEO, active social media management, and paid ad campaigns — into one seamless, results-driven package.",
      highlights: [
        { icon: "🌐", label: "Web + SEO", desc: "Site built and ranked simultaneously for faster ROI." },
        { icon: "📣", label: "Social Ads", desc: "Meta and Google ad campaigns managed together." },
        { icon: "📊", label: "Unified Dashboard", desc: "All your metrics in one clear, actionable report." },
        { icon: "🚀", label: "Growth Focus", desc: "Strategy aligned to your revenue targets, not vanity metrics." },
      ],
      stats: [{ value: "All-in-1", label: "Solution" }, { value: "↑3×", label: "Lead Volume" }, { value: "30d", label: "To Go Live" }, { value: "100%", label: "Transparent" }],
      process: ["Discovery", "Strategy", "Build & Launch", "Advertise", "Optimize Monthly"],
      testimonial: { text: "One team, one invoice, triple the results. Best marketing decision we made.", author: "Kiran V., GrowthCo" },
      team: [
        { name: "Ananya P.", role: "Strategy Lead", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80" },
        { name: "Rajan T.", role: "Campaign Manager", img: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=200&q=80" },
      ],
    },
  },



 {
    title: "Google Ads",
    slug: "google-ads",
    icon: "GoogleAds",
    img: googleads,
    tagline: "Pay only for results. Ads that actually convert.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["High converting ad campaigns", "Targeted audience reach", "Budget optimization", "Lead generation focus", "Performance tracking"],
    details: {
      description: "We build Google Ads campaigns engineered to generate leads and sales — not just clicks. From Search to Display to Shopping, every rupee of your budget is tracked, optimized, and fully accounted for.",
      highlights: [
        { icon: "🎯", label: "Laser Targeting", desc: "Intent-based keywords, demographics, and retargeting." },
        { icon: "💰", label: "Budget Control", desc: "Real-time bid optimization for maximum ROI." },
        { icon: "📞", label: "Lead Gen", desc: "Call ads, lead form ads, and landing page CRO." },
        { icon: "📈", label: "Weekly Reports", desc: "Full transparency on spend, clicks, and conversions." },
      ],
      stats: [{ value: "4.2×", label: "Average ROAS" }, { value: "↓38%", label: "Cost Per Lead" }, { value: "₹10Cr+", label: "Ad Spend Managed" }, { value: "48h", label: "To First Lead" }],
      process: ["Audit & Research", "Campaign Setup", "Ad Copywriting", "Launch & Monitor", "Optimize"],
      testimonial: { text: "Our cost-per-lead dropped by 60% after switching to their team.", author: "Arjun M., EduTech" },
      team: [
        { name: "Suresh L.", role: "Ads Specialist", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
        { name: "Neha R.", role: "Campaign Manager", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
      ],
    },
  },
 {
    title: "YouTube Ads",
    slug: "youtube-ads",
    icon: "YouTube",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    tagline: "Reach millions with video ads that tell your story.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Video ad creation", "Target audience setup", "High reach campaigns", "Brand storytelling ads", "Subscriber growth strategy"],
    details: {
      description: "Video is the highest-engagement ad format on the planet. We script, produce, and run YouTube ad campaigns that build brand affinity and drive measurable results — all within your budget.",
      highlights: [
        { icon: "🎬", label: "Video Production", desc: "Scripting, editing, and motion graphics included." },
        { icon: "🌍", label: "Massive Reach", desc: "Access to 2B+ YouTube users with precision targeting." },
        { icon: "📌", label: "Skippable & Non-skip", desc: "Right format for every campaign goal." },
        { icon: "📊", label: "View-through ROI", desc: "Full attribution from video view to conversion." },
      ],
      stats: [{ value: "2B+", label: "Monthly Users" }, { value: "↑65%", label: "Brand Recall" }, { value: "500", label: "Leads/Week" }, { value: "↓40%", label: "CPM vs TV" }],
      process: ["Strategy & Script", "Video Production", "Campaign Setup", "Launch", "Optimize & Scale"],
      testimonial: { text: "One YouTube ad campaign brought us 500 quality leads in a single week.", author: "Karthik V., RealEstate" },
      team: [
        { name: "Meera J.", role: "Video Strategist", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" },
        { name: "Vikram S.", role: "Production Lead", img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80" },
      ],
    },
  },

  {
    title: "Website Development",
    slug: "website-development",
    icon: "WebDev",
    img: web,
    tagline: "Beautiful, fast websites that convert visitors into customers.",
    points: ["Modern responsive website design", "Fast loading and SEO friendly", "Mobile & tablet optimized", "Custom UI/UX design", "E-commerce integration"],
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    details: {
      description: "We craft pixel-perfect, lightning-fast websites using modern frameworks like React and Next.js. Every site we build is optimized for performance, accessibility, and conversion — so your visitors don't just browse, they act.",
      highlights: [
        { icon: "⚡", label: "Sub-2s Load Time", desc: "Optimized Core Web Vitals across all devices." },
        { icon: "🛒", label: "E-commerce Ready", desc: "Full Shopify, WooCommerce, or custom cart integration." },
        { icon: "🔐", label: "SSL & Secure", desc: "HTTPS, firewall, and security hardening by default." },
        { icon: "📊", label: "Analytics Built-in", desc: "Google Analytics and Search Console setup included." },
      ],
      stats: [{ value: "500+", label: "Sites Delivered" }, { value: "98", label: "Lighthouse Score" }, { value: "2s", label: "Load Time" }, { value: "99.9%", label: "Uptime SLA" }],
      process: ["Discovery & Wireframe", "Design Approval", "Development", "QA & Launch"],
      testimonial: { text: "Our new site doubled our enquiries in the first month!", author: "Ravi K., RetailCo" },
      team: [
        { name: "Priya S.", role: "Lead Developer", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80" },
        { name: "Arjun M.", role: "UI Designer", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&q=80" },
      ],
    },
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    icon: "SEO",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tagline: "Rank higher, get found, grow organically.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Google ranking improvement", "Keyword research & analysis", "On-page SEO optimization", "Technical SEO fixes", "Monthly performance reports"],
    details: {
      description: "Our SEO strategies are rooted in data, not guesswork. We audit your current standing, identify high-impact keyword opportunities, and execute a full on-page + technical SEO overhaul that steadily climbs the rankings over time.",
      highlights: [
        { icon: "🔍", label: "Keyword Research", desc: "Deep competitor and intent-based keyword mapping." },
        { icon: "🛠️", label: "Technical Fixes", desc: "Speed, schema, crawl errors, sitemap, and Core Vitals." },
        { icon: "✍️", label: "Content Strategy", desc: "Topic clusters and optimized landing pages." },
        { icon: "📋", label: "Monthly Reports", desc: "Transparent ranking, traffic, and ROI dashboards." },
      ],
      stats: [{ value: "3×", label: "Traffic Growth" }, { value: "Top 3", label: "Rankings Achieved" }, { value: "90d", label: "To See Results" }, { value: "200+", label: "Clients Ranked" }],
      process: ["SEO Audit", "Keyword Strategy", "On-Page Optimization", "Link Building", "Monthly Review"],
      testimonial: { text: "We went from page 5 to page 1 for our main keyword in just 3 months!", author: "Priya S., HealthClinic" },
      team: [
        { name: "Kavya N.", role: "SEO Strategist", img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=200&q=80" },
        { name: "Rohit D.", role: "Content Lead", img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&q=80" },
      ],
    },
  },
 
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    icon: "SocialMedia",
    img: socialmediaImg,
    tagline: "Build your brand and community where your audience lives.",
    accentColor: ACCENT,
    accentLight: ACCENT_LIGHT,
    points: ["Facebook & Instagram growth", "Content strategy planning", "Ad campaign management", "Engagement increase", "Brand awareness boost"],
    details: {
      description: "We manage your social presence end-to-end — from content calendars and creative to paid campaigns and community management. Your brand shows up consistently, creatively, and compellingly every single day.",
      highlights: [
        { icon: "🖼️", label: "Creative Content", desc: "Reels, carousels, stories — all platform-native." },
        { icon: "💬", label: "Community Mgmt", desc: "DMs, comments, and brand voice managed daily." },
        { icon: "📣", label: "Paid Campaigns", desc: "Meta Ads optimized for reach, leads, or conversions." },
        { icon: "📅", label: "Content Calendar", desc: "30-day planned and approved content pipeline." },
      ],
      stats: [{ value: "5×", label: "Engagement Rate" }, { value: "+120%", label: "Follower Growth" }, { value: "Daily", label: "Content Posting" }, { value: "15+", label: "Platforms" }],
      process: ["Brand Audit", "Strategy & Calendar", "Content Creation", "Publish & Engage", "Monthly Review"],
      testimonial: { text: "Our Instagram following grew 3x in 90 days. The content quality is superb!", author: "Neha R., FashionBrand" },
      team: [
        { name: "Divya K.", role: "Social Strategist", img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80" },
        { name: "Arun V.", role: "Content Creator", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
      ],
    },
  },

];

/* ══════════════════════════════════════════
   Animated Card wrapper — bidirectional scroll animation
   ══════════════════════════════════════════ */
function AnimatedCard({ children, delay = 0, style = {}, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`sd-card-anim-wrapper ${visible ? "sd-card-anim-wrapper--visible" : ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   Banner Component
   ══════════════════════════════════════════ */
function ServicesBanner() {
  const pillars = [
    { icon: "WebDev", label: "Growth-First" },
    { icon: "SEO", label: "Data-Driven" },
    { icon: "GoogleAds", label: "ROI Focused" },
    { icon: "SocialMedia", label: "Transparent" },
  ];

  return (
    <div className="svc-banner">
      <div className="svc-banner-blob svc-banner-blob--1" />
      <div className="svc-banner-blob svc-banner-blob--2" />
      <div className="svc-banner-blob svc-banner-blob--3" />
      <div className="svc-banner-inner">
        <h1 className="svc-banner-headline">
          We Don't Just Run Campaigns —<br />
          <em>We Grow Your Businesses.</em>
        </h1>
        <div className="svc-banner-pillars">
          {pillars.map((p) => (
            <div className="svc-banner-pillar" key={p.label}>
              <span className="svc-banner-pillar-icon"><ServiceIcon name={p.icon} /></span>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
        <div className="svc-banner-divider">
          <span>Trusted by businesses across India</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Modal Component
   ══════════════════════════════════════════ */
function ServiceModal({ svc, onClose }) {
  const handleBackdropClick = useCallback(
    (e) => { if (e.target === e.currentTarget) onClose(); },
    [onClose]
  );

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const d = svc.details;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={`${svc.title} details`}>
      <div className="modal-box" style={{ "--accent": svc.accentColor, "--accent-light": svc.accentLight }}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="modal-hero">
          <img src={svc.img} alt={svc.title} className="modal-hero-img" />
          <div className="modal-hero-veil" />
          <div className="modal-hero-info">
            <span className="modal-hero-icon"><ServiceIcon name={svc.icon} /></span>
            <div>
              <h2 className="modal-hero-title">{svc.title}</h2>
              <p className="modal-hero-tagline">{svc.tagline}</p>
            </div>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-stats">
            {d.stats.map((s, i) => (
              <div key={i} className="modal-stat">
                <span className="modal-stat-value">{s.value}</span>
                <span className="modal-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="modal-section">
            <span className="modal-eyebrow" style={{ color: svc.accentColor, background: svc.accentLight }}>Overview</span>
            <p className="modal-desc">{d.description}</p>
          </div>

          <div className="modal-section">
            <span className="modal-eyebrow" style={{ color: svc.accentColor, background: svc.accentLight }}>What's Included</span>
            <div className="modal-highlights">
              {d.highlights.map((h, i) => (
                <div key={i} className="modal-highlight" style={{ background: svc.accentLight }}>
                  <span className="modal-hl-icon">{h.icon}</span>
                  <div>
                    <p className="modal-hl-label">{h.label}</p>
                    <p className="modal-hl-desc">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <span className="modal-eyebrow" style={{ color: svc.accentColor, background: svc.accentLight }}>Our Process</span>
            <div className="modal-process">
              {d.process.map((step, i) => (
                <div key={i} className="modal-step">
                  <span className="modal-step-num" style={{ background: svc.accentLight, color: svc.accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="modal-step-name">{step}</span>
                  {i < d.process.length - 1 && <span className="modal-step-arrow" style={{ color: svc.accentColor }}>→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <span className="modal-eyebrow" style={{ color: svc.accentColor, background: svc.accentLight }}>Client Story</span>
            <blockquote className="modal-testimonial" style={{ borderLeftColor: svc.accentColor, background: svc.accentLight }}>
              <p className="modal-quote-text">"{d.testimonial.text}"</p>
              <footer className="modal-quote-author">— {d.testimonial.author}</footer>
            </blockquote>
          </div>

          <div className="modal-cta">
            <Link to="/contact" className="modal-cta-btn" style={{ background: svc.accentColor }} onClick={onClose}>
              Get a Free Proposal →
            </Link>
            <button className="modal-cta-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Quick View Modal — description + highlights only
   ══════════════════════════════════════════ */
function QuickViewModal({ svc, onClose, onFullDetails }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const d = svc.details;

  return (
    <div
      className="qv-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${svc.title}`}
    >
      <div className="qv-box" style={{ "--accent": svc.accentColor, "--accent-light": svc.accentLight }}>

        {/* Header */}
        <div className="qv-header">
          <div className="qv-header-left">
            <span className="qv-icon"><ServiceIcon name={svc.icon} /></span>
            <div>
              <h3 className="qv-title">{svc.title}</h3>
              <p className="qv-tagline">{svc.tagline}</p>
            </div>
          </div>
          <button className="qv-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Description */}
        <p className="qv-desc">{d.description}</p>

        {/* Highlights */}
        <div className="qv-highlights">
          {d.highlights.map((h, i) => (
            <div className="qv-highlight" key={i}>
              <span className="qv-hl-icon">{h.icon}</span>
              <div>
                <p className="qv-hl-label">{h.label}</p>
                <p className="qv-hl-desc">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="qv-footer">
          <button className="qv-full-btn" style={{ background: svc.accentColor }} onClick={onFullDetails}>
            View Full Details →
          </button>
          <button className="qv-cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   Main Export
   ══════════════════════════════════════════ */
export default function ServiceDetails() {
  const [modalSvc,     setModalSvc]     = useState(null);
  const [quickViewSvc, setQuickViewSvc] = useState(null);
  const [openSlug,     setOpenSlug]     = useState(null);

  const toggleDrawer = (slug) =>
    setOpenSlug((prev) => (prev === slug ? null : slug));

  return (
    <>
      <ServicesBanner />

      <section className="sd-page" id="services" aria-label="Our Digital Marketing Services">
        <div className="sd-header">
          <span className="sd-eyebrow">What We Offer</span>
          <h1 className="sd-title">Our Solutions</h1>
          <p className="sd-subtitle">
            Tap <em>Learn More</em> on any card to explore full details in a popup.
          </p>
        </div>

        <div className="sd-grid" role="list">
          {services.map((svc, idx) => {
            const isOpen = openSlug === svc.slug;
            return (
              <AnimatedCard
                key={svc.slug}
                delay={idx * 80}
                role="listitem"
              >
                <article
                  className={`sd-card ${isOpen ? "sd-card--open" : ""}`}
                  itemScope
                  itemType="https://schema.org/Service"
                  style={{ "--accent": svc.accentColor, "--accent-light": svc.accentLight }}
                >
                  <div className="sd-card-top" onClick={() => toggleDrawer(svc.slug)}>
                    <div className="sd-img-wrap">
                      <img
                        src={svc.img}
                        alt={`${svc.title} illustration`}
                        className="sd-img"
                        loading="lazy"
                        itemProp="image"
                      />
                      <div className="sd-img-overlay" />
                      <span className="sd-card-icon">
                        <ServiceIcon name={svc.icon} />
                      </span>
                    </div>

                    <div className="sd-card-body">
                      <h2 className="sd-card-title" itemProp="name">{svc.title}</h2>
                      <p className="sd-card-tagline" itemProp="description">{svc.tagline}</p>

                      <ul className="sd-points" aria-label={`${svc.title} features`}>
                        {svc.points.map((p, i) => (
                          <li key={i}>
                            <span className="sd-bullet" style={{ background: svc.accentColor }} />
                            {p}
                          </li>
                        ))}
                      </ul>

                      <div className="sd-card-actions">
                        <button
                          className="sd-learn-btn"
                          style={{ "--btn-accent": svc.accentColor }}
                          onClick={(e) => { e.stopPropagation(); setModalSvc(svc); }}
                          aria-label={`Learn more about ${svc.title}`}
                        >
                          <span className="sd-learn-btn-text">Learn More</span>
                          <span className="sd-learn-btn-arrow">→</span>
                        </button>

                        <button
                          className="sd-toggle-btn"
                          onClick={(e) => { e.stopPropagation(); setQuickViewSvc(svc); }}
                          aria-label={`Quick view ${svc.title}`}
                        >
                          ↗ Quick View
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`sd-drawer ${isOpen ? "sd-drawer--open" : ""}`} aria-hidden={!isOpen}>
                    <div className="sd-drawer-inner">
                      <p className="sd-drawer-desc">{svc.details.description}</p>
                      <div className="sd-highlights">
                        {svc.details.highlights.map((h, i) => (
                          <div className="sd-highlight" key={i} style={{ background: svc.accentLight }}>
                            <span className="sd-hl-icon">{h.icon}</span>
                            <div>
                              <p className="sd-hl-label">{h.label}</p>
                              <p className="sd-hl-desc">{h.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="sd-drawer-cta"
                        style={{ "--btn-accent": svc.accentColor }}
                        onClick={() => setModalSvc(svc)}
                      >
                        <span>View Full Details</span>
                        <span className="sd-drawer-cta-arrow">↗</span>
                      </button>
                    </div>
                  </div>
                </article>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      {modalSvc && (
        <ServiceModal svc={modalSvc} onClose={() => setModalSvc(null)} />
      )}

      {quickViewSvc && (
        <QuickViewModal svc={quickViewSvc} onClose={() => setQuickViewSvc(null)} onFullDetails={() => { setModalSvc(quickViewSvc); setQuickViewSvc(null); }} />
      )}
    </>
  );
}

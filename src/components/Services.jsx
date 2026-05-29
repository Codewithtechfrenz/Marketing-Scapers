import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import healthcareImg from "../assets/images/healthcare.jpg";
import realestates from "../assets/images/realestates.jpg";
import schedule1Img from "../assets/images/schedule1.jpg";
import digitalmarketingImg from "../assets/images/digitalmarketing.jpg";
import web from "../assets/images/websitedevelopment.jpg";
import socialmedia from "../assets/images/socialmedia.jpg";
import googlebusiness from "../assets/images/googlebusiness.jpg";
import fax from "../assets/images/fax.jpg";
import img from "../assets/images/img.jpg";
import medical from "../assets/images/medical.jpg";
const icons = {
  // AI Healthcare Products
  Heart: ()=> (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 20s-7-4.6-7-10.2C5 6.5 7.2 4.5 10 4.5c1.7 0 3.1.9 4 2.2.9-1.3 2.3-2.2 4-2.2 2.8 0 5 2 5 5.3C23 15.4 16 20 12 20z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Lisa - AI Real Estate
  Home: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Fax Automation AI
  Fax: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 7V4a1 1 0 011-1h8a1 1 0 011 1v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="11" r="1" fill="currentColor" />
      <path d="M7 15h6M7 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // Doc Assist AI
  Document: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // AI Scheduler
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
      <circle cx="16" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  // Digital Marketing Suite
  Megaphone: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M19 3L5 9H3a1 1 0 00-1 1v4a1 1 0 001 1h2l14 6V3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14v4a2 2 0 002 2h0a2 2 0 002-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // EMR/EHR & PMS Consulting
  Hospital: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="2" y="6" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M12 10v8M8 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 6V4a1 1 0 011-1h8a1 1 0 011 1v2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  // AI Counseling
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 3C8.5 3 6 5.5 6 8c0 1.2.5 2.3 1.2 3.1C5.9 11.8 5 13.1 5 14.5 5 17 7 19 9.5 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3c3.5 0 6 2.5 6 5 0 1.2-.5 2.3-1.2 3.1C18.1 11.8 19 13.1 19 14.5 19 17 17 19 14.5 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 8h2M13 13h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // Thermal Breast Cancer Screening
  Scan: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12h10M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  // Clinical Research
  Flask: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M9 3h6M9 3v7L4.5 18A2 2 0 006.3 21h11.4a2 2 0 001.8-3L15 10V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 15h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="18" r="0.5" fill="currentColor" />
      <circle cx="14" cy="17" r="0.5" fill="currentColor" />
    </svg>
  ),
  // MSS Advertising
  Video: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M16 10l5.4-3.2A1 1 0 0123 7.7v8.6a1 1 0 01-1.6.9L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // HCM AI Agent
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
  // Website Development
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // SEO Optimization
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 7 22 7 22 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  // Google Ads
  Target: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  // Social Media Marketing
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M8.7 13.5l6.6 4M15.3 6.5l-6.6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // YouTube Ads
  Play: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9l6 3-6 3V9z" fill="currentColor" />
    </svg>
  ),
  // Google Business Listing
  MapPin: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M12 2C8.7 2 6 4.7 6 8c0 5.3 6 14 6 14s6-8.7 6-14c0-3.3-2.7-6-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

const data = [
  {
    slug: "ai-healthcare-products",
    title: "AI Healthcare Products",
    img: healthcareImg,
    icon: <icons.Heart />,
    tagline: "Cutting-edge AI solutions transforming healthcare delivery and patient outcomes.",
    points: ["Intelligent diagnosis assistance", "Patient data analytics", "Automated healthcare workflows", "Predictive health monitoring"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    title: "Lisa - AI Real Estate Assistant",
    slug: "lisa-ai-real-estate",
    img: realestates,
    icon: <icons.Home />,
    tagline: "AI-powered tool empowering real estate salesmen to close deals faster.",
    points: ["AI-driven buyer & seller lead scoring", "Instant property recommendations via chat", "Automated follow-up & nurture sequences", "Real-time market insights & pricing trends"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    title: "Fax Automation AI",
    slug: "fax-automation-ai",
    img: fax,
    icon: <icons.Fax />,
    tagline: "Streamline medical fax processing with intelligent automation",
    points: ["Automatic fax routing", "OCR document processing", "HIPAA-compliant storage", "Integration with EHR systems"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    title: "Doc Assist AI",
    slug: "doc-assist-ai",
    img: medical,
    icon: <icons.Document />,
    tagline: "Your intelligent medical documentation assistant.",
    points: ["Clinical note generation", "Medical coding assistance", "Compliance checking", "Template management"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    title: "AI Scheduler for Providers Offices",
    slug: "ai-scheduler",
    img: schedule1Img,
    icon: <icons.Calendar />,
    tagline: "Dynamic calendar and intelligent scheduling system for healthcare provider offices.",
    points: ["Smart appointment booking", "Automated reminders", "Resource optimization", "Multi-provider coordination"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    title: "Digital Marketing Suite",
    slug: "digital-marketing-suite",
    img: digitalmarketingImg,
    icon: <icons.Megaphone />,
    tagline: "Complete SEO, web building, and social media advertising solutions",
    points: ["SEO optimization", "Custom website builders", "Social media campaigns", "Analytics & reporting"],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "emr-ehr-pms-consulting",
    title: "EMR/EHR & PMS Consulting",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    icon: <icons.Hospital />,
    tagline: "Find the perfect EMR, EHR, and PMS for your specialty and save money.",
    points: [
      "Specialty-specific recommendations",
      "Cost comparison analysis",
      "Implementation support",
      "Vendor negotiation",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "ai-counseling",
    title: "AI Counseling",
    img: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&q=80",
    icon: <icons.Brain />,
    tagline: "Mental peace through AI-powered guidance and support.",
    points: [
      "24/7 support access",
      "Personalized guidance",
      "Progress tracking",
      "Confidential & secure",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "thermal-breast-cancer-screening",
    title: "Thermal Breast Cancer Screening",
    img: img,
    icon: <icons.Scan />,
    tagline: "FDA-approved, pain-free thermal screening for OBGYN and primary care.",
    points: [
      "Non-invasive testing",
      "No radiation exposure",
      "Early detection",
      "FDA approved technology",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "clinical-research-consultancy",
    title: "Clinical Research Consultancy",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    icon: <icons.Flask />,
    tagline: "Highly experienced with Patients to Providers to Pharma!",
    points: [
      "End-to-end clinical trial management",
      "Patient recruitment strategies",
      "Provider network coordination",
      "Pharma partnership facilitation",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "mss-advertising",
    title: "MSS Advertising",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    icon: <icons.Video />,
    tagline: "AI-powered video production for TV ads, product explanations, and promotions at affordable costs.",
    points: [
      "AI video creation for TV commercials",
      "Product explanation videos",
      "Promotional content production",
      "Professional copywriting",
      "Film shooting & post-production",
      "Affordable pricing packages",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "hcm-ai-agent-voice-chat",
    title: "HCM AI Agent Voice & Chat",
    img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    icon: <icons.Robot />,
    tagline: "AI recruitment agent that finds candidates, conducts initial outreach via chat or voice, and manages interview scheduling.",
    points: [
      "Automated candidate sourcing",
      "AI-powered voice and chat screening",
      "Smart interview scheduling",
      "Automated email follow-ups",
      "Natural language candidate interaction",
      "Streamlined hiring workflow",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "website-development",
    title: "Website Development",
    img: web,
    icon: <icons.Code />,
    tagline: "Beautiful, blazing-fast websites built to convert.",
    points: [
      "Modern responsive website design",
      "Fast loading and SEO friendly",
      "Mobile & tablet optimized",
      "Custom UI/UX design",
      "E-commerce integration",
    ],
    detail: {
      overview:
        "We craft pixel-perfect, performance-first websites tailored to your brand. From landing pages to full-scale e-commerce stores, every site is built with clean code, accessibility in mind, and scalability baked in.",
      stats: [
        { value: "98%", label: "Performance Score" },
        { value: "2s", label: "Avg Load Time" },
        { value: "500+", label: "Sites Delivered" },
      ],
      extras: [
        "Figma-to-code precision",
        "CMS integration (WordPress, Sanity, Strapi)",
        "SSL, hosting & domain setup",
        "Post-launch support & maintenance",
      ],
    },
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    icon: <icons.TrendUp />,
    tagline: "Rank higher. Get found. Grow organically.",
    points: [
      "Google ranking improvement",
      "Keyword research & analysis",
      "On-page SEO optimization",
      "Technical SEO fixes",
      "Monthly performance reports",
    ],
    detail: {
      overview:
        "Our SEO experts analyze your site, identify gaps, and implement proven strategies that push you to page one. We combine technical audits, content optimization, and link-building to create lasting search visibility.",
      stats: [
        { value: "3×", label: "Avg Traffic Growth" },
        { value: "Top 3", label: "Keyword Rankings" },
        { value: "90 days", label: "To See Results" },
      ],
      extras: [
        "Competitor gap analysis",
        "Schema markup & structured data",
        "Core Web Vitals optimization",
        "Backlink strategy & outreach",
      ],
    },
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    icon: <icons.Target />,
    tagline: "Every rupee spent, smartly targeted.",
    points: [
      "High converting ad campaigns",
      "Targeted audience reach",
      "Budget optimization",
      "Lead generation focus",
      "Performance tracking",
    ],
    detail: {
      overview:
        "We design, launch, and continuously optimize Google Ads campaigns that deliver real ROI. From search to display to shopping ads, we ensure your message reaches the right person at the right moment.",
      stats: [
        { value: "4.2×", label: "Average ROAS" },
        { value: "↓38%", label: "Cost Per Lead" },
        { value: "Real-time", label: "Reporting" },
      ],
      extras: [
        "Smart bidding strategies",
        "A/B ad copy testing",
        "Negative keyword management",
        "Conversion tracking setup",
      ],
    },
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    img: socialmedia,
    icon: <icons.Share />,
    tagline: "Build your community, amplify your brand.",
    points: [
      "Facebook & Instagram growth",
      "Content strategy planning",
      "Ad campaign management",
      "Engagement increase",
      "Brand awareness boost",
    ],
    detail: {
      overview:
        "We create scroll-stopping social content and data-driven ad campaigns that grow your following and turn followers into loyal customers — across Instagram, Facebook, LinkedIn, and more.",
      stats: [
        { value: "5×", label: "Engagement Rate" },
        { value: "+120%", label: "Follower Growth" },
        { value: "Daily", label: "Content Posting" },
      ],
      extras: [
        "Custom content calendar",
        "Reels & stories production",
        "Influencer collaboration",
        "Community management",
      ],
    },
  },
  {
    slug: "youtube-ads",
    title: "YouTube Ads",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    icon: <icons.Play />,
    tagline: "Story-driven video ads that leave an impression.",
    points: [
      "Video ad creation",
      "Target audience setup",
      "High reach campaigns",
      "Brand storytelling ads",
      "Subscriber growth strategy",
    ],
    detail: {
      overview:
        "YouTube is the world's second-largest search engine. We create compelling video ad campaigns — from concept to publishing — that build brand recall and drive measurable action.",
      stats: [
        { value: "2B+", label: "Monthly Users" },
        { value: "↑65%", label: "Brand Recall" },
        { value: "TrueView", label: "Ad Format" },
      ],
      extras: [
        "Script & storyboard creation",
        "Audience targeting by interest",
        "Bumper & skippable ad formats",
        "YouTube SEO for organic growth",
      ],
    },
  },
  {
    slug: "google-business-listing",
    title: "Google Business Listing",
    img: googlebusiness,
    icon: <icons.MapPin />,
    tagline: "Put your business on the map — literally.",
    points: [
      "Local business visibility",
      "Google Maps ranking",
      "Customer reviews setup",
      "Profile optimization",
      "Local SEO boost",
    ],
    detail: {
      overview:
        "A fully optimized Google Business Profile means customers find you first when searching locally. We set up, verify, and optimize your listing to dominate local search and Google Maps results.",
      stats: [
        { value: "#1", label: "Local Pack Position" },
        { value: "+200%", label: "Profile Views" },
        { value: "4.8★", label: "Avg Review Score" },
      ],
      extras: [
        "Q&A and posts management",
        "Photo optimization",
        "Citation building",
        "Review generation strategy",
      ],
    },
  },
];

export default function Services() {
  const [activeCard, setActiveCard] = useState(null);
  const [modalSlug, setModalSlug]   = useState(null);

  const modalData = data.find((d) => d.slug === modalSlug) || null;

  // lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalSlug ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalSlug]);

  useEffect(() => {
    const cards = document.querySelectorAll(".svc-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;

          if (card.classList.contains("svc-card--open")) {
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
      {
        threshold: 0.25,
      }
    );

    cards.forEach((card) => {
      observer.observe(card);

      if (card.classList.contains("svc-card--open")) {
        card.classList.add("show");
      }
    });

    return () => observer.disconnect();
  }, [activeCard]);

  const toggleCard = (slug) => {
    setActiveCard((prev) => (prev === slug ? null : slug));
  };

  return (
    <>
      <section
        className="services-section"
        id="services"
        aria-label="Our Digital Marketing Services"
      >
        {/* ── HERO HEADER ── */}
        <div className="services-header">
          <h1 className="services-title">
            Comprehensive AI & Marketing Solutions
          </h1>
          <p className="services-subtitle">
            From healthcare to real estate, we provide cutting-edge technology solutions tailored to your industry needs
          </p>
        </div>

        {/* ── CARDS GRID ── */}
        <div className="services-grid" role="list">
          {data.map((item) => {
            const isOpen = activeCard === item.slug;
            return (
              <article
                key={item.slug}
                className={`svc-card ${isOpen ? "svc-card--open" : ""}`}
                role="listitem"
                aria-expanded={isOpen}
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Image */}
                <div className="svc-img-wrap">
                  <img
                    src={item.img}
                    alt={`${item.title} service illustration`}
                    className="svc-img"
                    loading="lazy"
                    itemProp="image"
                  />
                  <div className="svc-img-overlay" />
                  <span className="svc-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>

                {/* Body */}
                <div className="svc-body">
                  <h2 className="svc-title" itemProp="name">
                    {item.title}
                  </h2>
                  <p className="svc-tagline" itemProp="description">
                    {item.tagline}
                  </p>

                  <ul className="svc-list" aria-label={`${item.title} features`}>
                    {item.points.map((p, i) => (
                      <li key={i} className="svc-list-item">
                        <span className="svc-check" aria-hidden="true">✦</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* View details button — opens popup */}
                  <button
                    className="svc-toggle-btn"
                    aria-label={`View details for ${item.title}`}
                    onClick={(e) => { e.stopPropagation(); setModalSlug(item.slug); }}
                  >
                    ▼ View details
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── MODAL POPUP ── */}
      {modalData && (
        <div
          className="svc-modal-backdrop"
          onClick={() => setModalSlug(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalData.title}
        >
          <div
            className="svc-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="svc-modal-close"
              onClick={() => setModalSlug(null)}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Hero image */}
            <div className="svc-modal-hero">
              <img src={modalData.img} alt={modalData.title} className="svc-modal-hero-img" />
              <div className="svc-modal-hero-veil" />
              <div className="svc-modal-hero-info">
                <span className="svc-modal-hero-icon">{modalData.icon}</span>
                <div>
                  <h2 className="svc-modal-title">{modalData.title}</h2>
                  <p className="svc-modal-tagline">{modalData.tagline}</p>
                </div>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="svc-modal-content">

              {/* Feature points */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">Key Features</span>
                <ul className="svc-modal-points">
                  {modalData.points.map((p, i) => (
                    <li key={i} className="svc-modal-point-item">
                      <span className="svc-modal-check">✦</span> {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overview */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">Overview</span>
                <p className="svc-modal-desc">{modalData.detail.overview}</p>
              </div>

              {/* Stats */}
              <div className="svc-modal-stats">
                {modalData.detail.stats.map((s, i) => (
                  <div key={i} className="svc-modal-stat">
                    <span className="svc-modal-stat-value">{s.value}</span>
                    <span className="svc-modal-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Extras */}
              <div className="svc-modal-section">
                <span className="svc-modal-eyebrow">What's Included</span>
                <ul className="svc-modal-extras">
                  {modalData.detail.extras.map((e, i) => (
                    <li key={i} className="svc-modal-extra-item">
                      <span>◈</span> {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="svc-modal-cta">
                <Link
                  to={`/services/${modalData.slug}`}
                  className="svc-modal-cta-btn"
                  onClick={() => setModalSlug(null)}
                >
                  Learn More →
                </Link>
                <button
                  className="svc-modal-cta-secondary"
                  onClick={() => setModalSlug(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP */}
        <div className="footer-grid">

          {/* COMPANY */}
          <div className="footer-company">
            <h3 className="logo">
              <span>Marketing</span>
              <span className="highlight">Scapers</span>
            </h3>

            <p className="desc">
              <span className="highlight">Landscaping</span> your sales and marketing
              with innovative AI solutions.
            </p>

            <div className="email-row">
              <span className="icon">✉</span>
              <a href="mailto:info@marketingscapers.com">
                info@marketingscapers.com
              </a>
            </div>
          </div>

          {/* SOLUTIONS */}
          <div>
            <h4>Solutions</h4>
            <ul>
              <li>AI Healthcare</li>
              <li>Real Estate AI</li>
              <li>Digital Marketing</li>
              <li>Medical Credentialing</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Testimonials</li>
              <li>Contact</li>
              <li>Request Demo</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4>Resources</h4>
            <ul>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Support</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© 2026 MarketingScapers. All rights reserved.</p>

          <div className="socials">

  {/* Facebook */}
  <a href="#">
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>

  {/* Twitter */}
  <a href="#">
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a href="#">
    <svg viewBox="0 0 24 24" width="16" height="16">
      <path fill="currentColor" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9" fill="currentColor"/>
      <circle cx="4" cy="4" r="2" fill="currentColor"/>
    </svg>
  </a>

  {/* Instagram */}
  <a href="#">
    <svg viewBox="0 0 24 24" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  </a>

</div>
        </div>

      </div>
    </footer>
  );
}
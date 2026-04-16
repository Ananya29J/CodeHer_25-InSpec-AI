import { Scan, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Detect Defects', href: '#detect' },
  { label: 'FAQ', href: '#faq' },
];

const handleClick = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <div className="footer__logo-icon"><Scan size={18} /></div>
              <span>InSpec</span>
              <span className="gradient-text">AI</span>
            </a>
            <p>
              AI-powered vehicle defect detection helping owners make informed repair decisions with
              instant severity classification and cost estimates.
            </p>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact</h4>
            <ul className="footer__contact">
              <li><Mail size={15} /> info@inspecai.com</li>
              <li><Phone size={15} /> +91-XXXXX-XXXXX</li>
              <li><MapPin size={15} /> SRMIST, Chennai, Tamil Nadu</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} InSpec AI. All rights reserved.</p>
          <p>Built for CodeHer'25 Hackathon — Anna University</p>
        </div>
      </div>
    </footer>
  );
}

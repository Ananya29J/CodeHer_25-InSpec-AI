import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scan } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Detect', href: '#detect' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleClick = (href) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container navbar__inner">
          <a href="#" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="navbar__logo-icon">
              <Scan size={20} />
            </div>
            <span>InSpec</span>
            <span className="navbar__logo-accent">AI</span>
          </a>

          <nav className="navbar__links">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="navbar__link"
                onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#detect"
              className="btn-primary navbar__cta"
              onClick={(e) => { e.preventDefault(); handleClick('#detect'); }}
            >
              Get Started
            </a>
          </nav>

          <button
            className="navbar__hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="navbar__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="navbar__mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="navbar__mobile-header">
                <a href="#" className="navbar__logo">
                  <div className="navbar__logo-icon"><Scan size={18} /></div>
                  <span>InSpec</span>
                  <span className="navbar__logo-accent">AI</span>
                </a>
                <button onClick={() => setIsOpen(false)} className="navbar__mobile-close">
                  <X size={24} />
                </button>
              </div>
              <nav className="navbar__mobile-links">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="navbar__mobile-link"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <a
                href="#detect"
                className="btn-primary"
                style={{ width: '100%', marginTop: 'auto' }}
                onClick={(e) => { e.preventDefault(); handleClick('#detect'); }}
              >
                Get Started
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

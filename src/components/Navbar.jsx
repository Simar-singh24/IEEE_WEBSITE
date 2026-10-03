import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/logo.jpeg';

const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 navbar-glass ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-md bg-transparent">
              <img
                src={logoImage}
                alt="IEEE Student Branch logo"
                className="h-full w-full object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="#"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 hover:-translate-y-0.5"
          >
            Sign in
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 mt-3 w-full px-4 py-3 text-base font-semibold text-black bg-white rounded-full hover:bg-white/90 transition-colors"
              >
                Sign in
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

import { useState } from "react";
import GlowHorizonFM from "./glow-horizon";

const ResponsiveHeroBanner = ({
  logoUrl,
  backgroundImageUrl,
  navLinks = [],
  ctaButtonText = "Join Now",
  ctaButtonHref = "#",
  badgeText = "",
  title = "",
  titleLine2 = "",
  description = "",
  primaryButtonText = "Learn More",
  primaryButtonHref = "#",
  secondaryButtonText = "Watch",
  secondaryButtonHref = "#",
  partnersTitle = "",
  partners = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Glow Horizon Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <GlowHorizonFM variant="top" />
      </div>
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Built-in Nav (Floating Capsule Navbar - Pure Black, Wider, Sticky Top-to-Bottom everywhere) */}
      <header className="fixed top-0 left-0 right-0 z-[99999] px-3 sm:px-6 py-3.5 transition-all duration-300 pointer-events-auto">
        <div className="w-[96%] max-w-[1440px] mx-auto rounded-full bg-black/90 border border-neutral-800 px-6 sm:px-8 py-3 backdrop-blur-2xl shadow-2xl flex items-center justify-between relative">
          {/* Left: Logo */}
          {logoUrl && (
            <a href="#" className="inline-flex items-center justify-center rounded overflow-hidden z-10">
              <img src={logoUrl} alt="IEEE CTSoc Logo" className="h-10 w-auto object-contain" />
            </a>
          )}

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`px-4 py-1.5 text-sm transition-all duration-200 font-sans ${
                  link.isActive
                    ? "text-white font-semibold"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="flex items-center gap-3 z-10">
            <a
              href={ctaButtonHref}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-blue-600 hover:bg-white/90 hover:text-blue-700 font-sans transition-colors shadow-md"
            >
              {ctaButtonText}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-3 rounded-2xl bg-black/95 border border-neutral-800 backdrop-blur-2xl p-4 space-y-1 shadow-2xl z-50">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaButtonHref}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center mt-2 w-full px-4 py-2.5 text-sm font-semibold text-blue-600 bg-white rounded-full hover:bg-white/90 transition-colors"
              >
                {ctaButtonText}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-purple-600/15 to-transparent blur-[140px] rounded-full z-0" />

      {/* Hero content */}
      <div className="z-10 relative">
        <div className="sm:pt-36 md:pt-40 lg:pt-44 max-w-7xl mx-auto pt-32 px-4 sm:px-6 pb-20">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            {badgeText && (
              <div className="mb-8 inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2.5 border border-white/15 backdrop-blur-xl shadow-xl animate-fade-slide-in-1 hover:border-blue-400/40 transition-all">
                <span className="text-sm sm:text-base font-semibold text-white/95 font-sans tracking-wide">
                  {badgeText}
                </span>
              </div>
            )}

            {/* Heading */}
            <h1 className="sm:text-7xl md:text-8xl lg:text-[6.2rem] leading-[1.04] text-5xl text-white tracking-tight font-serif font-normal drop-shadow-2xl animate-fade-slide-in-2">
              {title}
              <br className="hidden sm:block" />
              <span className="italic bg-gradient-to-r from-blue-300 via-white to-blue-400 bg-clip-text text-transparent">
                {titleLine2}
              </span>
            </h1>

            {/* Description */}
            <p className="sm:text-xl md:text-2xl animate-fade-slide-in-3 text-base text-white/85 max-w-3xl mt-8 mx-auto leading-relaxed font-sans font-light">
              {description}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-5 mt-10 gap-4 items-center justify-center animate-fade-slide-in-4">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-3 text-base font-semibold text-white bg-white/15 hover:bg-white hover:text-blue-700 border border-white/20 rounded-full py-4 px-8 font-sans transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:scale-105"
              >
                {primaryButtonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-3 rounded-full bg-[#17639d] border border-[#17639d] px-8 py-4 text-base font-semibold text-white hover:bg-[#0f4d86] hover:border-[#0f4d86] font-sans transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(23,99,157,0.45)] hover:scale-105"
              >
                {secondaryButtonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;

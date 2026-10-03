import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import zinnovatioImg from '../assets/zinnovatio.jpeg';

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-xl bg-white/5 border border-white/8">
        <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] font-semibold text-white/40 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );
}

export default function FlagshipEvent() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const countdown = useCountdown('2026-10-30T09:00:00');

  useEffect(() => {
    if (!isInView || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, [isInView]);

  return (
    <section ref={sectionRef} className="bg-dark-950 py-20 lg:py-28" id="events">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-blue-500 tracking-wider uppercase mb-4"
        >
          Flagship Event
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-[4rem] font-bold text-white tracking-[-0.04em] mb-12"
        >
          Our biggest weekend of the year.
        </motion.h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Card - Event Details with full card background photo */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 p-8 lg:p-10 flex flex-col justify-between"
          >
            {/* Full Card Background Photo & Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={zinnovatioImg}
                alt="Zinnovatio 4.0 Event Poster"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                 
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  LIVE
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {['AI', 'Web', 'IoT', 'Build', 'Ship'].map((tag, tagIdx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + tagIdx * 0.05 }}
                    className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/60"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold text-[#c9d5e8] mb-3">
                Zinnovatio 4.0
              </h3>
              <p className="text-sm text-[#aab8ce] mb-8">
                Join us for our biggest event of the year.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  Friday, October 30
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Chandigarh University
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                  Rs 100000
                </div>
                <div className="flex items-center gap-2.5 text-sm text-white/70">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  31 hours duration
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-[#17639d] bg-neutral-200/90 hover:bg-neutral-300 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                >
                  Register now
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  View details
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Card - Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="rounded-2xl countdown-gradient border border-white/6 p-8 lg:p-10 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center px-3 py-1.5 mb-8 rounded-md bg-white/5 border border-white/8">
                <span className="text-xs font-semibold text-white/60 tracking-wide">Starts in</span>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10">
                <CountdownUnit value={countdown.days} label="Days" />
                <span className="text-2xl font-light text-white/20 mt-[-20px]">:</span>
                <CountdownUnit value={countdown.hours} label="Hours" />
                <span className="text-2xl font-light text-white/20 mt-[-20px]">:</span>
                <CountdownUnit value={countdown.minutes} label="Minutes" />
                <span className="text-2xl font-light text-white/20 mt-[-20px]">:</span>
                <CountdownUnit value={countdown.seconds} label="Seconds" />
              </div>
            </div>

            <div className="border-t border-white/6 pt-6">
              <p className="text-[10px] font-semibold text-white/40 tracking-wider uppercase mb-2">
                Prize Pool
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Rs 100000
              </p>
              <p className="text-sm text-white/40">
                31 hours • Open to CU students and external participants.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

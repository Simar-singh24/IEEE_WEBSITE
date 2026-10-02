import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const stats = [
  { value: 779, suffix: '+', label: 'STUDENTS REGISTERED', icon: '👤' },
  { value: 45, suffix: '+', label: 'EVENTS HOSTED', icon: '📅' },
  { value: 173, suffix: '+', label: 'CHECK-INS PROCESSED', icon: '✅' },
  { value: 19, suffix: '', label: 'TEAM MEMBERS', icon: '👥' },
];

function AnimatedCounter({ target, suffix, inView }) {
  const counterRef = useRef(null);

  useEffect(() => {
    if (!inView || !counterRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(obj.val) + suffix;
        }
      },
    });
  }, [inView, target, suffix]);

  return (
    <span ref={counterRef} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative z-20 bg-dark-950" id="stats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="text-lg font-semibold text-blue-500 mb-2">IEEE Impact</h2>
            <p className="text-sm text-white/50 leading-relaxed">
              Building the next generation of tech talent, one event at a time.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
                className="text-center sm:text-left"
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={isInView} />
                <p className="mt-2 text-xs font-medium text-white/40 tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>
    </section>
  );
}

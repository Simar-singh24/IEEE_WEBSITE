import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { WorksWheel } from '@/components/ui/works-wheel';

const filters = ['All', 'Hackathon', 'Workshop', 'Seminar', 'Competition'];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: 'Zinnovatio 4.0',
    description: 'Flagship 36-hour national level hackathon solving real-world AI, Web3, and HealthTech challenges.',
    date: 'October 30, 2026',
    day: '30',
    month: 'OCT',
    location: 'Chandigarh University, Block 4',
    category: 'Hackathon',
    badge: 'Flagship',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-blue-500/30 to-red-600/30',
    href: '#zinnovatio-register',
  },
  {
    id: 2,
    title: 'Code Relay 3.0',
    description: 'High-speed team competitive programming sprint with blind coding rounds & mystery constraints.',
    date: 'November 08, 2026',
    day: '08',
    month: 'NOV',
    location: 'CU Tech Auditorium',
    category: 'Competition',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-blue-600/30 to-cyan-500/30',
    href: '#code-relay-register',
  },
  {
    id: 3,
    title: 'Full-Stack Next.js 15 Mastery',
    description: 'Hands-on intensive masterclass on Server Actions, Edge runtimes, and scalable distributed architectures.',
    date: 'November 15, 2026',
    day: '15',
    month: 'NOV',
    location: 'Virtual + CS Lab 2',
    category: 'Workshop',
    badge: 'Hands-on',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-emerald-500/30 to-teal-600/30',
    href: '#nextjs-workshop',
  },
  {
    id: 4,
    title: 'AI/ML & Quantum Frontiers',
    description: 'Keynote insights from Google & Microsoft researchers on LLM fine-tuning and quantum algorithmic logic.',
    date: 'November 22, 2026',
    day: '22',
    month: 'NOV',
    location: 'Main Conference Hall',
    category: 'Seminar',
    badge: 'Keynote',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-purple-600/30 to-pink-500/30',
    href: '#ai-quantum-seminar',
  },
  {
    id: 5,
    title: 'Autonomous Robotics & IoT Expo',
    description: 'Live hardware robotics showdown featuring self-navigating rovers, drone swarms, and embedded sensors.',
    date: 'December 05, 2026',
    day: '05',
    month: 'DEC',
    location: 'Robotics Innovation Hub',
    category: 'Workshop',
    badge: 'Live Demo',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-blue-400/30 to-blue-600/30',
    href: '#robotics-expo',
  },
  {
    id: 6,
    title: 'CyberShield 2026 CTF',
    description: '24-hour Capture The Flag cybersecurity competition test defense mechanisms and binary exploits.',
    date: 'December 18, 2026',
    day: '18',
    month: 'DEC',
    location: 'Cybersecurity Lab',
    category: 'Competition',
    badge: 'Cash Prize',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    gradient: 'from-red-600/30 to-rose-700/30',
    href: '#cybershield-ctf',
  },
];

function EventGridCard({ event, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="event-card group rounded-2xl bg-dark-900/90 border border-white/10 hover:border-blue-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-md"
    >
      {/* Image Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />

        {/* Date badge */}
        <div className="absolute top-4 right-4 bg-white/95 rounded-xl px-2.5 py-1.5 text-center min-w-[44px] shadow-lg">
          <span className="block text-lg font-bold text-black leading-none">{event.day}</span>
          <span className="block text-[10px] font-bold text-black/70 uppercase">{event.month}</span>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-white/90">{event.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-white/60 mb-5 leading-relaxed">
            {event.description}
          </p>
        </div>

        <div>
          <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {event.date}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Register Now</span>
            <div className="w-8 h-8 rounded-full bg-blue-500/10 group-hover:bg-blue-500 text-blue-400 group-hover:text-white flex items-center justify-center transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function UpcomingEvents() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState('wheel'); // 'wheel' | 'grid'
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const filteredEvents = activeFilter === 'All'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.category === activeFilter);

  return (
    <section ref={sectionRef} className="relative bg-dark-950 py-24 lg:py-32 overflow-hidden" id="upcoming">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              Calendar of Events
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
            >
              Discover What&apos;s Next.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base mt-2 max-w-xl"
            >
              Experience high-impact hackathons, seminars, and masterclasses designed to launch your technical career.
            </motion.p>
          </div>

          {/* Controls: Mode Switcher & Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            {/* View Mode Toggle: 3D Wheel vs Grid */}
            <div className="inline-flex items-center p-1 rounded-xl bg-dark-900 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('wheel')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'wheel'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                3D Works Wheel
              </button>

              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                Grid Catalog
              </button>
            </div>
          </motion.div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                activeFilter === f
                  ? 'bg-white text-black border-white shadow-md scale-105'
                  : 'bg-dark-900/60 text-white/70 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* View Content: 3D WorksWheel vs Grid */}
        {viewMode === 'wheel' ? (
          <motion.div
            key="wheel-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <WorksWheel
              items={filteredEvents}
              radius={380}
              itemWidth={250}
              itemHeight={350}
              autoRotateSpeed={0.06}
              perspective={1200}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid-mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, i) => (
                <EventGridCard key={event.id} event={event} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 rounded-3xl bg-dark-900/40 border border-white/5">
            <p className="text-white/40 text-lg">No events found in this category.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

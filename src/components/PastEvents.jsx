import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const pastEvents = [
  {
    title: 'Zinnovatio 3.0',
    year: '2024',
    date: '18–19 October 2024',
    category: 'Hackathon',
    description: 'A flagship innovation sprint bringing together builders, coders, and problem-solvers across domains.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CUSoC',
    year: '2024',
    date: 'September 2024',
    category: 'Community',
    description: 'A campus-wide tech culture initiative connecting students to collaborative learning and peer-driven growth.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Code Relay 2.0',
    year: '2024',
    date: 'April 2024',
    category: 'Competition',
    description: 'A rapid-fire coding challenge that tested speed, logic, and team coordination under pressure.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CodeMate',
    year: '2023',
    date: 'November 2023',
    category: 'Workshop',
    description: 'A mentoring-driven learning series helping students improve practical development and teamwork skills.',
    image: 'https://images.unsplash.com/photo-1522204557185-5b1324f0a4d9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'ICPC 2025 Regional',
    year: '2025',
    date: 'February 2025',
    category: 'Competition',
    description: 'Regional problem-solving excellence showcasing analytical rigor and programming depth under contest conditions.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CTRL Series',
    year: '2025',
    date: 'January 2025',
    category: 'Seminar',
    description: 'A thought-provoking series of technical talks bringing fresh perspectives from industry and academia.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'AI & ML Bootcamp',
    year: '2024',
    date: 'July 2024',
    category: 'Workshop',
    description: 'Hands-on model building and learning sessions introducing students to real-world ML workflows.',
    image: 'https://images.unsplash.com/photo-1677645551157-8e58ff93768d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CyberShield CTF',
    year: '2024',
    date: 'December 2024',
    category: 'Competition',
    description: 'A cybersecurity challenge designed to push ethical hacking, reverse engineering, and defense skills.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function PastEvents() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <section ref={sectionRef} className="bg-black py-20 lg:py-28" id="legacy">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">Our Journey</p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Past Events</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
            From hackathons and coding competitions to workshops and technical sessions, explore the events that brought our technology community together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black p-3 shadow-[0_35px_80px_rgba(0,0,0,0.35)] sm:p-4 lg:p-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.04),transparent_35%),radial-gradient(circle_at_right,_rgba(255,255,255,0.03),transparent_30%)]" />

          <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 lg:gap-3 lg:overflow-visible lg:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            {pastEvents.map((event, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={event.title}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#111111] text-left shadow-[0_20px_50px_rgba(0,0,0,0.45)] focus:outline-none"
                  style={{
                    minWidth: isActive ? 'min(42vw, 440px)' : 'min(16vw, 160px)',
                    width: isActive ? 'min(42vw, 440px)' : 'min(16vw, 160px)',
                    flex: isActive ? '2.8 1 0' : '1 1 0',
                    height: '420px',
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      isActive ? 'scale-105 brightness-100' : 'scale-100 brightness-75'
                    }`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <motion.div
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-300">
                          {event.year}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.18em] text-gray-200">
                          {event.category}
                        </span>
                      </div>

                      <div className="text-2xl font-bold tracking-tight text-white">{event.title}</div>
                      <p className="text-sm text-gray-300">{event.date}</p>
                      <p className="max-w-xs text-sm leading-relaxed text-gray-300/90">
                        {event.description}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gray-200">
                        View Event
                        <span aria-hidden="true">→</span>
                      </div>
                    </motion.div>
                  </div>

                  {!isActive && (
                    <div className="absolute inset-x-0 top-0 p-4 text-left">
                      <span className="inline-flex rounded-full border border-white/15 bg-black/25 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                        {event.year}
                      </span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

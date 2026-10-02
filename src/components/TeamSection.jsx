import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const teamMembers = [
  {
    name: 'Karan Juneja',
    role: 'Secretary',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bio: 'Leads the club vision, operations, and member strategy while keeping the entire team aligned around impact and inclusion.',
    expertise: ['Leadership', 'Strategy', 'Operations'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Aashna Goyal',
    role: 'Joint Secretary',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    bio: 'Coordinates collaboration, internal planning, and seamless execution across academic, technical, and community initiatives.',
    expertise: ['Coordination', 'Planning', 'Engagement'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Lakshay Gupta',
    role: 'Event Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Designs high-energy events with strong logistics, attendee flow, and memorable execution from concept to final showcase.',
    expertise: ['Events', 'Execution', 'Logistics'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Pratik Kumar',
    role: 'Logistics Coordinator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bio: 'Keeps resources, schedules, and venue planning smooth so the team can focus on building a strong, impactful experience.',
    expertise: ['Logistics', 'Operations', 'Support'],
    linkedin: '#',
    github: '#',
  },
];

export const coreTeamMembers = [
  ...teamMembers,
  {
    name: 'Ananya Sharma',
    role: 'Technical Lead',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=80',
    bio: 'Connects the technical roadmap with real club outcomes, guiding product quality, prototyping, and hands-on workshops.',
    expertise: ['AI', 'Web', 'Mentorship'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Rohit Verma',
    role: 'Design Lead',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    bio: 'Shapes how the club communicates, from event branding and visuals to strong digital experiences that keep members engaged.',
    expertise: ['UI/UX', 'Branding', 'Design Systems'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Mehak Singh',
    role: 'Publicity Head',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    bio: 'Builds awareness and momentum around club programs through strategy, storytelling, and community outreach.',
    expertise: ['Marketing', 'Outreach', 'Content'],
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Sarthak Jain',
    role: 'Research & Innovation',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&auto=format&fit=crop&q=80',
    bio: 'Explores emerging ideas, technical trends, and future-focused student projects to keep the club intellectually active.',
    expertise: ['Research', 'Innovation', 'Product'],
    linkedin: '#',
    github: '#',
  },
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function TeamDirectoryPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">Core Team</p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Meet the people behind IEEE</h1>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.hash = '';
              window.location.reload();
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
          >
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {coreTeamMembers.map((member, index) => (
            <motion.article
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="overflow-hidden rounded-[28px] border border-white/8 bg-[#101214]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="h-22 w-22 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-lg shadow-black/30">
                  <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{member.name}</h2>
                  <p className="text-sm text-blue-500">{member.role}</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-white/60">{member.bio}</p>

              <div className="mb-5 flex flex-wrap gap-2">
                {member.expertise.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {member.github && (
                  <a href={member.github} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:text-white" aria-label={`${member.name} GitHub`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} className="rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition hover:text-white" aria-label={`${member.name} LinkedIn`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="bg-dark-950 py-20 lg:py-28" id="team">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold text-blue-500 tracking-wider uppercase mb-4"
          >
            The Team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Meet the Curators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/40 max-w-lg mx-auto"
          >
            The humans behind the club infrastructure, working to build a better campus community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="team-card min-h-[260px] rounded-2xl bg-dark-800/50 border border-white/5 p-6 lg:p-7 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-white/8 bg-gradient-to-br from-white/10 to-white/5 sm:h-28 sm:w-28">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/40">{getInitials(member.name)}</span>
                )}
              </div>

              <h3 className="text-base font-semibold text-white mb-0.5">{member.name}</h3>
              <p className="text-xs text-white/40 mb-4">{member.role}</p>

              <div className="flex items-center justify-center gap-3">
                {member.github && (
                  <a href={member.github} className="text-white/25 hover:text-white/60 transition-colors" aria-label={`${member.name} GitHub`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} className="text-white/25 hover:text-white/60 transition-colors" aria-label={`${member.name} LinkedIn`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}

          <motion.button
            type="button"
            onClick={() => {
              window.location.hash = 'team-directory';
            }}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + teamMembers.length * 0.08 }}
            className="team-card min-h-[260px] rounded-2xl border border-dashed border-white/8 bg-dark-800/30 p-6 lg:p-7 text-center transition hover:border-white/15 hover:bg-white/6"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/8 bg-white/5 text-white/40 transition group-hover:text-white/60">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-white/70">View All</h3>
            <p className="mt-1 text-xs text-white/30">Meet everyone</p>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

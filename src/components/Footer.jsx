import { motion } from 'framer-motion';
import logoImage from '../assets/logo.jpeg';

const footerLinks = {
  Explore: [
    { label: 'Events', href: '#events' },
    { label: 'Hackathons', href: '#events' },
    { label: 'Workshops', href: '#events' },
    { label: 'Team', href: '#team' },
  ],
  Resources: [
    { label: 'IEEE Society', href: '#about' },
    { label: 'Tech Talks', href: '#events' },
    { label: 'Projects', href: '#about' },
    { label: 'Community', href: '#team' },
  ],
  Connect: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Mail', href: 'mailto:ctsoc@cuchd.in' },
    { label: 'GitHub', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#070b10] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_right,_rgba(15,118,110,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 xl:py-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="rounded-[30px] border border-white/10 bg-[#0a0f14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_auto]">
            <div className="space-y-6 min-w-0">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#111820] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-24 sm:w-24">
                  <img src={logoImage} alt="IEEE Computer Society Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <div className="text-[2.2rem] font-bold leading-none tracking-tight text-white sm:text-[2.8rem]">IEEE</div>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">Computer Society</div>
                </div>
              </div>

              <p className="font-serif text-[clamp(2rem,4.5vw,5rem)] leading-[0.85] tracking-[-0.05em] text-white italic">
                Code. Create.
                <span className="mt-2 block">Lead the change.</span>
              </p>

              <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                CTSoc is the IEEE Computer Society Student Chapter at Chandigarh University, building a vibrant community for innovation, research, execution, and leadership in technology.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#events" className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 transition hover:bg-blue-500/15">
                  Join CTSoc
                </a>
                <a href="#team" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white">
                  Meet the team
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:gap-14 justify-items-center">
              {Object.entries(footerLinks).map(([title, links], idx) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                  className="lg:pt-3"
                >
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">{title}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="text-sm text-white/60 transition hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/35">
              © {new Date().getFullYear()} CTSoc IEEE Computer Society — Chandigarh University.
            </p>
            <div className="flex items-center gap-5 text-sm text-white/35">
              <a href="#" className="transition hover:text-white/70">Privacy</a>
              <a href="#" className="transition hover:text-white/70">Terms</a>
              <a href="mailto:ctsoc@cuchd.in" className="transition hover:text-white/70">Contact</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

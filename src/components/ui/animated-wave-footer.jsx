import { useState } from "react";
import { Link2, Camera, Briefcase, MessageCircle, Send } from "lucide-react";
import logoImage from "../../assets/logo.jpeg";

export default function AnimatedWaveFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-dark-950 via-[#090d14] to-[#040609] pt-24 pb-12 text-white border-t border-white/10">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
        <div className="absolute bottom-0 h-[450px] w-[2000px] animate-wave">
          <svg
            className="h-full w-full"
            viewBox="0 0 1800 500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 250C200 150 400 50 600 100C800 150 1000 350 1200 300C1400 250 1600 150 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-blue-500/10"
            />
            <path
              d="M0 250C200 200 400 100 600 150C800 200 1000 350 1200 300C1400 250 1600 200 1800 250V500H0V250Z"
              fill="currentColor"
              className="text-blue-600/15"
            />
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Stay Connected & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 bg-black/40 p-1 flex items-center justify-center">
                <img src={logoImage} alt="IEEE CTSoc Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white leading-none">IEEE CTSoc</h2>
                <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest mt-1">Computer Society</p>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed italic">
              Think. Build. Make an impact.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <label htmlFor="footer-email" className="block text-xs font-semibold text-white/80">
                Stay Connected
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 backdrop-blur-md transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-medium text-emerald-400 animate-fade-in">
                  Thanks for subscribing to CTSoc!
                </p>
              )}
            </form>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Quick Links</h3>
            <nav className="space-y-2.5 text-xs">
              <a href="#" className="block text-white/70 transition-colors hover:text-white hover:translate-x-1">
                Home
              </a>
              <a href="#events" className="block text-white/70 transition-colors hover:text-white hover:translate-x-1">
                Upcoming Events
              </a>
              <a href="#events" className="block text-white/70 transition-colors hover:text-white hover:translate-x-1">
                Zinnovatio 4.0 Flagship
              </a>
              <a href="#team" className="block text-white/70 transition-colors hover:text-white hover:translate-x-1">
                Meet the Team
              </a>
              <a href="https://www.cuchd.in" target="_blank" rel="noopener noreferrer" className="block text-white/70 transition-colors hover:text-white hover:translate-x-1">
                Chandigarh University
              </a>
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Contact Us</h3>
            <address className="space-y-2.5 text-xs not-italic text-white/70">
              <p className="font-semibold text-white">Chandigarh University</p>
              <p>Block 4, Academic Campus</p>
              <p>Mohali, Punjab 140413, India</p>
              <p className="pt-1">
                <a href="mailto:ctsoc@cuchd.in" className="text-blue-400 hover:underline">
                  ctsoc@cuchd.in
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-blue-400">Follow Us</h3>
            <p className="text-xs text-white/60 mb-4">
              Connect with IEEE CTSoc across our official social channels.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-md"
                aria-label="Instagram"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-md"
                aria-label="Twitter / Community"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-md"
                aria-label="LinkedIn"
              >
                <Briefcase className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-blue-600 hover:border-blue-500 hover:text-white transition-all shadow-md"
                aria-label="GitHub"
              >
                <Link2 className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <p>© {new Date().getFullYear()} CTSoc IEEE Computer Society — Chandigarh University. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <a href="mailto:ctsoc@cuchd.in" className="hover:text-white/70 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

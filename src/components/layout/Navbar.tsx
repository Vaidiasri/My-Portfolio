import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { num: "01", name: "About", href: "#about" },
  { num: "02", name: "Expertise", href: "#expertise" },
  { num: "03", name: "Work", href: "#projects" },
  { num: "04", name: "Skills", href: "#skills" },
  { num: "05", name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(link.href);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-sm font-black tracking-[0.3em] uppercase text-white"
          >
            VG
            <span className="text-primary">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-2 transition-colors duration-200 ${
                  active === link.href ? "text-white" : "text-white/40 hover:text-white/80"
                }`}
              >
                <span className="text-[10px] font-mono tracking-widest">{link.num}</span>
                <span className="text-xs font-bold tracking-[0.15em] uppercase">{link.name}</span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:vaibhavghildiyal2101@gmail.com"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[10px] font-black tracking-[0.2em] uppercase border border-white/15 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              Hire Me ↗
            </a>
            <button
              className="md:hidden text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-4 text-white/50 hover:text-white transition-colors"
              >
                <span className="font-mono text-xs tracking-widest">{link.num}</span>
                <span className="text-3xl font-bold tracking-tight">{link.name}</span>
              </a>
            ))}
            <a
              href="mailto:vaibhavghildiyal2101@gmail.com"
              className="mt-8 px-8 py-3 border border-white/20 rounded-full text-sm font-bold tracking-widest uppercase text-white"
            >
              Hire Me ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

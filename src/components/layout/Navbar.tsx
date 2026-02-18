import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none",
        scrolled ? "pt-4" : "pt-6",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
          scrolled
            ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] w-[90%] md:w-[60%]"
            : "bg-transparent w-full container",
        )}
      >
        <a
          href="#"
          className="text-xl font-bold font-heading tracking-tighter text-foreground relative z-10"
        >
          VG<span className="text-primary">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <MagneticButton key={link.name} className="relative group">
              <a
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative z-10"
              >
                {link.name}
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-primary -translate-x-1/2 transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-100" />
              </a>
            </MagneticButton>
          ))}

          <div className="w-px h-4 bg-white/10 mx-4" />

          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              Resume
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground relative z-10 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-4 bg-[#0a0c14] border border-white/10 rounded-2xl p-6 flex flex-col items-center space-y-6 md:hidden shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  href={link.href}
                  className="text-2xl font-heading font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                href="/resume.pdf"
                target="_blank"
                className="px-8 py-3 bg-primary text-white rounded-full font-bold uppercase tracking-wider"
                onClick={() => setIsOpen(false)}
              >
                Resume
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

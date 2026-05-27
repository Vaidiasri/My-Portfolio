import { useEffect, useRef } from "react";
import gsap from "gsap";

const techTicker = [
  "React", "TypeScript", "Node.js", "Next.js", "FastAPI", "Python",
  "PostgreSQL", "MongoDB", "Docker", "LangChain", "PyTorch", "Tailwind CSS",
  "GSAP", "Three.js", "Fastify", "TensorFlow",
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: "110%",
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const doubled = [...techTicker, ...techTicker];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Status */}
        <div className="hero-fade flex items-center gap-3 mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
            Available for new projects
          </span>
        </div>

        {/* Headline */}
        <div className="overflow-hidden mb-3">
          <h1 className="hero-line text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-white font-heading">
            Full Stack
          </h1>
        </div>
        <div className="overflow-hidden mb-3">
          <h1 className="hero-line text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter font-heading text-gradient">
            Developer
          </h1>
        </div>
        <div className="overflow-hidden mb-10">
          <h1 className="hero-line text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.9] tracking-tighter text-white font-heading">
            @ Vigility.
          </h1>
        </div>

        {/* Sub & CTAs */}
        <div className="hero-fade flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-24">
          <p className="text-white/45 text-base md:text-lg leading-relaxed max-w-md">
            Building scalable web applications and AI-powered systems at Vigility Technology Private Limited, Noida.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#projects"
              className="px-7 py-3 bg-white text-black text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-7 py-3 border border-white/15 text-white text-xs font-black tracking-[0.2em] uppercase rounded-full hover:border-white/40 transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      {/* Tech Ticker Strip */}
      <div className="w-full border-t border-b border-white/5 py-4 overflow-hidden select-none">
        <div
          className="flex gap-10 whitespace-nowrap animate-marquee-fast"
          style={{ width: "max-content" }}
        >
          {doubled.map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-black tracking-[0.3em] uppercase text-white/20"
            >
              ◆ {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll line */}
      <div className="absolute bottom-8 right-8 lg:right-12 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] font-black tracking-[0.3em] uppercase text-white rotate-90 origin-center">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;

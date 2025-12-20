import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown, Download } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text-reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
      });

      // Background floating animation
      gsap.to(".hero-glow", {
        scale: 1.2,
        opacity: 0.5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".hero-glow", {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] hero-glow pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none animate-pulse" />

      <div className="z-10 px-6 max-w-4xl" ref={textRef}>
        <p className="hero-text-reveal text-sm md:text-base font-medium tracking-widest text-primary mb-4 uppercase">
          Welcome to my portfolio
        </p>
        <h1 className="hero-text-reveal text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Hi, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {portfolioData.personal.name}
          </span>
        </h1>
        <h2 className="hero-text-reveal text-2xl md:text-4xl font-light text-muted-foreground mb-8">
          {portfolioData.personal.role}
        </h2>
        <p className="hero-sub text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          {portfolioData.personal.tagline}
        </p>

        <div className="hero-sub flex gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] font-medium"
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            download="Vaibhav_Ghildiyal_Resume.pdf"
            className="px-8 py-3 border border-white/10 bg-white/5 rounded-full hover:bg-white/10 transition-all font-medium backdrop-blur-sm flex items-center gap-2"
          >
            <Download size={18} /> Resume
          </a>
        </div>
      </div>

      <div className="hero-sub absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;

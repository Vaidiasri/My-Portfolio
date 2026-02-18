import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-text-reveal", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2,
      })
        .from(
          ".hero-sub",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ".hero-badge",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );

      // Background floating animation
      gsap.to(".hero-glow", {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Star twinkling
      gsap.to(".hero-star", {
        opacity: 0.2,
        duration: "random(1, 3)",
        stagger: {
          amount: 5,
          from: "random",
          repeat: -1,
          yoyo: true,
        },
      });
    }, containerRef);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".hero-glow", {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(".hero-content", {
        x: xPos * 0.5,
        y: yPos * 0.5,
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] hero-glow pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none animate-pulse mix-blend-screen" />

      {/* Random Stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="hero-star absolute bg-white rounded-full w-1 h-1 pointer-events-none ml-2"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
          }}
        />
      ))}

      <div className="hero-content z-10 px-6 max-w-5xl" ref={textRef}>
        <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm cursor-default">
          <Sparkles size={14} className="text-secondary" />
          <span className="text-xs font-medium tracking-wide text-secondary-foreground/80 lowercase">
            Available for new projects
          </span>
        </div>

        <div className="overflow-hidden mb-2">
          <h1 className="hero-text-reveal text-5xl md:text-7xl lg:text-9xl font-bold font-heading tracking-tighter ">
            Vaibhav
          </h1>
        </div>

        <div className="overflow-hidden mb-6">
          <h1 className="hero-text-reveal text-5xl md:text-7xl lg:text-9xl font-bold font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
            Ghildiyal
          </h1>
        </div>

        <div className="overflow-hidden mb-10">
          <h2 className="hero-text-reveal text-xl md:text-3xl font-light text-muted-foreground">
            {portfolioData.personal.role}
          </h2>
        </div>

        <div className="hero-sub flex gap-6 justify-center items-center">
          <MagneticButton strength={0.2} className="group">
            <a
              href="#projects"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] font-bold tracking-wide flex items-center gap-2 group-hover:-translate-y-1"
            >
              View My Work
            </a>
          </MagneticButton>

          <MagneticButton strength={0.2} className="group">
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-8 py-4 border border-white/10 bg-white/5 rounded-full hover:bg-white/10 transition-all font-medium backdrop-blur-sm flex items-center gap-2 group-hover:-translate-y-1"
            >
              <Download size={18} /> Resume
            </a>
          </MagneticButton>
        </div>
      </div>

      <div className="hero-sub absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <MagneticButton strength={0.3}>
          <a href="#about" className="p-4 block cursor-pointer">
            <ArrowDown className="text-muted-foreground w-6 h-6" />
          </a>
        </MagneticButton>
      </div>
    </section>
  );
};

export default Hero;

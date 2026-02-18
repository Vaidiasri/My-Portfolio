import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Calendar, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Timeline Line
      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
        height: 0,
        ease: "none",
      });

      // Animate Cards
      const cards = document.querySelectorAll(".experience-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 relative overflow-hidden bg-zinc-950/50"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-24 text-center font-heading">
          Professional <span className="text-gradient">Journey</span>
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line Background */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

          {/* Animated Timeline Line (Fill) */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-cyan-500 to-primary bg-size-[100%_200%] animate-scan timeline-line rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)] origin-top" />

          <div className="space-y-20">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row gap-10 relative ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot with Pulse */}
                <div className="absolute left-[-4px] md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 mt-8 z-20">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 duration-1000" />
                  <div className="relative w-4 h-4 bg-black rounded-full border-2 border-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-1/2 experience-card perspective-1000">
                  <div
                    className={`
                     relative p-8 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-xl
                     hover:border-primary/50 transition-all duration-500 group overflow-hidden
                     shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]
                     ${index % 2 === 0 ? "md:ml-auto md:text-left" : "md:mr-auto md:text-right"}
                    `}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      const centerX = rect.width / 2;
                      const centerY = rect.height / 2;
                      const rotateX = ((y - centerY) / centerY) * -5;
                      const rotateY = ((x - centerX) / centerX) * 5;

                      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transition: "transform 0.1s ease-out",
                    }}
                  >
                    {/* Interior Glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 transform translate-z-10">
                      <div
                        className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 !== 0 ? "md:justify-end" : ""}`}
                      >
                        <span className="px-4 py-1.5 bg-white/5 text-primary-foreground text-xs font-bold rounded-full border border-white/10 flex items-center gap-2 group-hover:bg-primary/20 transition-colors">
                          <Briefcase size={14} className="text-primary" />{" "}
                          {exp.company}
                        </span>
                        <span className="text-zinc-400 text-sm flex items-center gap-1 font-mono bg-black/20 px-3 py-1 rounded-full">
                          <Calendar size={12} /> {exp.period}
                        </span>
                      </div>

                      <h3 className="text-3xl font-bold text-white mb-3 font-heading tracking-tight group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>

                      <p className="text-zinc-400 mb-8 leading-relaxed text-base">
                        {exp.description}
                      </p>

                      {/* Tech Stack Tags */}
                      {exp.technologies && (
                        <div
                          className={`flex flex-wrap gap-2 ${index % 2 !== 0 ? "md:justify-end" : ""}`}
                        >
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium text-cyan-300 bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all cursor-default"
                            >
                              #{tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-entry", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">04</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Experience</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading mb-16">
          Professional <span className="text-gradient">Journey</span>
        </h2>

        <div className="space-y-0 border-t border-white/8">
          {portfolioData.experience.map((exp, i) => (
            <div
              key={i}
              className="exp-entry group grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16 py-10 border-b border-white/8 hover:bg-white/[0.015] transition-colors duration-300 px-0 lg:px-4 rounded-lg"
            >
              {/* Left: meta */}
              <div className="flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary mb-1">
                    {exp.company}
                  </p>
                  <p className="font-mono text-xs text-white/25 tracking-widest">{exp.period}</p>
                </div>
                <span className="font-mono text-[11px] text-white/15 tracking-[0.3em] self-end lg:self-start">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Right: content */}
              <div>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-white font-heading mb-4 group-hover:text-gradient transition-colors duration-300">
                  {exp.role}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{exp.description}</p>

                {exp.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 px-3 py-1.5 border border-white/8 rounded-full hover:border-primary/40 hover:text-primary/70 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-row", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">03</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Selected Work</span>
        </div>

        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading leading-tight">
            Engineered for{" "}
            <span className="text-gradient">performance.</span>
          </h2>
          <a
            href="https://github.com/Vaidiasri"
            target="_blank"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-white/35 hover:text-white transition-colors"
          >
            All on GitHub <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Project List */}
        <div className="border-t border-white/8">
          {portfolioData.projects.map((project, i) => (
            <div
              key={i}
              className="project-row border-b border-white/8"
            >
              <button
                className="w-full text-left group"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="py-6 flex items-center gap-6 lg:gap-10">
                  {/* Number */}
                  <span className="font-mono text-[11px] text-white/20 tracking-[0.3em] shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-gradient transition-colors duration-300 flex-1 text-left font-heading">
                    {project.title}
                  </h3>

                  {/* Tags (hidden on mobile) */}
                  <div className="hidden lg:flex items-center gap-2 shrink-0">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 px-2.5 py-1 border border-white/8 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    size={18}
                    className={`shrink-0 text-white/20 transition-all duration-300 ${
                      expanded === i
                        ? "rotate-90 text-primary"
                        : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60"
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {expanded === i && (
                <div className="pb-8 pl-12 lg:pl-20 pr-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Description */}
                  <div className="lg:col-span-2">
                    {project.image && (
                      <div className="mb-6 rounded-2xl overflow-hidden border border-white/5 aspect-[16/9]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-70"
                        />
                      </div>
                    )}
                    <p className="text-white/45 text-sm leading-relaxed">{project.description}</p>
                  </div>

                  {/* Links & Tags */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-3">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 py-1.5 border border-white/8 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                        >
                          Live Demo <ArrowUpRight size={13} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/35 hover:text-white transition-colors"
                        >
                          Source Code <Github size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // Force HMR update
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projects = document.querySelectorAll(".project-card");

      projects.forEach((project) => {
        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });

        // Parallax image effect
        const image = project.querySelector(".project-image");
        if (image) {
          gsap.to(image, {
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -50,
            ease: "none",
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center font-heading">
          Featured <span className="text-gradient">Work</span>
        </h2>

        <div className="space-y-32">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className={`project-card flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-12 items-center`}
            >
              <div className="w-full md:w-3/5 group">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-zinc-900/5 aspect-video transform transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={(project as any).image || "/project-placeholder.jpg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                </div>
              </div>

              <div className="w-full md:w-2/5 md:py-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary font-bold tracking-wider text-xs uppercase">
                    0{index + 1}
                  </span>
                  <div className="h-px bg-primary/50 w-12" />
                </div>

                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-medium text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-bold tracking-wide uppercase group/link"
                    >
                      Live Demo{" "}
                      <ExternalLink
                        size={16}
                        className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"
                      />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-bold tracking-wide uppercase"
                    >
                      Github <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, ExternalLink, BookOpen } from "lucide-react";

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Entrance animation removed to ensure visibility
    return () => {};
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative z-10 w-full"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Featured <span className="text-primary">Vol. Work</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {portfolioData.projects.map((project, index) => (
            <div
              key={index}
              className="flip-container group h-[350px] w-full perspective-1000 cursor-pointer"
            >
              <div
                className="flip-card-inner relative w-full h-full text-center transition-transform duration-700 transform-style-[preserve-3d] group-hover:rotate-y-180 shadow-2xl rounded-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front Side (Cover) */}
                <div
                  className="flip-card-front absolute inset-0 w-full h-full bg-zinc-800 border border-white/20 rounded-2xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.1),transparent)]" />

                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/50 relative z-10">
                    <BookOpen className="text-primary w-10 h-10" />
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2 relative z-10">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm uppercase tracking-widest relative z-10">
                    Project Vol. 0{index + 1}
                  </p>
                </div>

                {/* Back Side (Details) */}
                <div
                  className="flip-card-back absolute inset-0 w-full h-full bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />

                  {/* Scrollable Content */}
                  <div
                    className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-left relative z-10"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <style>{`
                      .custom-scrollbar::-webkit-scrollbar {
                        display: none; 
                      }
                    `}</style>

                    <h3 className="text-xl font-bold mb-3 border-b border-white/10 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-4 font-light text-sm tracking-wide">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 border border-primary/30 text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(124,58,237,0.2)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fixed Footer Buttons */}
                  <div className="flex gap-3 relative z-10 mt-3 pt-3 border-t border-white/10 shrink-0">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/30 transition-all text-xs group/btn"
                    >
                      <Github
                        size={14}
                        className="group-hover/btn:scale-110 transition-transform"
                      />{" "}
                      Code
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-primary text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all text-xs group/btn"
                    >
                      <ExternalLink
                        size={14}
                        className="group-hover/btn:scale-110 transition-transform"
                      />{" "}
                      Demo
                    </a>
                  </div>
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

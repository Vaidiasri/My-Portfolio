import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

const tagColors: Record<string, string> = {
  React: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Next.js": "bg-gray-500/20 text-gray-300 border-gray-500/30",
  TypeScript: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Python: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  PyTorch: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  FastAPI: "bg-green-500/20 text-green-300 border-green-500/30",
  "Three.js": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  GSAP: "bg-green-600/20 text-green-400 border-green-600/30",
  Tailwind: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  OpenAI: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  PostgreSQL: "bg-blue-700/20 text-blue-400 border-blue-700/30",
  Vite: "bg-purple-400/20 text-purple-300 border-purple-400/30",
};

const defaultTagColor = "bg-white/10 text-white/50 border-white/10";

const ProjectsApp = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { projects } = portfolioData;

  if (selected !== null) {
    const p = projects[selected];
    return (
      <div className="h-full flex flex-col" style={{ color: "#f0f0f0" }}>
        {/* Toolbar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0"
          style={{ background: "#2a2a2c", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 text-[13px] text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <span className="text-[13px] text-white/50 mx-auto">{p.title}</span>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {p.image && (
            <div className="rounded-xl overflow-hidden mb-6 aspect-video border border-white/6">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-white mb-2">{p.title}</h2>
          <p className="text-[13px] text-white/50 leading-relaxed mb-5">{p.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {p.tech.map((t) => (
              <span key={t} className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${tagColors[t] ?? defaultTagColor}`}>
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white transition-colors"
                style={{ background: "rgba(59,130,246,0.8)" }}
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/20"
              >
                <Github size={13} /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ color: "#f0f0f0" }}>
      {/* Safari-style URL bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b shrink-0"
        style={{ background: "#2a2a2c", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          className="flex-1 mx-4 px-3 py-1 rounded-md text-[12px] text-white/40 text-center"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          portfolio://projects
        </div>
      </div>

      {/* Projects grid */}
      <div className="flex-1 overflow-auto p-4">
        <p className="text-[11px] text-white/25 uppercase tracking-widest mb-4 px-1">
          {projects.length} Projects
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group text-left p-4 rounded-xl border hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Project thumbnail */}
              <div className="w-full aspect-video rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-gray-700 to-gray-900 border border-white/5">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                )}
              </div>

              <h3 className="text-[14px] font-semibold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-[12px] text-white/40 line-clamp-2 mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${tagColors[t] ?? defaultTagColor}`}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/30">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsApp;

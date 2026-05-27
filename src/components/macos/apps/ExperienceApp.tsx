import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

const ExperienceApp = () => {
  const [selected, setSelected] = useState(0);
  const { experience } = portfolioData;
  const exp = experience[selected];

  return (
    <div
      className="flex h-full"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", color: "#f0f0f0" }}
    >
      {/* Sidebar */}
      <div
        className="w-52 shrink-0 flex flex-col py-3 border-r"
        style={{ background: "#252527", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="px-4 pb-2 text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em]">
          Work History
        </p>
        {experience.map((e, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`flex flex-col gap-0.5 px-4 py-3 text-left transition-colors border-l-2 ${
              selected === i
                ? "border-[#3478F6] text-white"
                : "border-transparent text-white/50 hover:bg-white/4 hover:text-white/75"
            }`}
            style={selected === i ? { background: "rgba(52,120,246,0.12)" } : {}}
          >
            <span className="text-[12px] font-semibold leading-tight">{e.role.split("—")[0].trim()}</span>
            <span className="text-[10px] text-white/35 mt-0.5">{e.period}</span>
          </button>
        ))}

        <div className="mt-auto px-4 pt-3 border-t border-white/5 mx-1">
          <p className="text-[10px] text-white/22 leading-relaxed">
            Vigility Technology<br />Pvt. Ltd., Noida
          </p>
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 overflow-auto p-5">
        {/* Header */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl mb-5"
          style={{ background: "rgba(52,120,246,0.08)", border: "1px solid rgba(52,120,246,0.15)" }}
        >
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md shrink-0"
            style={{ background: "linear-gradient(160deg, #3478F6, #1a5cc4)" }}
          >
            <Briefcase size={20} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-white">{exp.role}</h2>
            <p className="text-[12px] font-medium mt-0.5" style={{ color: "#71AAFF" }}>{exp.company}</p>
            <p className="text-[11px] text-white/35 mt-1 font-mono">{exp.period}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em] mb-2">Description</p>
          <p className="text-[12px] text-white/60 leading-relaxed">{exp.description}</p>
        </div>

        {/* Technologies */}
        {exp.technologies && (
          <div>
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em] mb-2.5">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-2.5 py-1 rounded-md font-medium"
                  style={{
                    background: "rgba(6,182,212,0.1)",
                    border: "1px solid rgba(6,182,212,0.18)",
                    color: "#67E8F9",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pagination dots */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/5">
          {experience.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`h-1.5 rounded-full transition-all ${
                selected === i ? "w-5 bg-blue-400" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceApp;

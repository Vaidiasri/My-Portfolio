import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frontendSkills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "GSAP", "Three.js", "Vite", "HTML5", "CSS3", "Zustand",
];

const backendSkills = [
  "Node.js", "FastAPI", "Fastify", "Python", "PostgreSQL",
  "MongoDB", "Docker", "LangChain", "PyTorch", "TensorFlow", "REST APIs",
];

const Ticker = ({
  items,
  reverse = false,
  speed = 35,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-5 border-b border-white/5 select-none">
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-black tracking-[0.3em] uppercase text-white/20 flex items-center gap-3"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-primary/40" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">05</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Tech Stack</span>
        </div>

        <div className="skills-header mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading leading-tight">
            The <span className="text-gradient">Engine Room.</span>
          </h2>
          <p className="text-white/35 text-sm max-w-xs leading-relaxed">
            Industrial-grade tools used to build systems that scale with your ambitions.
          </p>
        </div>
      </div>

      {/* Ticker Strips */}
      <div className="border-t border-white/5">
        <Ticker items={frontendSkills} speed={30} />
        <Ticker items={backendSkills} reverse speed={28} />
      </div>

      {/* Skill grid summary */}
      <div className="container mx-auto px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...frontendSkills, ...backendSkills].map((skill) => (
            <div
              key={skill}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.02] hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors shrink-0" />
              <span className="text-xs font-bold text-white/40 group-hover:text-white/80 tracking-wide transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

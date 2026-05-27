import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Full Stack\nDevelopment",
    description:
      "End-to-end web applications built with React, Next.js, TypeScript, and modern backend ecosystems. From architecture to deployment — performant and production-ready.",
    tags: ["React / Next.js", "TypeScript", "Node.js", "Fastify"],
  },
  {
    num: "02",
    title: "AI Integration\n& Automation",
    description:
      "Intelligent systems using RAG, LangChain, and OpenAI APIs to automate complex reporting, data workflows, and decision engines that scale with your business.",
    tags: ["LangChain", "RAG / Agents", "Python", "OpenAI"],
  },
  {
    num: "03",
    title: "DevOps &\nInfrastructure",
    description:
      "Containerising applications with Docker, setting up CI/CD pipelines, and optimising deployments. I ensure applications are reliable, observable, and easy to ship at any scale.",
    tags: ["Docker", "CI/CD", "PostgreSQL", "Performance"],
  },
];

const Expertise = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">02</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Expertise</span>
        </div>

        <div className="mb-16 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white font-heading leading-tight">
            Building the next generation of{" "}
            <span className="text-gradient">digital products.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {services.map((s) => (
            <div
              key={s.num}
              className="exp-card group relative bg-background p-8 lg:p-10 flex flex-col gap-6 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] text-white/20 tracking-[0.3em]">{s.num}</span>
                <ArrowUpRight
                  size={16}
                  className="text-white/15 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>

              <h3 className="text-2xl font-black tracking-tight text-white font-heading whitespace-pre-line leading-tight">
                {s.title}
              </h3>

              <p className="text-white/40 text-sm leading-relaxed flex-1">{s.description}</p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/25 px-3 py-1 bg-white/4 border border-white/5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;

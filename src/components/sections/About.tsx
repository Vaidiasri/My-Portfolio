import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Globe, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Visual Element - "Story" Image/Design */}
          <div className="w-full lg:w-1/2 about-content">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              <div className="relative rounded-2xl p-8 aspect-square flex flex-col justify-between overflow-hidden transform transition-transform duration-500 hover:rotate-y-6 hover:rotate-x-6 preserve-3d shadow-2xl bg-[url('/about-visual.jpg')] bg-cover bg-center">
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/50 hover:bg-black/40 transition-colors duration-500" />

                <div className="absolute top-0 right-0 p-4 opacity-100 z-10">
                  <Cpu
                    size={80}
                    className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  />
                </div>

                <div className="z-10 translate-z-10">
                  <span className="text-cyan-400 font-bold tracking-wider uppercase text-sm">
                    Current Focus
                  </span>
                  <h3 className="text-3xl font-bold mt-2 mb-4 text-white">
                    Architecting Intelligent AI Agents
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 z-10 translate-z-10">
                  <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/70 transition-colors">
                    <Globe className="mb-2 text-cyan-400" />
                    <div className="text-2xl font-bold text-white">RAG</div>
                    <div className="text-xs text-gray-300">
                      Retrieval Augmented Generation
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/70 transition-colors">
                    <Code2 className="mb-2 text-violet-400" />
                    <div className="text-2xl font-bold text-white">
                      LangChain
                    </div>
                    <div className="text-xs text-gray-300">
                      AI Workflow Automation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 about-content">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
              Engineering the <br />
              <span className="text-gradient">Future of Work</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I am currently redefining enterprise efficiency by building
                next-gen
                <strong> AI Reporting Agents</strong>. Using{" "}
                <span className="text-white">
                  Retrieval-Augmented Generation (RAG)
                </span>{" "}
                and <span className="text-white">LangChain</span>, I create
                intelligent systems that can read, analyze, and generate complex
                business reports instantly.
              </p>
              <p>
                My work at <strong>Vigility</strong> involves bridging the gap
                between raw data and actionable insights. I architect full-stack
                solutions where{" "}
                <span className="text-cyan-400">Python/FastAPI</span> backends
                power <span className="text-violet-400">React/Shadcn</span>{" "}
                frontends, ensuring seamless interaction with advanced AI
                models.
              </p>
              <p>
                Beyond just code, I focus on system architecture—optimizing
                token usage, reducing latency by 80%, and ensuring data security
                in AI workflows.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 stats-container">
              {[
                "Generative AI",
                "LangChain",
                "RAG Architecture",
                "FastAPI",
                "React & Shadcn",
              ].map((skill, i) => (
                <div
                  key={i}
                  className="stat-card px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors cursor-default hover:border-cyan-500/30"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

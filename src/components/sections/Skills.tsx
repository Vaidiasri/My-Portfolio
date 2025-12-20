import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import { FaReact, FaNodeJs, FaDocker, FaDatabase } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiFastapi,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";

const iconMap: { [key: string]: any } = {
  React: FaReact,
  TypeScript: SiTypescript,
  "Node.js": FaNodeJs,
  FastAPI: SiFastapi,
  Fastify: SiFastify,
  Docker: FaDocker,
  "Tailwind CSS": SiTailwindcss,
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Database (SQL/NoSQL)": FaDatabase,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Advanced 3D Tilt with Glare Effect
    const cards = document.querySelectorAll(".skill-card");

    cards.forEach((card: any) => {
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -15; // -15 to 15 deg
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          scale: 1.05,
          duration: 0.1, // Super snappy
          ease: "power1.out",
          transformPerspective: 1000,
          transformOrigin: "center",
        });

        // Move glare
        const glare = card.querySelector(".glare");
        if (glare) {
          gsap.to(glare, {
            x: (x - centerX) * 2,
            y: (y - centerY) * 2,
            opacity: 0.6,
            duration: 0.1,
          });
        }
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)", // Bouncy return
        });

        const glare = card.querySelector(".glare");
        if (glare) {
          gsap.to(glare, { opacity: 0, duration: 0.5 });
        }
      });
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative z-10 w-full overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          Technical Arsenal
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 perspective-1000">
          {portfolioData.skills.map((skill, index) => {
            const IconComponent = iconMap[skill.name] || FaReact;

            return (
              <div
                key={index}
                className="skill-card relative h-48 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden transform-style-[preserve-3d]"
              >
                {/* Glare Element */}
                <div className="glare absolute w-32 h-32 bg-primary/40 blur-[40px] rounded-full pointer-events-none opacity-0 -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />

                <div className="text-5xl mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transform translate-z-10">
                  <IconComponent />
                </div>

                <h3 className="font-bold text-white text-lg tracking-wide mb-2 transform translate-z-10">
                  {skill.name}
                </h3>

                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2 transform translate-z-10 max-w-[80%]">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-purple-400 w-full shadow-[0_0_10px_currentColor]"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text reveal
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Animate timeline items individually
      const items = document.querySelectorAll(".timeline-item");
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: isLeft ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Floating elements
      gsap.to(".floating-orb", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="floating-orb absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        <div className="floating-orb absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="reveal-text text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="reveal-text w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
        </div>

        {/* Bio */}
        <div className="max-w-4xl mx-auto mb-24 text-center reveal-text relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20" />
          <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
            <Sparkles className="absolute -top-6 -left-6 w-12 h-12 text-primary/50 animate-pulse" />
            <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
              {portfolioData.personal.bio}
            </p>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="timeline-container max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {portfolioData.experience.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={`timeline-item relative flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24 last:mb-0 group ${
                  !isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 border-4 border-zinc-900 shadow-[0_0_20px_rgba(124,58,237,0.5)] z-20 group-hover:scale-150 transition-transform duration-300 transform translate-y-24 md:translate-y-0" />

                {/* Content Card */}
                <div
                  className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                    isLeft ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <div className="group-hover:-translate-y-2 transition-transform duration-300">
                    <div
                      className={`inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono mb-4 backdrop-blur-md ${
                        isLeft ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      {exp.period}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {exp.role}
                    </h3>
                    <h4 className="text-lg text-gray-400 mb-4">
                      {exp.company}
                    </h4>

                    <div className="p-6 bg-zinc-800/50 backdrop-blur-sm border border-white/5 rounded-xl hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 hover:shadow-2xl text-left">
                      <p className="text-zinc-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty Space for Grid alignment */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;

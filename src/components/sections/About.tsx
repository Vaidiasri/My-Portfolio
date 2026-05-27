import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "04+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "2", label: "Active Clients" },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="about-reveal flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">01</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Image */}
          <div className="about-reveal relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4] max-w-sm mx-auto lg:mx-0">
              <img
                src="/vaibhav-profile-pro.png"
                alt="Vaibhav Ghildiyal"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Based in Noida, India</p>
                <p className="text-white font-bold text-sm">Available Globally</p>
              </div>
            </div>

            {/* Decorative frame line */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="about-reveal text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white font-heading leading-tight mb-8">
              Turning ideas into<br />
              <span className="text-gradient">engineered reality.</span>
            </h2>

            <div className="about-reveal space-y-5 text-white/50 text-base leading-relaxed mb-12">
                <p>
                I'm <span className="text-white font-semibold">Vaibhav Ghildiyal</span> — a Full Stack Developer at <span className="text-white font-semibold">Vigility Technology Private Limited, Noida</span>. I build high-performance web applications and AI-powered systems using modern full-stack technologies.
              </p>
              <p>
                My work spans the entire stack — from React and Next.js on the frontend to Node.js, FastAPI, and <span className="text-white font-semibold">LangChain-powered AI workflows</span> on the backend. I focus on clean, scalable code that ships fast and holds up at scale.
              </p>
              <p>
                From internal tools to customer-facing products, I move quickly from ideation to production-ready deployments — writing code that serves a clear purpose every time.
              </p>
            </div>

            {/* Stats */}
            <div className="about-reveal grid grid-cols-3 gap-6 mb-12 py-8 border-y border-white/5">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-white tracking-tighter mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="about-reveal">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 text-white font-bold tracking-tight hover:text-primary transition-colors"
              >
                Start a project together
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GlobalBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create random floating shapes that move with scroll
      const shapes = document.querySelectorAll(".bg-shape");

      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: (i + 1) * -200, // Move up at different speeds
          rotation: 360,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="bg-shape absolute top-[10%] left-[5%] w-[30vw] h-[30vw] bg-primary/5 rounded-full blur-[100px]" />
      <div className="bg-shape absolute top-[40%] right-[10%] w-[25vw] h-[25vw] bg-purple-500/5 rounded-full blur-[120px]" />
      <div className="bg-shape absolute top-[80%] left-[20%] w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[100px]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20" />
    </div>
  );
};

export default GlobalBackground;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hover" | "text"
  >("default");

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setCursorVariant("hover");
      } else if (
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "SPAN" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setCursorVariant("text");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Update cursor styles based on variant
  useEffect(() => {
    const follower = followerRef.current;

    if (cursorVariant === "hover") {
      gsap.to(follower, {
        scale: 3,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "transparent",
        mixBlendMode: "difference",
        duration: 0.3,
      });
    } else if (cursorVariant === "text") {
      gsap.to(follower, {
        width: "4px",
        height: "30px",
        borderRadius: "2px",
        scale: 1,
        backgroundColor: "hsl(var(--primary))",
        borderColor: "transparent",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    } else {
      gsap.to(follower, {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "hsl(var(--primary))",
        mixBlendMode: "normal",
        duration: 0.3,
      });
    }
  }, [cursorVariant]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 border border-primary rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
      />
    </>
  );
};

export default CustomCursor;

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isActive: boolean;
  onDismiss: () => void;
}

/* ─── Floating orb canvas (very slow, zen) ────────────────────── */
const useOrbs = (canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean) => {
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Dot { x: number; y: number; r: number; vx: number; vy: number; alpha: number }

    const dots: Dot[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.35 + 0.05,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.alpha})`;
        ctx.fill();
      }
      /* subtle connecting lines */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dist / 100) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, canvasRef]);
};

/* ─── Clock display ───────────────────────────────────────────── */
const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
};

/* ─── Screensaver ─────────────────────────────────────────────── */
const Screensaver = ({ isActive, onDismiss }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const now = useClock();
  useOrbs(canvasRef, isActive);

  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9993] flex flex-col items-center justify-center cursor-none select-none"
          style={{ background: "#000" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onMouseMove={onDismiss}
          onMouseDown={onDismiss}
          onKeyDown={onDismiss}
          tabIndex={-1}
        >
          {/* Star canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-4 text-center z-10">
            {/* Big clock */}
            <motion.p
              className="font-thin tracking-tighter text-white leading-none"
              style={{ fontSize: "clamp(80px, 14vw, 160px)", fontFamily: "-apple-system,'SF Pro Display','Inter',sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {timeStr}
            </motion.p>

            {/* Date */}
            <motion.p
              className="text-white/45 font-light tracking-wide"
              style={{ fontSize: "clamp(16px, 2vw, 24px)", fontFamily: "-apple-system,'SF Pro Display','Inter',sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {dateStr}
            </motion.p>

            {/* Divider */}
            <motion.div
              className="w-16 h-px mt-4"
              style={{ background: "rgba(255,255,255,0.12)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />

            {/* Name + role */}
            <motion.div
              className="flex flex-col items-center gap-1 mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p
                className="text-white/70 font-semibold tracking-tight"
                style={{ fontSize: "clamp(14px, 1.6vw, 20px)", fontFamily: "-apple-system,'SF Pro Display','Inter',sans-serif" }}
              >
                Vaibhav Ghildiyal
              </p>
              <p
                className="text-white/28 font-normal tracking-wide"
                style={{ fontSize: "clamp(11px, 1.1vw, 14px)", fontFamily: "-apple-system,'Inter',sans-serif" }}
              >
                Full Stack Developer · Vigility Technology, Noida
              </p>
            </motion.div>
          </div>

          {/* Unlock hint — pulsing */}
          <motion.p
            className="absolute bottom-10 text-[11px] uppercase tracking-[0.3em] text-white/20"
            style={{ fontFamily: "-apple-system,'Inter',sans-serif" }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Move mouse to unlock
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Screensaver;

import { useRef } from "react";
import { motion } from "framer-motion";
import type { AppId } from "./types";

interface WindowProps {
  id: AppId;
  title: string;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (pos: { x: number; y: number }) => void;
}

/* Traffic light symbols as precise SVG paths */
const CloseSymbol = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
    <line x1="1" y1="1" x2="5" y2="5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="5" y1="1" x2="1" y2="5" stroke="#4d0000" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MinimizeSymbol = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
    <line x1="1" y1="3" x2="5" y2="3" stroke="#4d3000" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MaximizeSymbol = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
    <polyline points="1,4 1,1 4,1" stroke="#004d12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <polyline points="5,2 5,5 2,5" stroke="#004d12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const Window = ({
  title,
  isFocused,
  isMinimized,
  isMaximized,
  position,
  size,
  zIndex,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}: WindowProps) => {
  const dragging = useRef(false);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if ((e.target as HTMLElement).closest("button")) return;
    dragging.current = true;

    const ox = e.clientX - position.x;
    const oy = e.clientY - position.y;

    const onMv = (ev: MouseEvent) => {
      if (!dragging.current) return;
      onMove({
        x: Math.max(0, Math.min(ev.clientX - ox, window.innerWidth - 140)),
        y: Math.max(28, Math.min(ev.clientY - oy, window.innerHeight - 60)),
      });
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMv);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMv);
    window.addEventListener("mouseup", onUp);
  };

  if (isMinimized) return null;

  const posStyle = isMaximized
    ? { top: 28, left: 0, right: 0, bottom: 0, width: "100%", height: "calc(100vh - 28px)" }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  const titleBarBg = isFocused
    ? "linear-gradient(to bottom, #4a4a4c, #3d3d3f)"
    : "linear-gradient(to bottom, #3c3c3e, #363638)";

  const trafficActive = isFocused;

  return (
    <motion.div
      initial={{ scale: 0.84, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.84, opacity: 0, y: 20, transition: { duration: 0.14 } }}
      transition={{ type: "spring", damping: 24, stiffness: 340 }}
      className="absolute flex flex-col overflow-hidden"
      style={{
        ...posStyle,
        zIndex,
        borderRadius: 11,
        boxShadow: isFocused
          ? "0 0 0 0.5px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.5), 0 28px 80px rgba(0,0,0,0.35)"
          : "0 0 0 0.5px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3)",
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="shrink-0 flex items-center relative select-none"
        style={{
          height: 40,
          background: titleBarBg,
          borderBottom: "1px solid rgba(0,0,0,0.45)",
          cursor: "default",
        }}
        onMouseDown={handleTitleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-[7px] pl-[13px] z-10" onMouseDown={(e) => e.stopPropagation()}>
          {/* Close */}
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full group transition-all focus:outline-none"
            style={{
              width: 12,
              height: 12,
              background: trafficActive ? "#ff5f57" : "#6d6d6d",
              boxShadow: trafficActive ? "0 0 0 0.5px rgba(228,50,30,0.4)" : "none",
            }}
          >
            <span className="opacity-0 group-hover:opacity-100">
              {trafficActive && <CloseSymbol />}
            </span>
          </button>

          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="flex items-center justify-center rounded-full group transition-all focus:outline-none"
            style={{
              width: 12,
              height: 12,
              background: trafficActive ? "#ffbd2e" : "#6d6d6d",
              boxShadow: trafficActive ? "0 0 0 0.5px rgba(200,130,0,0.4)" : "none",
            }}
          >
            <span className="opacity-0 group-hover:opacity-100">
              {trafficActive && <MinimizeSymbol />}
            </span>
          </button>

          {/* Maximize */}
          <button
            onClick={onMaximize}
            className="flex items-center justify-center rounded-full group transition-all focus:outline-none"
            style={{
              width: 12,
              height: 12,
              background: trafficActive ? "#28c840" : "#6d6d6d",
              boxShadow: trafficActive ? "0 0 0 0.5px rgba(15,150,25,0.4)" : "none",
            }}
          >
            <span className="opacity-0 group-hover:opacity-100">
              {trafficActive && <MaximizeSymbol />}
            </span>
          </button>
        </div>

        {/* Centered title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-[13px] font-medium tracking-[-0.01em]"
            style={{ color: isFocused ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)" }}
          >
            {title}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div
        className="flex-1 overflow-hidden"
        style={{ background: "#1c1c1e", borderRadius: "0 0 11px 11px" }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Window;

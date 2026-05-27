import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { User, Folder, Briefcase, Mail, Github, Linkedin } from "lucide-react";
import type { AppId, WindowState } from "./types";

/* ─── macOS-style app icon ─────────────────────────────────────── */
interface IconProps {
  from: string;
  to: string;
  rotate?: number;
  children: React.ReactNode;
}

const AppIcon = ({ from, to, rotate = 160, children }: IconProps) => (
  <div
    className="w-full h-full flex items-center justify-center relative overflow-hidden"
    style={{
      borderRadius: "22.37%",
      background: `linear-gradient(${rotate}deg, ${from} 0%, ${to} 100%)`,
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.15)",
    }}
  >
    {/* Top glass shine */}
    <div
      className="absolute inset-x-0 top-0 pointer-events-none"
      style={{
        height: "48%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
        borderRadius: "22.37% 22.37% 0 0",
      }}
    />
    <div className="relative z-10 flex items-center justify-center" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))" }}>
      {children}
    </div>
  </div>
);

/* ─── Per-app icon definitions ──────────────────────────────────── */
const ICON_MAP: Record<AppId, React.ReactNode> = {
  about: (
    <AppIcon from="#71C4F9" to="#1176D3">
      <User size={26} color="white" strokeWidth={1.8} />
    </AppIcon>
  ),
  terminal: (
    <AppIcon from="#333335" to="#111112" rotate={140}>
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
        <text x="0" y="15" fontSize="14" fontFamily="SF Mono, Fira Code, monospace" fontWeight="bold" fill="#50FA7B">&gt;_</text>
      </svg>
    </AppIcon>
  ),
  projects: (
    <AppIcon from="#FFCF5E" to="#E8981F">
      <Folder size={26} color="white" strokeWidth={1.8} />
    </AppIcon>
  ),
  experience: (
    <AppIcon from="#FF7A6A" to="#C0392B">
      <Briefcase size={24} color="white" strokeWidth={1.8} />
    </AppIcon>
  ),
  contact: (
    <AppIcon from="#62C3FD" to="#1267CE">
      <Mail size={24} color="white" strokeWidth={1.8} />
    </AppIcon>
  ),
};

const LABELS: Record<AppId, string> = {
  about: "About Me",
  terminal: "Terminal",
  projects: "Projects",
  experience: "Experience",
  contact: "Contact",
};

/* ─── Dock item with spring magnification ───────────────────────── */
interface DockItemProps {
  id: AppId;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isOpen: boolean;
  isDragTarget: boolean;
  isDraggingFile: boolean;
  isBouncing: boolean;
  onClick: () => void;
}

const DockItem = ({ id, mouseX, isOpen, isDragTarget, isDraggingFile, isBouncing, onClick }: DockItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (x: number) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return 9999;
    return Math.abs(x - (b.left + b.width / 2));
  });

  const sizePx = useTransform(distance, [0, 72, 144], [72, 58, 46]);
  const size = useSpring(sizePx, { mass: 0.1, stiffness: 180, damping: 14 });
  const yPx = useTransform(distance, [0, 72, 144], [-10, -4, 0]);
  const y = useSpring(yPx, { mass: 0.1, stiffness: 180, damping: 14 });

  return (
    <div className="relative flex flex-col items-center group">
      {/* Tooltip */}
      <div
        className="absolute bottom-full mb-2 px-3 py-1 rounded-lg text-[12px] font-medium text-white whitespace-nowrap
                   opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
        style={{
          background: "rgba(28,28,32,0.92)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        {LABELS[id]}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2"
          style={{
            width: 0, height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid rgba(28,28,32,0.92)",
          }}
        />
      </div>

      {/* Drop label — shown when dragging a file over this icon */}
      {isDragTarget && (
        <div
          className="absolute bottom-full mb-2 px-3 py-1 rounded-lg text-[12px] font-semibold text-white whitespace-nowrap pointer-events-none z-10"
          style={{
            background: "rgba(52,120,246,0.95)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 4px 16px rgba(52,120,246,0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          Open in {LABELS[id]}
        </div>
      )}

      <motion.button
        ref={ref}
        data-dock-app={id}
        style={{
          width: size,
          height: size,
          y,
          filter: isDragTarget
            ? "drop-shadow(0 0 10px rgba(52,120,246,0.9))"
            : isDraggingFile
            ? "brightness(0.85)"
            : "none",
        }}
        animate={
          isBouncing
            ? { y: [0, -18, 0, -12, 0, -6, 0], scale: [1, 1.08, 1, 1.05, 1] }
            : isDragTarget
            ? { scale: 1.18 }
            : { scale: 1 }
        }
        transition={
          isBouncing
            ? { duration: 0.6, ease: "easeOut" }
            : { type: "spring", damping: 15, stiffness: 350 }
        }
        onClick={onClick}
        className="focus:outline-none"
        whileTap={{ scale: 0.88 }}
      >
        {ICON_MAP[id]}
      </motion.button>

      {/* Open indicator */}
      <div className="mt-1 h-[5px] flex items-center justify-center">
        {isOpen && (
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
        )}
      </div>
    </div>
  );
};

/* ─── External link icon ────────────────────────────────────────── */
interface ExtLinkProps {
  href: string;
  label: string;
  from: string;
  to: string;
  children: React.ReactNode;
}

const ExtLink = ({ href, label, from, to, children }: ExtLinkProps) => (
  <div className="relative flex flex-col items-center group">
    <div
      className="absolute bottom-full mb-2 px-3 py-1 rounded-lg text-[12px] font-medium text-white whitespace-nowrap
                 opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none"
      style={{
        background: "rgba(28,28,32,0.92)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
      }}
    >
      {label}
    </div>
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block focus:outline-none"
      whileHover={{ y: -8, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", damping: 18, stiffness: 300 }}
      style={{ width: 46, height: 46 }}
    >
      <AppIcon from={from} to={to}>
        {children}
      </AppIcon>
    </motion.a>
    <div className="mt-1 h-[5px]" />
  </div>
);

/* ─── Dock ──────────────────────────────────────────────────────── */
interface DockProps {
  windows: WindowState[];
  onOpenApp: (id: AppId) => void;
  draggingOverApp: AppId | null;
  isDraggingFile: boolean;
  bouncingApp: AppId | null;
}

const APP_IDS: AppId[] = ["about", "terminal", "projects", "experience", "contact"];

const Dock = ({ windows, onOpenApp, draggingOverApp, isDraggingFile, bouncingApp }: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  const getWin = (id: AppId) => windows.find((w) => w.id === id);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9980]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-3 pt-3 pb-2 rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.13)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
          border: isDraggingFile
            ? "1px solid rgba(52,120,246,0.5)"
            : "1px solid rgba(255,255,255,0.2)",
          boxShadow: isDraggingFile
            ? "0 8px 32px rgba(52,120,246,0.25), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        {APP_IDS.map((id) => (
          <DockItem
            key={id}
            id={id}
            mouseX={mouseX}
            isOpen={getWin(id)?.isOpen === true && !getWin(id)?.isMinimized}
            isDragTarget={draggingOverApp === id}
            isDraggingFile={isDraggingFile}
            isBouncing={bouncingApp === id}
            onClick={() => onOpenApp(id)}
          />
        ))}

        {/* Separator */}
        <div
          className="self-stretch mx-0.5 my-1"
          style={{ width: 1, background: "rgba(255,255,255,0.2)" }}
        />

        <ExtLink
          href="https://github.com/Vaidiasri"
          label="GitHub"
          from="#24292e"
          to="#0d1117"
        >
          <Github size={24} color="white" strokeWidth={1.8} />
        </ExtLink>

        <ExtLink
          href="https://www.linkedin.com/in/vaibhav-ghildiyal-a2a9b8212/"
          label="LinkedIn"
          from="#0077B5"
          to="#005F8F"
        >
          <Linkedin size={22} color="white" strokeWidth={1.8} />
        </ExtLink>
      </motion.div>

      {/* Dock shelf reflection */}
      <div
        className="mx-4 h-2 rounded-b-xl"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
        }}
      />
    </div>
  );
};

export default Dock;

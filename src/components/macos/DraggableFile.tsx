import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AppId } from "./types";

export interface DesktopFile {
  id: string;
  name: string;
  type: "pdf" | "folder" | "json" | "vcf";
  targetApp: AppId;
  pos: { x: number; y: number };
}

/* ─── File-type icons (SVG only, no emoji) ──────────────────────── */

const PdfFileIcon = () => (
  <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="36" height="48" rx="3" fill="white" />
    <rect x="2" y="2" width="28" height="13" rx="3" fill="#E53E3E" />
    <text x="5" y="12" fontSize="7.5" fontWeight="bold" fill="white" fontFamily="-apple-system,Arial,sans-serif">PDF</text>
    <polygon points="30,2 38,2 38,10 30,10" fill="#C0392B" />
    <path d="M30 2 L38 10" stroke="#fff" strokeWidth="0.5" />
    <rect x="6" y="22" width="22" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="6" y="27" width="26" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="6" y="32" width="18" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="6" y="37" width="24" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="6" y="42" width="20" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="2" y="2" width="36" height="48" rx="3" stroke="#d1d5db" strokeWidth="0.5" fill="none" />
  </svg>
);

const FolderFileIcon = () => (
  <svg width="52" height="44" viewBox="0 0 52 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fbg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#82CAFF" />
        <stop offset="100%" stopColor="#3DA8F4" />
      </linearGradient>
      <linearGradient id="ftab" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A8DCFF" />
        <stop offset="100%" stopColor="#6CB8F5" />
      </linearGradient>
      <linearGradient id="fshine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
        <stop offset="45%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Back panel */}
    <rect x="2" y="13" width="48" height="29" rx="4" fill="url(#fbg)" />
    {/* Tab */}
    <path d="M2 13 L2 9 Q2 5 6 5 L19 5 Q23 5 25 9 L25 13 Z" fill="url(#ftab)" />
    {/* Front shine */}
    <rect x="2" y="13" width="48" height="29" rx="4" fill="url(#fshine)" />
    {/* Inner shadow line */}
    <rect x="2" y="13" width="48" height="1" fill="rgba(255,255,255,0.18)" />
    {/* Subtle border */}
    <rect x="2" y="13" width="48" height="29" rx="4" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" fill="none" />
  </svg>
);

const JsonFileIcon = () => (
  <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="36" height="48" rx="3" fill="#1e1e2e" />
    <polygon points="30,2 38,2 38,10" fill="#374151" />
    <text x="5" y="9" fontSize="6" fill="#4B5563" fontFamily="monospace">
      &nbsp;
    </text>
    <text x="6" y="24" fontSize="11" fontWeight="bold" fill="#818CF8" fontFamily="'SF Mono',monospace">{"{ }"}</text>
    <text x="6" y="36" fontSize="6" fill="#6B7280" fontFamily="monospace">json</text>
    <rect x="6" y="40" width="22" height="1.2" rx="0.6" fill="#374151" />
    <rect x="2" y="2" width="36" height="48" rx="3" stroke="#374151" strokeWidth="0.5" fill="none" />
  </svg>
);

const VcfFileIcon = () => (
  <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vcfh" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="36" height="48" rx="3" fill="white" />
    <rect x="2" y="2" width="36" height="20" rx="3" fill="url(#vcfh)" />
    <rect x="2" y="16" width="36" height="6" fill="url(#vcfh)" />
    <circle cx="20" cy="11" r="5.5" fill="rgba(255,255,255,0.85)" />
    <path d="M9 22 Q20 17 31 22" fill="rgba(255,255,255,0.5)" />
    <rect x="7" y="28" width="26" height="1.5" rx="0.75" fill="#93C5FD" />
    <rect x="7" y="33" width="20" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="7" y="38" width="24" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="7" y="43" width="16" height="1.5" rx="0.75" fill="#e2e8f0" />
    <rect x="2" y="2" width="36" height="48" rx="3" stroke="#BFDBFE" strokeWidth="0.5" fill="none" />
  </svg>
);

const ICON_MAP: Record<DesktopFile["type"], React.ReactNode> = {
  pdf: <PdfFileIcon />,
  folder: <FolderFileIcon />,
  json: <JsonFileIcon />,
  vcf: <VcfFileIcon />,
};

/* ─── Context menu ──────────────────────────────────────────────── */
interface CtxMenu {
  x: number;
  y: number;
  fileId: string;
}

/* ─── Draggable File ────────────────────────────────────────────── */
interface Props {
  file: DesktopFile;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragMove: (cursor: { x: number; y: number }) => void;
  onDragEnd: (id: string, pos: { x: number; y: number }, cursor: { x: number; y: number }) => void;
  onOpen: (file: DesktopFile) => void;
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
}

const DraggableFile = ({
  file, isSelected, onSelect, onDragStart, onDragMove, onDragEnd, onOpen, onPositionChange,
}: Props) => {
  const [pos, setPos] = useState(file.pos);
  const [dragging, setDragging] = useState(false);
  const [ctx, setCtx] = useState<CtxMenu | null>(null);
  const dragRef = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const didDrag = useRef(false);
  const clickTime = useRef(0);

  // Sync pos if file.pos changes externally
  useEffect(() => { setPos(file.pos); }, [file.pos]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setCtx(null);

    const now = Date.now();
    if (now - clickTime.current < 280) {
      // Double-click
      onOpen(file);
      clickTime.current = 0;
      return;
    }
    clickTime.current = now;
    onSelect(file.id);

    dragRef.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    didDrag.current = false;

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.mx;
      const dy = ev.clientY - dragRef.current.my;

      if (!didDrag.current && Math.hypot(dx, dy) > 4) {
        didDrag.current = true;
        setDragging(true);
        onDragStart(file.id);
      }

      if (didDrag.current) {
        const np = { x: dragRef.current.px + dx, y: dragRef.current.py + dy };
        setPos(np);
        onDragMove({ x: ev.clientX, y: ev.clientY });
      }
    };

    const onUp = (ev: MouseEvent) => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);

      if (didDrag.current && dragRef.current) {
        const finalPos = {
          x: dragRef.current.px + (ev.clientX - dragRef.current.mx),
          y: dragRef.current.py + (ev.clientY - dragRef.current.my),
        };
        setPos(finalPos);
        onPositionChange(file.id, finalPos);
        onDragEnd(file.id, finalPos, { x: ev.clientX, y: ev.clientY });
      }

      setDragging(false);
      didDrag.current = false;
      dragRef.current = null;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [pos, file, onSelect, onDragStart, onDragMove, onDragEnd, onOpen, onPositionChange]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCtx({ x: e.clientX, y: e.clientY, fileId: file.id });
  };

  return (
    <>
      <motion.div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          zIndex: dragging ? 200 : isSelected ? 50 : 20,
          cursor: dragging ? "grabbing" : "default",
        }}
        animate={{ opacity: dragging ? 0.65 : 1, scale: dragging ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        onMouseDown={handleMouseDown}
        onContextMenu={handleContextMenu}
      >
        <div
          className="flex flex-col items-center gap-1.5 p-1.5 rounded-xl transition-colors"
          style={{
            width: 72,
            background: isSelected ? "rgba(52,120,246,0.18)" : "transparent",
            outline: isSelected ? "1.5px solid rgba(52,120,246,0.55)" : "1.5px solid transparent",
          }}
        >
          <div className="flex items-center justify-center" style={{ height: 52 }}>
            {ICON_MAP[file.type]}
          </div>
          <span
            className="text-[11px] font-medium text-center leading-tight px-1.5 py-0.5 rounded-md"
            style={{
              color: "rgba(255,255,255,0.92)",
              background: isSelected ? "rgba(52,120,246,0.65)" : "rgba(0,0,0,0.32)",
              backdropFilter: "blur(6px)",
              maxWidth: 68,
              wordBreak: "break-word",
              WebkitTextStroke: "0.2px rgba(0,0,0,0.3)",
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            {file.name}
          </span>
        </div>
      </motion.div>

      {/* Context menu */}
      <AnimatePresence>
        {ctx && (
          <>
            <div className="fixed inset-0 z-[8000]" onClick={() => setCtx(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[8001] py-1 rounded-lg shadow-2xl min-w-[180px]"
              style={{
                left: ctx.x,
                top: ctx.y,
                background: "rgba(36,36,40,0.96)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
              }}
            >
              {[
                { label: "Open", bold: true, action: () => { onOpen(file); setCtx(null); } },
                null,
                { label: "Get Info", action: () => setCtx(null) },
                { label: "Rename", action: () => setCtx(null) },
                null,
                { label: "Move to Trash", danger: true, action: () => setCtx(null) },
              ].map((item, i) =>
                item === null ? (
                  <div key={i} className="h-px mx-2 my-0.5" style={{ background: "rgba(255,255,255,0.08)" }} />
                ) : (
                  <button
                    key={i}
                    onClick={item.action}
                    className={`w-full text-left px-3 py-1 text-[13px] hover:bg-blue-500 hover:text-white transition-colors rounded-sm mx-auto ${
                      item.bold ? "font-semibold text-white" : item.danger ? "text-red-400" : "text-white/80"
                    }`}
                  >
                    {item.label}
                  </button>
                )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DraggableFile;

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuBar from "./MenuBar";
import InteractiveWallpaper from "./InteractiveWallpaper";
import Dock from "./Dock";
import Window from "./Window";
import Spotlight from "./Spotlight";
import Toast from "./Toast";
import type { ToastItem } from "./Toast";
import DraggableFile from "./DraggableFile";
import type { DesktopFile } from "./DraggableFile";
import AboutApp from "./apps/AboutApp";
import TerminalApp from "./apps/TerminalApp";
import ProjectsApp from "./apps/ProjectsApp";
import ExperienceApp from "./apps/ExperienceApp";
import ContactApp from "./apps/ContactApp";
import Screensaver from "./Screensaver";
import type { AppId, WindowState } from "./types";

const WINDOW_SIZES: Record<AppId, { width: number; height: number }> = {
  about:      { width: 700, height: 500 },
  terminal:   { width: 700, height: 460 },
  projects:   { width: 840, height: 580 },
  experience: { width: 720, height: 500 },
  contact:    { width: 640, height: 480 },
};

const WINDOW_TITLES: Record<AppId, string> = {
  about:      "About Me",
  terminal:   "vaibhav@vigility — zsh",
  projects:   "Projects",
  experience: "Experience",
  contact:    "New Message",
};

const INITIAL_WINDOWS: WindowState[] = (
  ["about", "terminal", "projects", "experience", "contact"] as AppId[]
).map((id, i) => ({
  id, isOpen: false, isMinimized: false, isMaximized: false,
  position: { x: 60 + i * 30, y: 55 + i * 18 }, zIndex: 10,
}));

const INITIAL_FILES: DesktopFile[] = [
  { id: "resume",   name: "Resume.pdf",  type: "pdf",    targetApp: "about",    pos: { x: 20, y: 52 } },
  { id: "projects", name: "Projects",    type: "folder", targetApp: "projects", pos: { x: 20, y: 140 } },
  { id: "skills",   name: "skills.json", type: "json",   targetApp: "terminal", pos: { x: 20, y: 228 } },
  { id: "contact",  name: "Contact.vcf", type: "vcf",    targetApp: "contact",  pos: { x: 20, y: 316 } },
];

const SHORTCUT_MAP: Record<string, AppId> = {
  Digit1: "about", Digit2: "terminal", Digit3: "projects",
  Digit4: "experience", Digit5: "contact",
};

/* ─── Desktop right-click menu items ─────────────────────────── */
const DESKTOP_CTX = [
  { label: "Open About Me",    action: "about" as AppId },
  { label: "Open Terminal",    action: "terminal" as AppId },
  { label: "Open Projects",    action: "projects" as AppId },
  null,
  { label: "Open Resume",      action: "resume" as const },
  null,
  { label: "Spotlight Search", action: "spotlight" as const },
];

/* ─── Desktop ─────────────────────────────────────────────────── */
const Desktop = () => {
  const [windows,        setWindows]        = useState<WindowState[]>(INITIAL_WINDOWS);
  const [topZ,           setTopZ]           = useState(20);
  const [files,          setFiles]          = useState<DesktopFile[]>(INITIAL_FILES);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [draggingFileId, setDraggingFileId] = useState<string | null>(null);
  const [draggingOverApp,setDraggingOverApp]= useState<AppId | null>(null);
  const [bouncingApp,    setBouncingApp]    = useState<AppId | null>(null);
  const [spotlightOpen,  setSpotlightOpen]  = useState(false);
  const [toasts,         setToasts]         = useState<ToastItem[]>([]);
  const [desktopCtx,      setDesktopCtx]      = useState<{ x: number; y: number } | null>(null);
  const [nameOpacity,     setNameOpacity]      = useState(0.18);
  const [screensaverActive, setScreensaverActive] = useState(false);
  const lastXRef       = useRef<number | null>(null);
  const lastYRef       = useRef<number | null>(null);
  const fadeTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityRef = useRef(Date.now());
  const screensaverRef  = useRef(false);

  /* ── Toast helpers ──────────────────────────────────────────── */
  const addToast = useCallback((title: string, sub: string, type: ToastItem["type"] = "info") => {
    const id = `${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, sub, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3800);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Screensaver ────────────────────────────────────────────── */
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (screensaverRef.current) {
      screensaverRef.current = false;
      setScreensaverActive(false);
    }
  }, []);

  useEffect(() => {
    const IDLE_MS = 45_000;
    const check = setInterval(() => {
      if (!screensaverRef.current && Date.now() - lastActivityRef.current > IDLE_MS) {
        screensaverRef.current = true;
        setScreensaverActive(true);
      }
    }, 5000);
    const onActivity = () => updateActivity();
    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keydown",   onActivity);
    window.addEventListener("mousedown", onActivity);
    return () => {
      clearInterval(check);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown",   onActivity);
      window.removeEventListener("mousedown", onActivity);
    };
  }, [updateActivity]);

  /* ── App management ─────────────────────────────────────────── */
  const bringToFront = useCallback((id: AppId) => {
    const z = topZ + 1;
    setTopZ(z);
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)));
    return z;
  }, [topZ]);

  const openApp = useCallback((id: AppId) => {
    const z = topZ + 1;
    setTopZ(z);
    setWindows((prev) =>
      prev.map((w) => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: z } : w)
    );
    /* bounce the dock icon */
    setBouncingApp(id);
    setTimeout(() => setBouncingApp(null), 700);
  }, [topZ]);

  const closeApp = useCallback((id: AppId) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))), []);

  const minimizeApp = useCallback((id: AppId) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))), []);

  const maximizeApp = useCallback((id: AppId) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))), []);

  const moveApp = useCallback((id: AppId, pos: { x: number; y: number }) =>
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: pos } : w))), []);

  /* ── Keyboard shortcuts ─────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.code === "Space") { e.preventDefault(); setSpotlightOpen((v) => !v); return; }
      if (e.key === "Escape")        { setSpotlightOpen(false); setDesktopCtx(null); return; }
      if (mod && SHORTCUT_MAP[e.code]) { e.preventDefault(); openApp(SHORTCUT_MAP[e.code]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openApp]);

  /* ── File drag handlers ─────────────────────────────────────── */
  const handleFileDragStart = useCallback((id: string) => {
    setDraggingFileId(id); setDraggingOverApp(null);
  }, []);

  const handleFileDragMove = useCallback((cursor: { x: number; y: number }) => {
    const el = document.elementFromPoint(cursor.x, cursor.y);
    const appId = el?.closest("[data-dock-app]")?.getAttribute("data-dock-app") as AppId | null;
    setDraggingOverApp(appId ?? null);
  }, []);

  const handleFileDragEnd = useCallback((_fileId: string, _pos: { x: number; y: number }, cursor: { x: number; y: number }) => {
    const el = document.elementFromPoint(cursor.x, cursor.y);
    const appId = el?.closest("[data-dock-app]")?.getAttribute("data-dock-app") as AppId | null;
    if (appId) openApp(appId);
    setDraggingFileId(null); setDraggingOverApp(null);
  }, [openApp]);

  const handleFilePositionChange = useCallback((id: string, pos: { x: number; y: number }) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, pos } : f)));
  }, []);

  const handleFileOpen = useCallback((file: DesktopFile) => {
    if (file.id === "resume") {
      window.open("/Vaibhav_Ghildiyal_27-05-2026.pdf", "_blank");
      addToast("Resume", "Opening PDF in new tab", "info");
    } else {
      openApp(file.targetApp);
    }
  }, [openApp, addToast]);

  /* ── Mouse ──────────────────────────────────────────────────── */
  const handleDesktopClick = useCallback(() => {
    setSelectedFileId(null); setDesktopCtx(null);
  }, []);

  const handleDesktopContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDesktopCtx({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const dx = lastXRef.current !== null ? Math.abs(e.clientX - lastXRef.current) : 0;
    const dy = lastYRef.current !== null ? Math.abs(e.clientY - lastYRef.current) : 0;
    if (dx > 2 || dy > 2) {
      setNameOpacity(0.92);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = setTimeout(() => setNameOpacity(0.18), 700);
    }
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  }, []);

  /* ── App nodes (contact gets toast callback) ────────────────── */
  const APP_NODES: Record<AppId, React.ReactNode> = {
    about:      <AboutApp />,
    terminal:   <TerminalApp />,
    projects:   <ProjectsApp />,
    experience: <ExperienceApp />,
    contact:    <ContactApp onToast={addToast} />,
  };

  const maxZ = Math.max(...windows.map((w) => w.zIndex));
  const focusedId = windows.find((w) => w.isOpen && !w.isMinimized && w.zIndex === maxZ)?.id ?? null;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContextMenu}
      onMouseMove={handleMouseMove}
    >
      <InteractiveWallpaper />

      <MenuBar
        onOpenApp={openApp}
        onCloseAll={() => setWindows((prev) => prev.map((w) => ({ ...w, isOpen: false })))}
        openApps={windows.filter((w) => w.isOpen && !w.isMinimized).map((w) => w.id)}
        onSpotlight={() => setSpotlightOpen(true)}
      />

      {/* Desktop files */}
      <div className="absolute inset-0 top-7" style={{ pointerEvents: "none" }}>
        {files.map((file) => (
          <div key={file.id} style={{ pointerEvents: "auto" }}>
            <DraggableFile
              file={file}
              isSelected={selectedFileId === file.id}
              onSelect={(id) => setSelectedFileId(id)}
              onDragStart={handleFileDragStart}
              onDragMove={handleFileDragMove}
              onDragEnd={handleFileDragEnd}
              onOpen={handleFileOpen}
              onPositionChange={handleFilePositionChange}
            />
          </div>
        ))}
      </div>

      {/* Hint — no windows open */}
      {windows.every((w) => !w.isOpen) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 gap-3">
          <p
            className="text-[38px] font-black tracking-tighter transition-all duration-700"
            style={{ color: `rgba(255,255,255,${nameOpacity})` }}
          >
            Vaibhav Ghildiyal
          </p>
          <div className="flex items-center gap-1.5">
            <motion.p
              className="text-[12px] uppercase tracking-[0.28em]"
              style={{ color: "rgba(255,255,255,0.5)" }}
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Click an app in the dock
            </motion.p>
            <motion.span
              style={{ color: "rgba(255,255,255,0.5)", display: "inline-block" }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            >↓</motion.span>
          </div>
          <button
            className="mt-1 flex items-center gap-2 px-3 py-1.5 rounded-lg pointer-events-auto transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => { e.stopPropagation(); setSpotlightOpen(true); }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <kbd className="text-[11px] text-white/40" style={{ fontFamily: "monospace" }}>⌘</kbd>
            <span className="text-[11px] text-white/30 tracking-widest uppercase">Space</span>
            <span className="text-[11px] text-white/20">— Spotlight</span>
          </button>
        </div>
      )}

      {/* Windows */}
      <AnimatePresence>
        {windows.map((w) =>
          w.isOpen ? (
            <Window
              key={w.id}
              id={w.id}
              title={WINDOW_TITLES[w.id]}
              isFocused={w.id === focusedId}
              isMinimized={w.isMinimized}
              isMaximized={w.isMaximized}
              position={w.position}
              size={WINDOW_SIZES[w.id]}
              zIndex={w.zIndex}
              onClose={() => closeApp(w.id)}
              onMinimize={() => minimizeApp(w.id)}
              onMaximize={() => maximizeApp(w.id)}
              onFocus={() => bringToFront(w.id)}
              onMove={(pos) => moveApp(w.id, pos)}
            >
              {APP_NODES[w.id]}
            </Window>
          ) : null
        )}
      </AnimatePresence>

      <Dock
        windows={windows}
        onOpenApp={openApp}
        draggingOverApp={draggingOverApp}
        isDraggingFile={draggingFileId !== null}
        bouncingApp={bouncingApp}
      />

      {/* Spotlight */}
      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenApp={openApp}
      />

      {/* Toast notifications */}
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Screensaver — activates after 45s idle */}
      <Screensaver isActive={screensaverActive} onDismiss={updateActivity} />

      {/* Desktop right-click context menu */}
      <AnimatePresence>
        {desktopCtx && (
          <>
            <div className="fixed inset-0 z-[8000]" onClick={() => setDesktopCtx(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[8001] py-1 rounded-xl min-w-[200px]"
              style={{
                left: Math.min(desktopCtx.x, window.innerWidth - 210),
                top: Math.min(desktopCtx.y, window.innerHeight - 220),
                background: "rgba(32,32,36,0.97)",
                backdropFilter: "blur(28px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
              }}
            >
              {DESKTOP_CTX.map((item, i) =>
                item === null ? (
                  <div key={i} className="h-px mx-2 my-1" style={{ background: "rgba(255,255,255,0.08)" }} />
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.action === "spotlight") { setSpotlightOpen(true); }
                      else if (item.action === "resume") { window.open("/Vaibhav_Ghildiyal_27-05-2026.pdf", "_blank"); }
                      else { openApp(item.action as AppId); }
                      setDesktopCtx(null);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-[13px] text-white/80 hover:bg-blue-500 hover:text-white transition-colors rounded-sm"
                  >
                    {item.label}
                  </button>
                )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Desktop;

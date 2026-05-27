import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { AppId } from "./types";

interface Result {
  label: string;
  sub: string;
  category: "App" | "Project" | "Skill" | "Experience" | "File" | "Link";
  action: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

const CAT_COLORS: Record<Result["category"], string> = {
  App:        "#3478F6",
  Project:    "#FF6B6B",
  Skill:      "#28c840",
  Experience: "#FFB800",
  File:       "#A855F7",
  Link:       "#06B6D4",
};

const Spotlight = ({ isOpen, onClose, onOpenApp }: Props) => {
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { projects, skills, experience, personal } = portfolioData;

  const open = (id: AppId) => { onOpenApp(id); onClose(); };

  const ALL: Result[] = [
    { label: "About Me",    sub: "Profile, stats, links",          category: "App",        action: () => open("about") },
    { label: "Terminal",    sub: "Interactive shell — try 'help'",  category: "App",        action: () => open("terminal") },
    { label: "Projects",    sub: `${projects.length} featured works`, category: "App",     action: () => open("projects") },
    { label: "Experience",  sub: "Work history at Vigility",        category: "App",        action: () => open("experience") },
    { label: "Contact",     sub: personal.email,                    category: "App",        action: () => open("contact") },
    { label: "Resume",      sub: "Open PDF in new tab",             category: "File",       action: () => { window.open("/Vaibhav_Ghildiyal_27-05-2026.pdf", "_blank"); onClose(); } },
    { label: "GitHub",      sub: "github.com/Vaidiasri",            category: "Link",       action: () => { window.open(personal.github, "_blank"); onClose(); } },
    { label: "LinkedIn",    sub: "vaibhav-ghildiyal",               category: "Link",       action: () => { window.open(personal.linkedin, "_blank"); onClose(); } },
    ...projects.map((p): Result => ({
      label: p.title, sub: p.tech.slice(0, 3).join(" · "),
      category: "Project", action: () => open("projects"),
    })),
    ...skills.map((s): Result => ({
      label: s.name, sub: `${s.level}% proficiency`,
      category: "Skill", action: () => open("terminal"),
    })),
    ...experience.map((e): Result => ({
      label: e.role, sub: e.company,
      category: "Experience", action: () => open("experience"),
    })),
  ];

  const results = query.trim() === ""
    ? ALL.slice(0, 7)
    : ALL.filter((r) =>
        r.label.toLowerCase().includes(query.toLowerCase()) ||
        r.sub.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 9);

  useEffect(() => {
    if (isOpen) {
      setQuery(""); setSel(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => { setSel(0); }, [query]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSel((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[sel]) results[sel].action();
    if (e.key === "Escape") onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9991]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed z-[9992] left-1/2"
            style={{ width: 640, top: "18%", translateX: "-50%" }}
            initial={{ opacity: 0, scale: 0.95, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(26,26,30,0.94)",
                backdropFilter: "blur(48px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.13)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.06)",
              }}
            >
              {/* Input row */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <Search size={19} strokeWidth={2} color="rgba(255,255,255,0.3)" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Search projects, skills, apps…"
                  className="flex-1 bg-transparent outline-none text-[17px] text-white placeholder-white/20"
                  style={{ fontFamily: "-apple-system,'Inter',sans-serif" }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <X size={11} color="rgba(255,255,255,0.6)" />
                  </button>
                )}
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="py-1.5 max-h-80 overflow-auto">
                  {results.map((r, i) => (
                    <motion.button
                      key={i}
                      onClick={r.action}
                      onMouseEnter={() => setSel(i)}
                      className="w-full flex items-center gap-3.5 px-5 py-2.5 text-left"
                      animate={{ background: sel === i ? "rgba(52,120,246,0.22)" : "rgba(0,0,0,0)" }}
                      transition={{ duration: 0.08 }}
                    >
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 text-center"
                        style={{
                          background: `${CAT_COLORS[r.category]}22`,
                          color: CAT_COLORS[r.category],
                          minWidth: 58,
                          border: `1px solid ${CAT_COLORS[r.category]}33`,
                        }}
                      >
                        {r.category}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-white truncate">{r.label}</p>
                        <p className="text-[11px] text-white/35 truncate">{r.sub}</p>
                      </div>
                      {sel === i && (
                        <span
                          className="text-[11px] px-1.5 py-0.5 rounded shrink-0"
                          style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}
                        >↵</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

              {results.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-[14px] text-white/20">No results for "{query}"</p>
                </div>
              )}

              {/* Footer */}
              <div
                className="flex items-center gap-5 px-5 py-2.5 border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {[["↑↓", "navigate"], ["↵", "open"], ["esc", "dismiss"]].map(([k, l]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <kbd
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}
                    >{k}</kbd>
                    <span className="text-[10px] text-white/22">{l}</span>
                  </div>
                ))}
                <span className="ml-auto text-[10px] text-white/15">⌘Space</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Spotlight;

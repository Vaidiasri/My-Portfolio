import { useState, useEffect, useRef } from "react";
import type { AppId } from "./types";

const AppleLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="13" height="16" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.2 790.3 0 663.2 0 539.8 0 348.4 116.9 240.4 261 240.4c68.8 0 128.6 38.4 173.8 38.4 43.2 0 111.2-40.8 190-40.8 30.9 0 133 2.7 197.5 111.1zm-162-120.8c31.7-36.6 53-85.5 53-134.3 0-6.5-.7-13.1-1.9-19.4-50.1 1.9-110.3 33.6-147.5 76.1-28.9 32.5-55.3 81.3-55.3 130.8 0 7.1 1.3 14.2 1.9 16.5 3.2.6 8.4 1.3 13.6 1.3 44.9 0 100.1-29.7 135.2-71z" />
  </svg>
);

const WifiIcon = () => (
  <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor">
    <path d="M7.5 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM7.5 6.3C9.3 6.3 10.9 7 12 8.1l-1.2 1.2C9.9 8.4 8.8 8 7.5 8s-2.4.4-3.3 1.3L3 8.1C4.1 7 5.7 6.3 7.5 6.3zm0-3.3c2.6 0 5 1 6.8 2.6l-1.2 1.2C11.5 5 9.6 4.2 7.5 4.2S3.5 5 2.1 6.8L.9 5.6C2.7 4 5.1 3 7.5 3zm0-3C11 0 14.1 1.4 16.3 3.7l-1.2 1.2C13.3 3 10.5 1.8 7.5 1.8S1.7 3 -0.1 4.9L-1.3 3.7C.9 1.4 4 0 7.5 0z" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor" opacity={0.8}>
    <rect x="0.5" y="0.5" width="20" height="11" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
    <rect x="2" y="2" width="16" height="8" rx="1.5" fill="currentColor" />
    <path d="M22 4v4c1.1-.3 2-1.3 2-2s-.9-1.7-2-2z" />
  </svg>
);

/* ─── Dropdown menu ─────────────────────────────────────────────── */
type MenuItem =
  | { type: "item"; label: string; shortcut?: string; action: () => void; danger?: boolean }
  | { type: "separator" }
  | { type: "label"; label: string };

const Dropdown = ({
  items,
  onClose,
  offsetLeft = 0,
}: {
  items: MenuItem[];
  onClose: () => void;
  offsetLeft?: number;
}) => (
  <>
    <div className="fixed inset-0 z-[9988]" onClick={onClose} />
    <div
      className="fixed top-7 z-[9989] py-1.5 rounded-lg shadow-2xl min-w-[220px]"
      style={{
        left: offsetLeft,
        background: "rgba(36,36,40,0.97)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.65)",
      }}
    >
      {items.map((item, i) => {
        if (item.type === "separator")
          return <div key={i} className="h-px mx-3 my-1" style={{ background: "rgba(255,255,255,0.08)" }} />;
        if (item.type === "label")
          return (
            <div key={i} className="px-4 py-1 text-[11px] text-white/30 uppercase tracking-widest">
              {item.label}
            </div>
          );
        return (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            className={`w-full flex items-center justify-between px-4 py-1.5 text-[13px] hover:bg-blue-500 hover:text-white transition-colors rounded-sm group ${
              item.danger ? "text-red-400 hover:bg-red-500" : "text-white/80"
            }`}
          >
            <span>{item.label}</span>
            {item.shortcut && (
              <span className="text-[11px] text-white/30 group-hover:text-white/60 ml-8">{item.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  </>
);

/* ─── MenuBar ───────────────────────────────────────────────────── */
interface MenuBarProps {
  onOpenApp: (id: AppId) => void;
  onCloseAll: () => void;
  openApps: AppId[];
  onSpotlight: () => void;
}

type MenuId = "apple" | "portfolio" | "file" | "view" | "window" | "help";

const MenuBar = ({ onOpenApp, onCloseAll, openApps, onSpotlight }: MenuBarProps) => {
  const [now, setNow] = useState(new Date());
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const toggle = (id: MenuId) => setOpenMenu((prev) => (prev === id ? null : id));
  const close = () => setOpenMenu(null);

  /* ─── Menu definitions ──────────────────────────────────────── */
  const appleItems: MenuItem[] = [
    { type: "item", label: "About This Portfolio", action: () => onOpenApp("about") },
    { type: "separator" },
    { type: "label", label: "Developer" },
    { type: "item", label: "Vaibhav Ghildiyal", action: close },
    { type: "item", label: "Full Stack Developer", action: close },
    { type: "item", label: "Vigility Technology Pvt. Ltd.", action: close },
    { type: "separator" },
    { type: "item", label: "vaibhavghildiyal2101@gmail.com", action: () => { window.location.href = "mailto:vaibhavghildiyal2101@gmail.com"; } },
    { type: "item", label: "+91 9368209983", action: close },
  ];

  const portfolioItems: MenuItem[] = [
    { type: "item", label: "About Me", shortcut: "⌘1", action: () => onOpenApp("about") },
    { type: "item", label: "Terminal", shortcut: "⌘2", action: () => onOpenApp("terminal") },
    { type: "item", label: "Projects", shortcut: "⌘3", action: () => onOpenApp("projects") },
    { type: "item", label: "Experience", shortcut: "⌘4", action: () => onOpenApp("experience") },
    { type: "item", label: "Contact", shortcut: "⌘5", action: () => onOpenApp("contact") },
  ];

  const fileItems: MenuItem[] = [
    { type: "item", label: "Open Resume", shortcut: "⌘O", action: () => window.open("/Vaibhav_Ghildiyal_27-05-2026.pdf", "_blank") },
    { type: "separator" },
    { type: "item", label: "Close All Windows", shortcut: "⌘W", action: onCloseAll, danger: false },
  ];

  const APP_LABELS: Record<AppId, string> = {
    about: "About Me",
    terminal: "Terminal",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  };

  const windowItems: MenuItem[] = [
    { type: "item", label: "Bring All to Front", action: close },
    ...(openApps.length > 0
      ? [{ type: "separator" as const }, ...openApps.map((id) => ({
          type: "item" as const,
          label: APP_LABELS[id],
          action: () => onOpenApp(id),
        }))]
      : []),
    ...(openApps.length === 0
      ? [{ type: "label" as const, label: "No open windows" }]
      : []),
  ];

  const helpItems: MenuItem[] = [
    { type: "item", label: "Spotlight Search", shortcut: "⌘Space", action: onSpotlight },
    { type: "separator" },
    { type: "item", label: "Send Email", action: () => { window.location.href = "mailto:vaibhavghildiyal2101@gmail.com"; } },
    { type: "item", label: "GitHub Profile", action: () => window.open("https://github.com/Vaidiasri", "_blank") },
    { type: "item", label: "LinkedIn", action: () => window.open("https://www.linkedin.com/in/vaibhav-ghildiyal-a2a9b8212/", "_blank") },
    { type: "separator" },
    { type: "item", label: "Open Contact App", action: () => onOpenApp("contact") },
  ];

  /* ─── Button offset calculation ─────────────────────────────── */
  const getOffset = (index: number) => {
    if (!barRef.current) return 0;
    const buttons = barRef.current.querySelectorAll("[data-menu-btn]");
    const btn = buttons[index] as HTMLElement | undefined;
    return btn ? btn.getBoundingClientRect().left : 0;
  };

  const menus: { id: MenuId; label: string; items: MenuItem[] }[] = [
    { id: "portfolio", label: "Portfolio", items: portfolioItems },
    { id: "file",      label: "File",      items: fileItems },
    { id: "window",    label: "Window",    items: windowItems },
    { id: "help",      label: "Help",      items: helpItems },
  ];

  return (
    <>
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-7 z-[9990] flex items-center justify-between select-none"
        style={{
          background: "rgba(0,0,0,0.62)",
          backdropFilter: "blur(20px) saturate(200%)",
          WebkitBackdropFilter: "blur(20px) saturate(200%)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Left side */}
        <div className="flex items-center h-full">
          {/* Apple menu */}
          <button
            data-menu-btn
            className={`px-3 h-full flex items-center text-white transition-colors ${openMenu === "apple" ? "bg-white/15" : "hover:bg-white/10"}`}
            onClick={() => toggle("apple")}
          >
            <AppleLogo />
          </button>

          {menus.map(({ id, label }) => (
            <button
              key={id}
              data-menu-btn
              className={`px-3 h-full text-[13px] transition-colors hidden sm:flex items-center ${
                openMenu === id
                  ? "bg-white/15 text-white"
                  : id === "portfolio"
                  ? "font-semibold text-white hover:bg-white/10"
                  : "text-white/80 hover:bg-white/10"
              }`}
              onClick={() => toggle(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center h-full gap-1 pr-2 text-white/85">
          <div className="px-2 h-full hidden sm:flex items-center gap-1.5">
            <BatteryIcon />
            <span className="text-[12px]">100%</span>
          </div>
          <div className="px-2 h-full hidden sm:flex items-center">
            <WifiIcon />
          </div>
          <div className="px-3 h-full hidden md:flex items-center text-[13px]">{dateStr}</div>
          <div className="px-3 h-full flex items-center text-[13px] font-medium">{timeStr}</div>
        </div>
      </div>

      {/* Dropdowns */}
      {openMenu === "apple" && (
        <Dropdown items={appleItems} onClose={close} offsetLeft={0} />
      )}
      {menus.map(({ id, items }, idx) =>
        openMenu === id ? (
          <Dropdown
            key={id}
            items={items}
            onClose={close}
            offsetLeft={getOffset(idx + 1)}
          />
        ) : null
      )}
    </>
  );
};

export default MenuBar;

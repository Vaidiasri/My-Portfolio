import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import {
  Github, Linkedin, Mail, Phone, MapPin, ExternalLink,
  User, Code2, Briefcase, MessageSquare, House, X,
} from "lucide-react";

const { personal, skills, projects, experience, contact } = portfolioData;

/* ─── iOS color tokens ──────────────────────────────────────────── */
const C = {
  bg:        "#000000",
  bg2:       "#1C1C1E",
  bg3:       "#2C2C2E",
  bg4:       "#3A3A3C",
  label:     "#FFFFFF",
  secondary: "rgba(235,235,245,0.6)",
  tertiary:  "rgba(235,235,245,0.3)",
  separator: "rgba(60,60,67,0.36)",
  blue:      "#0A84FF",
  indigo:    "#5E5CE6",
  green:     "#30D158",
  teal:      "#40CBE0",
};

/* ─── Status bar ────────────────────────────────────────────────── */
const StatusBar = () => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
  );
  useEffect(() => {
    const t = setInterval(() =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }))
    , 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex items-center justify-between select-none"
      style={{ padding: "14px 24px 4px", color: C.label, fontSize: 15, fontWeight: 600 }}
    >
      <span style={{ letterSpacing: "-0.3px" }}>{time}</span>
      {/* Signal + WiFi + Battery */}
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0"  y="7"  width="3" height="5" rx="0.8" opacity="1" />
          <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" opacity="1" />
          <rect x="9"  y="2"  width="3" height="10" rx="0.8" opacity="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.8" opacity="0.35" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          <path d="M8 6c1.5 0 2.9.6 3.9 1.6L13 6.4A6.5 6.5 0 0 0 8 4.3a6.5 6.5 0 0 0-5 2.1l1.1 1.2A4.8 4.8 0 0 1 8 6z" />
          <path d="M8 2.5c2.6 0 5 1 6.7 2.7l1.1-1.2A9.5 9.5 0 0 0 8 .7a9.5 9.5 0 0 0-7.8 3.3L1.3 5.2A7.8 7.8 0 0 1 8 2.5z" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="1" width="20" height="10" rx="3" stroke="white" strokeWidth="1" opacity="0.35" />
          <rect x="2"   y="2.5" width="17" height="7" rx="2" fill="white" />
          <path d="M21.5 4.5v3c1-.3 1.5-1 1.5-1.5s-.5-1.2-1.5-1.5z" fill="white" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
};

/* ─── Dynamic Island ────────────────────────────────────────────── */
const DynamicIsland = () => (
  <div className="flex justify-center" style={{ marginTop: -2, marginBottom: 8 }}>
    <div
      style={{
        width: 120, height: 34,
        background: "#000",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 0 1px rgba(0,0,0,1), 0 4px 20px rgba(0,0,0,0.8)",
      }}
    />
  </div>
);

/* ─── Tag pill ──────────────────────────────────────────────────── */
const tagColors: Record<string, string> = {
  React: "rgba(96,165,250,0.18)", "Next.js": "rgba(156,163,175,0.18)",
  TypeScript: "rgba(96,165,250,0.2)", Python: "rgba(250,204,21,0.18)",
  PyTorch: "rgba(251,146,60,0.18)", FastAPI: "rgba(52,211,153,0.18)",
  "Three.js": "rgba(167,139,250,0.18)", LangChain: "rgba(52,211,153,0.2)",
  OpenAI: "rgba(45,212,191,0.18)", PostgreSQL: "rgba(96,165,250,0.2)",
  RAG: "rgba(167,139,250,0.2)", "Node.js": "rgba(74,222,128,0.18)",
  MongoDB: "rgba(74,222,128,0.18)",
};
const Tag = ({ label }: { label: string }) => (
  <span
    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
    style={{
      background: tagColors[label] ?? "rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.7)",
    }}
  >
    {label}
  </span>
);

/* ─── iOS Card ──────────────────────────────────────────────────── */
const Card = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      background: C.bg2,
      borderRadius: 16,
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

/* ─── iOS List cell ─────────────────────────────────────────────── */
const Cell = ({
  icon, label, value, href, last = false,
}: { icon: React.ReactNode; label: string; value?: string; href?: string; last?: boolean }) => {
  const inner = (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-4"
      style={{ paddingTop: 12, paddingBottom: 12 }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(94,92,230,0.2)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium" style={{ color: C.label }}>{label}</p>
        {value && <p className="text-[12px] truncate mt-0.5" style={{ color: C.secondary }}>{value}</p>}
      </div>
      {href && (
        <svg width="8" height="13" viewBox="0 0 8 13" fill="rgba(235,235,245,0.3)">
          <path d="M1 1l6 5.5L1 12" stroke="rgba(235,235,245,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}
      {!last && (
        <div className="absolute bottom-0 left-16 right-0 h-px" style={{ background: C.separator }} />
      )}
    </motion.div>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="relative block">
      {inner}
    </a>
  ) : (
    <div className="relative">{inner}</div>
  );
};

/* ─── Bottom sheet ──────────────────────────────────────────────── */
const Sheet = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex flex-col justify-end"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
    <motion.div
      className="relative rounded-t-3xl overflow-hidden flex flex-col"
      style={{ background: C.bg2, maxHeight: "88vh" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
    >
      {/* Handle */}
      <div className="flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-9 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
      </div>
      {/* Close btn */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 w-8 h-8 rounded-full flex items-center justify-center"
        style={{ background: C.bg4 }}
      >
        <X size={14} color="rgba(255,255,255,0.7)" />
      </button>
      <div className="overflow-auto flex-1 pb-8">{children}</div>
    </motion.div>
  </motion.div>
);

/* ─── Tab config ────────────────────────────────────────────────── */
const TABS = [
  { id: "home",       label: "Home",       Icon: House },
  { id: "about",      label: "About",      Icon: User },
  { id: "projects",   label: "Projects",   Icon: Code2 },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "contact",    label: "Contact",    Icon: MessageSquare },
];

/* ─── Tab content ───────────────────────────────────────────────── */
const HomeTab = ({ openTab }: { openTab: (id: string) => void }) => (
  <div className="px-4 flex flex-col gap-3 pb-4">
    {/* Hero widget */}
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a3e 0%, #0f0f2a 60%, #1C1C1E 100%)",
        border: "1px solid rgba(94,92,230,0.2)",
      }}
    >
      {/* Subtle glow */}
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(94,92,230,0.18) 0%, transparent 70%)"
      }} />
      <div className="relative">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-lg font-bold text-white"
          style={{ background: "linear-gradient(135deg, #5E5CE6, #40CBE0)", boxShadow: "0 6px 24px rgba(94,92,230,0.4)" }}
        >
          VG
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />
          <span className="text-[11px] font-medium" style={{ color: C.green }}>Available for opportunities</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-0.5" style={{ color: C.label }}>
          {personal.name}
        </h1>
        <p className="text-[14px] font-medium mb-0.5" style={{ color: C.indigo }}>{personal.role}</p>
        <p className="text-[12px]" style={{ color: C.tertiary }}>{personal.company}, Noida</p>
      </div>
    </div>

    {/* Stats row — iOS mini widgets */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { v: `${projects.length}`, l: "Projects" },
        { v: "1+",  l: "Yrs Exp." },
        { v: "96%", l: "AI Acc." },
      ].map(({ v, l }) => (
        <div key={l} className="rounded-2xl p-3 flex flex-col gap-1" style={{ background: C.bg2 }}>
          <span className="text-xl font-black" style={{ color: C.label }}>{v}</span>
          <span className="text-[11px]" style={{ color: C.tertiary }}>{l}</span>
        </div>
      ))}
    </div>

    {/* Quick actions */}
    <Card>
      <div className="p-1">
        {[
          { icon: <User size={15} color={C.indigo} />,    label: "About Me",       tab: "about" },
          { icon: <Code2 size={15} color={C.blue} />,     label: "Projects",       tab: "projects" },
          { icon: <Briefcase size={15} color="#FF6B6B" />, label: "Experience",     tab: "experience" },
          { icon: <MessageSquare size={15} color={C.green} />, label: "Contact Me", tab: "contact" },
        ].map(({ icon, label, tab }, i, arr) => (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.97 }}
            onClick={() => openTab(tab)}
            className="w-full flex items-center gap-3 px-3 py-3 text-left relative"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: C.bg3 }}>
              {icon}
            </div>
            <span className="text-[15px] font-medium flex-1" style={{ color: C.label }}>{label}</span>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
              <path d="M1 1l6 5.5L1 12" stroke="rgba(235,235,245,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {i < arr.length - 1 && (
              <div className="absolute bottom-0 left-14 right-0 h-px" style={{ background: C.separator }} />
            )}
          </motion.button>
        ))}
      </div>
    </Card>

    {/* Featured project */}
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: C.tertiary }}>
        Featured Project
      </p>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => openTab("projects")}
        className="w-full text-left rounded-2xl overflow-hidden"
        style={{ background: C.bg2 }}
      >
        {projects[0].image && (
          <img src={projects[0].image} alt={projects[0].title} className="w-full aspect-video object-cover" style={{ opacity: 0.85 }} />
        )}
        <div className="px-4 py-3">
          <p className="text-[15px] font-semibold mb-1" style={{ color: C.label }}>{projects[0].title}</p>
          <p className="text-[12px] line-clamp-2 mb-2" style={{ color: C.secondary }}>{projects[0].description}</p>
          <div className="flex gap-1.5 flex-wrap">
            {projects[0].tech.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      </motion.button>
    </div>
  </div>
);

const AboutTab = () => (
  <div className="px-4 flex flex-col gap-3 pb-4">
    <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>Profile</p>
    <Card>
      <div className="p-4 text-[14px] leading-relaxed" style={{ color: C.secondary }}>{personal.bio}</div>
    </Card>

    <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>Skills</p>
    <Card>
      <div className="p-4 flex flex-col gap-3">
        {skills.map((s) => (
          <div key={s.name}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[14px] font-medium" style={{ color: C.label }}>{s.name}</span>
              <span className="text-[12px]" style={{ color: C.tertiary }}>{s.level}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: C.bg4 }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${s.level}%`, background: `linear-gradient(90deg, ${C.indigo}, ${C.teal})` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const ProjectsTab = () => {
  const [sheet, setSheet] = useState<number | null>(null);
  const p = sheet !== null ? projects[sheet] : null;
  return (
    <>
      <div className="px-4 flex flex-col gap-3 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>
          {projects.length} Projects
        </p>
        {projects.map((proj, i) => (
          <motion.button
            key={i} whileTap={{ scale: 0.98 }}
            onClick={() => setSheet(i)}
            className="w-full text-left rounded-2xl overflow-hidden"
            style={{ background: C.bg2 }}
          >
            {proj.image && (
              <img src={proj.image} alt={proj.title} className="w-full aspect-video object-cover" style={{ opacity: 0.8 }} />
            )}
            <div className="px-4 py-3">
              <p className="text-[15px] font-semibold mb-1" style={{ color: C.label }}>{proj.title}</p>
              <p className="text-[12px] line-clamp-2 mb-2" style={{ color: C.secondary }}>{proj.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {proj.tech.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
                {proj.tech.length > 3 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: C.bg3, color: C.tertiary }}>
                    +{proj.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {p && (
          <Sheet onClose={() => setSheet(null)}>
            <div className="px-5 pt-2 pb-6">
              {p.image && (
                <div className="rounded-2xl overflow-hidden aspect-video mb-5">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h2 className="text-xl font-bold mb-2" style={{ color: C.label }}>{p.title}</h2>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: C.secondary }}>{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tech.map((t) => <Tag key={t} label={t} />)}
              </div>
              <div className="flex gap-3">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold text-white"
                    style={{ background: C.blue }}>
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-medium border"
                    style={{ color: C.secondary, borderColor: C.bg4 }}>
                    <Github size={14} /> Code
                  </a>
                )}
              </div>
            </div>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
};

const ExperienceTab = () => {
  const [sheet, setSheet] = useState<number | null>(null);
  const e = sheet !== null ? experience[sheet] : null;
  return (
    <>
      <div className="px-4 flex flex-col gap-3 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>Work History</p>
        {experience.map((exp, i) => (
          <motion.button
            key={i} whileTap={{ scale: 0.98 }}
            onClick={() => setSheet(i)}
            className="w-full text-left rounded-2xl p-4"
            style={{ background: C.bg2 }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-[15px] font-semibold" style={{ color: C.label }}>{exp.role}</p>
                <p className="text-[13px]" style={{ color: C.indigo }}>{exp.company}</p>
              </div>
              <span className="text-[11px] px-2 py-1 rounded-full shrink-0" style={{ background: "rgba(94,92,230,0.15)", color: "#9b99f5" }}>
                {exp.period}
              </span>
            </div>
            <p className="text-[12px] line-clamp-2 mb-2" style={{ color: C.secondary }}>{exp.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {e && (
          <Sheet onClose={() => setSheet(null)}>
            <div className="px-5 pt-2 pb-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: C.tertiary }}>Experience</p>
              <h2 className="text-xl font-bold mb-1" style={{ color: C.label }}>{e.role}</h2>
              <p className="text-[14px] mb-1" style={{ color: C.indigo }}>{e.company}</p>
              <p className="text-[12px] mb-4" style={{ color: C.tertiary }}>{e.period}</p>
              <p className="text-[14px] leading-relaxed mb-4" style={{ color: C.secondary }}>{e.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {e.technologies.map((t) => <Tag key={t} label={t} />)}
              </div>
            </div>
          </Sheet>
        )}
      </AnimatePresence>
    </>
  );
};

const ContactTab = () => (
  <div className="px-4 flex flex-col gap-3 pb-4">
    <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>Get In Touch</p>
    <Card>
      <Cell icon={<Mail size={16} color={C.blue} />}    label="Email"    value={contact.email}    href={`mailto:${contact.email}`} />
      <Cell icon={<Phone size={16} color={C.green} />}  label="Phone"    value={contact.phone}    href={`tel:${contact.phone}`} />
      <Cell icon={<MapPin size={16} color="#FF6B6B" />} label="Location" value={contact.location} last />
    </Card>

    <p className="text-[11px] font-semibold uppercase tracking-widest px-1" style={{ color: C.tertiary }}>Social</p>
    <Card>
      <Cell icon={<Github size={16} color={C.label} />}    label="GitHub"   value="github.com/Vaidiasri"              href={personal.github} />
      <Cell icon={<Linkedin size={16} color={C.blue} />}   label="LinkedIn" value="vaibhav-ghildiyal"                 href={personal.linkedin} last />
    </Card>

    <div className="flex gap-3 pt-1">
      <a href={`mailto:${personal.email}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[15px] font-semibold text-white"
        style={{ background: C.blue }}>
        <Mail size={16} /> Send Email
      </a>
      <a href={personal.github} target="_blank" rel="noreferrer"
        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-[15px] font-semibold"
        style={{ background: C.bg2, color: C.label }}>
        <Github size={16} />
      </a>
    </div>
  </div>
);

/* ─── Bottom tab bar ────────────────────────────────────────────── */
const TabBar = ({ active, setActive }: { active: string; setActive: (id: string) => void }) => (
  <div
    className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around"
    style={{
      background: "rgba(18,18,20,0.82)",
      backdropFilter: "blur(40px) saturate(180%)",
      WebkitBackdropFilter: "blur(40px) saturate(180%)",
      borderTop: `1px solid ${C.separator}`,
      paddingBottom: "max(16px, env(safe-area-inset-bottom))",
      paddingTop: 10,
    }}
  >
    {TABS.map(({ id, label, Icon }) => {
      const on = active === id;
      return (
        <motion.button
          key={id}
          whileTap={{ scale: 0.88 }}
          onClick={() => setActive(id)}
          className="flex flex-col items-center gap-1"
          style={{ minWidth: 52 }}
        >
          <div
            className="w-8 h-8 flex items-center justify-center rounded-xl transition-all"
            style={{ background: on ? "rgba(94,92,230,0.2)" : "transparent" }}
          >
            <Icon size={20} strokeWidth={on ? 2.2 : 1.6} color={on ? C.indigo : "rgba(235,235,245,0.35)"} />
          </div>
          <span className="text-[10px] font-medium" style={{ color: on ? C.indigo : "rgba(235,235,245,0.3)" }}>
            {label}
          </span>
        </motion.button>
      );
    })}
  </div>
);

/* ─── Root ──────────────────────────────────────────────────────── */
const MobilePortfolio = () => {
  const [tab, setTab] = useState("home");

  const content: Record<string, React.ReactNode> = {
    home:       <HomeTab openTab={setTab} />,
    about:      <AboutTab />,
    projects:   <ProjectsTab />,
    experience: <ExperienceTab />,
    contact:    <ContactTab />,
  };

  return (
    <div className="min-h-screen select-none" style={{ background: C.bg, fontFamily: "-apple-system, 'SF Pro Display', 'Inter', sans-serif" }}>
      <StatusBar />
      <DynamicIsland />

      {/* Page title */}
      <div className="px-4 pb-3">
        <h1 className="text-[28px] font-black tracking-tight" style={{ color: C.label }}>
          {TABS.find((t) => t.id === tab)?.label}
        </h1>
      </div>

      {/* Scrollable content */}
      <div style={{ paddingBottom: 90 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {content[tab]}
          </motion.div>
        </AnimatePresence>
      </div>

      <TabBar active={tab} setActive={setTab} />
    </div>
  );
};

export default MobilePortfolio;

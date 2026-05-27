import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { User, BarChart2, Link2, ExternalLink, Github, Linkedin, Mail, CheckCircle2 } from "lucide-react";

type Tab = "profile" | "stats" | "links";

const tabs: { id: Tab; Icon: React.ComponentType<{ size?: number; className?: string }>; label: string }[] = [
  { id: "profile", Icon: User, label: "Profile" },
  { id: "stats", Icon: BarChart2, label: "Stats" },
  { id: "links", Icon: Link2, label: "Links" },
];

const stats = [
  { value: "01+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "2", label: "Active Clients" },
  { value: "∞", label: "Lines of Code" },
];

const AboutApp = () => {
  const [active, setActive] = useState<Tab>("profile");
  const { personal, contact } = portfolioData;

  return (
    <div className="flex h-full" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div
        className="w-44 shrink-0 flex flex-col py-3 border-r"
        style={{ background: "#252527", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="px-4 pb-2 text-[10px] font-semibold text-white/25 uppercase tracking-[0.15em]">
          Navigation
        </p>
        {tabs.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 mx-2 px-3 py-1.5 rounded-md text-[13px] transition-all text-left ${
              active === id
                ? "bg-[#3478F6] text-white"
                : "text-white/55 hover:bg-white/6 hover:text-white/80"
            }`}
          >
            <Icon size={14} className="shrink-0" />
            <span>{label}</span>
          </button>
        ))}

        <div className="mt-auto px-4 pt-4 border-t border-white/5 mx-1">
          <p className="text-[10px] text-white/22 leading-relaxed">
            Vigility Technology<br />Pvt. Ltd., Noida
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5">
        {active === "profile" && (
          <div className="flex flex-col items-center text-center gap-4 pt-2">
            {/* Avatar — initials placeholder */}
            <div className="relative">
              <div
                className="w-[100px] h-[100px] rounded-full flex items-center justify-center select-none"
                style={{
                  background: "linear-gradient(135deg, #3478F6 0%, #5E5CE6 50%, #40CBE0 100%)",
                  boxShadow: "0 0 0 3px rgba(255,255,255,0.1), 0 4px 24px rgba(52,120,246,0.45)",
                  fontSize: 32,
                  fontWeight: 800,
                  color: "white",
                  letterSpacing: "-1px",
                  fontFamily: "-apple-system, 'Inter', sans-serif",
                }}
              >
                VG
              </div>
              {/* Online badge */}
              <div
                className="absolute bottom-0.5 right-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{ background: "#28c840", borderColor: "#252527" }}
              >
                <CheckCircle2 size={12} color="white" strokeWidth={2.5} />
              </div>
            </div>

            <div>
              <h2 className="text-[20px] font-bold text-white tracking-tight">{personal.name}</h2>
              <p className="text-[13px] font-medium mt-0.5" style={{ color: "#3478F6" }}>
                {personal.role}
              </p>
              <p className="text-[11px] text-white/35 mt-0.5">@ Vigility Technology Pvt. Ltd.</p>
            </div>

            <p className="text-[12px] text-white/50 leading-relaxed max-w-xs text-left">
              {personal.bio}
            </p>

            {/* Info grid */}
            <div className="w-full max-w-xs grid grid-cols-2 gap-2 mt-1">
              {[
                { label: "Location", value: contact.location },
                { label: "Status", value: "Available" },
                { label: "Email", value: contact.email.split("@")[0] + "@…" },
                { label: "Phone", value: contact.phone },
              ].map((item) => (
                <div
                  key={item.label}
                  className="text-left px-3 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <p className="text-[9px] text-white/25 uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-[11px] text-white/75 font-medium truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "stats" && (
          <div className="pt-1">
            <h3 className="text-[15px] font-semibold text-white mb-4">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="text-[36px] font-black text-white leading-none mb-1">{s.value}</p>
                  <p className="text-[10px] text-white/35 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3.5 rounded-xl"
              style={{ background: "rgba(52,120,246,0.1)", border: "1px solid rgba(52,120,246,0.2)" }}
            >
              <p className="text-[12px] font-semibold mb-1" style={{ color: "#71AAFF" }}>Currently at Vigility Technology</p>
              <p className="text-[11px] text-white/50">
                Building AI-powered web applications in Noida. Open to new projects and collaborations.
              </p>
            </div>
          </div>
        )}

        {active === "links" && (
          <div className="pt-1">
            <h3 className="text-[15px] font-semibold text-white mb-4">Connect With Me</h3>
            <div className="space-y-2.5">
              {[
                {
                  Icon: Github, label: "GitHub", sub: "github.com/Vaidiasri",
                  href: personal.github, from: "#24292e", to: "#0d1117",
                },
                {
                  Icon: Linkedin, label: "LinkedIn", sub: "vaibhav-ghildiyal",
                  href: personal.linkedin, from: "#0077B5", to: "#005585",
                },
                {
                  Icon: Mail, label: "Email", sub: personal.email,
                  href: `mailto:${personal.email}`, from: "#3478F6", to: "#1a5cc4",
                },
              ].map(({ Icon, label, sub, href, from, to }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-xl group transition-all hover:scale-[1.015]"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md shrink-0"
                    style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
                  >
                    <Icon size={17} color="white" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white">{label}</p>
                    <p className="text-[11px] text-white/35 truncate">{sub}</p>
                  </div>
                  <ExternalLink size={12} className="text-white/18 group-hover:text-white/50 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutApp;

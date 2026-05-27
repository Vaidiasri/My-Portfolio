import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Send, Trash2, Mail, Phone, MapPin } from "lucide-react";

interface Props {
  onToast?: (title: string, sub: string, type?: "success" | "info") => void;
}

const ContactApp = ({ onToast }: Props) => {
  const [form, setForm] = useState({ subject: "", body: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSend = () => {
    if (!form.subject.trim() || !form.body.trim()) return;
    setSending(true);
    setTimeout(() => {
      const url = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.body)}`;
      window.location.href = url;
      setSending(false);
      setSent(true);
      onToast?.("Message sent!", "Opening your email client…", "success");
      setTimeout(() => {
        setSent(false);
        setForm({ subject: "", body: "" });
      }, 3500);
    }, 700);
  };

  const handleDiscard = () => {
    setForm({ subject: "", body: "" });
    setSent(false);
  };

  const canSend = form.subject.trim() && form.body.trim() && !sending && !sent;

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif", color: "#f0f0f0" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0 gap-3"
        style={{ background: "#2a2a2c", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-3 items-center">
          <button
            onClick={handleDiscard}
            className="text-[12px] text-white/40 hover:text-white/65 transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={13} /> Discard
          </button>
        </div>

        <span className="text-[13px] font-medium text-white/50">New Message</span>

        <button
          onClick={handleSend}
          disabled={!canSend}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[13px] font-semibold text-white transition-all disabled:opacity-35"
          style={{ background: "rgba(52,120,246,0.85)" }}
        >
          {sent ? "✓ Sent!" : sending ? "Opening…" : <><Send size={13} /> Send</>}
        </button>
      </div>

      {/* Fields */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* To — read-only */}
        <div className="flex items-center px-4 py-2.5 border-b gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-[13px] font-semibold text-white/30 w-16 shrink-0 text-right">To:</span>
          <span className="text-[13px] text-white/55">{portfolioData.contact.email}</span>
        </div>

        {/* Subject */}
        <div className="flex items-center px-4 py-2.5 border-b gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <span className="text-[13px] font-semibold text-white/30 w-16 shrink-0 text-right">Subject:</span>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => set("subject", e.target.value)}
            placeholder="Your message subject…"
            className="flex-1 bg-transparent text-[13px] text-white/80 outline-none placeholder:text-white/18"
          />
        </div>

        {/* Body */}
        <div className="flex-1 p-4">
          <textarea
            value={form.body}
            onChange={(e) => set("body", e.target.value)}
            placeholder="Write your message here…"
            className="w-full h-full bg-transparent text-[13px] text-white/75 outline-none resize-none placeholder:text-white/18 leading-relaxed"
          />
        </div>

        {/* Contact info */}
        <div
          className="px-4 py-3 border-t flex gap-3 shrink-0 overflow-x-auto"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
        >
          {[
            { Icon: Mail,  label: "Email",    value: portfolioData.contact.email },
            { Icon: Phone, label: "Phone",    value: portfolioData.contact.phone },
            { Icon: MapPin, label: "Location", value: portfolioData.contact.location },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              className="shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Icon size={13} color="rgba(255,255,255,0.35)" />
              <div>
                <p className="text-[9px] text-white/25 uppercase tracking-wider">{label}</p>
                <p className="text-[11px] text-white/65 font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactApp;

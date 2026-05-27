import { useState, useEffect, useRef, useCallback } from "react";

const PROMPT = "vaibhav@vigility ~ %";

const NEOFETCH = `
                    ██╗   ██╗ ██████╗
                    ██║   ██║██╔════╝
                    ██║   ██║██║  ███╗
                    ╚██╗ ██╔╝██║   ██║
                     ╚████╔╝ ╚██████╔╝
                      ╚═══╝   ╚═════╝

   vaibhav@vigility
   ─────────────────────────────────────────
   OS:          Portfolio OS Sonoma 1.0
   Role:        Full Stack Developer
   Company:     Vigility Technology Pvt. Ltd.
   Location:    Noida, Uttar Pradesh, India
   Email:       vaibhavghildiyal2101@gmail.com
   ─────────────────────────────────────────
   Stack:       React · Next.js · TypeScript
   Backend:     Node.js · FastAPI · Python
   Database:    PostgreSQL · MongoDB
   AI/ML:       LangChain · PyTorch · RAG
   DevOps:      Docker · CI/CD
   ─────────────────────────────────────────
   Status:      ● Online — Available to hire
`;

const HELP = `
Available commands:

  about       Display bio and info
  skills      List tech stack
  projects    Show selected projects
  experience  Show work history
  contact     Get contact details
  clear       Clear the terminal
  help        Show this help message
  whoami      Who is this developer?
  date        Current date & time

Type any command and press Enter.
`;

const SKILLS_OUTPUT = `
Frontend:    React · Next.js · TypeScript · Tailwind CSS · Framer Motion · GSAP · Three.js
Backend:     Node.js · FastAPI · Fastify · Python · REST APIs
Database:    PostgreSQL · MongoDB · Redis
AI / ML:     LangChain · RAG · PyTorch · TensorFlow · OpenAI APIs
DevOps:      Docker · CI/CD · Vercel · Render
`;

const ABOUT_OUTPUT = `
Vaibhav Ghildiyal — Full Stack Developer
Vigility Technology Private Limited, Noida

Building high-performance web applications and AI-powered systems.
Experienced in end-to-end product development, from architecture
to production deployment.

Fun fact: Every line of code I write is intentional.
`;

const PROJECTS_OUTPUT = `
01  AI Lung Disease Detector  →  lung-disease-detector.onrender.com
    Python · PyTorch · FastAPI · React

02  3D Apple MacBook Site     →  euphonious-eclair-188161.netlify.app
    React · Three.js · GSAP · Tailwind

03  IQ Interview Platform     →  iq-xzvb.onrender.com
    Next.js · OpenAI · PostgreSQL · Tailwind

04  Kanban Task Manager       →  magical-kringle-f50bb0.netlify.app
    React · Tailwind CSS · Vite

05  Typing Speed Tester       →  dainty-marshmallow-9f5b06.netlify.app
    HTML5 · CSS3 · JavaScript
`;

const EXPERIENCE_OUTPUT = `
[Current]  Full Stack Developer
           Vigility Technology Private Limited — Jun 2025 – Present
           · AI Reporting Agent using RAG + LangChain
           · 80% faster data retrieval optimization
           · Full-stack ecosystem architecture

[Previous] Full Stack Developer — Client Projects
           Vigility Technology Private Limited — Apr 2025 – Jun 2025
           · 25% reduction in deployment turnaround
           · Enterprise-grade solutions
           · React · Node.js · MongoDB · TypeScript
`;

const CONTACT_OUTPUT = `
Email:    vaibhavghildiyal2101@gmail.com
Phone:    +91 9368209983
Location: Noida, Uttar Pradesh, India
GitHub:   github.com/Vaidiasri
LinkedIn: linkedin.com/in/vaibhav-ghildiyal-a2a9b8212

→ Open to full-time roles and freelance projects.
`;

const WHOAMI_OUTPUT = `vaibhav — Full Stack Developer @ Vigility Technology`;

interface Line {
  type: "output" | "input" | "error";
  text: string;
}

const getOutput = (cmd: string): string | null => {
  switch (cmd.trim().toLowerCase()) {
    case "help": return HELP;
    case "about": return ABOUT_OUTPUT;
    case "skills": return SKILLS_OUTPUT;
    case "projects": return PROJECTS_OUTPUT;
    case "experience": return EXPERIENCE_OUTPUT;
    case "contact": return CONTACT_OUTPUT;
    case "whoami": return WHOAMI_OUTPUT;
    case "date": return `\n  ${new Date().toLocaleString("en-IN", { dateStyle: "full", timeStyle: "long" })}\n`;
    case "": return null;
    default: return `\n  zsh: command not found: ${cmd.trim()}\n  Type 'help' to see available commands.\n`;
  }
};

const TerminalApp = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-type neofetch on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLines([
        { type: "input", text: "neofetch" },
        { type: "output", text: NEOFETCH },
        { type: "output", text: "  Type 'help' to see available commands.\n" },
      ]);
      setReady(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleSubmit = useCallback(() => {
    const cmd = input;
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const output = getOutput(cmd);
    const newLines: Line[] = [{ type: "input", text: cmd }];
    if (output !== null) newLines.push({ type: "output", text: output });

    setLines((prev) => [...prev, ...newLines]);
    if (cmd.trim()) {
      setCmdHistory((prev) => [cmd, ...prev]);
    }
    setHistoryIdx(-1);
    setInput("");
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : cmdHistory[nextIdx] ?? "");
    }
  };

  return (
    <div
      className="h-full flex flex-col text-[13px] leading-relaxed overflow-hidden cursor-text"
      style={{ background: "#1a1a1a", color: "#f0f0f0", fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2 border-b shrink-0"
        style={{ background: "#2a2a2a", borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex gap-2">
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-[12px] text-white/40 mx-auto">vaibhav@vigility — zsh</span>
      </div>

      {/* Output */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-0">
        {lines.map((line, i) => (
          <div key={i}>
            {line.type === "input" && (
              <div className="flex gap-2 items-start">
                <span style={{ color: "#50fa7b" }}>{PROMPT}</span>
                <span className="text-white">{line.text}</span>
              </div>
            )}
            {line.type === "output" && (
              <pre className="whitespace-pre-wrap text-[#a0a8b8] text-[12px] leading-relaxed">{line.text}</pre>
            )}
          </div>
        ))}

        {/* Input line */}
        {ready && (
          <div className="flex gap-2 items-center">
            <span style={{ color: "#50fa7b" }} className="shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-green-400"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalApp;

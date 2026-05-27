import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage:%0A${formData.message}`;
      window.location.href = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Gradient bleed */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-20">
          <span className="font-mono text-[11px] text-white/25 tracking-[0.3em]">06</span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] text-white/25 tracking-[0.4em] uppercase">Contact</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: CTA */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white font-heading leading-[0.9] mb-8">
              Let's Build<br />
              <span className="text-gradient">Together.</span>
            </h2>

            <p className="text-white/40 text-base leading-relaxed mb-12 max-w-md">
              Have a project in mind or want to discuss how we can drive measurable outcomes together? I'm always open to the right conversation.
            </p>

            {/* Contact info */}
            <div className="space-y-6 mb-12">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                  <Mail size={15} />
                </span>
                <span className="text-sm font-medium">{portfolioData.contact.email}</span>
                <ArrowUpRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="flex items-center gap-4 text-white/40">
                <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <MapPin size={15} />
                </span>
                <span className="text-sm font-medium">{portfolioData.contact.location}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors border border-white/10 rounded-full px-4 py-2 hover:border-white/30"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 border border-white/8 rounded-3xl p-10 text-center min-h-[480px]">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <Send size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Message Prepared!</h3>
                  <p className="text-white/40 text-sm">Opening your email client...</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border border-white/8 rounded-3xl p-8 lg:p-10 space-y-6 bg-white/[0.015]"
              >
                <h3 className="text-xl font-black text-white tracking-tight mb-2">Send a Message</h3>

                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "Vaibhav Ghildiyal" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "hello@yourcompany.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      placeholder={field.placeholder}
                      className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-white text-black text-xs font-black tracking-[0.2em] uppercase rounded-xl hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {sending ? "Preparing..." : (
                    <>Send Message <Send size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/15 tracking-[0.3em]">
            © {new Date().getFullYear()} VAIBHAV GHILDIYAL
          </p>
          <p className="font-mono text-[10px] text-white/15 tracking-[0.2em]">
            FULL STACK DEVELOPER · VIGILITY TECHNOLOGY PVT. LTD.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

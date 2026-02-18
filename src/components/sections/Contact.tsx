import { useRef, useState, type MouseEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import MagneticButton from "../ui/MagneticButton";

const Contact = () => {
  const formRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending delay for better UX
    setTimeout(() => {
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0AMessage:%0A${formData.message}`;
      const mailtoLink = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;

      window.location.href = mailtoLink;

      setIsSubmitting(false);
      setIsSent(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }, 1000);
  };

  // Simple 3D tilt effect for the form
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!formRef.current) return;

    const rect = formRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // Limit rotation to avoid too much distortion
    const rotateX = ((y - midY) / midY) * -5;
    const rotateY = ((x - midX) / midX) * 5;

    formRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!formRef.current) return;
    formRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-lg leading-relaxed">
              Have a project in mind or just want to chat about the latest in
              tech? I'm always open to discussing new opportunities and ideas.
            </p>

            <div className="space-y-8">
              <a
                href={`mailto:${portfolioData.contact.email}`}
                className="flex items-center gap-6 group p-4 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Email
                  </h4>
                  <p className="text-xl text-white font-medium">
                    {portfolioData.contact.email}
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-6 group p-4 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Phone
                  </h4>
                  <p className="text-xl text-white font-medium">
                    {portfolioData.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group p-4 rounded-xl transition-all hover:bg-white/5 border border-transparent hover:border-white/10">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    Location
                  </h4>
                  <p className="text-xl text-white font-medium">
                    {portfolioData.contact.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Holographic Form */}
          <div
            className="relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glow behind form */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary to-purple-500 blur-2xl opacity-20 -z-10 rounded-3xl" />

            {isSent ? (
              <div
                ref={formRef}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl transition-transform duration-100 ease-out preserve-3d flex flex-col items-center justify-center min-h-[500px] text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6 animate-in zoom-in spin-in-12">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Message Prepared!
                </h3>
                <p className="text-muted-foreground max-w-xs">
                  Opening your email client to send the message...
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl transition-transform duration-100 ease-out preserve-3d"
                onSubmit={handleSubmit}
              >
                <h3 className="text-2xl font-bold mb-6 text-white translate-z-10">
                  Send a Message
                </h3>

                <div className="space-y-6">
                  <div className="translate-z-10">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-2 ml-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="translate-z-10">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted-foreground mb-2 ml-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20"
                      placeholder="hello@example.com"
                    />
                  </div>

                  <div className="translate-z-10">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-2 ml-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-white/20 resize-none"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>

                  <div className="pt-4 translate-z-10">
                    <MagneticButton className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                      >
                        {isSubmitting ? (
                          <span>Preparing...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send
                              size={18}
                              className={`transition-transform duration-300 ${!isSubmitting && hovered ? "translate-x-1 -translate-y-1" : ""}`}
                            />
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

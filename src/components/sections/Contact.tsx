import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work <span className="text-primary">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            I'm currently available for freelance projects and full-time
            opportunities. If you have a project that needs some creative touch,
            I'd love to hear about it.
          </p>

          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 mb-16"
          >
            <Mail size={20} />
            Say Hello
          </a>

          <div className="flex justify-center gap-8">
            <a
              href={portfolioData.personal.github}
              className="text-muted-foreground hover:text-white transition-colors p-4 bg-secondary rounded-full hover:bg-secondary/80"
            >
              <Github size={24} />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              className="text-muted-foreground hover:text-white transition-colors p-4 bg-secondary rounded-full hover:bg-secondary/80"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="text-muted-foreground hover:text-white transition-colors p-4 bg-secondary rounded-full hover:bg-secondary/80"
            >
              <Send size={24} />
            </a>
          </div>

          <footer className="mt-24 pt-8 border-t border-white/5 text-sm text-gray-500">
            © {new Date().getFullYear()} {portfolioData.personal.name}. All
            rights reserved.
          </footer>
        </div>
      </div>
    </section>
  );
};

export default Contact;

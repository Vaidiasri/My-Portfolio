export const portfolioData = {
  personal: {
    name: "Vaibhav Ghildiyal",
    role: "Full Stack Developer",
    tagline: "Building Digital Experiences",
    bio: "Innovative Full Stack Developer and Technical Consultant with a proven track record of optimizing UI performance by 80% and delivering scalable software solutions. I specialize in building high-performance, interactive web applications using React, TypeScript, and modern 3D technologies.",
    email: "vaibhavghildiyal2101@gmail.com",
    github: "https://github.com",   // TODO: Update with real link
    linkedin: "https://linkedin.com", // TODO: Update with real link
  },
  skills: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "FastAPI", level: 80 },
    { name: "Fastify", level: 75 },
    { name: "Docker", level: 70 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 80 },
    { name: "TensorFlow", level: 70 },
    { name: "PyTorch", level: 65 },
  ],
  projects: [
    {
      title: "AI Lung Disease Detector",
      description: "Built a deep learning model using MobileNet to classify chest X-rays into four categories (Normal, Pneumonia, Tuberculosis, Others). Applied transfer learning by fine-tuning MobileNet and optimizing hyperparameters. Collected and augmented medical image datasets for robustness. Developed an end-to-end Python/TensorFlow pipeline for automated inference.",
      tech: ["Python", "TensorFlow", "MobileNet"],
      link: "https://github.com/Vaidiasri/lungs-detector.git",
      github: "https://github.com/Vaidiasri/lungs-detector.git",
    },
    {
      title: "3D Apple MacBook Site",
      description: "A fully immersive 3D landing page featuring real-time MacBook Pro rendering with Three.js. Includes smooth GSAP scroll triggers, color/size switching, and high-performance optimizations (60 FPS). Designed with Zustand for state management.",
      tech: ["React", "Three.js", "GSAP", "Tailwind"],
      link: "https://euphonious-eclair-188161.netlify.app/",
      github: "https://github.com/Vaidiasri/macbook.git",
    },
    {
      title: "Typing Speed Tester",
      description: "A lightweight, pure JavaScript typing test application. Features real-time WPM calculation, accuracy tracking, random paragraph generation, and a responsive UI. Built to master DOM manipulation and event handling logic.",
      tech: ["HTML5", "CSS3", "JavaScript"],
      link: "https://dainty-marshmallow-9f5b06.netlify.app",
      github: "https://github.com/Vaidiasri/jsproject04.git",
    },
    {
      title: "Kanban Task Manager",
      description: "A robust, responsive task manager with a Kanban Board layout (Pending, In Progress, Completed). Features persistent state via LocalStorage and a clean modern UI built with React and Tailwind CSS v4.",
      tech: ["React", "Tailwind CSS", "Vite", "LocalStorage"],
      link: "https://magical-kringle-f50bb0.netlify.app/",
      github: "https://github.com/Vaidiasri/vite.git",
    },
  ],
  experience: [
    {
      company: "Vigility",
      role: "Technical Consultant (Projects: Digiice)",
      period: "Jun 2025 - Present",
      description: "Spearheaded the development of scalable frontend modules using React.js and Shadcn UI, achieving an 80% improvement in UI performance. Engineered a dynamic live dashboard for real-time data visualization and analytics. Collaborated closely with backend teams to design robust REST APIs, ensuring seamless service integration.",
    },
    {
      company: "YugYatra Retail Private Limited",
      role: "Software Engineer Intern",
      period: "Apr 2025 - Jun 2025",
      description: "Designed and delivered scalable client-specific software solutions, reducing deployment turnaround time by 25%. Successfully implemented over 10 customized functionalities to meet strict deadlines. Optimized project workflows and fixed critical issues, boosting overall system reliability by 15%.",
    },
  ],
};

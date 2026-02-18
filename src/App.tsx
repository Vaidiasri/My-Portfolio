import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

import SmoothScroll from "./components/layout/SmoothScroll";
import GlobalBackground from "./components/layout/GlobalBackground";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <SmoothScroll />
      <GlobalBackground />
      {/* <CustomCursor /> */}
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;

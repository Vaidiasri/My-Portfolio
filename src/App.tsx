import { useState, useEffect } from "react";
import BootScreen from "./components/macos/BootScreen";
import Desktop from "./components/macos/Desktop";
import MobilePortfolio from "./components/mobile/MobilePortfolio";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function App() {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      document.body.classList.remove("desktop-mode");
    } else {
      document.body.classList.add("desktop-mode");
    }
  }, [isMobile]);

  if (isMobile) return <MobilePortfolio />;

  return booted ? (
    <Desktop />
  ) : (
    <BootScreen onComplete={() => setBooted(true)} />
  );
}

export default App;

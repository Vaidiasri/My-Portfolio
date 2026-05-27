import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AppleLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 814 1000"
    width="72"
    height="88"
    fill="white"
    style={{ opacity: 0.9 }}
  >
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.2 790.3 0 663.2 0 539.8 0 348.4 116.9 240.4 261 240.4c68.8 0 128.6 38.4 173.8 38.4 43.2 0 111.2-40.8 190-40.8 30.9 0 133 2.7 197.5 111.1zm-162-120.8c31.7-36.6 53-85.5 53-134.3 0-6.5-.7-13.1-1.9-19.4-50.1 1.9-110.3 33.6-147.5 76.1-28.9 32.5-55.3 81.3-55.3 130.8 0 7.1 1.3 14.2 1.9 16.5 3.2.6 8.4 1.3 13.6 1.3 44.9 0 100.1-29.7 135.2-71z" />
  </svg>
);

interface Props {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setDone(true);
            setTimeout(onComplete, 650);
          }, 380);
          return 100;
        }
        return p + 1.6;
      });
    }, 25);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black gap-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <AppleLogo />
          </motion.div>

          {/* Loading bar — exact macOS proportions */}
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 168, height: 4, background: "rgba(255,255,255,0.12)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(255,255,255,0.55)", width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;

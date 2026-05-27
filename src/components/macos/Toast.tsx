import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";

export interface ToastItem {
  id: string;
  title: string;
  sub?: string;
  type?: "success" | "info";
}

interface Props {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}

const ICONS = {
  success: <CheckCircle2 size={15} color="#28c840" />,
  info:    <Info         size={15} color="#3478F6" />,
};

const Toast = ({ toasts, onRemove }: Props) => (
  <div className="fixed top-8 right-3 z-[9994] flex flex-col gap-2 pointer-events-none select-none">
    <AnimatePresence>
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 72, scale: 0.88 }}
          animate={{ opacity: 1, x: 0,  scale: 1 }}
          exit={{    opacity: 0, x: 72, scale: 0.88 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="flex items-start gap-3 px-3.5 py-2.5 rounded-xl pointer-events-auto cursor-pointer"
          style={{
            background: "rgba(32,32,36,0.96)",
            backdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
            minWidth: 250, maxWidth: 310,
          }}
          onClick={() => onRemove(t.id)}
        >
          <div className="shrink-0 mt-0.5">{ICONS[t.type ?? "info"]}</div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white leading-tight">{t.title}</p>
            {t.sub && <p className="text-[11px] text-white/40 mt-0.5 leading-snug">{t.sub}</p>}
          </div>
          <button className="shrink-0 mt-0.5 text-white/20 hover:text-white/50 transition-colors">
            <X size={12} />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default Toast;

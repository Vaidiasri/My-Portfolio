import { useEffect, useRef } from "react";

/* ─── Types ─────────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number;
  ox: number; oy: number;
  r: number;
  label: string;
}
interface Wave {
  x: number; y: number; r: number; maxR: number; alpha: number;
}

/* ─── Constants ─────────────────────────────────────────────────── */
const COUNT   = 130;
const FOV     = 600;
const MAX_Z   = 400;
const CONNECT = 155;
const REPEL_R = 130;
const LABELS  = ["{ }", "=>", "</>", "fn", "[]", "&&", "||", "??", "async", "//", "const", "type", "0x", "git", "ssh", "npm"];

const TICKER_ROW1 = "VAIBHAV GHILDIYAL  ·  FULL STACK DEVELOPER  ·  ";
const TICKER_ROW2 = "REACT  ·  NODE.JS  ·  FASTAPI  ·  TYPESCRIPT  ·  NEXT.JS  ·  LANGCHAIN  ·  ";

const InteractiveWallpaper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Particles ──────────────────────────────────────────── */
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const x = (Math.random() - 0.5) * W * 1.6;
      const y = (Math.random() - 0.5) * H * 1.6;
      const z = (Math.random() - 0.5) * 2 * MAX_Z;
      return {
        x, y, z,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        ox: x, oy: y,
        r: Math.random() * 1.4 + 0.5,
        label: Math.random() > 0.62 ? LABELS[Math.floor(Math.random() * LABELS.length)] : "",
      };
    });

    const cam = { rx: 0, ry: 0, txr: 0, tyr: 0 };
    const mouse = { x: -9999, y: -9999 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cam.txr = (e.clientY - H / 2) * 0.00018;
      cam.tyr = (e.clientX - W / 2) * 0.00018;
    };
    window.addEventListener("mousemove", onMove);

    const waves: Wave[] = [];
    const onClick = (e: MouseEvent) => {
      waves.push({ x: e.clientX, y: e.clientY, r: 0, maxR: 280, alpha: 1 });
    };
    window.addEventListener("click", onClick);

    const project = (p: Particle) => {
      const scale = FOV / (FOV + p.z);
      const cx = W / 2, cy = H / 2;
      const sx = cx + (p.x + p.z * cam.ry * 280) * scale;
      const sy = cy + (p.y + p.z * cam.rx * 280) * scale;
      return { sx, sy, scale };
    };

    /* ── Ticker state ───────────────────────────────────────── */
    let tick1 = 0; // row1 offset (scrolls left)
    let tick2 = 0; // row2 offset (scrolls right)

    /* ── Draw loop ──────────────────────────────────────────── */
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      cam.rx += (cam.txr - cam.rx) * 0.06;
      cam.ry += (cam.tyr - cam.ry) * 0.06;

      /* ── Ticker rows — drawn first, behind everything ─── */
      const fontSize1 = Math.round(H * 0.115);
      const fontSize2 = Math.round(H * 0.065);

      /* Row 1 — large, very faint, scrolls LEFT */
      ctx.save();
      ctx.font = `800 ${fontSize1}px "Inter","SF Pro Display",system-ui,sans-serif`;
      const tw1 = ctx.measureText(TICKER_ROW1).width;
      tick1 = (tick1 + 0.45) % tw1;

      /* fade mask: full opacity center, transparent edges */
      const fadeMask1 = ctx.createLinearGradient(0, 0, W, 0);
      fadeMask1.addColorStop(0,    "rgba(0,0,0,1)");
      fadeMask1.addColorStop(0.08, "rgba(0,0,0,0)");
      fadeMask1.addColorStop(0.92, "rgba(0,0,0,0)");
      fadeMask1.addColorStop(1,    "rgba(0,0,0,1)");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255,255,255,0.04)";
      for (let x = -tick1; x < W + tw1; x += tw1) {
        ctx.fillText(TICKER_ROW1, x, H * 0.52);
      }

      /* overlay gradient to fade edges */
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fadeMask1;
      ctx.fillRect(0, H * 0.52 - fontSize1, W, fontSize1 * 1.3);
      ctx.restore();

      /* Row 2 — smaller, scrolls RIGHT */
      ctx.save();
      ctx.font = `700 ${fontSize2}px "Inter","SF Pro Display",system-ui,sans-serif`;
      const tw2 = ctx.measureText(TICKER_ROW2).width;
      tick2 = (tick2 + 0.28) % tw2;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255,255,255,0.028)";
      for (let x = -(tw2 - tick2); x < W + tw2; x += tw2) {
        ctx.fillText(TICKER_ROW2, x, H * 0.62);
      }

      const fadeMask2 = ctx.createLinearGradient(0, 0, W, 0);
      fadeMask2.addColorStop(0,    "rgba(0,0,0,1)");
      fadeMask2.addColorStop(0.1,  "rgba(0,0,0,0)");
      fadeMask2.addColorStop(0.9,  "rgba(0,0,0,0)");
      fadeMask2.addColorStop(1,    "rgba(0,0,0,1)");

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = fadeMask2;
      ctx.fillRect(0, H * 0.62 - fontSize2, W, fontSize2 * 1.4);
      ctx.restore();

      /* ── Edges ──────────────────────────────────────────── */
      const proj = particles.map((p) => project(p));

      for (let i = 0; i < COUNT; i++) {
        const pi = proj[i];
        if (pi.sx < -200 || pi.sx > W + 200 || pi.sy < -200 || pi.sy > H + 200) continue;
        for (let j = i + 1; j < COUNT; j++) {
          const pj = proj[j];
          const dx = pi.sx - pj.sx;
          const dy = pi.sy - pj.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECT) continue;
          const a = (1 - dist / CONNECT) * 0.18 * Math.min(pi.scale, pj.scale);
          ctx.beginPath();
          ctx.moveTo(pi.sx, pi.sy);
          ctx.lineTo(pj.sx, pj.sy);
          ctx.strokeStyle = `rgba(255,255,255,${a})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      /* ── Nodes ──────────────────────────────────────────── */
      particles.forEach((p, i) => {
        const { sx, sy, scale } = proj[i];
        if (sx < -200 || sx > W + 200 || sy < -200 || sy > H + 200) return;

        const dotAlpha = 0.18 + scale * 0.7;
        const radius   = p.r * scale * 1.4;

        /* glow halo — purely white */
        if (scale > 0.82) {
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 5);
          grd.addColorStop(0, `rgba(255,255,255,${dotAlpha * 0.22})`);
          grd.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        /* dot — pure white */
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${dotAlpha})`;
        ctx.fill();

        /* code label — pure white, very faint */
        if (p.label && scale > 0.8) {
          ctx.font = `${Math.round(9 * scale)}px "SF Mono","Fira Code",monospace`;
          ctx.fillStyle = `rgba(255,255,255,${dotAlpha * 0.38})`;
          ctx.fillText(p.label, sx + radius + 3, sy + 3);
        }

        /* physics */
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (p.ox - p.x) * 0.0012;
        p.vy += (p.oy - p.y) * 0.0012;
        p.vx *= 0.97;
        p.vy *= 0.97;

        /* mouse repulsion */
        const mdx = sx - mouse.x;
        const mdy = sy - mouse.y;
        const md  = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < REPEL_R && md > 0.5) {
          const force = ((REPEL_R - md) / REPEL_R) * 0.55;
          p.vx += (mdx / md) * force;
          p.vy += (mdy / md) * force;
        }

        /* shockwave */
        for (const w of waves) {
          const wdx = sx - w.x;
          const wdy = sy - w.y;
          const wd  = Math.sqrt(wdx * wdx + wdy * wdy);
          const band = 35;
          if (Math.abs(wd - w.r) < band && wd > 0.5) {
            const intensity = (1 - Math.abs(wd - w.r) / band) * 1.8 * w.alpha;
            p.vx += (wdx / wd) * intensity;
            p.vy += (wdy / wd) * intensity;
          }
        }
      });

      /* ── Shockwave rings ────────────────────────────────── */
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.r    += 5.5;
        w.alpha = Math.max(0, 1 - w.r / w.maxR);
        if (w.alpha <= 0.01) { waves.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${w.alpha * 0.5})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        if (w.r > 20) {
          ctx.beginPath();
          ctx.arc(w.x, w.y, w.r * 0.62, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${w.alpha * 0.2})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      /* ── Cursor glow ────────────────────────────────────── */
      if (mouse.x > 0 && mouse.x < W) {
        const cg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
        cg.addColorStop(0, "rgba(255,255,255,0.055)");
        cg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0" style={{ background: "#000000" }} />
      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveWallpaper;

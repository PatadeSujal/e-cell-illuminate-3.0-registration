"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport fixed background: layered "aurora" blobs (dark-blue / white glow
 * on a black canvas) plus a drifting starfield of small particles, rendered on
 * a <canvas> for smooth 60fps motion. Inspired by the aurora / particle
 * primitives popularized by reactbits.dev, rebuilt here with vanilla canvas
 * so the page stays fully self-contained.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrame: number;

    const particleCount = Math.min(90, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.15 + 0.03,
      vx: (Math.random() - 0.5) * 0.08,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // base black canvas
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, width, height);

      // drifting particles (soft white/blue dust)
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 215, 245, ${p.alpha})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Aurora blobs — CSS animated, layered above the particle canvas */}
      <div
        className="absolute -top-1/4 left-[8%] h-[42rem] w-[42rem] rounded-full opacity-40 blur-[110px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(43,82,163,0.9) 0%, rgba(43,82,163,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/3 right-[6%] h-[36rem] w-[36rem] rounded-full opacity-30 blur-[120px] animate-aurora-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-1/3 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[130px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(77,116,201,0.85) 0%, rgba(77,116,201,0) 70%)",
        }}
      />

      {/* faint grid + vignette for depth */}
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Full-viewport interactive background:
 * - Dynamic grid overlay with cursor-following 3D parallax & radial spotlight glow
 * - Layered "aurora" blobs with counter-parallax depth
 * - Particle starfield smoothly reacting to cursor movement
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrame: number;

    // Mouse tracking with smooth lerp
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;
    let isMouseActive = false;

    const onPointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      isMouseActive = true;
    };

    window.addEventListener("pointermove", onPointerMove);

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
      if (!isMouseActive) {
        targetMouseX = width / 2;
        targetMouseY = height / 2;
      }
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      // Smoothly interpolate mouse position (lerp factor = 0.06 for fluid ease)
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Parallax offsets based on cursor position (-0.5 to 0.5 range)
      const normX = currentMouseX / width - 0.5;
      const normY = currentMouseY / height - 0.5;

      // Move grid with responsive parallax (-40px to +40px)
      if (gridRef.current) {
        const gridShiftX = normX * -40;
        const gridShiftY = normY * -40;
        gridRef.current.style.transform = `translate3d(${gridShiftX.toFixed(2)}px, ${gridShiftY.toFixed(2)}px, 0)`;
      }

      // Dynamic cursor spotlight highlighting the grid around the pointer
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(650px circle at ${currentMouseX.toFixed(1)}px ${currentMouseY.toFixed(1)}px, rgba(77, 116, 201, 0.22), transparent 72%)`;
      }

      // Aurora blobs counter-parallax for multi-layered depth
      if (auroraRef.current) {
        const auroraShiftX = normX * 28;
        const auroraShiftY = normY * 28;
        auroraRef.current.style.transform = `translate3d(${auroraShiftX.toFixed(2)}px, ${auroraShiftY.toFixed(2)}px, 0)`;
      }

      ctx.clearRect(0, 0, width, height);

      // base black canvas
      ctx.fillStyle = "#050608";
      ctx.fillRect(0, 0, width, height);

      // drifting particles with gentle cursor interaction
      particles.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;

        // Gentle cursor push on nearby particles
        if (isMouseActive) {
          const dx = p.x - currentMouseX;
          const dy = p.y - currentMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            p.x += (dx / dist) * force * 0.7;
            p.y += (dy / dist) * force * 0.7;
          }
        }

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
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink select-none pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Aurora blobs with counter-parallax */}
      <div ref={auroraRef} className="absolute -inset-10 will-change-transform">
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
      </div>

      {/* Dynamic cursor spotlight illuminating the grid */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 mix-blend-screen pointer-events-none transition-opacity duration-300"
      />

      {/* Interactive cursor-moving grid (-inset-12 prevents edge clipping) */}
      <div
        ref={gridRef}
        className="absolute -inset-12 grid-overlay will-change-transform"
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85" />
    </div>
  );
}

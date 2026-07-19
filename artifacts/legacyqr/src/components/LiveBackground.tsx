import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseTime: number;
  color: [number, number, number];
  type: 'module' | 'orb';
}

interface Blob {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number, number];
  vx: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
}

export function LiveBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    let blobs: Blob[] = [];
    let w = 0, h = 0;
    let t = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Color palettes: pine green, ember, teal
    const colors: [number, number, number][] = [
      [76, 119, 100],   // sage/pine
      [196, 110, 60],   // ember
      [52, 92, 78],     // deep pine
      [214, 161, 92],   // warm gold
      [100, 150, 130],  // light sage
    ];

    const init = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;

      // Particles
      const count = prefersReducedMotion ? 0 : 160;
      particles = [];
      for (let i = 0; i < count; i++) {
        const isOrb = i < 12;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (isOrb ? 0.08 : 0.15),
          vy: isOrb ? -(Math.random() * 0.05 + 0.02) : -(Math.random() * 0.3 + 0.05),
          size: isOrb ? Math.random() * 40 + 20 : Math.random() * 5 + 2,
          alpha: 0,
          baseAlpha: isOrb ? Math.random() * 0.06 + 0.02 : Math.random() * 0.55 + 0.15,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulseTime: Math.random() * Math.PI * 2,
          color,
          type: isOrb ? 'orb' : 'module',
        });
      }

      // Aurora blobs
      blobs = [
        {
          x: w * 0.25, y: h * 0.4, radius: Math.min(w, h) * 0.55,
          color: [52, 92, 78, 0.12], vx: 0.0003, vy: 0.00015,
          phase: 0, phaseSpeed: 0.0007
        },
        {
          x: w * 0.75, y: h * 0.55, radius: Math.min(w, h) * 0.45,
          color: [196, 110, 60, 0.10], vx: -0.0002, vy: 0.0002,
          phase: 2.1, phaseSpeed: 0.0005
        },
        {
          x: w * 0.5, y: h * 0.2, radius: Math.min(w, h) * 0.35,
          color: [76, 119, 100, 0.08], vx: 0.00015, vy: -0.0001,
          phase: 4.2, phaseSpeed: 0.0009
        },
      ];
    };

    const drawBlobs = () => {
      blobs.forEach(blob => {
        blob.phase += blob.phaseSpeed;
        const cx = blob.x + Math.cos(blob.phase) * w * 0.18;
        const cy = blob.y + Math.sin(blob.phase * 0.7) * h * 0.14;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, blob.radius);
        const [r, g, b, a] = blob.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawConnections = () => {
      const modules = particles.filter(p => p.type === 'module');
      const maxDist = 100;
      for (let i = 0; i < modules.length; i++) {
        for (let j = i + 1; j < modules.length; j++) {
          const dx = modules[i].x - modules[j].x;
          const dy = modules[i].y - modules[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08;
            ctx.strokeStyle = `rgba(76,119,100,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(modules[i].x, modules[i].y);
            ctx.lineTo(modules[j].x, modules[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, w, h);

      // Aurora blobs
      drawBlobs();

      // Connections between nearby module particles
      if (t % 2 === 0) drawConnections(); // every other frame for perf

      // Particles
      particles.forEach(p => {
        p.pulseTime += p.pulseSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.y < -p.size * 2) p.y = h + p.size;
        if (p.y > h + p.size) p.y = -p.size;
        if (p.x < -p.size * 2) p.x = w + p.size;
        if (p.x > w + p.size) p.x = -p.size;

        const pulse = Math.sin(p.pulseTime) * 0.4;
        const alpha = Math.max(0, Math.min(1, p.baseAlpha + pulse));

        const [r, g, b] = p.color;

        if (p.type === 'orb') {
          // Soft glow orb
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // QR module square — with tiny glow
          ctx.shadowBlur = p.size * 1.5;
          ctx.shadowColor = `rgba(${r},${g},${b},${alpha * 0.5})`;
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          const sz = p.size;
          ctx.fillRect(p.x - sz / 2, p.y - sz / 2, sz, sz);
          ctx.shadowBlur = 0;
        }
      });

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);

    init();
    if (!prefersReducedMotion) draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
}

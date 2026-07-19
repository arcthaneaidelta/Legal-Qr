import React, { useEffect, useRef } from 'react';

interface QRModuleFieldProps {
  opacity?: number;
  assemble?: boolean;
  className?: string;
  parallaxRate?: number;
}

export function QRModuleField({ 
  opacity = 0.15, 
  assemble = false,
  className = "",
  parallaxRate = 0
}: QRModuleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let w = 0, h = 0;
    
    // prefers-reduced-motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      
      const count = prefersReducedMotion ? 0 : 50;
      particles = [];
      
      for(let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 4 + 4,
          baseAlpha: Math.random() * 0.5 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseTime: Math.random() * Math.PI * 2,
          // target for assembly
          tx: (w/2) + (Math.random() - 0.5) * 100,
          ty: (h/2) + (Math.random() - 0.5) * 100
        });
      }
    };
    
    init();
    
    window.addEventListener('resize', init);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Determine theme color
      const isDark = document.documentElement.classList.contains('dark');
      const rgb = isDark ? '214, 161, 92' : '184, 118, 58'; // ember colors roughly
      
      particles.forEach(p => {
        if (!prefersReducedMotion) {
          if (assemble) {
            p.x += (p.tx - p.x) * 0.05;
            p.y += (p.ty - p.y) * 0.05;
          } else {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
          }
          p.pulseTime += p.pulseSpeed;
        }
        
        const alpha = p.baseAlpha + Math.sin(p.pulseTime) * 0.3;
        const currentAlpha = Math.max(0, Math.min(1, alpha)) * opacity;
        
        ctx.fillStyle = `rgba(${rgb}, ${currentAlpha})`;
        // QR modules are squares
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();

    // Parallax logic
    const handleScroll = () => {
      if (!containerRef.current || prefersReducedMotion || parallaxRate === 0) return;
      const scrollY = window.scrollY;
      containerRef.current.style.transform = `translateY(${scrollY * parallaxRate}px)`;
    };

    if (parallaxRate !== 0) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, assemble, parallaxRate]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

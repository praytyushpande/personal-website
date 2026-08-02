import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal text elements on load
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(titleRef.current, 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.6, delay: 0.2 }
    )
    .fromTo(descRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      '-=1.2'
    )
    .fromTo(ctasRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0 },
      '-=1.0'
    )
    .fromTo(indicatorsRef.current,
      { opacity: 0 },
      { opacity: 0.4, duration: 0.8 },
      '-=0.6'
    );
  }, []);

  // 3D Canvas Neural Orb Animation & Mouse Tilt
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let mouseX = 0, mouseY = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0005;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0005;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    const numParticles = 75;
    const particles: { x: number; y: number; z: number; size: number; isAccent: boolean }[] = [];
    const radius = Math.min(width, height) * 0.35 || 160;

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: Math.random() * 2 + 1.5,
        isAccent: Math.random() < 0.25
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      const rotX = angleX + mouseY;
      const rotY = angleY + mouseX;

      const projected: { x: number; y: number; z: number; scale: number; isAccent: boolean; size: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z1 = p.z * Math.cos(rotY) + p.x * Math.sin(rotY);

        const y1 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + p.y * Math.sin(rotX);

        p.x = x1;
        p.y = y1;
        p.z = z2;

        const perspective = 400 / (400 + z2);
        const px = cx + x1 * perspective;
        const py = cy + y1 * perspective;

        projected.push({ x: px, y: py, z: z2, scale: perspective, isAccent: p.isAccent, size: p.size });
      }

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25 * projected[i].scale;
            ctx.beginPath();
            ctx.strokeStyle = projected[i].isAccent || projected[j].isAccent 
              ? `rgba(249, 115, 22, ${alpha * 1.5})` 
              : `rgba(250, 250, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const r = p.size * p.scale;
        const alpha = Math.max(0.2, (p.z + radius) / (2 * radius));

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, r), 0, Math.PI * 2);
        if (p.isAccent) {
          ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#f97316';
        } else {
          ctx.fillStyle = `rgba(250, 250, 250, ${alpha * 0.7})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <section id="hero" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-bg">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col justify-center px-6 lg:px-24 z-10 space-y-8 bg-bg py-28 lg:py-0">
          <div className="space-y-4">
            <span className="text-accent text-xs lg:text-sm uppercase tracking-[0.3em] font-bold flex items-center gap-2">
              <span className="text-base text-amber-500">𑁍</span> INDIA'S SOVEREIGN AI RESEARCH LAB · BHARAT
            </span>
            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-[7.5vw] leading-[0.85] -tracking-[0.03em] font-display">
              Building AI
              <br />
              that <span className="italic text-accent">sees</span> the
              <br />
              world.
            </h1>
          </div>
          <p ref={descRef} className="max-w-lg text-lg lg:text-xl text-fg/60 leading-relaxed font-light font-body">
            Orb Labs is India's premier independent AI research lab advancing frontier artificial intelligence — building world models, Indic multimodal intelligence, scientific AI, and autonomous systems from India for the world.
          </p>
          <div ref={ctasRef} className="flex flex-wrap gap-4 pt-4">
            <a className="bg-accent text-bg px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors" href="#research">
              Explore Research
            </a>
            <a className="border border-border-strong text-fg px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-fg hover:text-bg transition-all" href="#careers">
              Join Orb Labs
            </a>
          </div>
          <div ref={indicatorsRef} className="pt-8 flex items-center gap-4 opacity-0">
            <div className="w-px h-12 bg-fg"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-body">
              Scroll to begin
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Neural Canvas & Telemetry HUD */}
        <div 
          ref={containerRef} 
          className="lg:col-span-5 relative h-full w-full min-h-[550px] lg:min-h-0 border-t lg:border-t-0 lg:border-l border-border overflow-hidden flex flex-col justify-between p-6 lg:p-8 bg-surface/40"
        >
          <div className="absolute inset-0 crosshatch opacity-30 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Top HUD Bar */}
          <div className="relative z-10 flex justify-between items-center border-b border-border pb-4 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
              <span className="text-[10px] uppercase tracking-widest text-fg/70">NEURAL WORLD SIMULATOR</span>
            </div>
            <span className="text-[10px] text-accent border border-accent/30 px-2 py-0.5 rounded uppercase tracking-wider">LATENT-V4.2</span>
          </div>

          {/* Floating Cards */}
          <div className="relative z-10 my-auto space-y-3 py-6 max-w-sm mx-auto w-full font-body">
            <div className="p-4 bg-bg/85 backdrop-blur-md border border-border-strong rounded-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1 shadow-2xl group cursor-pointer">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono text-accent font-bold">[01] WORLD MODELS</span>
                <span className="text-[9px] font-mono text-fg/40 group-hover:text-accent transition-colors">99.8% FIDELITY</span>
              </div>
              <p className="text-xs text-fg/70 font-light leading-relaxed">
                Learning internal representations of physical & temporal dynamics across multimodal environments.
              </p>
            </div>

            <div className="p-4 bg-bg/85 backdrop-blur-md border border-border-strong rounded-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1 shadow-2xl group cursor-pointer">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono text-accent font-bold">[02] SCIENTIFIC DISCOVERY</span>
                <span class="text-[9px] font-mono text-fg/40 group-hover:text-accent transition-colors">EXASCALE SIM</span>
              </div>
              <p className="text-xs text-fg/70 font-light leading-relaxed">
                Accelerating biomolecular folding, materials discovery, and complex quantum chemical systems.
              </p>
            </div>

            <div className="p-4 bg-bg/85 backdrop-blur-md border border-border-strong rounded-lg hover:border-accent transition-all duration-300 transform hover:-translate-y-1 shadow-2xl group cursor-pointer">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-mono text-accent font-bold">[03] AUTONOMOUS AGENTS</span>
                <span className="text-[9px] font-mono text-fg/40 group-hover:text-accent transition-colors">CLOSED-LOOP</span>
              </div>
              <p className="text-xs text-fg/70 font-light leading-relaxed">
                High-frequency planning under uncertainty with continuous long-term memory architectures.
              </p>
            </div>
          </div>

          {/* Telemetry Footer */}
          <div className="relative z-10 flex justify-between items-center pt-4 border-t border-border text-[9px] font-mono text-fg/40 tracking-wider">
            <div className="flex items-center gap-4">
              <span>FPS: <strong className="text-fg">60</strong></span>
              <span>STEPS: <strong className="text-fg">102,400</strong></span>
            </div>
            <div>CLUSTER: <strong className="text-accent">ACTIVE</strong></div>
          </div>
        </div>
      </section>

      {/* Sarvam AI-Inspired Sovereign Indian AI Impact Showcase Banner */}
      <section className="py-16 border-y border-border bg-gradient-to-r from-amber-950/20 via-surface to-indigo-950/20 relative overflow-hidden font-body">
        <div className="absolute inset-0 crosshatch opacity-20 pointer-events-none"></div>
        <div className="container mx-auto px-6 lg:px-24 relative z-10 text-center space-y-8">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-amber-500/80 text-sm font-mono tracking-widest">
              <span>𑁍</span>
              <span className="text-xs uppercase font-bold text-accent">INDIA'S SOVEREIGN AI PLATFORM & RESEARCH LAB</span>
              <span>𑁍</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-display font-light text-fg">
              Powering India's AI-First Future.
            </h3>
            <p className="text-sm lg:text-base text-fg/60 max-w-2xl mx-auto font-light leading-relaxed">
              Built on sovereign compute. Powered by frontier-class world models. Delivering population-scale impact for 1.4 billion citizens.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto pt-4">
            <div className="p-4 bg-bg/90 border border-border-strong rounded-lg hover:border-accent transition-all flex flex-col items-center justify-center space-y-1 group">
              <span className="text-xl">🇮🇳</span>
              <span className="text-xs font-mono font-bold tracking-wider text-fg group-hover:text-accent transition-colors">SOVEREIGN COMPUTE</span>
              <span className="text-[9px] text-fg/40 font-mono">100% On-Premise & Indian Data Sovereignty</span>
            </div>
            <div className="p-4 bg-bg/90 border border-border-strong rounded-lg hover:border-accent transition-all flex flex-col items-center justify-center space-y-1 group">
              <span className="text-xl">𑁍</span>
              <span className="text-xs font-mono font-bold tracking-wider text-fg group-hover:text-accent transition-colors">INDIC MULTIMODAL</span>
              <span className="text-[9px] text-fg/40 font-mono">22 Official Indian Languages & Voice Agents</span>
            </div>
            <div className="p-4 bg-bg/90 border border-border-strong rounded-lg hover:border-accent transition-all flex flex-col items-center justify-center space-y-1 group">
              <span className="text-xl">🔬</span>
              <span className="text-xs font-mono font-bold tracking-wider text-fg group-hover:text-accent transition-colors">SCIENTIFIC DISCOVERY</span>
              <span className="text-[9px] text-fg/40 font-mono">Molecular Folding & Quantum Chem for India</span>
            </div>
            <div className="p-4 bg-bg/90 border border-border-strong rounded-lg hover:border-accent transition-all flex flex-col items-center justify-center space-y-1 group">
              <span className="text-xl">⚡</span>
              <span className="text-xs font-mono font-bold tracking-wider text-fg group-hover:text-accent transition-colors">EXASCALE CLUSTER</span>
              <span className="text-[9px] text-fg/40 font-mono">Bengaluru, Hyderabad & NCR Compute Hubs</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;


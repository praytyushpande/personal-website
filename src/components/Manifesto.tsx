import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElements = [text1Ref.current, text2Ref.current, text3Ref.current];
    
    textElements.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          xPercent: i % 2 === 0 ? -12 : 12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }
    });
  }, []);

  return (
    <section ref={containerRef} id="manifesto" className="relative py-48 lg:py-60 bg-bg border-y border-border overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden py-10">
        <div ref={text1Ref} className="opacity-[0.03] text-[clamp(64px,18vw,260px)] font-display uppercase leading-[0.8] whitespace-nowrap">
          INTELLIGENCE
        </div>
        <div ref={text2Ref} className="opacity-[0.03] text-[clamp(64px,18vw,260px)] font-display uppercase leading-[0.8] whitespace-nowrap mt-4">
          BEYOND
        </div>
        <div ref={text3Ref} className="opacity-[0.03] text-[clamp(64px,18vw,260px)] font-display uppercase leading-[0.8] whitespace-nowrap mt-4">
          PREDICTION
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12 lg:space-y-16 py-16 lg:py-20 border-x border-border px-6 lg:px-20 bg-bg/85 backdrop-blur-sm">
          <span className="text-accent text-xs tracking-[0.5em] uppercase font-bold block text-center mb-6">
            — The Manifesto
          </span>
          <h2 className="text-3xl lg:text-6xl text-center leading-[1.1] lg:leading-[1.05] -tracking-tight font-display px-2">
            "Intelligence is the ability to build internal models of reality, reason under uncertainty, and transform understanding into discovery."
          </h2>
          <div className="flex justify-center py-4">
            <div className="w-24 h-px bg-accent"></div>
          </div>
          <p className="text-lg lg:text-2xl text-center text-fg/60 italic font-display max-w-3xl mx-auto leading-relaxed px-4">
            The coming decade of AI will not be defined solely by larger models, but by systems that understand the world with increasing depth and fidelity. We are building toward that future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;

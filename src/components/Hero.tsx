import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

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
      { opacity: 0.3, duration: 0.8 },
      '-=0.6'
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-bg">
      <div className="lg:col-span-7 flex flex-col justify-center px-6 lg:px-24 z-10 space-y-8 bg-bg py-32 lg:py-0">
        <div className="space-y-4">
          <span className="text-accent text-xs lg:text-sm uppercase tracking-[0.4em] font-bold block">
            — Independent Research Lab
          </span>
          <h1 ref={titleRef} className="text-6xl lg:text-[7.5vw] leading-[0.85] -tracking-[0.03em] font-display">
            Building AI
            <br />
            that <span className="italic text-accent">sees</span> the
            <br />
            world.
          </h1>
        </div>
        <p ref={descRef} className="max-w-lg text-lg lg:text-xl text-fg/50 leading-relaxed font-light font-body">
          Orb Labs is an independent AI research lab advancing the frontier of artificial intelligence through research in world models, scientific AI, autonomous systems, and AI for biology.
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
      <div className="lg:col-span-5 relative h-[50svh] lg:h-full w-full border-t lg:border-t-0 lg:border-l border-border overflow-hidden">
        <img
          alt="Orb Labs Research Environment"
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.2] brightness-[0.85]"
          src="https://kombai-assets.b-cdn.net/generated_assets/0d4ef39c-66b3-48e7-b464-5a82cbc9d36e/d9f992b8c4d94a98ac461ac85c434c8f/d9f992b8c4d94a98ac461ac85c434c8f.jpg"
          decoding="async"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bg via-transparent to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default Hero;

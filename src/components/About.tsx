import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Left column fade/slide in
    if (leftColRef.current) {
      gsap.fromTo(leftColRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Right column entrance slide in
    if (rightColRef.current) {
      gsap.fromTo(rightColRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none"
          }
        }
      );

      // Scroll scrub parallax effect for the right card
      gsap.to(rightColRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} id="people" className="relative py-32 lg:py-40 bg-bg overflow-hidden border-b border-border">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Editorial Description Column */}
          <div ref={leftColRef} className="col-span-12 lg:col-span-4 space-y-8 opacity-0">
            <div className="space-y-4">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                About Orb Labs
              </span>
              <h3 className="text-4xl lg:text-5xl leading-tight font-display font-light">
                Beyond prediction, toward understanding.
              </h3>
            </div>
            <div className="space-y-6 text-fg/60 leading-relaxed font-light text-base font-body">
              <p>
                We believe the next generation of AI won’t simply generate better answers—it will understand the world.
              </p>
              <p>
                Current AI systems excel at language and pattern recognition, but they still struggle with deep reasoning, long-term planning, and understanding the dynamics of the physical and biological world.
              </p>
              <p>
                At Orb Labs, we pursue research that moves beyond prediction toward genuine understanding. Our work focuses on building systems that learn internal representations of reality, enabling them to reason, simulate, adapt, and accelerate scientific discovery.
              </p>
            </div>
          </div>
          
          {/* Flush-Edge Vision Card Block */}
          <div 
            ref={rightColRef} 
            className="col-span-12 lg:col-span-8 bg-surface p-8 lg:p-20 border-l border-y border-border-strong relative z-10 opacity-0 lg:-mr-[10vw]"
          >
            <div className="max-w-2xl space-y-8">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                Long-Term Vision
              </span>
              <h4 className="text-4xl lg:text-6xl leading-[1.1] font-display font-light">
                AI should become a scientific collaborator.
              </h4>
              <p className="text-lg lg:text-xl text-fg/80 leading-relaxed font-light font-body">
                We envision AI systems that can build internal models of reality, reason under uncertainty, continuously learn from experience, and contribute meaningfully to solving humanity’s hardest problems.
              </p>
              <div className="pt-6">
                <div className="w-32 h-px bg-accent mb-4"></div>
                <p className="text-fg tracking-[0.2em] text-xs lg:text-sm uppercase font-bold font-body">
                  Orb Labs exists to help build that future.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

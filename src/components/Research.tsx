import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ResearchArea {
  id: string;
  index: string;
  title: string;
  desc: string;
  projects: string[];
  leads: string[];
  benchmarks: string[];
}

const Research: React.FC = () => {
  const [activeArea, setActiveArea] = useState<ResearchArea | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const researchAreas: ResearchArea[] = [
    {
      id: 'world-models',
      index: '01',
      title: 'World Models',
      desc: 'Developing models capable of learning structured representations of environments, enabling reasoning, planning, simulation, and long-horizon decision making.',
      projects: [
        'Simulating Physical Dynamics in Latent Spaces',
        'Long-Horizon Predictive Planning for Robotic Agents',
        'Contrastive Predictive Coding for Spatiotemporal Video Models'
      ],
      leads: ['Dr. Sarah Jenkins', 'Alex Rivera, Senior Research Engineer'],
      benchmarks: ['WorldModel-Bench-v1.2', 'GridWorld-Control-v2']
    },
    {
      id: 'scientific-ai',
      index: '02',
      title: 'Scientific AI',
      desc: 'Applying foundation models and machine learning to accelerate research across biology, chemistry, physics, and other scientific disciplines.',
      projects: [
        'Physics-Informed Neural Network Ensembles for Fluid Dynamics',
        'Autoregressive Foundation Models for Crystal Structure Prediction',
        'Differentiable Quantum Chemistry Solvers'
      ],
      leads: ['Dr. David Kim', 'Elena Rostova, Lead Scientist'],
      benchmarks: ['SciPINN-Eval', 'Quantum-Solve-v1']
    },
    {
      id: 'drug-discovery',
      index: '03',
      title: 'Drug Discovery',
      desc: 'Building AI systems for molecular design, biological reasoning, protein understanding, and computational drug discovery to reduce the time and cost of therapeutic development.',
      projects: [
        'Diffusion Generative Models for De Novo Protein Design',
        'Geometric Deep Learning on Biomolecular Interaction Graphs',
        'Reinforcement Learning for Synthesis Route Planning'
      ],
      leads: ['Dr. Aria Vance', 'Marcus Thorne, Bio-AI Lead'],
      benchmarks: ['ChEMBL-Design-v2', 'Protein-Bind-v3']
    },
    {
      id: 'autonomous-intelligence',
      index: '04',
      title: 'Autonomous Intelligence',
      desc: 'Researching intelligent agents that can plan, remember, collaborate, use tools, and solve complex real-world tasks autonomously.',
      projects: [
        'Hierarchical Memory Architectures for Multi-Modal LLM Agents',
        'Federated Multi-Agent Swarm Intelligence',
        'Adaptive Tool-Use via Self-Reflecting Execution Loops'
      ],
      leads: ['Dr. Kenneth Chen', 'Liam O\'Connor, Core Architect'],
      benchmarks: ['AgentEnv-Web-v2', 'ReflectLoop-Eval']
    },
    {
      id: 'ai-infrastructure',
      index: '05',
      title: 'AI Infrastructure',
      desc: 'Building datasets, evaluation frameworks, research tooling, training pipelines, and scalable infrastructure that supports next-generation AI research.',
      projects: [
        'Distributed Low-Precision FP4 Transformer Training Pipelines',
        'Dynamic Pipeline Parallelism for Exascale Computing',
        'Automated Dataset Curation and De-duplication Engine'
      ],
      leads: ['Carlos Mendez, Platform Engineer', 'Dr. Yuki Tanaka'],
      benchmarks: ['Compute-Perf-Suite', 'DataClean-v1.1']
    },
    {
      id: 'ai-safety',
      index: '06',
      title: 'AI Safety & Alignment',
      desc: 'Studying interpretability, robustness, alignment, and evaluation methods to ensure increasingly capable AI systems remain reliable and beneficial.',
      projects: [
        'Mechanistic Interpretability of Latent Representation Vectors',
        'Adversarial Robustness Testing under Distribution Shifts',
        'Formal Verification of Neural Network Constraints'
      ],
      leads: ['Dr. Emily Watson', 'James Fletcher, Senior Ethics Lead'],
      benchmarks: ['Safety-Robust-v2', 'Interpret-Eval-v1.5']
    }
  ];

  useEffect(() => {
    // Card slide up animations using ScrollTrigger
    const cards = gsap.utils.toArray('.area-card');
    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Theme tag staggering
    gsap.fromTo(".research-tag",
      { opacity: 0, y: 10 },
      {
        opacity: 0.5,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".research-tags-wrap",
          start: "top 85%"
        }
      }
    );
  }, []);

  const openModal = (area: ResearchArea) => {
    setActiveArea(area);
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    }, 10);
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setActiveArea(null)
      });
    } else {
      setActiveArea(null);
    }
  };

  return (
    <section ref={containerRef} id="research" className="relative bg-bg border-t border-border">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Sticky left panel */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-0 h-auto lg:h-screen bg-surface p-8 lg:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                Research Themes
              </span>
              <h3 className="text-4xl lg:text-6xl -tracking-tight leading-none font-display font-light">
                Core areas of
                <br />
                exploration.
              </h3>
            </div>
            
            <div className="research-tags-wrap flex flex-wrap gap-x-2 gap-y-3 text-xs uppercase tracking-wider text-fg/40 font-body">
              {['World Models', 'Scientific Foundation Models', 'Drug Discovery', 'AI for Biology', 'Autonomous Agents', 'Multi-Agent Systems', 'Reinforcement Learning', 'Embodied Intelligence', 'Memory Architectures', 'Reasoning Systems', 'AI Infrastructure', 'Interpretability', 'AI Safety', 'Computational Science'].map((tag, idx) => (
                <span key={tag} className="research-tag hover:text-accent transition-colors cursor-default select-none">
                  {tag}{idx < 13 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling right side */}
        <div ref={rightColRef} className="w-full lg:w-7/12 p-6 lg:p-24 space-y-16 lg:space-y-24 bg-bg">
          {researchAreas.map((area) => (
            <div 
              key={area.id}
              onClick={() => openModal(area)}
              className="area-card relative z-20 lg:-ml-32 p-8 lg:p-12 bg-surface lg:bg-bg hover:bg-surface border border-border hover:border-accent shadow-2xl transition-all duration-300 cursor-pointer space-y-6 group"
            >
              <div className="flex justify-between items-start">
                <span className="text-5xl font-display text-accent/20 italic group-hover:text-accent transition-colors">
                  {area.index}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity font-body">
                  Click to inspect Details →
                </span>
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl lg:text-4xl font-display">
                  {area.title}
                </h4>
                <p className="text-fg/60 text-sm lg:text-base font-light leading-relaxed font-body">
                  {area.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Cinematic Details Modal */}
      {activeArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/85 backdrop-blur-md">
          <div 
            ref={modalRef} 
            className="w-full max-w-3xl bg-surface border border-accent/30 p-8 lg:p-12 rounded-lg shadow-2xl relative max-h-[85vh] overflow-y-auto"
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-fg/40 hover:text-accent font-light text-2xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="space-y-8 font-body">
              <div className="space-y-2">
                <span className="text-accent text-5xl font-display italic">{activeArea.index}</span>
                <h3 className="text-4xl font-display font-light text-fg">{activeArea.title}</h3>
                <p className="text-fg/60 text-sm lg:text-base font-light leading-relaxed font-body pt-2">{activeArea.desc}</p>
              </div>

              <div className="border-t border-border pt-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-3">Active Projects</h4>
                  <ul className="space-y-2.5">
                    {activeArea.projects.map((proj) => (
                      <li key={proj} className="text-sm font-medium flex items-center gap-3 text-fg/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"></div>
                        {proj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-2">Research Leads</h4>
                    <div className="space-y-1">
                      {activeArea.leads.map((lead) => (
                        <p key={lead} className="text-sm text-fg/80">{lead}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-accent font-bold mb-2">Active Benchmarks</h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeArea.benchmarks.map((bench) => (
                        <span key={bench} className="px-3 py-1 border border-border text-[11px] uppercase tracking-widest rounded text-fg/50">
                          {bench}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-accent text-bg text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
                >
                  Return to Manifesto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Research;

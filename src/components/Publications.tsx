import React, { useState } from 'react';

interface Paper {
  title: string;
  authors: string;
  source: string;
  tags: string[];
  date: string;
}

const Publications: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const papers: Paper[] = [
    {
      title: 'World Models for Autonomous Robotic Path Planning in Unstructured Environments',
      authors: 'Dr. Sarah Jenkins, Alex Rivera, Dr. Yuki Tanaka',
      source: 'Orb Tech Report OTR-2026-01',
      tags: ['World Models', 'Autonomous Systems'],
      date: 'Feb 2026'
    },
    {
      title: 'Differentiable Solvers for Protein-Ligand Interface Geometries',
      authors: 'Dr. Aria Vance, Marcus Thorne, Dr. David Kim',
      source: 'Nature Machine Intelligence (Submitted)',
      tags: ['Drug Discovery', 'AI for Biology'],
      date: 'Jan 2026'
    },
    {
      title: 'Mechanistic Interpretability of Latent Belief States in Reinforcement Learning Agents',
      authors: 'Dr. Emily Watson, James Fletcher',
      source: 'ICML 2026 (Accepted)',
      tags: ['AI Safety', 'Reinforcement Learning'],
      date: 'May 2026'
    },
    {
      title: 'Distributed FP4 Low-Precision Pipelines for Training Billion-Parameter Transformers',
      authors: 'Carlos Mendez, Dr. Yuki Tanaka, Liam O\'Connor',
      source: 'SysML 2026 (Submitted)',
      tags: ['AI Infrastructure'],
      date: 'Mar 2026'
    },
    {
      title: 'Scientific Foundation Models: Core Architectures and Benchmark Paradigms',
      authors: 'Dr. Sarah Jenkins, Elena Rostova, Dr. Aria Vance',
      source: 'arXiv pre-print / Scientific AI Foundation',
      tags: ['World Models', 'Scientific AI'],
      date: 'Apr 2026'
    }
  ];

  const allTags = ['All', 'World Models', 'Scientific AI', 'Drug Discovery', 'AI for Biology', 'Autonomous Systems', 'Reinforcement Learning', 'AI Infrastructure', 'AI Safety'];

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          paper.authors.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || paper.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleDownload = (title: string) => {
    alert(`Initializing download for: "${title}" (Simulated pre-print PDF)`);
  };

  return (
    <section id="publications" className="py-24 lg:py-36 bg-bg overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 max-w-6xl">
        
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
            Scientific Impact
          </span>
          <h3 className="text-4xl lg:text-5xl font-display font-light">
            Research that empowers others.
          </h3>
        </div>

        {/* Tab Module */}
        <div className="relative min-h-[600px] mt-10">
          
          {/* Tab Button Bar */}
          <div className="flex flex-wrap gap-1 mb-[-1px] relative z-30 px-2 lg:px-6">
            {['Open Research', 'Publications', 'Collaborations'].map((tabLabel, idx) => (
              <button
                key={tabLabel}
                onClick={() => setActiveTab(idx)}
                className={`px-6 lg:px-10 py-4 lg:py-5 border-x border-t rounded-t-lg text-xs lg:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === idx 
                    ? 'bg-surface border-border-strong text-accent' 
                    : 'bg-bg border-border text-fg/40 hover:text-fg'
                }`}
              >
                {tabLabel}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="relative z-20 bg-surface border border-border-strong p-6 lg:p-16 shadow-2xl min-h-[500px] rounded-lg lg:rounded-tl-none font-body">
            
            {/* Tab 1: Open Research */}
            {activeTab === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <div className="space-y-6">
                  <h4 className="text-2xl lg:text-3xl font-display italic text-fg">
                    We believe foundational research has the greatest impact when knowledge is shared.
                  </h4>
                  <p className="text-fg/60 text-base lg:text-lg leading-relaxed font-light font-body">
                    Orb Labs aims to publish research papers, technical reports, open-source implementations, benchmarks, datasets, and developer tools that enable the broader research community to build upon our work.
                  </p>
                </div>
                
                <div className="bg-bg border border-border p-6 lg:p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">
                      Active Projects
                    </span>
                    <span className="text-accent text-xs uppercase font-bold tracking-widest animate-pulse">
                      Ongoing
                    </span>
                  </div>
                  <ul className="space-y-4 text-sm font-medium">
                    {['World Model Benchmark v1', 'Scientific Foundation Toolkit', 'Multi-Agent Coordination Dataset'].map((project) => (
                      <li key={project} className="flex items-center gap-3 text-fg">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Publications Index (Filtered & Searchable) */}
            {activeTab === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="text-2xl lg:text-3xl font-display italic text-fg">Scientific Documentation</h4>
                  <p className="text-fg/60 text-sm lg:text-base font-light">Explore Orb Labs pre-prints and technical publications.</p>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center py-2 border-b border-border">
                  <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 max-w-md px-4 py-2 border border-border bg-bg text-sm rounded focus:outline-none focus:border-accent text-fg"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-fg/40">Filter:</span>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="px-3 py-2 border border-border bg-bg text-xs uppercase tracking-wider rounded text-fg focus:outline-none focus:border-accent"
                    >
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Papers List */}
                {filteredPapers.length > 0 ? (
                  <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                    {filteredPapers.map((paper) => (
                      <div key={paper.title} className="p-5 border border-border bg-bg hover:border-accent/50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap gap-2">
                            {paper.tags.map((t) => (
                              <span key={t} className="px-2 py-0.5 border border-border-strong text-[9px] uppercase tracking-widest rounded text-accent">
                                {t}
                              </span>
                            ))}
                          </div>
                          <h5 className="text-base font-bold text-fg leading-snug">{paper.title}</h5>
                          <p className="text-xs text-fg/50 font-light">{paper.authors} — <span className="italic">{paper.source}</span></p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">
                          <span className="text-xs text-fg/40 uppercase tracking-widest">{paper.date}</span>
                          <button
                            onClick={() => handleDownload(paper.title)}
                            className="px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-bg text-xs font-semibold uppercase tracking-widest transition-all"
                          >
                            PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center border-dashed border border-border text-fg/30 text-sm">
                    No publications found matching your search.
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Collaborations */}
            {activeTab === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-fade-in">
                <div className="space-y-6">
                  <h4 className="text-2xl lg:text-3xl font-display italic text-fg">
                    If our research interests align, we’d love to collaborate.
                  </h4>
                  <p className="text-fg/60 text-base lg:text-lg leading-relaxed font-light font-body">
                    We actively seek collaborations with researchers, universities, startups, industry partners, and scientific organizations working on ambitious problems in artificial intelligence and computational science.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a href="#contact" className="p-6 bg-bg border border-border hover:border-accent transition-all cursor-pointer block group">
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-2 text-fg group-hover:text-accent transition-colors">
                      Academic Partnerships
                    </h5>
                    <p className="text-xs lg:text-sm text-fg/50 font-light leading-relaxed">
                      Supporting PhD residencies, shared compute nodes, and interdisciplinary research grants.
                    </p>
                  </a>
                  <a href="#contact" className="p-6 bg-bg border border-border hover:border-accent transition-all cursor-pointer block group">
                    <h5 className="text-xs uppercase tracking-widest font-bold mb-2 text-fg group-hover:text-accent transition-colors">
                      Industry Research
                    </h5>
                    <p className="text-xs lg:text-sm text-fg/50 font-light leading-relaxed">
                      Collaborating on drug discovery targets, automated laboratory robotics, and custom world model simulations.
                    </p>
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Publications;

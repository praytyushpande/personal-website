import React, { useState } from 'react';

interface PersonalHubModalProps {
  isOpen: boolean;
  activeTab: string;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
}

// Sample rich content for Pratyush's Portfolio
const PROJECTS = [
  {
    id: 'ai-world-model',
    title: 'Frontier World Model Engine',
    category: 'AI & Machine Learning',
    description: 'Neural simulator predicting physical state transitions for autonomous spatial navigation and robotics.',
    tags: ['PyTorch', 'CUDA', 'Python', 'WebGL'],
    stars: 342,
    link: 'https://github.com',
    featured: true
  },
  {
    id: 'indic-multimodal',
    title: 'Indic Multimodal Intelligence',
    category: 'NLP & Speech AI',
    description: 'Low-latency Indic speech-to-text and speech-to-speech model spanning 22 official Indian languages.',
    tags: ['Transformers', 'PyTorch', 'FastAPI', 'ONNX'],
    stars: 520,
    link: 'https://github.com',
    featured: true
  },
  {
    id: 'dot-creation-web',
    title: 'Personal Folder Website',
    category: 'Interactive Web',
    description: 'ASCII halftone creation-of-adam portfolio interface featuring interactive desktop OS windows.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Canvas'],
    stars: 189,
    link: 'https://github.com',
    featured: true
  },
  {
    id: 'agentic-coder',
    title: 'Autonomous Code Synthesis Agent',
    category: 'Agentic Workflows',
    description: 'Multi-agent coding orchestration pipeline for executing full-stack web applications from text prompts.',
    tags: ['TypeScript', 'Node.js', 'LLM API', 'Docker'],
    stars: 410,
    link: 'https://github.com',
    featured: false
  }
];

const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'Building Sovereign AI Models for 1.4 Billion People',
    date: 'August 2026',
    readTime: '6 min read',
    excerpt: 'Why localized, domain-adapted Indic multimodal foundation models are crucial for democratizing compute across India.',
    content: `Building frontier AI models requires more than just scaling compute. For languages and cultural contexts across India, sovereign AI compute hubs paired with specialized Indic tokenizers offer orders-of-magnitude efficiency gains. In this write-up, we explore architecture design, token optimization, and real-time voice inference benchmarks.`
  },
  {
    id: 'post-2',
    title: 'Designing Web Interfaces That Feel Alive',
    date: 'July 2026',
    readTime: '4 min read',
    excerpt: 'How procedural canvas animations, glassmorphism, and micro-haptics elevate portfolio web design.',
    content: `Web applications don't need to look static. By leveraging HTML5 Canvas particle systems, CSS blur backdrops, and Web Audio API synthesized haptics, we can construct interactive environments that wow visitors in the first 3 seconds.`
  },
  {
    id: 'post-3',
    title: 'The Shift Toward Autonomous Neural Agents',
    date: 'June 2026',
    readTime: '8 min read',
    excerpt: 'Moving from reactive chatbot interfaces to continuous execution loops with memory and tool integration.',
    content: `Agents are evolving from single-prompt completion tasks to long-horizon autonomous planning. By giving agents access to sandboxed shell runtimes, browser subagents, and memory graphs, we unlock persistent software engineering capabilities.`
  }
];

const WORK_EXPERIENCE = [
  {
    role: 'AI Engineer & Founder',
    company: 'Frontier AI Research',
    period: '2024 — Present',
    description: 'Leading research and development of multimodal foundation models, spatial world simulators, and high-performance WebGL interfaces.'
  },
  {
    role: 'Senior Full Stack AI Developer',
    company: 'NextGen Systems',
    period: '2022 — 2024',
    description: 'Architected distributed AI inference API pipelines, real-time web dashboards, and vector search infrastructure.'
  },
  {
    role: 'Software Engineering Intern',
    company: 'Tech Innovators',
    period: '2021 — 2022',
    description: 'Built React & TypeScript design systems and integrated backend microservices.'
  }
];

const TWEETS = [
  {
    id: 't1',
    date: '2h ago',
    text: 'Folder-based website designs hit different when you click and everything opens like a native OS desktop. 🚀✨',
    likes: 142,
    reposts: 28
  },
  {
    id: 't2',
    date: '1d ago',
    text: 'Just deployed new multimodal benchmarks. Latency down by 40% on Indic speech recognition models! 🇮🇳🔥',
    likes: 389,
    reposts: 64
  },
  {
    id: 't3',
    date: '3d ago',
    text: 'The best UI is the one that surprises and delights within 100ms. Canvas dot matrix math is insanely fun to tweak.',
    likes: 215,
    reposts: 19
  }
];

export const PersonalHubModal: React.FC<PersonalHubModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab
}) => {
  const [selectedArticle, setSelectedArticle] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Welcome to Pratyush Pandey OS v2.4',
    'Type "help" for available commands (skills, contact, clear, bio, stack)'
  ]);

  if (!isOpen) return null;

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    let reply = '';

    if (cmd === 'help') {
      reply = 'Available commands: skills, contact, clear, bio, stack, social';
    } else if (cmd === 'skills') {
      reply = 'Skills: React, TypeScript, PyTorch, Python, Node.js, WebGL, Tailwind, LLM Agents, Next.js';
    } else if (cmd === 'contact') {
      reply = 'Email: pratyush@example.com | LinkedIn: /in/pratyushpandey | X: @praytyushpande';
    } else if (cmd === 'bio') {
      reply = 'Pratyush Pandey — Developer & AI Researcher building next-gen web & intelligent systems.';
    } else if (cmd === 'stack') {
      reply = 'Stack: React 19, Vite, TypeScript, GSAP, Canvas API, Web Audio, Tailwind CSS';
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
      setTerminalInput('');
      return;
    } else if (cmd === '') {
      return;
    } else {
      reply = `Command not found: "${cmd}". Type "help" for list of commands.`;
    }

    setTerminalOutput(prev => [...prev, `$ ${terminalInput}`, reply]);
    setTerminalInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Desktop Window Container */}
      <div className="relative w-full max-w-5xl h-[88vh] max-h-[800px] bg-neutral-950/90 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-100 font-sans">
        
        {/* macOS Window Top Navigation Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800/80 backdrop-blur-md select-none">
          {/* Traffic Lights Controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center group"
              title="Close window"
            >
              <span className="text-[9px] text-red-950 font-bold opacity-0 group-hover:opacity-100">✕</span>
            </button>
            <button 
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center group"
              title="Minimize window"
            >
              <span className="text-[9px] text-yellow-950 font-bold opacity-0 group-hover:opacity-100">−</span>
            </button>
            <button 
              className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center group"
              title="Maximize window"
            >
              <span className="text-[9px] text-green-950 font-bold opacity-0 group-hover:opacity-100">+</span>
            </button>
          </div>

          {/* Window Title & Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="text-sky-400">📁</span>
            <span className="font-semibold text-neutral-200">~/pratyush/{activeTab}</span>
          </div>

          {/* Action Badge */}
          <div className="flex items-center gap-2">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-[11px] font-mono border border-sky-500/20 transition-all"
            >
              <span>Connect</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Desktop Dock / Tab Bar */}
        <div className="flex items-center overflow-x-auto gap-1 px-3 py-2 bg-neutral-900/40 border-b border-neutral-800/60 font-mono text-xs no-scrollbar">
          <button
            onClick={() => onSelectTab('projects')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'projects' 
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <span>📂</span>
            <span>Projects</span>
          </button>

          <button
            onClick={() => onSelectTab('blog')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'blog' 
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <span>📝</span>
            <span>Blog</span>
          </button>

          <button
            onClick={() => onSelectTab('linkedin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'linkedin' 
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <span>💼</span>
            <span>LinkedIn</span>
          </button>

          <button
            onClick={() => onSelectTab('x')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'x' 
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <span>𝕏</span>
            <span>X (Twitter)</span>
          </button>

          <button
            onClick={() => onSelectTab('doing')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'doing' 
                ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <span>⚡</span>
            <span>What I'm doing</span>
          </button>
        </div>

        {/* Tab Content Window Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-neutral-950 to-black space-y-6">
          
          {/* TAB 1: PROJECTS / EVERYTHING */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <span>Featured Projects</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      {PROJECTS.length} Builds
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Explorations in AI models, WebGL canvases, full-stack applications & spatial systems.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECTS.map((project) => (
                  <div 
                    key={project.id}
                    className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-lg hover:shadow-sky-500/10"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                          <span>★</span> {project.stars}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                      >
                        <span>View</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BLOG */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Articles & Insights</h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Writing about AI architecture, Web interfaces, and engineering workflows.
                </p>
              </div>

              <div className="space-y-4">
                {BLOG_POSTS.map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedArticle(post)}
                    className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-sky-500/50 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-mono text-sky-400 font-semibold">
                      <span>Read article</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LINKEDIN */}
          {activeTab === 'linkedin' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">LinkedIn Profile & Experience</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Work history, technical skills, and background.
                  </p>
                </div>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold transition-all shadow-lg shadow-sky-500/20 flex items-center gap-2"
                >
                  <span>Open LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Profile Card Summary */}
              <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl flex-shrink-0">
                  PP
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">Pratyush Pandey</h3>
                  <p className="text-xs font-mono text-sky-400">AI Researcher & Software Engineer</p>
                  <p className="text-xs text-neutral-300">Building intelligent systems, world models, and interactive web tools.</p>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-mono font-bold uppercase text-neutral-400 tracking-wider">
                  Career Timeline
                </h3>

                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/80 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-white">{exp.role}</h4>
                        <span className="text-xs font-mono text-sky-400">{exp.company}</span>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: X (TWITTER) */}
          {activeTab === 'x' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">X (Twitter) Feed</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Real-time updates, engineering thoughts, and project teasers.
                  </p>
                </div>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold transition-all flex items-center gap-2"
                >
                  <span>Follow @praytyushpande</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="space-y-4">
                {TWEETS.map((tweet) => (
                  <div key={tweet.id} className="p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-bold text-sky-400">
                          PP
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Pratyush Pandey</div>
                          <div className="text-[10px] font-mono text-neutral-400">@praytyushpande</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-neutral-500">{tweet.date}</span>
                    </div>

                    <p className="text-sm text-neutral-200 leading-relaxed">{tweet.text}</p>

                    <div className="flex items-center gap-6 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800/60">
                      <span>💬 Reply</span>
                      <span>🔁 {tweet.reposts} Reposts</span>
                      <span>❤️ {tweet.likes} Likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WHAT I'M DOING */}
          {activeTab === 'doing' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-neutral-800 pb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">What I'm Doing Right Now</h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Active builds, current research focus, and interactive terminal interface.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Active Focus Card */}
                <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    Current Status & Focus
                  </div>
                  <h3 className="text-lg font-bold text-white">Exploring Multimodal Latent Space</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Currently training specialized vision-language transformers, tweaking canvas dot-matrix shaders, and crafting rich web applications.
                  </p>
                </div>

                {/* Tech Stack Card */}
                <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-3">
                  <div className="text-xs font-mono text-sky-400 font-bold uppercase">
                    Active Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['PyTorch', 'React 19', 'TypeScript', 'Tailwind', 'CUDA', 'Node.js', 'Vite', 'Canvas API', 'WebGL'].map((item, idx) => (
                      <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-200 border border-neutral-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Status Terminal */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs overflow-hidden shadow-2xl">
                <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-neutral-300 font-semibold">pratyush-terminal ~ zsh</span>
                  </div>
                  <span>UTF-8</span>
                </div>

                <div className="p-4 space-y-2 max-h-56 overflow-y-auto font-mono text-neutral-300">
                  {terminalOutput.map((line, i) => (
                    <div key={i} className={line.startsWith('$') ? 'text-sky-400 font-bold' : 'text-neutral-300'}>
                      {line}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-neutral-800 px-4 py-2 bg-neutral-900/50">
                  <span className="text-sky-400 font-bold mr-2">$</span>
                  <input 
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type 'help', 'skills', 'contact', 'bio'..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-neutral-600"
                  />
                  <button type="submit" className="text-sky-400 hover:text-sky-300 text-xs uppercase font-bold">
                    Run
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-4 py-2.5 bg-neutral-900/90 border-t border-neutral-800 text-[11px] font-mono text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div>
            Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">ESC</kbd> or click ✕ to close
          </div>
          <div className="flex items-center gap-4">
            <span>Status: <strong className="text-emerald-400">Available</strong></span>
            <span>Location: <strong className="text-white">India 🇮🇳</strong></span>
          </div>
        </div>
      </div>

      {/* Article Reader Sub-Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
          <div className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-4 text-neutral-200">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-sky-400">{selectedArticle.date} • {selectedArticle.readTime}</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-neutral-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white">{selectedArticle.title}</h2>
            <p className="text-sm leading-relaxed text-neutral-300">{selectedArticle.content}</p>
            <div className="pt-4 border-t border-neutral-800 flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalHubModal;

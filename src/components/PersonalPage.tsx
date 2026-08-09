import React, { useEffect, useRef } from 'react';

interface PersonalPageProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ─── Data ─── */
const PROJECTS = [
  { title: 'AI World Model Engine', desc: 'Neural simulator for physical state prediction in autonomous navigation & robotics.', tags: ['PyTorch', 'CUDA', 'Python'], link: '#' },
  { title: 'Indic Multimodal Intelligence', desc: 'Low-latency speech-to-text across 22 Indian languages with voice agent capabilities.', tags: ['Transformers', 'FastAPI', 'ONNX'], link: '#' },
  { title: 'Dot-Matrix Portfolio', desc: 'This website — interactive Creation of Adam halftone canvas with folder interface.', tags: ['React', 'TypeScript', 'Canvas'], link: '#' },
  { title: 'Autonomous Code Agent', desc: 'Multi-agent orchestration pipeline for full-stack app generation from prompts.', tags: ['Node.js', 'LLM API', 'Docker'], link: '#' },
  { title: 'Real-Time Voice AI', desc: 'Sub-200ms voice cloning and synthesis engine for conversational AI assistants.', tags: ['Python', 'WebSocket', 'CUDA'], link: '#' },
  { title: 'Neural Search Engine', desc: 'Semantic vector search with hybrid retrieval across millions of documents.', tags: ['Rust', 'FAISS', 'React'], link: '#' },
];

const BLOG_POSTS = [
  { title: 'Building Sovereign AI for 1.4 Billion People', date: 'Aug 2026', time: '6 min', excerpt: 'Why localized Indic multimodal models are crucial for democratizing compute across India.' },
  { title: 'Designing Web Interfaces That Feel Alive', date: 'Jul 2026', time: '4 min', excerpt: 'Procedural canvas animations, glassmorphism, and micro-haptics in portfolio design.' },
  { title: 'The Shift Toward Autonomous Neural Agents', date: 'Jun 2026', time: '8 min', excerpt: 'Moving from reactive chatbots to continuous execution loops with memory and tools.' },
];

const EXPERIENCE = [
  { role: 'AI Engineer & Founder', company: 'Frontier Research', period: '2024 — Present', desc: 'Leading R&D on multimodal foundation models, world simulators, and WebGL interfaces.' },
  { role: 'Senior Full Stack AI Developer', company: 'NextGen Systems', period: '2022 — 2024', desc: 'Architected distributed AI inference pipelines, real-time dashboards, and vector search.' },
  { role: 'Software Engineering Intern', company: 'Tech Innovators', period: '2021 — 2022', desc: 'Built React & TypeScript design systems and integrated backend microservices.' },
];

const SKILLS = ['React', 'TypeScript', 'Python', 'PyTorch', 'Node.js', 'Next.js', 'CUDA', 'Rust', 'WebGL', 'Canvas API', 'Tailwind CSS', 'Docker', 'PostgreSQL', 'Redis', 'FastAPI', 'GraphQL'];

const PersonalPage: React.FC<PersonalPageProps> = ({ isOpen, onClose }) => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && pageRef.current) {
      pageRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={pageRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: '#000',
        color: '#fff',
        overflowY: 'auto',
        overflowX: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
        animation: 'fadeIn 0.4s ease-out',
      }}
    >
      {/* Inline keyframe animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .slide-up { animation: slideUp 0.6s ease-out both; }
        .slide-up-d1 { animation: slideUp 0.6s 0.1s ease-out both; }
        .slide-up-d2 { animation: slideUp 0.6s 0.2s ease-out both; }
        .slide-up-d3 { animation: slideUp 0.6s 0.3s ease-out both; }
        .pp-section { max-width: 900px; margin: 0 auto; padding: 0 24px; }
        .pp-card { background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; transition: border-color 0.3s, transform 0.2s; }
        .pp-card:hover { border-color: #38bdf8; transform: translateY(-2px); }
        .pp-tag { display: inline-block; font-size: 11px; padding: 3px 10px; border-radius: 6px; background: #1a1a2e; color: #7dd3fc; border: 1px solid #222; margin: 2px; font-family: 'SF Mono', 'Fira Code', monospace; }
        .pp-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-decoration: none; }
        .pp-divider { height: 1px; background: linear-gradient(90deg, transparent, #333, transparent); margin: 64px 0; }
      `}</style>

      {/* ─── Top Navigation Bar ─── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 60, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1a1a1a', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onClose}
          style={{ background: 'none', border: '1px solid #333', color: '#999', padding: '6px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#999'; }}
        >
          ← Back
        </button>
        <span style={{ fontSize: 13, color: '#666', fontWeight: 500, letterSpacing: '0.05em' }}>PRATYUSH PANDEY</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: 13, padding: '6px 12px', border: '1px solid #222', borderRadius: 8, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#666'; }}
          >LinkedIn ↗</a>
          <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none', fontSize: 13, padding: '6px 12px', border: '1px solid #222', borderRadius: 8, transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.color = '#666'; }}
          >𝕏 ↗</a>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section style={{ padding: '100px 0 60px' }} className="pp-section">
        <div className="slide-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Available for work</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.03em' }}>
            Hi, I'm <span style={{ color: '#38bdf8' }}>Pratyush</span>
          </h1>
          <p style={{ fontSize: 18, color: '#999', lineHeight: 1.7, maxWidth: 600, margin: '0 0 32px' }}>
            Developer & AI Researcher building intelligent systems, world models, and interactive web experiences. Based in India 🇮🇳
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="mailto:pratyush@example.com" className="pp-btn" style={{ background: '#38bdf8', color: '#000' }}
              onMouseEnter={e => e.currentTarget.style.background = '#7dd3fc'}
              onMouseLeave={e => e.currentTarget.style.background = '#38bdf8'}
            >✉ Get in touch</a>
            <a href="https://github.com/praytyushpande" target="_blank" rel="noreferrer" className="pp-btn" style={{ background: '#111', color: '#fff', border: '1px solid #333' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#38bdf8'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
            >⌘ GitHub</a>
          </div>
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── WHAT I'M DOING NOW ─── */}
      <section className="pp-section slide-up-d1" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>⚡ What I'm doing now</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <div className="pp-card">
            <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span>
              Current Focus
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 8px' }}>Multimodal Latent Space Research</h3>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>Training vision-language transformers and building interactive canvas-based web experiences.</p>
          </div>
          <div className="pp-card">
            <div style={{ fontSize: 11, color: '#38bdf8', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Stack</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
              {['PyTorch', 'React 19', 'TypeScript', 'CUDA', 'Canvas API', 'Vite', 'Tailwind'].map(s => (
                <span key={s} className="pp-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── PROJECTS ─── */}
      <section className="pp-section slide-up-d2" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>📂 Projects</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <div key={i} className="pp-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: '0 0 12px' }}>{p.desc}</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.tags.map(t => <span key={t} className="pp-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── BLOG / WRITING ─── */}
      <section className="pp-section slide-up-d3" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>📝 Writing</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BLOG_POSTS.map((post, i) => (
            <div key={i} className="pp-card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: '#38bdf8', fontWeight: 600 }}>{post.date}</span>
                <span style={{ fontSize: 11, color: '#555' }}>{post.time}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{post.title}</h3>
              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── EXPERIENCE ─── */}
      <section className="pp-section" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>💼 Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="pp-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontSize: 13, color: '#38bdf8' }}>{exp.company}</span>
                </div>
                <span style={{ fontSize: 12, color: '#555', fontFamily: 'monospace' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── SKILLS ─── */}
      <section className="pp-section" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>🛠 Skills & Technologies</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SKILLS.map(s => <span key={s} className="pp-tag" style={{ fontSize: 13, padding: '6px 14px' }}>{s}</span>)}
        </div>
      </section>

      <div className="pp-section"><div className="pp-divider"></div></div>

      {/* ─── CONNECT / SOCIALS ─── */}
      <section className="pp-section" style={{ paddingBottom: 40 }}>
        <h2 style={{ fontSize: 12, color: '#666', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24 }}>🌐 Connect</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="pp-card" style={{ textDecoration: 'none', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>💼</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>LinkedIn</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Professional network</div>
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="pp-card" style={{ textDecoration: 'none', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>𝕏</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>X (Twitter)</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Thoughts & updates</div>
          </a>
          <a href="https://github.com/praytyushpande" target="_blank" rel="noreferrer" className="pp-card" style={{ textDecoration: 'none', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⌘</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>GitHub</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Open source work</div>
          </a>
          <a href="mailto:pratyush@example.com" className="pp-card" style={{ textDecoration: 'none', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✉</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Email</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Get in touch</div>
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '40px 0 32px', borderTop: '1px solid #111' }}>
        <div className="pp-section" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#444', margin: 0 }}>
            Built with React, TypeScript & Canvas · © {new Date().getFullYear()} Pratyush Pandey
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalPage;

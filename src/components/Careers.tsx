import React, { useState, useRef } from 'react';
import gsap from 'gsap';

interface Job {
  id: string;
  title: string;
  category: string;
  type: string;
  location: string;
}

const Careers: React.FC = () => {
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', cover: '', resumeName: '' });
  const [errors, setErrors] = useState({ name: '', email: '', resume: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formOverlayRef = useRef<HTMLDivElement>(null);

  const jobs: Job[] = [
    {
      id: 'research-engineer',
      title: 'AI Research Engineer',
      category: 'Engineering',
      type: 'Full-time',
      location: 'Remote / Hybrid'
    },
    {
      id: 'research-scientist',
      title: 'Research Scientist',
      category: 'Research',
      type: 'Full-time',
      location: 'London / SF'
    },
    {
      id: 'ml-engineer',
      title: 'Machine Learning Engineer',
      category: 'Engineering',
      type: 'Full-time',
      location: 'Remote / Hybrid'
    },
    {
      id: 'systems-engineer',
      title: 'Systems Engineer',
      category: 'Systems',
      type: 'Full-time',
      location: 'SF'
    },
    {
      id: 'research-intern',
      title: 'Research Intern',
      category: 'Education',
      type: 'Summer 2026',
      location: 'Global'
    }
  ];

  const handleOpenApply = (job: Job) => {
    setActiveJob(job);
    setIsSubmitted(false);
    setFormData({ name: '', email: '', cover: '', resumeName: '' });
    setErrors({ name: '', email: '', resume: '' });
    setTimeout(() => {
      if (formOverlayRef.current) {
        gsap.fromTo(formOverlayRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.5, ease: 'power3.out' }
        );
      }
    }, 10);
  };

  const handleCloseApply = () => {
    if (formOverlayRef.current) {
      gsap.to(formOverlayRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => setActiveJob(null)
      });
    } else {
      setActiveJob(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, resumeName: file.name });
      setErrors({ ...errors, resume: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', resume: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.resumeName) {
      newErrors.resume = 'Resume file is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-24 lg:py-36 bg-surface border-y border-border relative">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Culture Description Section */}
        <div id="people" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-24">
          <div className="space-y-6 max-w-xl">
            <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
              Our Culture
            </span>
            <h3 className="text-4xl lg:text-5xl font-display font-light leading-tight">
              United by a shared ambition.
            </h3>
            <p className="text-fg/60 text-base lg:text-lg font-light leading-relaxed font-body">
              Orb Labs brings together researchers, engineers, founders, and students united by a shared ambition to push the boundaries of artificial intelligence. We value intellectual curiosity, scientific rigor, and a willingness to pursue difficult problems over long time horizons.
            </p>
          </div>
          <div className="text-right space-y-4">
            <div className="w-full h-px bg-border-strong"></div>
            <p className="text-fg/40 uppercase tracking-[0.45em] text-[10px] font-semibold">
              A Research Culture for Pioneers
            </p>
          </div>
        </div>

        {/* Open Roles Skyline Horizontal Scroll */}
        <div id="careers" className="space-y-12">
          <div className="flex justify-between items-center">
            <h4 className="text-2xl lg:text-3xl font-display text-fg">
              Open Roles
            </h4>
            <button 
              onClick={() => handleOpenApply({ id: 'general', title: 'General Application', category: 'General', type: 'Full-time / Internship', location: 'Global' })}
              className="text-xs uppercase tracking-widest text-accent hover:underline font-semibold font-body"
            >
              General Application →
            </button>
          </div>
          
          {/* Skyline cards display list */}
          <div className="flex gap-6 overflow-x-auto pb-8 items-end no-scrollbar px-2 -mx-2 font-body">
            {jobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => handleOpenApply(job)}
                className="skyline-card shrink-0 w-[300px] bg-bg border border-border p-8 flex flex-col justify-between hover:border-accent transition-all duration-300 cursor-pointer group"
              >
                <span className="text-accent text-[10px] uppercase tracking-widest font-bold block mb-12">
                  {job.category}
                </span>
                <div className="space-y-3">
                  <h5 className="text-xl lg:text-2xl font-display italic text-fg group-hover:text-accent transition-colors leading-tight">
                    {job.title}
                  </h5>
                  <p className="text-[10px] text-fg/40 uppercase tracking-[0.2em] font-medium">
                    {job.type} · {job.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cinematic Apply Sidebar Overlay */}
      {activeJob && (
        <div className="fixed inset-0 z-50 bg-bg/60 backdrop-blur-sm flex justify-end">
          <div className="absolute inset-0" onClick={handleCloseApply}></div>
          <div 
            ref={formOverlayRef} 
            className="relative z-10 w-full max-w-lg bg-surface border-l border-border-strong p-8 lg:p-12 flex flex-col h-full shadow-2xl overflow-y-auto"
          >
            <button 
              onClick={handleCloseApply}
              className="absolute top-6 right-6 text-fg/40 hover:text-accent font-light text-2xl"
              aria-label="Close form"
            >
              ✕
            </button>

            <div className="flex-1 flex flex-col justify-center font-body">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-accent text-xs uppercase tracking-widest font-bold">Join the Lab</span>
                    <h3 className="text-3xl font-display italic text-fg leading-tight">
                      Apply for {activeJob.title}
                    </h3>
                    <p className="text-xs text-fg/45 font-light">
                      {activeJob.category} · {activeJob.type} · {activeJob.location}
                    </p>
                  </div>

                  <div className="space-y-5 pt-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-fg/60 font-semibold">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                        className={`w-full px-4 py-2.5 border bg-bg text-fg text-sm focus:outline-none focus:border-accent ${errors.name ? 'border-red-500' : 'border-border'}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-fg/60 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                        className={`w-full px-4 py-2.5 border bg-bg text-fg text-sm focus:outline-none focus:border-accent ${errors.email ? 'border-red-500' : 'border-border'}`}
                        placeholder="you@lab.org"
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                    </div>

                    {/* Statement */}
                    <div className="space-y-1">
                      <label className="text-[11px] uppercase tracking-wider text-fg/60 font-semibold">Statement of Interest</label>
                      <textarea
                        value={formData.cover}
                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-border bg-bg text-fg text-sm focus:outline-none focus:border-accent resize-none"
                        placeholder="Tell us about your research interests and ambition..."
                      />
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-fg/60 font-semibold block">Resume / CV *</label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-dashed border-2 p-5 text-center cursor-pointer bg-bg hover:border-accent/40 transition-colors ${errors.resume ? 'border-red-500' : 'border-border'}`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <span className="text-xs text-fg/50 font-light block">
                          {formData.resumeName ? `Selected: ${formData.resumeName}` : 'Click to select PDF or Word document'}
                        </span>
                      </div>
                      {errors.resume && <p className="text-[10px] text-red-500 font-semibold">{errors.resume}</p>}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-accent text-bg text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
                    >
                      Submit Application
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseApply}
                      className="px-6 py-3 border border-border text-fg text-xs font-bold uppercase tracking-widest hover:bg-fg/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-accent/10 border border-accent rounded-full flex items-center justify-center mx-auto text-accent text-2xl font-light">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-display italic text-fg">Application Transmitted</h4>
                    <p className="text-sm text-fg/60 font-light leading-relaxed max-w-sm mx-auto">
                      Thank you, <span className="font-semibold text-fg">{formData.name}</span>. Your details and resume have been securely received. Our research coordinators will review it and get in touch.
                    </p>
                  </div>
                  <div className="pt-6">
                    <button
                      onClick={handleCloseApply}
                      className="px-8 py-3 bg-accent text-bg text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
                    >
                      Return to Careers
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Careers;

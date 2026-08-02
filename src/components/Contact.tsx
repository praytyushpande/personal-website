import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', org: '', area: 'world-models', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Full name or lab team name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please input a brief summary of your proposal';
      valid = false;
    } else if (formData.message.length < 20) {
      newErrors.message = 'Proposal summary should be at least 20 characters';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsSent(true);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-36 bg-bg relative">
      <div className="container mx-auto px-6 lg:px-20 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border border-border p-8 lg:p-16 rounded-lg bg-surface">
          
          {/* Column 1: Info and Links */}
          <div className="lg:col-span-5 space-y-8 font-body h-full flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-accent text-xs tracking-widest uppercase font-semibold block">
                Collaborations
              </span>
              <h3 className="text-3xl lg:text-4xl font-display italic text-fg">
                Get in touch.
              </h3>
              <p className="text-sm text-fg/60 leading-relaxed font-light">
                Interested in collaborating on deep learning research, conducting joint biological trials, or integrating our open-source models? Drop us a brief note with your details.
              </p>
            </div>
            
            <div className="pt-8 border-t border-border mt-8 space-y-3">
              <a 
                href="mailto:pratyush@orbplatforms.com" 
                className="flex items-center justify-between p-3.5 rounded bg-bg/80 border border-border hover:border-accent transition-all group block text-left"
              >
                <div className="space-y-0.5">
                  <span class="text-[9px] uppercase tracking-[0.2em] text-accent font-bold block">Pratyush</span>
                  <span class="text-xs font-mono text-fg/90 group-hover:text-accent transition-colors block">pratyush@orbplatforms.com</span>
                </div>
                <span class="text-xs text-fg/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
              <a 
                href="mailto:aasrith@orbplatforms.com" 
                className="flex items-center justify-between p-3.5 rounded bg-bg/80 border border-border hover:border-accent transition-all group block text-left"
              >
                <div className="space-y-0.5">
                  <span class="text-[9px] uppercase tracking-[0.2em] text-accent font-bold block">Aasrith</span>
                  <span class="text-xs font-mono text-fg/90 group-hover:text-accent transition-colors block">aasrith@orbplatforms.com</span>
                </div>
                <span class="text-xs text-fg/30 group-hover:text-accent group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
              <div className="flex gap-4 mt-6 text-xs uppercase tracking-widest opacity-40">
                <a className="hover:text-fg hover:opacity-100 transition-all" href="#">X</a>
                <a className="hover:text-fg hover:opacity-100 transition-all" href="#">GitHub</a>
                <a className="hover:text-fg hover:opacity-100 transition-all" href="#">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Column 2: Collaboration Form / Success State */}
          <div className="lg:col-span-7 font-body w-full border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-12">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-fg/60 font-semibold">Name / Lab Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      className={`w-full px-4 py-2 border bg-bg text-fg text-sm focus:outline-none focus:border-accent ${errors.name ? 'border-red-500' : 'border-border'}`}
                      placeholder="Principal Investigator"
                    />
                    {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-fg/60 font-semibold">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                      className={`w-full px-4 py-2 border bg-bg text-fg text-sm focus:outline-none focus:border-accent ${errors.email ? 'border-red-500' : 'border-border'}`}
                      placeholder="pi@university.edu"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Org */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-fg/60 font-semibold">Organization</label>
                    <input
                      type="text"
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full px-4 py-2 border border-border bg-bg text-fg text-sm focus:outline-none focus:border-accent"
                      placeholder="Department / University / Company"
                    />
                  </div>

                  {/* Area */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-fg/60 font-semibold">Primary Theme</label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border bg-bg text-fg text-sm focus:outline-none focus:border-accent rounded-none"
                    >
                      <option value="world-models">World Models</option>
                      <option value="scientific-ai">Scientific AI</option>
                      <option value="drug-discovery">Drug Discovery</option>
                      <option value="autonomous-intelligence">Autonomous Intelligence</option>
                      <option value="ai-infrastructure">AI Infrastructure</option>
                      <option value="ai-safety">AI Safety</option>
                      <option value="other">Other / General Partner</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-fg/60 font-semibold">Collaboration Proposal Summary *</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                    rows={4}
                    className={`w-full px-4 py-2.5 border bg-bg text-fg text-sm focus:outline-none focus:border-accent resize-none ${errors.message ? 'border-red-500' : 'border-border'}`}
                    placeholder="Provide a brief summary of how your research interests align with Orb Labs..."
                  />
                  {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-bg text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-accent/15 border border-accent rounded-full flex items-center justify-center mx-auto text-accent text-2xl font-light">
                  ✓
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-display italic text-fg">Proposal Transmitted</h4>
                  <p className="text-sm text-fg/60 font-light leading-relaxed max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-fg">{formData.name}</span>. Your collaboration proposal for <span className="italic">{formData.area.replace('-', ' ')}</span> has been sent. We will get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 border border-border text-fg text-xs font-bold uppercase tracking-widest hover:bg-fg/5 transition-all"
                >
                  Submit Another
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

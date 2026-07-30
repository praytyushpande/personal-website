import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-bg border-t border-border font-body">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center gap-8">
        
        {/* Footer Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-110 transition-transform"></div>
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-fg">
            Orb Labs
          </span>
        </a>
        
        {/* Copyright notice */}
        <p className="text-[10px] uppercase tracking-widest text-fg/40 text-center lg:text-left">
          © 2026 Orb Research Labs. Independent Foundation. All rights reserved.
        </p>
        
        {/* Utility links */}
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-fg/60">
          <a className="hover:text-accent transition-colors" href="#">
            Ethics
          </a>
          <a className="hover:text-accent transition-colors" href="#">
            Privacy
          </a>
          <a className="hover:text-accent transition-colors" href="#">
            Legal
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

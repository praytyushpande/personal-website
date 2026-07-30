import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link intersection tracking
      const sections = ['hero', 'research', 'publications', 'people', 'careers', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Research', href: '#research', id: 'research' },
    { name: 'Open Science', href: '#publications', id: 'publications' },
    { name: 'People', href: '#people', id: 'people' },
    { name: 'Careers', href: '#careers', id: 'careers' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 lg:px-12 py-5 transition-all duration-500 nav-blur border-b ${scrolled ? 'border-border py-4 bg-bg/90' : 'border-transparent bg-transparent'}`}>
        <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse group-hover:scale-110 transition-transform"></div>
          <span className="text-sm font-medium tracking-[0.25em] uppercase text-fg font-body">
            Orb Labs
          </span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:text-accent ${activeSection === link.id ? 'text-accent' : 'text-fg/50'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden sm:inline-block px-5 py-2 border border-border-strong text-xs uppercase tracking-widest font-semibold text-fg hover:bg-fg hover:text-bg transition-all duration-300">
            Collaborate
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span className={`w-6 h-px bg-fg transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`w-6 h-px bg-fg transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-px bg-fg transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div className={`fixed inset-0 z-40 bg-bg/95 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg uppercase tracking-[0.2em] font-semibold transition-all ${activeSection === link.id ? 'text-accent scale-105' : 'text-fg/60'}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 border border-border text-sm uppercase tracking-widest font-semibold text-fg hover:bg-fg hover:text-bg transition-all"
          >
            Collaborate
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

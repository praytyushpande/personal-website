import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Research from './components/Research';
import Publications from './components/Publications';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis scroll events
    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="smooth-wrapper bg-bg text-fg min-h-screen selection:bg-accent selection:text-bg relative">
      <div className="page-noise" aria-hidden="true"></div>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <About />
        <Research />
        <Publications />
        <Careers />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;

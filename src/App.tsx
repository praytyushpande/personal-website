import React, { useState, useEffect, useCallback } from 'react';
import HandsCanvas from './components/HandCanvas';
import PersonalHubModal from './components/PersonalHubModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenFolder = useCallback(() => {
    setActiveTab('projects');
    setIsModalOpen(true);
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
      {/* Dot-Matrix Hands Background */}
      <HandsCanvas />

      {/* Centered Folder — directly clickable */}
      <div
        onClick={handleOpenFolder}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
          {/* Small macOS Folder Icon */}
          <svg width="64" height="56" viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))', pointerEvents: 'none' }}>
            <path d="M4 14C4 10.134 7.134 7 11 7H28C30.21 7 32.29 8.106 33.5 9.938L36.5 14.5C37.71 16.332 39.79 17.438 42 17.438H69C72.866 17.438 76 20.572 76 24.438V57C76 60.866 72.866 64 69 64H11C7.134 64 4 60.866 4 57V14Z" fill="#1A9FE0"/>
            <path d="M4 28C4 24.134 7.134 21 11 21H69C72.866 21 76 24.134 76 28V57C76 60.866 72.866 64 69 64H11C7.134 64 4 60.866 4 57V28Z" fill="url(#fg)"/>
            <path d="M11 22H69C72.314 22 75 24.686 75 28V29C75 25.686 72.314 23 69 23H11C7.686 23 5 25.686 5 29V28C5 24.686 7.686 22 11 22Z" fill="#7DD3FC" fillOpacity="0.5"/>
            <defs>
              <linearGradient id="fg" x1="4" y1="21" x2="76" y2="64" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4FC3F7"/>
                <stop offset="1" stopColor="#1A9FE0"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ marginTop: 8, color: '#fff', fontSize: 14, fontWeight: 400, letterSpacing: '0.02em', pointerEvents: 'none' }}>
            projects
          </span>
        </div>
      </div>

      {/* Hub Modal */}
      <PersonalHubModal
        isOpen={isModalOpen}
        activeTab={activeTab}
        onClose={() => setIsModalOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
};

export default App;

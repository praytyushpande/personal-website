import React, { useState, useEffect } from 'react';
import WorldMapCanvas from './components/HandCanvas';
import FolderHero from './components/FolderHero';
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

  const handleOpenFolder = (tab: string = 'projects') => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif' }}>
      {/* Dot-Matrix World Map Background */}
      <WorldMapCanvas />

      {/* Centered Folder */}
      <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FolderHero onOpen={handleOpenFolder} />
      </main>

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

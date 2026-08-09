import React from 'react';

interface FolderHeroProps {
  onOpen: (tab?: string) => void;
}

export const FolderHero: React.FC<FolderHeroProps> = ({ onOpen }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen('projects');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative z-20 flex flex-col items-center justify-center cursor-pointer select-none group bg-transparent border-none outline-none p-6"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Small macOS Folder Icon */}
      <div className="w-16 h-14 sm:w-20 sm:h-[68px] relative transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        <svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg pointer-events-none">
          {/* Folder back */}
          <path
            d="M4 14C4 10.134 7.134 7 11 7H28C30.21 7 32.29 8.106 33.5 9.938L36.5 14.5C37.71 16.332 39.79 17.438 42 17.438H69C72.866 17.438 76 20.572 76 24.438V57C76 60.866 72.866 64 69 64H11C7.134 64 4 60.866 4 57V14Z"
            fill="#1A9FE0"
          />
          {/* Folder front */}
          <path
            d="M4 28C4 24.134 7.134 21 11 21H69C72.866 21 76 24.134 76 28V57C76 60.866 72.866 64 69 64H11C7.134 64 4 60.866 4 57V28Z"
            fill="url(#folderGrad)"
          />
          {/* Top highlight */}
          <path
            d="M11 22H69C72.314 22 75 24.686 75 28V29C75 25.686 72.314 23 69 23H11C7.686 23 5 25.686 5 29V28C5 24.686 7.686 22 11 22Z"
            fill="#7DD3FC"
            fillOpacity="0.5"
          />
          <defs>
            <linearGradient id="folderGrad" x1="4" y1="21" x2="76" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4FC3F7" />
              <stop offset="1" stopColor="#1A9FE0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Label */}
      <span className="mt-2 text-white text-sm sm:text-base font-normal tracking-wide opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
        projects
      </span>
    </button>
  );
};

export default FolderHero;

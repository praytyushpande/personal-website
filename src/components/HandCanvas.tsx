import React, { useEffect, useRef } from 'react';

export const HandsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let dotGrid: { x: number; y: number; brightness: number }[] = [];
    let imageLoaded = false;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/hands.png';

    const dpr = window.devicePixelRatio || 1;

    const buildDotGrid = () => {
      if (!canvas || !imageLoaded) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      // Draw the source image onto an offscreen canvas to sample pixels
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Scale the image to fill screen width, maintain aspect ratio, center vertically
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgAspect > screenAspect) {
        // Image is wider proportionally — fit to height, center horizontally
        drawH = h;
        drawW = h * imgAspect;
        drawX = (w - drawW) / 2;
        drawY = 0;
      } else {
        // Image is taller proportionally — fit to width, center vertically
        drawW = w;
        drawH = w / imgAspect;
        drawX = 0;
        drawY = (h - drawH) / 2;
      }

      offscreen.width = w;
      offscreen.height = h;
      offCtx.fillStyle = '#000000';
      offCtx.fillRect(0, 0, w, h);
      offCtx.drawImage(img, drawX, drawY, drawW, drawH);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const pixels = imageData.data;

      // Sample at regular grid intervals to create dot positions
      const dotSpacing = Math.max(5, Math.min(8, w / 160));
      const newDots: { x: number; y: number; brightness: number }[] = [];

      // Tiny clear zone — only directly behind the folder icon itself
      const centerX = w / 2;
      const centerY = h / 2;
      const clearW = 38;
      const clearH = 42;

      for (let y = 0; y < h; y += dotSpacing) {
        for (let x = 0; x < w; x += dotSpacing) {
          // Skip only the small area directly behind the folder icon
          if (
            x > centerX - clearW && x < centerX + clearW &&
            y > centerY - clearH && y < centerY + clearH
          ) {
            continue;
          }

          const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];
          const brightness = (r + g + b) / 3;

          // Only place dots where the image is bright (white hand silhouette)
          if (brightness > 80) {
            newDots.push({
              x,
              y,
              brightness: Math.min(1, brightness / 255),
            });
          }
        }
      }

      dotGrid = newDots;
    };

    img.onload = () => {
      imageLoaded = true;
      buildDotGrid();
    };

    const handleResize = () => {
      buildDotGrid();
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!ctx || !canvas) return;
      time += 0.01;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = '#ffffff';

      for (let i = 0; i < dotGrid.length; i++) {
        const dot = dotGrid[i];

        // Subtle shimmer animation
        const shimmer = Math.sin(time * 1.2 + dot.x * 0.02 + dot.y * 0.015) * 0.15;
        const alpha = Math.min(1, Math.max(0.15, dot.brightness * 0.85 + shimmer));

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HandsCanvas;

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { cloudinaryUrl } from '../lib/cloudinary';
import { lockScroll } from '../lib/scrollLock';

// Full-screen viewer for presentation boards. Zoom shows the board at full
// resolution and lets the visitor pan, so small text is readable on phones.
export const Lightbox = ({ images, index, onClose, onChange, alt }) => {
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const count = images.length;
  const go = (delta) => {
    setZoomed(false);
    onChange((index + delta + count) % count);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const unlock = lockScroll();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlock();
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const controlClass =
    'p-3 text-white/80 hover:text-white bg-white/0 hover:bg-white/10 transition-colors cursor-pointer';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt}: lámina ${index + 1} de ${count}`}
      className="fixed inset-0 z-[60] bg-zinc-950/95 flex flex-col"
    >
      <div className="flex items-center justify-between px-3 sm:px-5 h-14 shrink-0 text-white">
        <span className="text-sm tabular-nums text-white/70 pl-2">
          {index + 1} / {count}
        </span>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            aria-label={zoomed ? 'Ajustar a pantalla' : 'Ampliar'}
            className={controlClass}
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button type="button" onClick={onClose} aria-label="Cerrar" className={controlClass}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={`relative flex-1 min-h-0 ${zoomed ? 'overflow-auto' : 'flex items-center justify-center px-2 sm:px-16'}`}
        onTouchStart={(e) => !zoomed && setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (zoomed || touchStartX === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
          setTouchStartX(null);
        }}
      >
        <img
          key={images[index]}
          src={cloudinaryUrl(images[index], { width: zoomed ? 2200 : 1600 })}
          alt={`${alt}, lámina ${index + 1}`}
          onClick={() => setZoomed((z) => !z)}
          className={
            zoomed
              ? 'max-w-none w-[2200px] cursor-zoom-out'
              : 'max-w-full max-h-full object-contain cursor-zoom-in'
          }
        />

        {!zoomed && count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Lámina anterior"
              className={`${controlClass} absolute left-1 sm:left-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Lámina siguiente"
              className={`${controlClass} absolute right-1 sm:right-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

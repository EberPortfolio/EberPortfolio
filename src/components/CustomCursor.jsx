import React from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = ({ cursorState }) => {
  const { position, cursorText, isHovered, cursorVariant } = cursorState;

  // Don't render on touch/mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'rgba(15, 15, 17, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      mixBlendMode: 'difference'
    },
    button: {
      x: position.x - 20,
      y: position.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      mixBlendMode: 'difference'
    },
    project: {
      x: position.x - 45,
      y: position.y - 45,
      height: 90,
      width: 90,
      backgroundColor: '#18181B',
      color: '#FFFFFF',
      mixBlendMode: 'normal'
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-xs font-mono font-medium shadow-lg tracking-wider"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {cursorVariant === 'project' && (
        <span className="px-2 text-center text-[10px] uppercase font-mono tracking-widest font-semibold text-white">
          {cursorText || 'VER'}
        </span>
      )}
    </motion.div>
  );
};

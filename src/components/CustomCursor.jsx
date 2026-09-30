import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SIZES = { default: 16, button: 40, project: 90 };
const SPRING = { stiffness: 500, damping: 28, mass: 0.5 };

const VARIANT_STYLES = {
  default: {
    backgroundColor: 'rgba(15, 15, 17, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    mixBlendMode: 'difference'
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0)',
    mixBlendMode: 'difference'
  },
  project: {
    backgroundColor: '#18181B',
    border: '1px solid rgba(255, 255, 255, 0)',
    mixBlendMode: 'normal'
  }
};

export const CustomCursor = ({ cursorState }) => {
  const { cursorText, cursorVariant } = cursorState;
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );
  const [visible, setVisible] = useState(false);

  // Motion values update the DOM directly, without re-rendering React
  const x = useSpring(useMotionValue(-100), SPRING);
  const y = useSpring(useMotionValue(-100), SPRING);

  useEffect(() => {
    if (!enabled) return;
    const handleMouseMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = SIZES[cursorVariant] || SIZES.default;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center text-xs font-mono font-medium shadow-lg tracking-wider"
      style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      animate={{ ...(VARIANT_STYLES[cursorVariant] || VARIANT_STYLES.default), width: size, height: size }}
      transition={{ type: 'spring', ...SPRING }}
    >
      {cursorVariant === 'project' && (
        <span className="px-2 text-center text-[10px] uppercase font-mono tracking-widest font-semibold text-white">
          {cursorText || 'VER'}
        </span>
      )}
    </motion.div>
  );
};

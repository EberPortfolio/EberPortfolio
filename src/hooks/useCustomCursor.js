import { useState, useEffect } from 'react';

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'project', 'button', 'drag'

  useEffect(() => {
    // Only activate custom cursor on non-touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const onProjectHover = (text = 'VER CASO') => {
    setIsHovered(true);
    setCursorText(text);
    setCursorVariant('project');
  };

  const onButtonHover = () => {
    setIsHovered(true);
    setCursorText('');
    setCursorVariant('button');
  };

  const onHoverLeave = () => {
    setIsHovered(false);
    setCursorText('');
    setCursorVariant('default');
  };

  return {
    position,
    cursorText,
    isHovered,
    cursorVariant,
    onProjectHover,
    onButtonHover,
    onHoverLeave
  };
};

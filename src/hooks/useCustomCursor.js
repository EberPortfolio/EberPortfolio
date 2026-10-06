import { useState, useCallback, useMemo } from 'react';

// Only the hover variant lives in React state; the pointer position is tracked
// inside CustomCursor with motion values so mouse moves never re-render the app.
export const useCustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default', 'project', 'button'

  const onProjectHover = useCallback((text = 'VER CASO') => {
    setCursorText(text);
    setCursorVariant('project');
  }, []);

  const onButtonHover = useCallback(() => {
    setCursorText('');
    setCursorVariant('button');
  }, []);

  const onHoverLeave = useCallback(() => {
    setCursorText('');
    setCursorVariant('default');
  }, []);

  return useMemo(() => ({
    cursorText,
    cursorVariant,
    onProjectHover,
    onButtonHover,
    onHoverLeave
  }), [cursorText, cursorVariant, onProjectHover, onButtonHover, onHoverLeave]);
};

import React from 'react';
import { cycleColor, isLetter } from '../lib/cycle';

// Splits text into letters coloured with Eber's cycle. `start` lets several
// pieces share one continuous sequence (e.g. a headline broken across lines).
export const CycleText = ({ text, start = 0 }) => {
  let n = start;
  return Array.from(text).map((char, i) => {
    if (!isLetter(char)) return <React.Fragment key={i}>{char}</React.Fragment>;
    const color = cycleColor(n++);
    return (
      <span key={i} style={{ color }}>
        {char}
      </span>
    );
  });
};

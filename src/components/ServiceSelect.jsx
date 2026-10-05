import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cycleColor } from '../lib/cycle';

// Native <select> menus can't be styled, so this is a listbox that follows the
// form's underline style. Keyboard: arrows, Home/End, Enter/Space, Escape, Tab.
export const ServiceSelect = ({ id, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const handleOutside = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const choose = (idx) => {
    onChange(options[idx]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const handleButtonKey = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  };

  const handleListKey = (e) => {
    const last = options.length - 1;
    const moves = {
      ArrowDown: () => setActive((i) => Math.min(last, i + 1)),
      ArrowUp: () => setActive((i) => Math.max(0, i - 1)),
      Home: () => setActive(0),
      End: () => setActive(last),
      Enter: () => choose(active),
      ' ': () => choose(active),
      Escape: () => {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    if (e.key === 'Tab') return setOpen(false);
    if (moves[e.key]) {
      e.preventDefault();
      moves[e.key]();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleButtonKey}
        className={`w-full flex items-center justify-between gap-4 pb-2.5 pt-1 border-b bg-transparent text-left text-sm sm:text-base text-zinc-950 dark:text-white focus:outline-none transition-colors cursor-pointer ${
          open ? 'border-zinc-950 dark:border-white' : 'border-zinc-300 dark:border-zinc-700 focus-visible:border-zinc-950 dark:focus-visible:border-white'
        }`}
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-labelledby={id}
            aria-activedescendant={`${listId}-${active}`}
            onKeyDown={handleListKey}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-20 left-0 right-0 mt-2 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/60 focus:outline-none"
          >
            {options.map((option, idx) => {
              const selected = option === value;
              const highlighted = idx === active;
              return (
                <li
                  key={option}
                  id={`${listId}-${idx}`}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(idx)}
                  onClick={() => choose(idx)}
                  className={`relative flex items-center justify-between gap-4 pl-5 pr-4 py-2.5 text-sm sm:text-base cursor-pointer transition-colors ${
                    highlighted ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  {/* Each option owns one colour of Eber's cycle, shown as it's reached */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 bottom-1.5 w-1 origin-left transition-transform duration-200 ${
                      highlighted || selected ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ backgroundColor: cycleColor(idx) }}
                  />
                  <span>{option}</span>
                  {selected && <Check className="w-4 h-4 shrink-0" style={{ color: cycleColor(idx) }} />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

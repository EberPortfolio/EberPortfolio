import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sliders, RefreshCw, Copy, Check, Type, Layers, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const BrandPlayground = ({ cursorHandlers }) => {
  const { currentAccentObj } = useTheme();
  const [brandName, setBrandName] = useState('STUDIO EBER');
  const [tagline, setTagline] = useState('DISEÑO GRÁFICO & ESTRATEGIA VISUAL');
  const [fontFamily, setFontFamily] = useState('sans');
  const [layoutMode, setLayoutMode] = useState('minimal');
  const [colorMood, setColorMood] = useState('dark');
  const [copied, setCopied] = useState(false);

  const moodStyles = {
    dark: {
      bg: 'bg-zinc-950 text-zinc-100 border-zinc-800',
      accent: 'text-amber-400',
      tag: 'bg-zinc-900 border-zinc-800 text-zinc-300'
    },
    cream: {
      bg: 'bg-[#F5F1E6] text-[#1C1917] border-[#DED8C8]',
      accent: 'text-amber-800',
      tag: 'bg-[#EAE4D4] border-[#D8D0BC] text-[#4A443A]'
    },
    emerald: {
      bg: 'bg-[#0D2818] text-[#E8F5E9] border-[#1B4332]',
      accent: 'text-[#52B788]',
      tag: 'bg-[#1B4332] border-[#2D6A4F] text-[#95D5B2]'
    },
    cobalt: {
      bg: 'bg-[#0F172A] text-[#F8FAFC] border-[#1E293B]',
      accent: 'text-[#38BDF8]',
      tag: 'bg-[#1E293B] border-[#334155] text-[#94A3B8]'
    }
  };

  const handleCopySpec = () => {
    const spec = `/* Eber Studio Brand Specs */
Font: ${fontFamily}
Layout: ${layoutMode}
Palette: ${colorMood}
Brand: "${brandName}"
Tagline: "${tagline}"`;
    navigator.clipboard.writeText(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">
      
      {/* Section Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono rounded-full font-semibold">
          <Sparkles className="w-3.5 h-3.5" style={{ color: currentAccentObj.hex }} />
          <span>Chiche Interactivo</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
          Brand Inspector & Playground
        </h2>
        <p className="text-base text-zinc-700 dark:text-zinc-300 max-w-xl font-light">
          Experimenta en tiempo real con la composición gráfica, tipografías y paletas de color que Eber aplica en sus sistemas visuales.
        </p>
      </div>

      {/* Main Interactive Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Panel (Left Col) */}
        <div 
          className="lg:col-span-5 p-6 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-white space-y-6 shadow-xs"
          style={{ borderRadius: '0px' }}
        >
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Controles de Canvas</span>
            </span>
            <button
              onClick={() => {
                setBrandName('STUDIO EBER');
                setTagline('DISEÑO GRÁFICO & ESTRATEGIA VISUAL');
                setFontFamily('sans');
                setLayoutMode('minimal');
                setColorMood('dark');
              }}
              className="p-1.5 text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Restablecer valores"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Text Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5 font-semibold">
                Nombre de Marca / Logotipo
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-mono text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white"
                style={{ borderRadius: '0px' }}
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5 font-semibold">
                Tagline / Descriptor
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-mono text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white"
                style={{ borderRadius: '0px' }}
              />
            </div>
          </div>

          {/* Typography Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Type className="w-3.5 h-3.5" /> Estilo Tipográfico
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sans', label: 'Swiss Sans', style: 'font-sans' },
                { id: 'serif', label: 'Editorial Serif', style: 'font-serif' },
                { id: 'mono', label: 'Brutalist Mono', style: 'font-mono' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFontFamily(item.id)}
                  onMouseEnter={cursorHandlers?.onButtonHover}
                  onMouseLeave={cursorHandlers?.onHoverLeave}
                  className={`p-2.5 border text-xs text-center transition-all cursor-pointer ${
                    fontFamily === item.id
                      ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold'
                      : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:border-zinc-500'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  <span className={item.style}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Moodboard Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Palette className="w-3.5 h-3.5" /> Atmósfera de Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'dark', name: 'Noir', bg: 'bg-zinc-950' },
                { id: 'cream', name: 'Papel', bg: 'bg-[#E5DFD3]' },
                { id: 'emerald', name: 'Botánico', bg: 'bg-[#1B4332]' },
                { id: 'cobalt', name: 'Cobalto', bg: 'bg-[#1E293B]' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setColorMood(item.id)}
                  onMouseEnter={cursorHandlers?.onButtonHover}
                  onMouseLeave={cursorHandlers?.onHoverLeave}
                  className={`p-2.5 border flex flex-col items-center gap-1 text-[11px] font-mono transition-all cursor-pointer ${
                    colorMood === item.id 
                      ? 'border-zinc-950 dark:border-white ring-1 ring-zinc-950 bg-zinc-100 dark:bg-zinc-800' 
                      : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:border-zinc-500'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  <span className={`w-5 h-5 border border-black/10 ${item.bg}`} style={{ borderRadius: '0px' }} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Layout Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5" /> Disposición de Layout
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'minimal', label: 'Centrado' },
                { id: 'magazine', label: 'Grilla' },
                { id: 'poster', label: 'Poster Art' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setLayoutMode(item.id)}
                  onMouseEnter={cursorHandlers?.onButtonHover}
                  onMouseLeave={cursorHandlers?.onHoverLeave}
                  className={`p-2.5 border text-xs font-mono text-center transition-all cursor-pointer ${
                    layoutMode === item.id
                      ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold'
                      : 'border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:border-zinc-500'
                  }`}
                  style={{ borderRadius: '0px' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Copy Spec Button */}
          <button
            onClick={handleCopySpec}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className="w-full py-3.5 px-4 border border-zinc-950 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>¡Especificaciones Copiadas!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Especificaciones de Diseño</span>
              </>
            )}
          </button>

        </div>

        {/* Live Canvas Preview (Right Col) */}
        <div className="lg:col-span-7">
          <motion.div
            layout
            className={`relative min-h-[460px] p-8 sm:p-12 border shadow-lg flex flex-col justify-between transition-colors duration-300 overflow-hidden ${moodStyles[colorMood].bg}`}
            style={{ borderRadius: '0px' }}
          >
            {/* Background Decorative Grid */}
            <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />

            {/* Canvas Header Info */}
            <div className="flex items-center justify-between relative z-10 font-mono text-xs">
              <span className={`px-3 py-1 border ${moodStyles[colorMood].tag} rounded-full`}>
                SYSTEM ID: 092-EBER
              </span>
              <span className="opacity-80 uppercase tracking-widest font-semibold">
                EDICIÓN 2026.4
              </span>
            </div>

            {/* Dynamic Layout Content */}
            <div className={`relative z-10 my-auto py-8 transition-all duration-300 ${
              layoutMode === 'minimal' ? 'text-center space-y-4' :
              layoutMode === 'magazine' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6 items-end' :
              'space-y-6'
            }`}>
              
              <div className="space-y-2">
                <span className={`font-mono text-xs uppercase tracking-widest block font-semibold ${moodStyles[colorMood].accent}`}>
                  ● IDENTITY SPECIMEN
                </span>
                
                <h3 className={`tracking-tighter transition-all duration-300 ${
                  fontFamily === 'sans' ? 'font-sans font-light' :
                  fontFamily === 'serif' ? 'font-serif italic font-normal' :
                  'font-mono font-bold uppercase'
                } ${
                  layoutMode === 'poster' ? 'text-5xl sm:text-7xl leading-none' : 'text-3xl sm:text-5xl'
                }`}>
                  {brandName || 'TU MARCA AQUÍ'}
                </h3>
              </div>

              <p className={`text-xs sm:text-sm font-mono tracking-wider uppercase leading-relaxed max-w-md opacity-90 ${
                layoutMode === 'minimal' ? 'mx-auto' : ''
              }`}>
                {tagline}
              </p>

            </div>

            {/* Canvas Footer */}
            <div className="flex items-center justify-between border-t border-current/20 pt-4 relative z-10 font-mono text-[11px] opacity-90 font-medium">
              <span>DESIGNED BY EBER</span>
              <span>100% VECTOR PRECISION</span>
            </div>

          </motion.div>
        </div>

      </div>

    </section>
  );
};

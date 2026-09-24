import React from 'react';
import { EBER_PROFILE } from '../data/services';
import { ArrowUpRight } from 'lucide-react';
import eberProfileImg from '../assets/eber-profile.jpg';

export const AboutSection = ({ cursorHandlers }) => {
  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Eber Real Portrait Photo */}
        <div className="lg:col-span-5">
          <div 
            className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-md"
            style={{ borderRadius: '0px' }}
          >
            <img
              src={eberProfileImg}
              alt="Eber Diseñador Gráfico & Director de Arte"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div 
              className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-300 dark:border-zinc-800 text-xs font-mono"
              style={{ borderRadius: '0px' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-950 dark:text-white">EBER · ART DIRECTOR</span>
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  DISPONIBLE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Short Manifesto & Specializations */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
              SOBRE EBER
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white leading-tight">
              Diseño con rigor gráfico y foco obsesivo en el detalle.
            </h2>
          </div>

          <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-xl">
            Basado en Buenos Aires y trabajando para clientes globales. Ayudo a fundadores y agencias a definir identidades atemporales, packaging táctil y dirección de arte clara.
          </p>

          {/* Minimal 4-Pill Tag Row */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              'Identidad Visual',
              'Packaging de Autor',
              'Diseño Editorial',
              'Dirección de Arte'
            ].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 font-mono text-xs font-medium"
                style={{ borderRadius: '0px' }}
              >
                ● {tag}
              </span>
            ))}
          </div>

          {/* Direct CTA Link */}
          <div className="pt-4">
            <a
              href={`mailto:${EBER_PROFILE.email}`}
              onMouseEnter={cursorHandlers?.onButtonHover}
              onMouseLeave={cursorHandlers?.onHoverLeave}
              className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold hover:opacity-90 transition-opacity"
              style={{ borderRadius: '0px' }}
            >
              <span>Escribir a Eber</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};

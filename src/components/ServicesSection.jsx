import React, { useState } from 'react';
import { SERVICES, CLIENT_LOGOS } from '../data/services';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ServicesSection = ({ cursorHandlers }) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const { currentAccentObj } = useTheme();

  const processSteps = [
    { step: '01', title: 'Descubrimiento & Brief', desc: 'Entendimiento profundo del negocio, público objetivo, valores de marca y metas comerciales.' },
    { step: '02', title: 'Exploración & Concepto', desc: 'Investigación visual, moodboards tipográficos y desarrollo de 2 caminos conceptuales sólidos.' },
    { step: '03', title: 'Refinamiento & Craft', desc: 'Construcción del sistema visual, pruebas de impresión, retícula gráfica y aplicaciones táctiles.' },
    { step: '04', title: 'Entrega & Guías', desc: 'Entrega de archivos finales vectoriales (AI, SVG, PDF), mockups de alta resolución y manual de marca.' }
  ];

  return (
    <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">
      
      {/* Header */}
      <div className="space-y-4 mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          SERVICIOS & PROCESO DE TRABAJO
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
          Soluciones de comunicación visual <br className="hidden sm:block" />
          diseñadas para durar.
        </h2>
      </div>

      {/* Services Accordion List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
        
        <div className="lg:col-span-12 space-y-4">
          {SERVICES.map((service, idx) => {
            const isSelected = activeServiceIndex === idx;
            return (
              <motion.div
                key={service.number}
                onClick={() => setActiveServiceIndex(idx)}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className={`p-6 sm:p-8 border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white shadow-md' 
                    : 'bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-800 hover:border-zinc-500'
                }`}
                style={{ borderRadius: '0px' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <span className={`font-mono text-xl sm:text-2xl font-light ${
                      isSelected ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-400 dark:text-zinc-500'
                    }`}>
                      {service.number}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-light ${
                      isSelected ? 'text-white dark:text-zinc-950' : 'text-zinc-950 dark:text-white'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono uppercase tracking-widest font-medium ${
                      isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500'
                    }`}>
                      {isSelected ? 'Ocultar detalles' : 'Ver competencias'}
                    </span>
                    <div 
                      className={`w-8 h-8 flex items-center justify-center transition-transform ${
                        isSelected 
                          ? 'rotate-90 bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white' 
                          : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white border border-zinc-300 dark:border-zinc-800'
                      }`}
                      style={{ borderRadius: '0px' }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`mt-6 pt-6 border-t ${
                      isSelected ? 'border-zinc-800 dark:border-zinc-200' : 'border-zinc-200 dark:border-zinc-800'
                    } space-y-4`}
                  >
                    <p className={`text-base font-light leading-relaxed max-w-3xl ${
                      isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3.5 py-1.5 rounded-full font-mono text-xs border flex items-center gap-1.5 font-medium ${
                            isSelected 
                              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-800 dark:border-zinc-300' 
                              : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-200 border-zinc-300 dark:border-zinc-800'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" style={{ color: currentAccentObj.hex }} />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Process Step Timeline */}
      <div className="space-y-8 pt-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Metodología de Trabajo en 4 Pasos
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {processSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-6 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 space-y-3"
              style={{ borderRadius: '0px' }}
            >
              <span className="font-mono text-2xl font-semibold text-zinc-950 dark:text-white">
                {stepItem.step}.
              </span>
              <h4 className="text-base font-semibold text-zinc-950 dark:text-white">
                {stepItem.title}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {stepItem.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Client Ticker Marquee */}
      <div className="mt-20 pt-12 border-t border-zinc-300 dark:border-zinc-800 overflow-hidden">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block mb-6 text-center font-semibold">
          Marcas & Clientes que Confían en Eber
        </span>
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity">
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, index) => (
            <span key={index} className="font-mono text-sm uppercase tracking-widest font-semibold text-zinc-800 dark:text-zinc-300">
              ● {logo}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

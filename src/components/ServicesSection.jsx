import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES, PROCESS_STEPS } from '../data/services';

export const ServicesSection = ({ cursorHandlers }) => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  return (
    <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-14">
        <div className="lg:col-span-7 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
            Qué hago
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white text-balance">
            Identidades claras, reconocibles y adaptables.
          </h2>
        </div>
        <p className="lg:col-span-5 lg:self-end text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
          Del concepto a la implementación, con la misma coherencia en producto, retail, entornos digitales y comunicación.
        </p>
      </div>

      {/* Services Accordion */}
      <div className="space-y-3 mb-24">
        {SERVICES.map((service, idx) => {
          const isSelected = activeServiceIndex === idx;
          const panelId = `service-panel-${service.number}`;
          return (
            <div
              key={service.number}
              className={`border transition-colors ${
                isSelected
                  ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white'
                  : 'bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white border-zinc-300 dark:border-zinc-800 hover:border-zinc-500'
              }`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setActiveServiceIndex(isSelected ? -1 : idx)}
                  onMouseEnter={cursorHandlers?.onButtonHover}
                  onMouseLeave={cursorHandlers?.onHoverLeave}
                  aria-expanded={isSelected}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left cursor-pointer"
                >
                  <span className="flex items-baseline gap-5 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base opacity-50">{service.number}</span>
                    <span className="text-xl sm:text-2xl font-light tracking-tight">{service.title}</span>
                  </span>
                  <span
                    className={`w-9 h-9 shrink-0 flex items-center justify-center border transition-transform duration-300 ${
                      isSelected ? 'rotate-90 border-current' : 'border-zinc-300 dark:border-zinc-700'
                    }`}
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.div
                    id={panelId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-8 sm:pl-[5.75rem] space-y-5">
                      <p className="text-base font-light leading-relaxed max-w-3xl opacity-80">
                        {service.description}
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {service.skills.map((skill) => (
                          <li
                            key={skill}
                            className="px-3.5 py-1.5 rounded-full font-mono text-xs border border-current/30 flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Process */}
      <div className="space-y-8">
        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Cómo trabajo
        </h3>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-zinc-300 dark:border-zinc-800">
          {PROCESS_STEPS.map((stepItem) => (
            <li
              key={stepItem.step}
              className="pt-6 pb-8 sm:pr-8 space-y-3 border-b lg:border-b-0 border-zinc-300 dark:border-zinc-800"
            >
              <span className="font-mono text-xs text-zinc-500">{stepItem.step}</span>
              <h4 className="text-xl font-light tracking-tight text-zinc-950 dark:text-white">
                {stepItem.title}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                {stepItem.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
};

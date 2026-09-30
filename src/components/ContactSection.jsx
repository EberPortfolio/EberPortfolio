import React, { useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { EBER_PROFILE } from '../data/profile';
import { SectionHeader, sectionClass } from './SectionHeader';
import { RollText } from './RollText';

const linkClass =
  'group inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.02em] text-zinc-950 dark:text-white';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EBER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EBER_PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className={sectionClass}>
      <SectionHeader title="Contacto" />

      <div className="grid grid-cols-12 gap-x-5 gap-y-10">
        <p className="reveal-up col-span-12 lg:col-span-3 label">Hablemos</p>

        <div className="reveal-up col-span-12 lg:col-span-9 space-y-10">
          <p className="text-xl sm:text-2xl leading-snug text-zinc-800 dark:text-zinc-200 max-w-2xl text-pretty">
            Roles, proyectos o charlas.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${EBER_PROFILE.email}`}
              className="link-draw inline text-[8.5vw] sm:text-[6vw] lg:text-[4.6vw] leading-[1.05] font-semibold uppercase tracking-[-0.04em] text-zinc-950 dark:text-white break-all"
            >
              {EBER_PROFILE.email}
            </a>
            <div className="pt-1">
              <button type="button" onClick={handleCopy} className={`${linkClass} cursor-pointer`}>
                <RollText>{copied ? 'Copiado ✓' : 'Copiar email'}</RollText>
              </button>
              <span aria-live="polite" className="sr-only">{copied ? 'Email copiado' : ''}</span>
            </div>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-4 border-t border-zinc-300 dark:border-zinc-800 pt-6">
            {EBER_PROFILE.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <RollText>{s.name}</RollText>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
            {EBER_PROFILE.cvUrl && (
              <li>
                <a href={EBER_PROFILE.cvUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <RollText>Descargar CV</RollText>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

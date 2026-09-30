import React, { useState } from 'react';
import { ArrowUpRight, Download, Send, Check } from 'lucide-react';
import { EBER_PROFILE } from '../data/profile';
import { SectionHeader, sectionClass } from './SectionHeader';
import { RollText } from './RollText';

const linkClass =
  'group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-950 dark:text-white';

export const ContactSection = ({ index, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Identidad visual & Branding',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EBER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EBER_PROFILE.email}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de proyecto - ${formState.name} (${formState.service})`);
    const body = encodeURIComponent(
      `Nombre: ${formState.name}\nEmail: ${formState.email}\nServicio / Área: ${formState.service}\n\nMensaje:\n${formState.message}`
    );
    window.location.href = `mailto:${EBER_PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className={`${sectionClass} pb-12`}>
      <SectionHeader index={index} title="Contacto" />

      {/* Main Grid: Info a la izquierda, Formulario minimalista a la derecha (como la imagen 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Columna Izquierda: Información de Estudio & Metadatos */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 font-medium">
              Ubicación & Disponibilidad
            </p>
            <p className="text-xl sm:text-2xl font-light text-zinc-950 dark:text-white leading-snug">
              Buenos Aires, Argentina
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Disponible para proyectos de branding, estampería textil, ilustración y dirección de arte.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 font-medium">
              Especialidades
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xs">
                Moda & Textil
              </span>
              <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xs">
                Entretenimiento
              </span>
              <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xs">
                Contenidos Infantiles
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 font-medium">
              Redes & Perfiles
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {EBER_PROFILE.social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <RollText>{s.name}</RollText>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              ))}
              {EBER_PROFILE.cvUrl && (
                <li>
                  <a href={EBER_PROFILE.cvUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <RollText>CV (PDF)</RollText>
                    <Download className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Columna Derecha: Formulario Minimalista (estilo imagen 3) */}
        <div className="lg:col-span-7 bg-transparent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Nombre (requerido)
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Tu nombre o empresa"
                  className="w-full pb-2.5 pt-1 border-b border-zinc-300 dark:border-zinc-700 bg-transparent text-sm sm:text-base text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Email (requerido)
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="tu@correo.com"
                  className="w-full pb-2.5 pt-1 border-b border-zinc-300 dark:border-zinc-700 bg-transparent text-sm sm:text-base text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Área de interés / Servicio
              </label>
              <select
                id="service"
                value={formState.service}
                onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                className="w-full pb-2.5 pt-1 border-b border-zinc-300 dark:border-zinc-700 bg-transparent text-sm sm:text-base text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors cursor-pointer"
              >
                <option value="Identidad visual & Branding" className="bg-zinc-50 dark:bg-zinc-900">Identidad visual & Branding</option>
                <option value="Diseño textil & Estampería" className="bg-zinc-50 dark:bg-zinc-900">Diseño textil & Estampería</option>
                <option value="Ilustración & Personajes" className="bg-zinc-50 dark:bg-zinc-900">Ilustración & Personajes</option>
                <option value="Dirección de arte" className="bg-zinc-50 dark:bg-zinc-900">Dirección de arte</option>
                <option value="Otro tipo de consulta" className="bg-zinc-50 dark:bg-zinc-900">Otro tipo de consulta</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Descripción del proyecto
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Contame brevemente los objetivos, tiempos o ideas clave..."
                className="w-full pb-2.5 pt-1 border-b border-zinc-300 dark:border-zinc-700 bg-transparent text-sm sm:text-base text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                {submitted ? (
                  <>
                    <span>Listo para enviar</span>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </>
                ) : (
                  <>
                    <span>Enviar consulta</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Cierre Definitivo / Footer Integrado (como la imagen 3 de referencia) */}
      <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-baseline justify-between gap-6">
        <div>
          <a
            href={`mailto:${EBER_PROFILE.email}`}
            className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-950 dark:text-white hover:opacity-80 transition-opacity"
          >
            {EBER_PROFILE.email}
          </a>
          <div className="mt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
            >
              {copied ? '✓ Email copiado al portapapeles' : 'Copiar dirección de email'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} EBER</span>
          <span>·</span>
          <span>DIRECCIÓN DE ARTE</span>
          <span>·</span>
          <button
            type="button"
            onClick={() => onNavigate?.('home')}
            className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer font-medium"
          >
            Volver arriba ↑
          </button>
        </div>
      </div>
    </section>
  );
};

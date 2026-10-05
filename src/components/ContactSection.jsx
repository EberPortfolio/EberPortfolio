import React, { useState } from 'react';
import { ArrowUpRight, Download, Send, Check, Loader2 } from 'lucide-react';
import { EBER_PROFILE, whatsappUrl } from '../data/profile';
import { SectionHeader, sectionClass } from './SectionHeader';
import { RollText } from './RollText';
import { ServiceSelect } from './ServiceSelect';

const SERVICES = [
  'Identidad visual & Branding',
  'Diseño textil & Estampería',
  'Ilustración & Personajes',
  'Dirección de arte',
  'Otro tipo de consulta'
];

// Web3Forms access key (public by design: it only lets the form send to Eber's inbox).
// Without it the form falls back to opening the visitor's mail app.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const EMPTY_FORM = { name: '', email: '', service: SERVICES[0], message: '' };

const linkClass =
  'group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-950 dark:text-white';

export const ContactSection = ({ index, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState(EMPTY_FORM);
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle');
  const [sentTo, setSentTo] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EBER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EBER_PROFILE.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subject = `Consulta de proyecto - ${formState.name} (${formState.service})`;

    if (!WEB3FORMS_KEY) {
      const body = `Nombre: ${formState.name}\nEmail: ${formState.email}\nServicio / Área: ${formState.service}\n\nMensaje:\n${formState.message}`;
      window.location.href = `mailto:${EBER_PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: 'Portfolio de Eber',
          replyto: formState.email,
          name: formState.name,
          email: formState.email,
          servicio: formState.service,
          message: formState.message,
          // Honeypot: real visitors never see or tick it
          botcheck: e.target.elements.botcheck.checked
        })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setSentTo(formState.email);
      setFormState(EMPTY_FORM);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
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
              {whatsappUrl && (
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <RollText>WhatsApp</RollText>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </li>
              )}
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
              <ServiceSelect
                id="service"
                value={formState.service}
                options={SERVICES}
                onChange={(service) => setFormState({ ...formState, service })}
              />
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

            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-eber-blue hover:text-white dark:hover:bg-eber-blue dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2 self-start disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'sending' ? (
                  <>
                    <span>Enviando</span>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </>
                ) : (
                  <>
                    <span>Enviar consulta</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <p role="status" aria-live="polite" className="text-sm leading-snug">
                {status === 'sent' && (
                  <span className="inline-flex items-start gap-2 text-zinc-950 dark:text-white">
                    <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--eber-blue)' }} />
                    <span>Consulta enviada. Eber te va a responder a {sentTo}.</span>
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-eber-red">
                    No se pudo enviar. Probá de nuevo o escribile a{' '}
                    <a href={`mailto:${EBER_PROFILE.email}`} className="underline underline-offset-2">
                      {EBER_PROFILE.email}
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>

      </div>

      {/* Cierre Definitivo / Footer Integrado (como la imagen 3 de referencia) */}
      <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-baseline justify-between gap-6">
        <div>
          <a
            href={`mailto:${EBER_PROFILE.email}`}
            className="text-2xl sm:text-4xl md:text-5xl font-display tracking-wide text-zinc-950 dark:text-white hover:text-eber-blue transition-colors"
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

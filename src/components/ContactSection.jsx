import React, { useState } from 'react';
import { EBER_PROFILE } from '../data/services';
import { Mail, Copy, Check, Send, ArrowUpRight } from 'lucide-react';

const REASONS = [
  { id: 'rol', label: 'Oportunidad laboral', subject: 'Oportunidad laboral' },
  { id: 'proyecto', label: 'Proyecto freelance', subject: 'Proyecto' },
  { id: 'docencia', label: 'Docencia o charla', subject: 'Docencia / charla' }
];

const PROJECT_AREAS = [
  'Identidad visual',
  'Dirección de arte',
  'Ilustración',
  'Tipografía & lettering',
  'Producto & retail'
];

const MESSAGE_PLACEHOLDER = {
  rol: 'Contexto del equipo, el rol y cómo imaginan el aporte de Eber…',
  proyecto: 'Objetivos, plazos y referencias del proyecto…',
  docencia: 'Institución, temática, fechas y formato…'
};

const inputClass =
  'w-full px-4 py-3 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors';
const labelClass = 'block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5 font-medium';
const legendClass = 'text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-3';

const chipClass = (isSelected) =>
  `px-4 py-2.5 text-xs font-mono transition-colors rounded-full border cursor-pointer ${
    isSelected
      ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-zinc-950 dark:border-white font-semibold'
      : 'border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-500'
  }`;

export const ContactSection = ({ cursorHandlers }) => {
  const [reason, setReason] = useState('rol');
  const [areas, setAreas] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const hover = {
    onMouseEnter: cursorHandlers?.onButtonHover,
    onMouseLeave: cursorHandlers?.onHoverLeave
  };
  const linkedin = EBER_PROFILE.social.find((s) => s.name === 'LinkedIn');
  const currentReason = REASONS.find((r) => r.id === reason);

  const toggleArea = (area) => {
    setAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EBER_PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard blocked (insecure context or permissions): open the mail client instead
      window.location.href = `mailto:${EBER_PROFILE.email}`;
    }
  };

  // No backend: the message is sent through the visitor's mail client, prefilled
  const buildMailto = () => {
    const from = company ? `${name} (${company})` : name;
    const subject = `${currentReason.subject} — ${from}`;
    const lines = [
      `Nombre: ${name}`,
      company && `Empresa: ${company}`,
      `Email: ${email}`,
      `Motivo: ${currentReason.label}`,
      reason === 'proyecto' && areas.length > 0 && `Áreas: ${areas.join(', ')}`,
      '',
      message
    ].filter((line) => line !== false && line !== undefined && line !== null);
    return `mailto:${EBER_PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left: intro + direct contact */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
              Contacto
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-zinc-950 dark:text-white leading-[1.05]">
              Hablemos.
            </h2>
            <p className="text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-md">
              Un rol, un proyecto o una charla: cualquier propuesta es bienvenida. Respondo en menos de 24 horas hábiles.
            </p>
          </div>

          <div className="p-6 bg-zinc-950 text-white space-y-5 border border-zinc-800">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="uppercase tracking-wider">Contacto directo</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Disponible
              </span>
            </div>

            <p className="text-lg font-mono font-semibold break-all">
              {EBER_PROFILE.email}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                {...hover}
                className="flex-1 min-w-[9rem] py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors border border-zinc-700 cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span aria-live="polite">{copiedEmail ? 'Email copiado' : 'Copiar email'}</span>
              </button>
              <a
                href={`mailto:${EBER_PROFILE.email}`}
                {...hover}
                className="py-2.5 px-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-medium flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Escribir</span>
              </a>
            </div>

            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                {...hover}
                className="group flex items-center justify-between pt-4 border-t border-zinc-800 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
              >
                <span>Ver perfil en LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800">
          {submitted ? (
            <div className="py-16 text-center space-y-6" role="status">
              <div className="w-14 h-14 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 mx-auto flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-light text-zinc-950 dark:text-white">
                El mensaje está listo
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-md mx-auto font-light leading-relaxed">
                Gracias, {name}. Se abrió el correo con todo lo que completaste: solo falta enviarlo.
              </p>
              <p className="text-xs text-zinc-500 max-w-md mx-auto font-mono">
                ¿No se abrió?{' '}
                <a href={buildMailto()} className="underline underline-offset-2 text-zinc-800 dark:text-zinc-200">
                  Abrir de nuevo
                </a>{' '}
                o escribir a {EBER_PROFILE.email}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white text-xs font-mono uppercase tracking-wider font-semibold hover:border-zinc-950 dark:hover:border-white transition-colors cursor-pointer"
              >
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">

              <fieldset>
                <legend className={legendClass}>Motivo</legend>
                <div className="flex flex-wrap gap-2">
                  {REASONS.map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setReason(r.id)}
                      aria-pressed={reason === r.id}
                      {...hover}
                      className={chipClass(reason === r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {reason === 'proyecto' && (
                <fieldset>
                  <legend className={legendClass}>Áreas (opcional)</legend>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_AREAS.map((area) => (
                      <button
                        type="button"
                        key={area}
                        onClick={() => toggleArea(area)}
                        aria-pressed={areas.includes(area)}
                        {...hover}
                        className={chipClass(areas.includes(area))}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Nombre</label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className={labelClass}>Empresa (opcional)</label>
                  <input
                    id="contact-company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-email" className={labelClass}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nombre@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={labelClass}>Mensaje</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder={MESSAGE_PLACEHOLDER[reason]}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-y min-h-32`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  {...hover}
                  className="w-full py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar mensaje</span>
                </button>
                <p className="text-[11px] font-mono text-zinc-500 text-center">
                  Se abre el correo con el mensaje listo para enviar.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>

    </section>
  );
};

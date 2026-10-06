import React, { useState } from 'react';
import { Mail, Copy, Check, Send, ArrowUpRight, Download, Loader2 } from 'lucide-react';
import { EBER_PROFILE, whatsappUrl } from '../data/profile';
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

const inputClass =
  'w-full px-4 py-3 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-950 dark:focus:border-white transition-colors';
const labelClass = 'block text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1.5 font-medium';

export const ContactSection = ({ cursorHandlers }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState(EMPTY_FORM);
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle');
  const [sentTo, setSentTo] = useState('');

  const hover = {
    onMouseEnter: cursorHandlers?.onButtonHover,
    onMouseLeave: cursorHandlers?.onHoverLeave
  };

  const directLinks = [
    ...EBER_PROFILE.social,
    whatsappUrl && { name: 'WhatsApp', url: whatsappUrl },
    EBER_PROFILE.cvUrl && { name: 'CV (PDF)', url: EBER_PROFILE.cvUrl, isDownload: true }
  ].filter(Boolean);

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
              Un rol, un proyecto o una charla: cualquier propuesta es bienvenida.
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

            <ul className="pt-1 border-t border-zinc-800 divide-y divide-zinc-800">
              {directLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...hover}
                    className="group flex items-center justify-between py-3 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.isDownload ? (
                      <Download className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-7 p-6 sm:p-10 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className={labelClass}>Nombre</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Tu nombre o empresa"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nombre@empresa.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-service" className={labelClass}>Área de interés</label>
                <ServiceSelect
                  id="contact-service"
                  value={formState.service}
                  options={SERVICES}
                  onChange={(service) => setFormState({ ...formState, service })}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={labelClass}>Mensaje</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Contame brevemente los objetivos, tiempos o ideas clave…"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`${inputClass} resize-y min-h-32`}
                />
              </div>
            </div>

            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="space-y-3">
              <button
                type="submit"
                disabled={status === 'sending'}
                {...hover}
                className="w-full py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 disabled:cursor-wait"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enviando</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </button>

              <p role="status" aria-live="polite" className="text-xs font-mono text-center">
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Check className="w-4 h-4" />
                    Mensaje enviado. Eber te va a responder a {sentTo}.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-red-600 dark:text-red-400">
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

    </section>
  );
};

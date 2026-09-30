import React, { useState } from 'react';
import { EBER_PROFILE } from '../data/services';
import { Mail, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

export const ContactSection = ({ cursorHandlers }) => {
  const { currentAccentObj } = useTheme();
  const [selectedScopes, setSelectedScopes] = useState(['Identidad Visual']);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scopeOptions = [
    'Identidad Visual',
    'Packaging & Envases',
    'Editorial & Print',
    'Web & Digital UI',
    'Dirección de Arte'
  ];

  const budgetOptions = [
    '< $2,000 USD',
    '$2,000 - $5,000 USD',
    '$5,000 - $10,000 USD',
    '+$10,000 USD'
  ];

  const toggleScope = (scope) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter(s => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
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

  // No backend: the brief is sent through the visitor's mail client, prefilled
  const buildMailto = () => {
    const subject = `Consulta de proyecto — ${name}`;
    const body = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Áreas: ${selectedScopes.join(', ')}`,
      `Presupuesto: ${selectedBudget || 'A definir'}`,
      '',
      message
    ].join('\n');
    return `mailto:${EBER_PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = buildMailto();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti is decorative; ignore failures
    }
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              INICIAR PROYECTO
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white leading-tight">
              ¿Tienes una idea en mente? <br />
              Construyámosla.
            </h2>
            <p className="text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
              Cuéntame sobre las metas de tu marca o empresa. Responderé en menos de 24 horas laborables.
            </p>
          </div>

          {/* Quick Contact Card */}
          <div 
            className="p-6 bg-zinc-950 text-white space-y-4 shadow-lg border border-zinc-800"
            style={{ borderRadius: '0px' }}
          >
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span>CONTACTO DIRECTO</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Disponible</span>
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-zinc-400 uppercase">Email:</p>
              <p className="text-lg font-mono font-semibold break-all text-white">
                {EBER_PROFILE.email}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className="flex-1 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors border border-zinc-700"
                style={{ borderRadius: '0px' }}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Email Copiado' : 'Copiar Email'}</span>
              </button>

              <a
                href={`mailto:${EBER_PROFILE.email}?subject=Consulta%20de%20Proyecto`}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className="py-2.5 px-4 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-medium flex items-center gap-1 transition-colors"
                style={{ borderRadius: '0px' }}
              >
                <Mail className="w-4 h-4" />
                <span>Enviar Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Estimator & Form */}
        <div 
          className="lg:col-span-7 p-6 sm:p-10 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 shadow-xs"
          style={{ borderRadius: '0px' }}
        >
          {submitted ? (
            <div className="py-16 text-center space-y-6">
              <div className="w-16 h-16 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" style={{ color: currentAccentObj.hex }} />
              </div>
              <h3 className="text-2xl font-light text-zinc-950 dark:text-white">
                ¡Tu consulta está lista!
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 max-w-md mx-auto font-light">
                Gracias, {name || 'cliente'}. Abrimos tu correo con el mensaje completo para {selectedScopes.join(', ')}: solo falta que lo envíes.
              </p>
              <p className="text-xs text-zinc-500 max-w-md mx-auto font-mono">
                ¿No se abrió? Escribí directo a{' '}
                <a href={buildMailto()} className="underline underline-offset-2 text-zinc-800 dark:text-zinc-200">
                  {EBER_PROFILE.email}
                </a>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono uppercase font-semibold cursor-pointer"
                style={{ borderRadius: '0px' }}
              >
                Volver al formulario
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Scope Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  1. ¿Qué áreas de diseño necesitas? (Selecciona una o varias)
                </label>
                <div className="flex flex-wrap gap-2">
                  {scopeOptions.map((scope) => {
                    const isSelected = selectedScopes.includes(scope);
                    return (
                      <button
                        type="button"
                        key={scope}
                        onClick={() => toggleScope(scope)}
                        aria-pressed={isSelected}
                        onMouseEnter={cursorHandlers?.onButtonHover}
                        onMouseLeave={cursorHandlers?.onHoverLeave}
                        className={`px-4 py-2.5 text-xs font-mono transition-all rounded-full ${
                          isSelected
                            ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                            : 'border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:border-zinc-500'
                        }`}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  2. Presupuesto estimado (opcional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBudget(selectedBudget === b ? "" : b)}
                      aria-pressed={selectedBudget === b}
                      onMouseEnter={cursorHandlers?.onButtonHover}
                      onMouseLeave={cursorHandlers?.onHoverLeave}
                      className={`p-2.5 border text-xs font-mono text-center transition-all ${
                        selectedBudget === b
                          ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold'
                          : 'border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:border-zinc-500'
                      }`}
                      style={{ borderRadius: '0px' }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-500 uppercase mb-1 font-medium">Nombre</label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="Tu nombre o empresa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-500 uppercase mb-1 font-medium">Email de Contacto</label>
                    <input
                      id="contact-email"
                      autoComplete="email"
                      type="email"
                      required
                      placeholder="ejemplo@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-500 uppercase mb-1 font-medium">Detalles del Proyecto</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Cuéntame brevemente sobre tus objetivos, plazos esperados y referentes..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-950 dark:text-white focus:outline-none focus:border-zinc-950 dark:focus:border-white resize-none"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className="w-full py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xs"
                style={{ borderRadius: '0px' }}
              >
                <Send className="w-4 h-4" />
                <span>Enviar consulta por mail</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};

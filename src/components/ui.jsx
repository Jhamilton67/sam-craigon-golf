import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function GoldButton({ to, href, children, className = '', onClick }) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3.5 bg-gold-400 hover:bg-gold-300 text-forest-950 font-semibold font-body text-sm tracking-wide rounded transition-all duration-200 hover:shadow-lg hover:shadow-gold-400/25 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-950';
  if (href) return <a href={href} className={`${base} ${className}`} target="_blank" rel="noopener noreferrer">{children}</a>;
  if (onClick) return <button onClick={onClick} className={`${base} ${className}`}>{children}</button>;
  return <Link to={to} className={`${base} ${className}`}>{children}</Link>;
}

export function GhostButton({ to, href, children, className = '' }) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3.5 border border-cream-200/30 hover:border-gold-400 text-cream-200 hover:text-gold-400 font-medium font-body text-sm tracking-wide rounded transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400';
  if (href) return <a href={href} className={`${base} ${className}`} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link to={to} className={`${base} ${className}`}>{children}</Link>;
}

export function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="gold-rule" />
      <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
        {children}
      </span>
    </div>
  );
}

export function PageHero({ label, title, subtitle, cta, ctaLabel = 'Book a Lesson', bgImage }) {
  return (
    <section
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-end pb-16 md:pb-24 pt-28 md:pt-32 overflow-hidden"
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/50 to-forest-950/90" />
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {label && <SectionLabel>{label}</SectionLabel>}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-50 font-semibold leading-tight max-w-2xl animate-fade-up opacity-0-start">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-cream-300 text-base md:text-lg font-body leading-relaxed max-w-xl animate-fade-up delay-200 opacity-0-start">
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-8 animate-fade-up delay-300 opacity-0-start">
            <GoldButton to={cta}>
              {ctaLabel} <ArrowRight size={16} />
            </GoldButton>
          </div>
        )}
      </div>
    </section>
  );
}

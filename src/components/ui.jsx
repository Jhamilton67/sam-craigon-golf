import { Link } from 'react-router-dom';
import LaunchMonitor from './LaunchMonitor';

/* Primary brass CTA — works on both dark and light surfaces */
export function GoldButton({ to, href, children, className = '', onClick }) {
  const base =
    'inline-flex items-center gap-2 px-7 py-3.5 bg-brass hover:bg-brass-light text-fairway-deep font-semibold font-body text-sm tracking-wide rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-brass/25 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';
  if (href) return <a href={href} className={`${base} ${className}`} target="_blank" rel="noopener noreferrer">{children}</a>;
  if (onClick) return <button onClick={onClick} className={`${base} ${className}`}>{children}</button>;
  return <Link to={to} className={`${base} ${className}`}>{children}</Link>;
}

/* Ghost / outline button. tone="light" for use on ivory sections */
export function GhostButton({ to, href, children, className = '', tone = 'dark' }) {
  const palette =
    tone === 'light'
      ? 'border-ink/25 hover:border-brass text-ink hover:text-brass-dark'
      : 'border-bone/25 hover:border-brass text-bone hover:text-brass-light';
  const base = `inline-flex items-center gap-2 px-7 py-3.5 border ${palette} font-medium font-body text-sm tracking-wide rounded-md transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brass`;
  if (href) return <a href={href} className={`${base} ${className}`} target="_blank" rel="noopener noreferrer">{children}</a>;
  return <Link to={to} className={`${base} ${className}`}>{children}</Link>;
}

/* Eyebrow label with brass rule. tone="light" on ivory sections */
export function SectionLabel({ children, tone = 'dark' }) {
  const color = tone === 'light' ? 'text-brass-dark' : 'text-brass-light';
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="brass-rule" />
      <span className={`font-mono text-[11px] font-medium tracking-mega uppercase ${color}`}>
        {children}
      </span>
    </div>
  );
}

/* Reusable page header. Optionally shows the condensed launch-monitor motif. */
export function PageHero({ label, title, subtitle, cta, ctaLabel = 'Book a Lesson', stats }) {
  return (
    <section className="relative bg-fairway-deep pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* faint brass edge */}
      <div className="absolute left-0 top-28 bottom-16 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10">
        <div className={`grid grid-cols-1 ${stats ? 'lg:grid-cols-12' : ''} gap-10 lg:gap-10 items-end`}>
          <div className={stats ? 'lg:col-span-7' : ''}>
            {label && <SectionLabel>{label}</SectionLabel>}
            <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] text-bone font-semibold leading-[1.05] tracking-tight max-w-2xl animate-fade-up opacity-0-start text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 text-bone-soft text-sm md:text-lg font-body leading-relaxed max-w-xl animate-fade-up delay-200 opacity-0-start">
                {subtitle}
              </p>
            )}
            {cta && (
              <div className="mt-8 animate-fade-up delay-300 opacity-0-start">
                <GoldButton to={cta}>{ctaLabel}</GoldButton>
              </div>
            )}
          </div>

          {stats && (
            <div className="lg:col-span-5 animate-fade-up delay-300 opacity-0-start">
              <LaunchMonitor stats={stats} variant="condensed" tone="dark" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

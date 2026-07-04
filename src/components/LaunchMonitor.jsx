import { useEffect, useRef, useState } from 'react';

/**
 * TrackMan-style launch-monitor data strip.
 * Numbers tick up on mount like a real launch monitor booting.
 *
 * variant="full"      → hero anchor (large readout)
 * variant="condensed" → recurring motif in page headers (compact)
 */

const DEFAULT_STATS = [
  { label: 'Ball Speed', value: 167.4, unit: 'mph', decimals: 1 },
  { label: 'Spin Rate', value: 2680, unit: 'rpm', decimals: 0 },
  { label: 'Carry', value: 289, unit: 'yds', decimals: 0 },
  { label: 'Smash', value: 1.49, unit: 'factor', decimals: 2 },
];

function useCountUp(target, decimals, active, duration = 1500, delay = 0) {
  const [value, setValue] = useState(0);
  const raf = useRef();

  useEffect(() => {
    if (!active) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    let start;
    const startTime = performance.now() + delay;
    const tick = (now) => {
      if (now < startTime) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      if (start === undefined) start = now;
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo for that "settling into place" instrument feel
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, active, duration, delay]);

  return value.toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Stat({ label, value, unit, decimals, active, delay, tone }) {
  const display = useCountUp(value, decimals, active, 1500, delay);
  const valueColor = tone === 'light' ? 'text-ink' : 'text-bone';
  const unitColor = tone === 'light' ? 'text-ink-mute' : 'text-bone-mute';
  const labelColor = tone === 'light' ? 'text-ink-mute' : 'text-brass-light';

  return (
    <div className="flex flex-col gap-1.5 px-1">
      <span className={`stat-label ${labelColor}`}>{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span className={`stat-value text-2xl sm:text-3xl md:text-[2.1rem] leading-none ${valueColor}`}>
          {display}
        </span>
        <span className={`font-mono text-[10px] uppercase tracking-wider ${unitColor}`}>
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function LaunchMonitor({
  stats = DEFAULT_STATS,
  variant = 'full',
  tone = 'dark',
  className = '',
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLight = tone === 'light';
  const shell = isLight
    ? 'bg-ivory-dark/60 border-ink/10'
    : 'bg-fairway/80 border-brass/25';
  const headerBorder = isLight ? 'border-ink/10' : 'border-brass/20';
  const headerText = isLight ? 'text-ink-mute' : 'text-brass-light';
  const dividerColor = isLight ? 'bg-ink/15' : 'bg-brass/30';

  const pad = variant === 'condensed' ? 'p-5 sm:p-6' : 'p-6 sm:p-8';

  return (
    <div
      ref={ref}
      className={`relative rounded-xl border backdrop-blur-sm ${shell} ${pad} ${className}`}
      role="group"
      aria-label="TrackMan launch monitor readout"
    >
      {/* Instrument header */}
      <div className={`flex items-center justify-between mb-5 pb-4 border-b ${headerBorder}`}>
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
          </span>
          <span className={`font-mono text-[10px] font-semibold uppercase tracking-mega ${headerText}`}>
            TrackMan · Live
          </span>
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? 'text-ink-mute' : 'text-bone-mute'}`}>
          Driver
        </span>
      </div>

      {/* Stats — 2x2 on mobile, single row from sm up, with brass dividers */}
      <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-y-6 gap-x-4">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center sm:flex-1">
            <Stat {...s} active={active} delay={i * 140} tone={tone} />
            {i < stats.length - 1 && (
              <span
                className={`hidden sm:block w-px h-12 ml-4 ${dividerColor}`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel } from '../components/ui';

const pillars = [
  {
    kicker: 'Coaching',
    title: 'PGA Professional Lessons',
    body: 'Every lesson is delivered by a qualified PGA professional. Clear, direct feedback backed by data. Changes that hold up on the course, not just on the range.',
    link: '/lessons',
    label: 'Golf Lessons',
  },
  {
    kicker: 'Equipment',
    title: 'TrackMan Custom Fitting',
    body: 'Club path, face angle, launch, spin, carry. No guesswork. Properly fitted equipment that improves distance, accuracy, and consistency for your swing.',
    link: '/fitting',
    label: 'Custom Fitting',
  },
  {
    kicker: 'Studio',
    title: 'Year-Round Studio Access',
    body: 'Practice in all conditions with TrackMan tracking every session. Memberships built to give you more time on the mat, not just a number on a card.',
    link: '/membership',
    label: 'Studio Membership',
  },
];

const testimonials = [
  {
    quote: 'Sam completely transformed my ball striking in four sessions. The TrackMan data made it obvious exactly what to change, and it actually stuck.',
    author: 'David M.',
    detail: 'Handicap 18 → 12',
  },
  {
    quote: 'The custom fitting was a revelation. My new setup added 20 yards off the tee and I am hitting far more fairways.',
    author: 'Claire T.',
    detail: 'Custom fitting client',
  },
  {
    quote: 'Simple, clear, backed by data. You leave every session knowing exactly what to work on next.',
    author: 'Ross H.',
    detail: 'Gold studio member',
  },
];

const tiers = [
  { name: 'Bronze', price: '39', period: '/mo', highlight: false, feature: '1 off-peak session per week' },
  { name: 'Silver', price: '69', period: '/mo', highlight: false, feature: 'Up to 3 sessions · priority booking' },
  { name: 'Gold', price: '119', period: '/mo', highlight: true, feature: 'Unlimited sessions · guest passes' },
  { name: '3-Month Pass', price: '199', period: 'once', highlight: false, feature: '2 sessions/week for 3 months' },
];

export default function Home() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-fairway-deep overflow-hidden">
        {/* faint brass edge line */}
        <div className="absolute left-0 top-32 bottom-24 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />

        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10 pt-32 pb-24 md:pt-48 md:pb-36">
          <div className="flex items-center gap-3 mb-8 animate-fade-in opacity-0-start">
            <div className="w-10 h-px bg-brass" />
            <span className="font-mono text-[11px] font-medium tracking-mega uppercase text-brass-light">
              PGA Professional · Uphall Golf Club
            </span>
          </div>

          <h1 className="font-display text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-bone font-semibold tracking-tight max-w-4xl text-balance animate-fade-up opacity-0-start delay-100">
            Play the game the
            <span className="italic text-brass-light"> numbers </span>
            say you can.
          </h1>

          <p className="mt-7 text-bone-soft text-base md:text-xl font-body leading-relaxed max-w-2xl animate-fade-up opacity-0-start delay-300">
            Professional coaching, precision TrackMan fitting, and year-round
            studio access. Everything you need to play better golf, under one
            roof at Uphall.
          </p>

          <div className="mt-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 animate-fade-up opacity-0-start delay-500">
            <GoldButton to="/book">
              Book a Lesson <ArrowRight size={16} />
            </GoldButton>
            <GhostButton to="/lessons">Explore Coaching</GhostButton>
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS (ivory) ────────────────────────────── */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-14 md:mb-16 max-w-2xl">
            <SectionLabel tone="light">What we offer</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.08] text-balance">
              Everything you need to play better golf.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ink/10 rounded-xl overflow-hidden border border-ink/10">
            {pillars.map(({ kicker, title, body, link, label }) => (
              <div
                key={title}
                className="reveal group bg-ivory p-8 lg:p-10 flex flex-col transition-colors duration-300 hover:bg-ivory-dark"
              >
                <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-dark mb-6">
                  {kicker}
                </span>
                <h3 className="font-display text-2xl text-ink font-semibold mb-4 leading-snug">
                  {title}
                </h3>
                <p className="text-ink-soft text-sm font-body leading-relaxed mb-8 flex-1">
                  {body}
                </p>
                <Link
                  to={link}
                  className="inline-flex items-center gap-1.5 text-ink text-xs font-semibold font-body tracking-wide uppercase group-hover:text-brass-dark transition-colors duration-200"
                >
                  {label} <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO MEMBERSHIP TEASER (dark) ──────────────────── */}
      <section className="py-20 md:py-32 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="reveal">
              <SectionLabel>Studio membership</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl text-bone font-semibold leading-[1.08] tracking-tight mb-6 text-balance">
                Practice more.
                <span className="italic text-brass-light"> Get better faster.</span>
              </h2>
              <p className="text-bone-soft text-base font-body leading-relaxed mb-8 max-w-lg">
                Memberships built for golfers who want regular, high-quality
                practice without paying full price every visit. TrackMan
                data tracking real improvement across every session.
              </p>
              <div className="space-y-3.5 mb-10">
                {[
                  'Member-only rates on studio time',
                  'Priority booking during peak hours',
                  'Unlimited TrackMan data to track progress',
                  'All-weather practice. Train anytime.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" />
                    <span className="text-bone-soft text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
              <GoldButton to="/membership">
                View membership plans <ArrowRight size={16} />
              </GoldButton>
            </div>

            {/* Parallel price cards */}
            <div className="reveal grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-3.5">
              {tiers.map(({ name, price, period, highlight, feature }) => (
                <div
                  key={name}
                  className={`relative rounded-xl p-5 border transition-colors duration-200 ${
                    highlight
                      ? 'bg-brass/10 border-brass/50'
                      : 'bg-fairway-deep/60 border-fairway-light/50'
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-2.5 left-4 bg-brass text-fairway-deep font-mono text-[9px] font-semibold px-2 py-0.5 rounded tracking-widest uppercase">
                      Popular
                    </span>
                  )}
                  <p className="font-mono text-[10px] font-medium tracking-widest uppercase text-bone-mute mb-2">
                    {name}
                  </p>
                  <p className="flex items-baseline gap-0.5">
                    <span className="font-mono text-xs text-bone-soft">£</span>
                    <span className="stat-value text-3xl text-bone">{price}</span>
                    <span className="font-mono text-[10px] text-bone-mute ml-0.5">{period}</span>
                  </p>
                  <p className="mt-3 text-bone-soft text-[11px] font-body leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (ivory) ─────────────────────────────── */}
      <section className="py-20 md:py-32 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-14 max-w-2xl">
            <SectionLabel tone="light">Results</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold tracking-tight leading-[1.08]">
              Improvement you can measure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map(({ quote, author, detail }, i) => (
              <figure
                key={author}
                className="reveal flex flex-col border-t border-ink/15 pt-6"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <blockquote className="font-display text-xl md:text-[1.35rem] text-ink font-medium leading-snug italic mb-8 flex-1 text-pretty">
                  “{quote}”
                </blockquote>
                <figcaption>
                  <p className="text-ink text-sm font-semibold font-body">{author}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brass-dark mt-1">{detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (deep fairway) ───────────────────────────────── */}
      <section className="py-20 md:py-28 bg-fairway-deep">
        <div className="max-w-content mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="reveal">
            <h2 className="font-display text-3xl md:text-4xl text-bone font-semibold tracking-tight mb-3 text-balance">
              Ready to change your game?
            </h2>
            <p className="text-bone-soft text-base font-body max-w-md">
              Book a studio lesson, on-course session, or custom fitting and
              start seeing real numbers.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <GoldButton to="/book">
              Book a Lesson <ArrowRight size={16} />
            </GoldButton>
            <GhostButton to="/fitting">Custom Fitting</GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

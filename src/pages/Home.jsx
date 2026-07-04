import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Award, Star, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel } from '../components/ui';

const pillars = [
  {
    icon: Award,
    title: 'PGA Professional Coaching',
    body: 'Every lesson is delivered by a qualified PGA professional with a track record of helping golfers of all abilities make real, lasting improvements.',
    link: '/lessons',
    label: 'Golf Lessons',
  },
  {
    icon: Target,
    title: 'TrackMan Custom Fitting',
    body: 'Precision data — club path, face angle, launch, spin, carry distance. No guesswork. Properly fitted equipment improves distance, accuracy, and consistency.',
    link: '/fitting',
    label: 'Custom Fitting',
  },
  {
    icon: TrendingUp,
    title: 'Year-Round Studio Access',
    body: 'Practice in all conditions with TrackMan data tracking every session. Memberships from £39/month — structured to give you more time on the mat, not just a number on a card.',
    link: '/membership',
    label: 'Studio Membership',
  },
];

const testimonials = [
  {
    quote: "Sam completely transformed my ball striking in just four sessions. The TrackMan data made it obvious exactly what I needed to change — and it actually stuck.",
    author: 'David M.',
    detail: 'Handicap reduced from 18 to 12',
  },
  {
    quote: "The custom fitting was a revelation. I had no idea how far off my old clubs were. The new setup has added 20 yards off the tee and I'm hitting way more fairways.",
    author: 'Claire T.',
    detail: 'Custom fitting client',
  },
  {
    quote: "I've had lessons from a few coaches over the years but Sam's approach is different — simple, clear, backed by data. You leave knowing exactly what to work on.",
    author: 'Ross H.',
    detail: 'Gold Studio Member',
  },
];

const membershipTiers = [
  { name: 'Bronze', price: '£39', period: '/month', highlight: false,
    feature: '1 off-peak session/week · weekend access from 2pm' },
  { name: 'Silver', price: '£69', period: '/month', highlight: false,
    feature: 'Up to 3 sessions/week · peak + off-peak · priority booking' },
  { name: 'Gold', price: '£119', period: '/month', highlight: true,
    feature: 'Unlimited sessions · priority booking · guest passes included' },
  { name: '3-Month Pass', price: '£199', period: 'one-off', highlight: false,
    feature: '2 sessions/week for 3 months · guests at £2.50' },
];

export default function Home() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/golfcourse/1600/900')" }}
        />
        {/* Layered overlays for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/20" />

        {/* Animated accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in opacity-0-start">
              <div className="w-10 h-px bg-gold-400" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
                PGA Professional · Uphall Golf Club
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-cream-50 font-semibold leading-[1.05] animate-fade-up opacity-0-start delay-100">
              Discover<br />
              <em className="italic text-gold-400 not-italic">Your Game.</em>
            </h1>

            <p className="mt-6 text-cream-300 text-base md:text-lg font-body leading-relaxed max-w-lg animate-fade-up opacity-0-start delay-300">
              Professional coaching, precision fitting, and year-round studio access — everything you need to play better golf, under one roof at Uphall.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up opacity-0-start delay-500">
              <GoldButton to="/book">
                Book a Lesson <ArrowRight size={16} />
              </GoldButton>
              <GhostButton to="/lessons">
                Explore Coaching
              </GhostButton>
            </div>

            {/* Trust line */}
            <p className="mt-8 text-cream-400 text-xs font-body tracking-wide animate-fade-in opacity-0-start delay-700">
              TrackMan Studio · Custom Fitting · Coaching for all abilities
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cream-300 animate-pulse" />
        </div>
      </section>

      {/* ── THREE PILLARS ────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-forest-900 relative overflow-hidden">
        {/* Subtle geometric accent */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-forest-700/10 blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-16">
            <SectionLabel>What We Offer</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold max-w-xl leading-snug">
              Everything you need to play better golf.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map(({ icon: Icon, title, body, link, label }, i) => (
              <div
                key={title}
                className="reveal group relative bg-forest-800/60 border border-forest-700/40 rounded-lg p-8 hover:border-gold-400/40 hover:bg-forest-800/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 rounded-md bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-6 group-hover:bg-gold-400/20 transition-colors duration-200">
                  <Icon size={18} className="text-gold-400" />
                </div>
                <h3 className="font-display text-xl text-cream-50 font-semibold mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-cream-400 text-sm font-body leading-relaxed mb-6">
                  {body}
                </p>
                <Link
                  to={link}
                  className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-semibold font-body tracking-wide uppercase hover:gap-3 transition-all duration-200"
                >
                  {label} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO MEMBERSHIP TEASER ────────────────────────── */}
      <section className="py-24 md:py-32 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "url('https://picsum.photos/seed/golfstudio/1200/600')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/90 to-forest-950" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <SectionLabel>Studio Membership</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold leading-snug mb-6">
                Practice More.<br />Pay Less.<br /><em className="text-gold-400 not-italic">Get Better Faster.</em>
              </h2>
              <p className="text-cream-400 text-base font-body leading-relaxed mb-8">
                Our studio memberships are built for golfers who want regular, high-quality practice without paying full price every visit — with TrackMan data tracking real improvement across every session.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  'Exclusive member-only rates on studio time',
                  'Priority booking during peak hours',
                  'Unlimited TrackMan data to track real improvement',
                  'All-weather practice — train anytime, no excuses',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                    <span className="text-cream-300 text-sm font-body">{item}</span>
                  </div>
                ))}
              </div>
              <GoldButton to="/membership">
                View Membership Plans <ArrowRight size={16} />
              </GoldButton>
            </div>

            {/* Membership price cards — teaser */}
            <div className="reveal grid grid-cols-2 gap-4">
              {membershipTiers.map(({ name, price, period, highlight, feature }) => (
                <div
                  key={name}
                  className={`relative rounded-lg p-5 border transition-all duration-200 ${
                    highlight
                      ? 'bg-gold-400/10 border-gold-400/50'
                      : 'bg-forest-800/40 border-forest-700/40'
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-2.5 left-4 bg-gold-400 text-forest-950 text-[10px] font-semibold font-body px-2 py-0.5 rounded tracking-wide uppercase">
                      Most Popular
                    </span>
                  )}
                  <p className="font-body text-xs font-semibold tracking-widest uppercase text-cream-400 mb-1">
                    {name}
                  </p>
                  <p className="font-display text-2xl font-bold text-cream-50">
                    {price}<span className="text-sm font-body font-normal text-cream-400 ml-1">{period}</span>
                  </p>
                  <p className="mt-2 text-cream-400 text-[11px] font-body leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-forest-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal text-center mb-16">
            <SectionLabel>What Clients Say</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold">
              Results you can measure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, author, detail }, i) => (
              <div
                key={author}
                className="reveal bg-forest-800/50 border border-forest-700/30 rounded-lg p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <blockquote className="text-cream-300 text-sm font-body leading-relaxed mb-6 italic">
                  "{quote}"
                </blockquote>
                <div>
                  <p className="text-cream-50 text-sm font-semibold font-body">{author}</p>
                  <p className="text-cream-400 text-xs font-body mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/50 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-400/5 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="reveal text-center md:text-left">
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold mb-3">
              Ready to change your game?
            </h2>
            <p className="text-cream-400 text-base font-body max-w-md">
              Book an indoor studio lesson, on-course session, or custom fitting — and start seeing real numbers.
            </p>
          </div>
          <div className="reveal flex flex-col sm:flex-row gap-4 shrink-0">
            <GoldButton to="/book">
              Book a Lesson <ArrowRight size={16} />
            </GoldButton>
            <GhostButton to="/fitting">
              Custom Fitting
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

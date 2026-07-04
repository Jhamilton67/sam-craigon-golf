import { Check, ArrowRight, Zap } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel } from '../components/ui';

const tiers = [
  {
    name: 'Bronze',
    price: '£39',
    period: '/month',
    featured: false,
    tag: null,
    description: 'A great entry point for golfers who want structured weekly studio time at a fair price.',
    features: [
      '1 off-peak session per week',
      'Weekend access after 2pm',
      'TrackMan data on every session',
      'All-weather indoor studio',
    ],
  },
  {
    name: 'Silver',
    price: '£69',
    period: '/month',
    featured: false,
    tag: null,
    description: 'For the committed golfer who wants to practice several times a week and track consistent improvement.',
    features: [
      'Up to 3 sessions per week',
      'Peak and off-peak access',
      'Priority booking',
      'TrackMan data on every session',
      'All-weather indoor studio',
    ],
  },
  {
    name: 'Gold',
    price: '£119',
    period: '/month',
    featured: true,
    tag: 'Best Value',
    description: 'Unlimited studio access with priority booking and complimentary guest passes — for serious improvement.',
    features: [
      'Unlimited sessions',
      'Peak and off-peak access',
      'Priority booking guaranteed',
      'Guests included free of charge',
      'TrackMan data on every session',
      'All-weather indoor studio',
    ],
  },
  {
    name: '3-Month Studio Pass',
    price: '£199',
    period: 'one-off',
    featured: false,
    tag: null,
    description: 'A single upfront payment that locks in 3 months of structured studio practice — ideal for a focused block of improvement.',
    features: [
      '2 sessions per week for 3 months',
      'Peak and off-peak access',
      'Guests at £2.50 per session',
      'TrackMan data on every session',
      'All-weather indoor studio',
    ],
  },
];

export default function Membership() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-forest-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://picsum.photos/seed/studionight/1600/700')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 to-forest-950" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5 animate-fade-in opacity-0-start">
              <div className="w-10 h-px bg-gold-400" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
                Studio Membership
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-50 font-semibold leading-tight animate-fade-up opacity-0-start delay-100">
              Practice More.<br />
              <em className="text-gold-400 not-italic">Pay Less.</em>
            </h1>
            <p className="mt-5 text-cream-300 text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-300">
              Memberships built for golfers who want regular, high-quality studio practice without paying full price every visit. Spaces are limited to keep availability fair for members.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY MEMBER ──────────────────────────────────────── */}
      <section className="py-16 bg-forest-900 border-y border-forest-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Better than pay-as-you-go', body: 'All tiers work out cheaper per session than drop-in rates.' },
              { icon: Check, title: 'Priority booking', body: 'Silver and Gold members get first access to peak-hour slots.' },
              { icon: Zap, title: 'Real data, every time', body: 'TrackMan tracks your numbers across every session — not just lessons.' },
              { icon: Check, title: 'All-weather practice', body: 'Indoor studio means no cancelled sessions, no excuses, no gaps.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="reveal flex gap-4" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-8 h-8 rounded bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={14} className="text-gold-400" />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-cream-100 mb-1">{title}</h4>
                  <p className="text-cream-400 text-xs font-body leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal text-center mb-14">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold">
              Pick your level of commitment.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-stretch">
            {tiers.map(({ name, price, period, featured, tag, description, features }, i) => (
              <div
                key={name}
                className={`reveal relative flex flex-col rounded-xl border transition-all duration-200 ${
                  featured
                    ? 'bg-forest-800/80 border-gold-400/60 shadow-2xl shadow-gold-400/10 lg:-translate-y-2'
                    : 'bg-forest-800/40 border-forest-700/40'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-400 text-forest-950 text-[10px] font-bold font-body px-3 py-1 rounded tracking-widest uppercase whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                )}

                <div className="p-7 border-b border-forest-700/40">
                  <h3 className={`font-body text-xs font-semibold tracking-widest uppercase mb-3 ${featured ? 'text-gold-400' : 'text-cream-400'}`}>
                    {name}
                  </h3>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="font-display text-4xl font-bold text-cream-50">{price}</span>
                    <span className="text-cream-400 text-sm font-body">{period}</span>
                  </div>
                  <p className="text-cream-400 text-xs font-body leading-relaxed">{description}</p>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <ul className="space-y-3 flex-1 mb-7">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={13} className={`mt-0.5 shrink-0 ${featured ? 'text-gold-400' : 'text-forest-400'}`} />
                        <span className="text-cream-300 text-xs font-body">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <GoldButton to="/book" className="w-full justify-center">
                    Get Started
                  </GoldButton>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <p className="text-cream-400 text-sm font-body">
              Spaces are limited. Email <a href="mailto:Sam@samcraigongolf.com" className="text-gold-400 hover:text-gold-300 transition-colors">Sam@samcraigongolf.com</a> to reserve your spot or ask about availability.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-900 border-t border-forest-800/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <SectionLabel>Questions</SectionLabel>
            <h2 className="font-display text-2xl md:text-3xl text-cream-50 font-semibold">
              Common questions about membership.
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I cancel my monthly membership?',
                a: 'Monthly memberships can be cancelled with 30 days notice. Get in touch directly to discuss your situation.',
              },
              {
                q: 'Do I need to be a member of Uphall Golf Club?',
                a: 'No — studio memberships are open to anyone, regardless of club membership status.',
              },
              {
                q: 'What equipment is available in the studio?',
                a: 'The studio is equipped with a full TrackMan launch monitor. Bring your own clubs, or Sam can supply demo equipment for fitting or lesson sessions.',
              },
              {
                q: 'Can I upgrade or downgrade my tier?',
                a: 'Yes — speak to Sam directly and changes can be made at the next billing cycle.',
              },
            ].map(({ q, a }, i) => (
              <div
                key={q}
                className="reveal border-b border-forest-700/40 pb-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h4 className="font-display text-base text-cream-50 font-semibold mb-2">{q}</h4>
                <p className="text-cream-400 text-sm font-body leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <GhostButton href="mailto:Sam@samcraigongolf.com">
              Ask a Question
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

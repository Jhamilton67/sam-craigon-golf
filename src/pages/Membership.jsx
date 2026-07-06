import { Check, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel } from '../components/ui';

const tiers = [
  {
    name: 'Bronze', price: '39', period: '/month', featured: false, tag: null,
    description: 'A great entry point for structured weekly studio time at a fair price.',
    features: ['1 off-peak session per week', 'Weekend access after 2pm', 'TrackMan data on every session', 'All-weather indoor studio'],
  },
  {
    name: 'Silver', price: '69', period: '/month', featured: false, tag: null,
    description: 'For the committed golfer who wants to practice several times a week.',
    features: ['Up to 3 sessions per week', 'Peak and off-peak access', 'Priority booking', 'TrackMan data on every session', 'All-weather indoor studio'],
  },
  {
    name: 'Gold', price: '119', period: '/month', featured: true, tag: 'Best value',
    description: 'Unlimited access with priority booking and complimentary guest passes.',
    features: ['Unlimited sessions', 'Peak and off-peak access', 'Priority booking guaranteed', 'Guests included free of charge', 'TrackMan data on every session', 'All-weather indoor studio'],
  },
  {
    name: '3-Month Pass', price: '199', period: 'one-off', featured: false, tag: null,
    description: 'A single payment locking in three months of structured practice.',
    features: ['2 sessions per week for 3 months', 'Peak and off-peak access', 'Guests at £2.50 per session', 'TrackMan data on every session', 'All-weather indoor studio'],
  },
];

const benefits = [
  { title: 'Better than pay-as-you-go', body: 'All tiers work out cheaper per session than drop-in rates.' },
  { title: 'Priority booking', body: 'Silver and Gold members get first access to peak-hour slots.' },
  { title: 'Real data, every time', body: 'TrackMan tracks your numbers across every session, not just lessons.' },
  { title: 'All-weather practice', body: 'Indoor studio means no cancelled sessions and no gaps.' },
];

const faqs = [
  { q: 'Can I cancel my monthly membership?', a: 'Monthly memberships can be cancelled with 30 days notice. Get in touch directly to discuss your situation.' },
  { q: 'Do I need to be a member of Uphall Golf Club?', a: 'No — studio memberships are open to anyone, regardless of club membership status.' },
  { q: 'What equipment is in the studio?', a: 'A full TrackMan launch monitor. Bring your own clubs, or Sam can supply demo equipment for fitting or lessons.' },
  { q: 'Can I upgrade or downgrade my tier?', a: 'Yes — speak to Sam directly and changes can be made at the next billing cycle.' },
];

export default function Membership() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO (deep fairway) ──────────────────────────────── */}
      <section className="relative bg-fairway-deep pt-28 pb-14 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute left-0 top-28 bottom-16 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>Studio membership</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] text-bone font-semibold leading-[1.05] tracking-tight animate-fade-up opacity-0-start text-balance">
              Practice more.
              <span className="italic text-brass-light"> Pay less.</span>
            </h1>
            <p className="mt-6 text-bone-soft text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-200">
              Memberships built for golfers who want regular, high-quality studio
              practice without paying full price every visit. Spaces are limited
              to keep availability fair for members.
            </p>
          </div>
        </div>
      </section>

      {/* ── BENEFITS (ivory) ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ title, body }, i) => (
              <div key={title} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-8 h-px bg-brass mb-4" />
                <h4 className="font-body text-sm font-semibold text-ink mb-2">{title}</h4>
                <p className="text-ink-mute text-sm font-body leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING TIERS (dark) ─────────────────────────────── */}
      <section className="py-20 md:py-32 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-14 max-w-xl">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-bone font-semibold tracking-tight leading-[1.08]">
              Pick your level of commitment.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 items-stretch">
            {tiers.map(({ name, price, period, featured, tag, description, features }, i) => (
              <div
                key={name}
                className={`reveal relative flex flex-col rounded-2xl border transition-all duration-200 ${
                  featured
                    ? 'bg-fairway-deep/80 border-brass/60 shadow-2xl shadow-black/30 lg:-translate-y-3'
                    : 'bg-fairway-deep/40 border-fairway-light/50'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brass text-fairway-deep font-mono text-[9px] font-semibold px-3 py-1 rounded tracking-widest uppercase whitespace-nowrap">
                      {tag}
                    </span>
                  </div>
                )}

                <div className="p-7 border-b border-fairway-light/40">
                  <h3 className={`font-mono text-[10px] font-medium tracking-mega uppercase mb-4 ${featured ? 'text-brass-light' : 'text-bone-mute'}`}>
                    {name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="font-mono text-base text-bone-soft">£</span>
                    <span className="stat-value text-4xl text-bone">{price}</span>
                    <span className="font-mono text-[11px] text-bone-mute ml-1">{period}</span>
                  </div>
                  <p className="text-bone-soft text-xs font-body leading-relaxed">{description}</p>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <ul className="space-y-3 flex-1 mb-7">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check size={13} className={`mt-0.5 shrink-0 ${featured ? 'text-brass' : 'text-brass/60'}`} />
                        <span className="text-bone-soft text-xs font-body">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <GoldButton to="/book" className="w-full justify-center">
                    Get started
                  </GoldButton>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 text-center">
            <p className="text-bone-soft text-sm font-body">
              Spaces are limited. Email{' '}
              <a href="mailto:Sam@samcraigongolf.com" className="text-brass-light hover:text-brass transition-colors">Sam@samcraigongolf.com</a>{' '}
              to reserve your spot or ask about availability.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ (ivory) ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-10">
            <SectionLabel tone="light">Questions</SectionLabel>
            <h2 className="font-display text-2xl md:text-4xl text-ink font-semibold tracking-tight">
              Common questions about membership.
            </h2>
          </div>

          <div className="divide-y divide-ink/15 border-t border-ink/15">
            {faqs.map(({ q, a }, i) => (
              <div key={q} className="reveal py-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <h4 className="font-display text-lg text-ink font-semibold mb-2">{q}</h4>
                <p className="text-ink-soft text-sm font-body leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-10">
            <GhostButton href="mailto:Sam@samcraigongolf.com" tone="light">
              Ask a question
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

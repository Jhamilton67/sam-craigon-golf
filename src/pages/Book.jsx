import { Monitor, Map, Target, ArrowRight, Phone, Mail } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLabel } from '../components/ui';

const CALENDLY_URL = 'YOUR_CALENDLY_URL_HERE';

const serviceTypes = [
  {
    icon: Monitor,
    name: 'Indoor Studio Lesson',
    desc: 'TrackMan-powered coaching in the performance studio. Data on every swing, year-round.',
    duration: '60 min',
  },
  {
    icon: Map,
    name: 'On-Course Lesson',
    desc: 'Real playing situations at Uphall Golf Club. Course management, decision-making, lower scores.',
    duration: '90 min',
  },
  {
    icon: Target,
    name: 'Custom Fitting',
    desc: 'Full TrackMan fitting session across your bag. Leave with a spec sheet, not just a feeling.',
    duration: '60–90 min',
  },
];

export default function Book() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5 animate-fade-in opacity-0-start">
              <div className="w-10 h-px bg-gold-400" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
                Book a Session
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-cream-50 font-semibold leading-tight animate-fade-up opacity-0-start delay-100">
              Ready to get started?
            </h1>
            <p className="mt-4 text-cream-300 text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-300">
              Pick your session type and choose a time that works for you. Confirmation and reminders are sent automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICE TYPE CARDS ──────────────────────────────── */}
      <section className="pb-12 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {serviceTypes.map(({ icon: Icon, name, desc, duration }, i) => (
              <div
                key={name}
                className="reveal bg-forest-800/50 border border-forest-700/40 rounded-lg p-6 hover:border-gold-400/30 hover:bg-forest-800/70 transition-all duration-200"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-gold-400" />
                  </div>
                  <span className="text-cream-400 text-xs font-body font-medium">{duration}</span>
                </div>
                <h3 className="font-display text-base text-cream-50 font-semibold mb-2">{name}</h3>
                <p className="text-cream-400 text-xs font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED ──────────────────────────────────── */}
      <section className="pb-20 md:pb-28 bg-forest-950">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {CALENDLY_URL === 'YOUR_CALENDLY_URL_HERE' ? (
            /* ── PLACEHOLDER until Calendly is configured ── */
            <div className="reveal bg-forest-800/40 border border-dashed border-gold-400/40 rounded-xl p-12 md:p-16 text-center">
              <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
                <ArrowRight size={20} className="text-gold-400" />
              </div>
              <h3 className="font-display text-2xl text-cream-50 font-semibold mb-3">
                Booking calendar coming soon
              </h3>
              <p className="text-cream-400 text-sm font-body leading-relaxed max-w-md mx-auto mb-2">
                Online booking will be live here shortly. In the meantime, get in touch with Sam directly to arrange a session.
              </p>
              <p className="text-cream-500 text-xs font-body italic mb-8">
                (Developer note: replace <code className="bg-forest-700 px-1.5 py-0.5 rounded text-gold-400">CALENDLY_URL</code> in <code className="bg-forest-700 px-1.5 py-0.5 rounded text-gold-400">src/pages/Book.jsx</code> with your Calendly scheduling link to activate the embed.)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:01506856404"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold-400 hover:bg-gold-300 text-forest-950 font-semibold font-body text-sm tracking-wide rounded transition-all duration-200 hover:shadow-lg hover:shadow-gold-400/25 active:scale-95"
                >
                  <Phone size={16} /> 01506 856404
                </a>
                <a
                  href="mailto:Sam@samcraigongolf.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-cream-200/30 hover:border-gold-400 text-cream-200 hover:text-gold-400 font-medium font-body text-sm tracking-wide rounded transition-all duration-200 active:scale-95"
                >
                  <Mail size={16} /> Sam@samcraigongolf.com
                </a>
              </div>
            </div>
          ) : (
            /* ── Live Calendly embed ── */
            <div className="reveal rounded-xl overflow-hidden border border-forest-700/30 bg-white">
              <iframe
                src={CALENDLY_URL}
                title="Book a session with Sam Craigon Golf"
                width="100%"
                height="800"
                frameBorder="0"
                className="block"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── FALLBACK CONTACT ────────────────────────────────── */}
      <section className="py-16 bg-forest-900 border-t border-forest-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 reveal">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <SectionLabel>Prefer to call?</SectionLabel>
              <p className="text-cream-300 text-base font-body">
                Sam is happy to answer questions and book you in directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="tel:01506856404"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-300 text-forest-950 font-semibold font-body text-sm tracking-wide rounded transition-all duration-200 active:scale-95"
              >
                <Phone size={15} /> 01506 856404
              </a>
              <a
                href="mailto:Sam@samcraigongolf.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-cream-200/30 hover:border-gold-400 text-cream-200 hover:text-gold-400 font-medium font-body text-sm rounded transition-all duration-200 active:scale-95"
              >
                <Mail size={15} /> Email Sam
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useRef, useState } from 'react';
import { Phone, Mail, CalendarClock } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionLabel } from '../components/ui';
import SEO from '../components/SEO';
import CalendlyEmbed from '../components/CalendlyEmbed';

const serviceTypes = [
  {
    kicker: 'Studio',
    name: 'Indoor Studio Lesson',
    desc: 'TrackMan-powered coaching in the performance studio. Data on every swing, year-round.',
    duration: '60 min',
    calendlyUrl: 'https://calendly.com/samcraigongolf/trackman-lesson',
  },
  {
    kicker: 'On course',
    name: 'On-Course Lesson',
    desc: 'Real playing situations at Uphall. Course management, decision-making, lower scores.',
    duration: '60 min',
    calendlyUrl: 'https://calendly.com/samcraigongolf/on-course-lesson',
  },
  {
    kicker: 'Fitting',
    name: 'Custom Fitting',
    desc: 'Full TrackMan fitting across your bag. Leave with a spec sheet, not just a feeling.',
    duration: null,
    calendlyUrl: null,
  },
];

export default function Book() {
  useScrollReveal();
  const [selected, setSelected] = useState(serviceTypes[0].name);
  const activeService = serviceTypes.find((s) => s.name === selected);
  const embedRef = useRef(null);

  function selectService(name) {
    setSelected(name);
    // On mobile especially, the embed is off-screen below the cards — jump
    // to it so picking a card visibly does something, not just a colour
    // change the visitor might scroll straight past.
    embedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div>
      <SEO
        title="Book a Session"
        description="Book a studio lesson, on-course lesson or custom fitting with Sam Craigon Golf at Uphall Golf Club."
        path="/book"
        keywords="book golf lesson Uphall, book TrackMan fitting West Lothian, book golf coaching Scotland"
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Book', path: '/book' }]}
      />
      {/* ── HERO (deep fairway) ──────────────────────────────── */}
      <section className="bg-fairway-deep pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>Book a session</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] text-bone font-semibold leading-[1.05] tracking-tight animate-fade-up opacity-0-start text-balance">
              Ready to get started?
            </h1>
            <p className="mt-5 text-bone-soft text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-200">
              Pick your session type below, then choose a time that works for
              you. Confirmation and reminders are sent automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICE TYPE CARDS (deep fairway) ────────────────── */}
      <section className="pb-14 bg-fairway-deep">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {serviceTypes.map(({ kicker, name, desc, duration, calendlyUrl }, i) => {
              const isActive = selected === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => selectService(name)}
                  aria-pressed={isActive}
                  className={`reveal text-left bg-fairway/60 border rounded-xl p-6 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass ${
                    isActive
                      ? 'border-brass shadow-lg shadow-brass/10'
                      : `border-fairway-light/50 hover:border-brass/40 ${!calendlyUrl ? 'opacity-70 hover:opacity-100' : ''}`
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light">
                      {kicker}
                    </span>
                    {duration ? (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">{duration}</span>
                    ) : (
                      <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-brass-light/80 bg-brass/10 border border-brass/25 rounded px-1.5 py-0.5">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-lg text-bone font-semibold mb-2">{name}</h3>
                  <p className="text-bone-soft text-xs font-body leading-relaxed">{desc}</p>
                  {isActive && (
                    <p className="mt-4 font-mono text-[9px] font-semibold uppercase tracking-widest text-brass-light">
                      ● Showing availability below
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED (ivory) ───────────────────────────── */}
      <section ref={embedRef} className="py-16 md:py-24 bg-ivory scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-ink font-semibold tracking-tight">
              {activeService.name}
            </h2>
            {activeService.duration && (
              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-mute">
                {activeService.duration} · Uphall Golf Club
              </p>
            )}
          </div>

          {!activeService.calendlyUrl ? (
            <div className="reveal bg-ivory-dark/60 border border-dashed border-brass/50 rounded-2xl p-10 md:p-16 text-center">
              <div className="w-14 h-14 rounded-full bg-brass/10 border border-brass/30 flex items-center justify-center mx-auto mb-6">
                <CalendarClock size={22} className="text-brass-dark" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-ink font-semibold mb-3 tracking-tight">
                Online booking for Custom Fitting is coming soon
              </h3>
              <p className="text-ink-soft text-sm font-body leading-relaxed max-w-md mx-auto mb-8">
                In the meantime, get in touch with Sam directly to arrange a
                custom fitting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:01506856404"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brass hover:bg-brass-light text-fairway-deep font-semibold font-body text-sm tracking-wide rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-brass/25 active:scale-[0.98]"
                >
                  <Phone size={16} /> 01506 856404
                </a>
                <a
                  href="mailto:Sam@samcraigongolf.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-ink/25 hover:border-brass text-ink hover:text-brass-dark font-medium font-body text-sm tracking-wide rounded-md transition-all duration-200 active:scale-[0.98]"
                >
                  <Mail size={16} /> Sam@samcraigongolf.com
                </a>
              </div>
            </div>
          ) : (
            <div className="reveal rounded-2xl overflow-hidden border border-ink/10 bg-white shadow-sm">
              <CalendlyEmbed url={activeService.calendlyUrl} eventLabel={activeService.name} />
            </div>
          )}
        </div>
      </section>

      {/* ── FALLBACK CONTACT (dark) ──────────────────────────── */}
      <section className="py-16 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10 reveal">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <SectionLabel>Prefer to call?</SectionLabel>
              <p className="text-bone-soft text-base font-body">
                Sam is happy to answer questions and book you in directly.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="tel:01506856404"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brass hover:bg-brass-light text-fairway-deep font-semibold font-body text-sm tracking-wide rounded-md transition-all duration-200 active:scale-[0.98]"
              >
                <Phone size={15} /> 01506 856404
              </a>
              <a
                href="mailto:Sam@samcraigongolf.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-bone/25 hover:border-brass text-bone hover:text-brass-light font-medium font-body text-sm rounded-md transition-all duration-200 active:scale-[0.98]"
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

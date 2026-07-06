import { MapPin, Phone, Mail, ExternalLink, Trees, Coffee, Car, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, SectionLabel } from '../components/ui';

export default function Location() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO (deep fairway) ──────────────────────────────── */}
      <section className="relative bg-fairway-deep pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute left-0 top-28 bottom-16 w-px bg-gradient-to-b from-transparent via-brass/40 to-transparent" />
        <div className="relative z-10 max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>Our location</SectionLabel>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] text-bone font-semibold leading-[1.05] tracking-tight animate-fade-up opacity-0-start text-balance">
              Uphall Golf Club,
              <span className="italic text-brass-light"> West Lothian.</span>
            </h1>
            <p className="mt-6 text-bone-soft text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-200">
              Coaching, custom fitting, and studio access — all in one place, with
              a proper golf course on the doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE CLUB (ivory) ───────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
            <div className="reveal">
              <SectionLabel tone="light">Uphall Golf Club</SectionLabel>
              <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold leading-[1.08] tracking-tight mb-6 text-balance">
                A proper club, without the stuffiness.
              </h2>
              <div className="space-y-4 text-ink-soft text-base font-body leading-relaxed mb-8">
                <p>
                  Uphall Golf Club is a friendly, welcoming club that caters for
                  golfers of all abilities. The atmosphere is relaxed and social,
                  the catering is solid, and the clubhouse is a good place to
                  debrief after a round.
                </p>
                <p>
                  Sam's TrackMan studio is based here, putting coaching, custom
                  fitting, and retail all under one roof. Lesson, fitting, or
                  membership enquiry — this is where you will find us.
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Trees, label: 'Parkland course — fair, rewarding, and worth playing' },
                  { icon: Coffee, label: 'Clubhouse with catering available' },
                  { icon: Car, label: 'Parking on site' },
                  { icon: MapPin, label: 'Easy to find in West Lothian' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={15} className="text-brass shrink-0" />
                    <span className="text-ink-soft text-sm font-body">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <GoldButton to="/book">
                  Book a lesson <ArrowRight size={16} />
                </GoldButton>
                <GoldButton
                  href="https://visitors.brsgolf.com/uphall#/course/1"
                  className="bg-transparent border border-ink/25 text-ink hover:bg-transparent hover:border-brass hover:text-brass-dark hover:shadow-none"
                >
                  Book a round <ExternalLink size={14} />
                </GoldButton>
              </div>
            </div>

            {/* Course image + info */}
            <div className="reveal space-y-6">
              <div
                className="rounded-2xl overflow-hidden h-64 lg:h-72 bg-cover bg-center border border-ink/10"
                style={{ backgroundImage: "url('/images/course.png')" }}
                role="img"
                aria-label="Parkland golf course at Uphall Golf Club"
              />
              <div className="bg-ivory-dark/60 border border-ink/10 rounded-2xl p-7">
                <h3 className="font-display text-xl text-ink font-semibold mb-3">The course</h3>
                <p className="text-ink-soft text-sm font-body leading-relaxed mb-4">
                  A well-maintained parkland course that rewards strategic play and
                  smart shot selection over power alone. Generous enough to enjoy
                  while working on your game, challenging enough to keep competitive
                  golfers honest.
                </p>
                <p className="text-ink-soft text-sm font-body leading-relaxed">
                  On-course lessons take place here — the ideal environment for
                  putting course management into practice with a PGA professional
                  at your side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT (dark) ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
            <div className="reveal">
              <SectionLabel>Get in touch</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl text-bone font-semibold mb-8 leading-snug tracking-tight">
                Questions? Reach out directly.
              </h2>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: 'Uphall Golf Club, West Lothian', href: null },
                  { icon: Phone, label: 'Phone', value: '01506 856404', href: 'tel:01506856404' },
                  { icon: Mail, label: 'Email', value: 'Sam@samcraigongolf.com', href: 'mailto:Sam@samcraigongolf.com' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-md bg-brass/10 border border-brass/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-brass" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-medium tracking-widest uppercase text-bone-mute mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-bone text-base font-body hover:text-brass-light transition-colors duration-200">{value}</a>
                      ) : (
                        <p className="text-bone text-base font-body">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="reveal">
              <div className="rounded-2xl overflow-hidden bg-fairway-deep/50 border border-fairway-light/50 h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-brass mx-auto mb-3" />
                  <p className="text-bone text-sm font-body mb-1">Uphall Golf Club</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">West Lothian, Scotland</p>
                  <a
                    href="https://maps.google.com/?q=Uphall+Golf+Club+West+Lothian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-brass-light text-xs font-semibold font-body uppercase tracking-wide hover:text-brass transition-colors duration-200"
                  >
                    Open in maps <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { MapPin, Phone, Mail, ExternalLink, Trees, Coffee, Car } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, SectionLabel } from '../components/ui';
import { ArrowRight } from 'lucide-react';

export default function Location() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-forest-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "url('https://picsum.photos/seed/uphallcourse/1600/700')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 to-forest-950/95" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5 animate-fade-in opacity-0-start">
              <div className="w-10 h-px bg-gold-400" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
                Our Location
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-50 font-semibold leading-tight animate-fade-up opacity-0-start delay-100">
              Uphall Golf Club,<br />
              <em className="text-gold-400 not-italic">West Lothian.</em>
            </h1>
            <p className="mt-5 text-cream-300 text-base md:text-lg font-body leading-relaxed animate-fade-up opacity-0-start delay-300">
              Coaching, custom fitting, and studio access — all in one place, with a proper golf course on the doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE CLUB ──────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <SectionLabel>Uphall Golf Club</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold leading-snug mb-6">
                A proper club, without the stuffiness.
              </h2>
              <div className="space-y-4 text-cream-300 text-base font-body leading-relaxed mb-8">
                <p>
                  Uphall Golf Club is a friendly, welcoming club that caters for golfers of all abilities. The atmosphere is relaxed and social, the catering is solid, and the clubhouse is a good place to debrief after a round.
                </p>
                <p>
                  Sam's TrackMan studio is based here, putting coaching, custom fitting, and retail all under one roof. Whether you're coming for a lesson, a fitting, or to enquire about studio membership, this is where you'll find us.
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
                    <Icon size={15} className="text-gold-400 shrink-0" />
                    <span className="text-cream-300 text-sm font-body">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <GoldButton to="/book">
                  Book a Lesson <ArrowRight size={16} />
                </GoldButton>
                <GoldButton
                  href="https://visitors.brsgolf.com/uphall#/course/1"
                  className="bg-transparent border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 hover:text-gold-300 hover:shadow-none"
                >
                  Book a Round <ExternalLink size={14} />
                </GoldButton>
              </div>
            </div>

            {/* Course info + image */}
            <div className="reveal space-y-6">
              <div
                className="rounded-xl overflow-hidden h-64 bg-cover bg-center border border-forest-700/30"
                style={{ backgroundImage: "url('https://picsum.photos/seed/uphall/800/500')" }}
              >
                <div className="h-full bg-forest-950/20" />
              </div>

              <div className="bg-forest-800/40 border border-forest-700/30 rounded-xl p-7">
                <h3 className="font-display text-xl text-cream-50 font-semibold mb-3">The Course</h3>
                <p className="text-cream-400 text-sm font-body leading-relaxed mb-4">
                  A well-maintained parkland course that rewards strategic play and smart shot selection over power alone. It's a fair test — generous enough to enjoy if you're working on your game, challenging enough to keep competitive golfers honest.
                </p>
                <p className="text-cream-400 text-sm font-body leading-relaxed">
                  On-course lessons with Sam take place here — the ideal environment for putting course management skills into practice with a PGA professional at your side.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT / GET HERE ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-900 border-t border-forest-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="reveal">
              <SectionLabel>Get In Touch</SectionLabel>
              <h2 className="font-display text-3xl text-cream-50 font-semibold mb-8 leading-snug">
                Questions? Reach out directly.
              </h2>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: 'Uphall Golf Club, West Lothian', href: null },
                  { icon: Phone, label: 'Phone', value: '01506 856404', href: 'tel:01506856404' },
                  { icon: Mail, label: 'Email', value: 'Sam@samcraigongolf.com', href: 'mailto:Sam@samcraigongolf.com' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-gold-400" />
                    </div>
                    <div>
                      <p className="text-cream-400 text-xs font-body font-medium tracking-wide uppercase mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-cream-200 text-base font-body hover:text-cream-50 transition-colors duration-200">{value}</a>
                      ) : (
                        <p className="text-cream-200 text-base font-body">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="reveal">
              <div className="rounded-xl overflow-hidden bg-forest-800/50 border border-forest-700/30 h-80 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gold-400 mx-auto mb-3" />
                  <p className="text-cream-300 text-sm font-body mb-1">Uphall Golf Club</p>
                  <p className="text-cream-400 text-xs font-body">West Lothian, Scotland</p>
                  <a
                    href="https://maps.google.com/?q=Uphall+Golf+Club+West+Lothian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-gold-400 text-xs font-semibold font-body uppercase tracking-wide hover:text-gold-300 transition-colors duration-200"
                  >
                    Open in Maps <ExternalLink size={12} />
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

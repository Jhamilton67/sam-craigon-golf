import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, SectionLabel } from '../components/ui';
import { ArrowRight, Award, Users, TrendingUp } from 'lucide-react';

export default function About() {
  useScrollReveal();

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 bg-forest-950 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-25"
          style={{ backgroundImage: "url('https://picsum.photos/seed/samgolf/800/900')", backgroundSize: 'cover', backgroundPosition: 'center top' }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-transparent to-forest-950" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-950 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 md:pb-32">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5 animate-fade-in opacity-0-start">
              <div className="w-10 h-px bg-gold-400" />
              <span className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400">
                About Sam
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-cream-50 font-semibold leading-tight animate-fade-up opacity-0-start delay-100">
              PGA Professional.<br />
              <em className="text-gold-400 not-italic">Real results.</em>
            </h1>
          </div>
        </div>
      </section>

      {/* ── BIO ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
            {/* Photo */}
            <div className="lg:col-span-2 reveal">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://picsum.photos/seed/coach/600/750"
                  alt="Sam Craigon, PGA Professional at Uphall Golf Club"
                  className="w-full h-80 lg:h-auto object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-950/80 to-transparent p-6">
                  <p className="font-display text-xl text-cream-50 font-semibold">Sam Craigon</p>
                  <p className="text-gold-400 text-xs font-body font-semibold tracking-widest uppercase mt-0.5">PGA Professional</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { icon: Award, label: 'PGA Qualified' },
                  { icon: Users, label: 'All Abilities' },
                  { icon: TrendingUp, label: 'TrackMan Studio' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="bg-forest-800/50 border border-forest-700/30 rounded-lg p-3 text-center">
                    <Icon size={16} className="text-gold-400 mx-auto mb-1.5" />
                    <p className="text-cream-300 text-[10px] font-body font-medium">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Copy */}
            <div className="lg:col-span-3 reveal">
              <SectionLabel>About Sam</SectionLabel>
              <div className="space-y-5 text-cream-300 text-base font-body leading-relaxed">
                <p>
                  I'm Sam Craigon, a PGA professional based at Uphall Golf Club, where I deliver high-quality coaching using a fully equipped TrackMan performance studio.
                </p>
                <p>
                  My coaching journey includes time at Warrington Golf Club, where I built a strong reputation for helping golfers of all abilities make real, lasting improvements. That experience — working with beginners, high-handicappers, and competitive club players — shaped the way I coach: clear, direct feedback, backed by data, with a focus on changes that hold up when you get to the course.
                </p>
                <p>
                  I focus on simple coaching supported by advanced performance data, ensuring every player understands not just <em>how</em> they're improving, but <em>why</em>. That understanding is what makes the difference between a lesson that fades after two rounds and a change that lowers your handicap for good.
                </p>
                <p>
                  Alongside coaching, I stock and fit all major golf brands, providing a complete service that covers lessons, custom fitting, and expert equipment advice in one place. Whether you're new to the game or looking to take your golf to the next level, my aim is always the same: honest feedback, proven methods, and results you can trust.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <GoldButton to="/book">
                  Book a Lesson <ArrowRight size={16} />
                </GoldButton>
                <GoldButton to="/fitting" className="bg-transparent border border-gold-400/40 text-gold-400 hover:bg-gold-400/10 hover:text-gold-300 hover:shadow-none">
                  Custom Fitting
                </GoldButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-900 border-t border-forest-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-12">
            <SectionLabel>How I Coach</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold max-w-lg leading-snug">
              The principles behind every session.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Honest feedback',
                body: "You'll always know exactly where your game stands and what you need to work on. No flattery, no ambiguity — just clear, direct assessment that helps you improve.",
              },
              {
                title: 'Proven methods',
                body: 'Data-led coaching doesn\'t mean robot coaching. The numbers inform the plan; the plan is built around how you actually swing, not a textbook template.',
              },
              {
                title: 'Results you can trust',
                body: 'Improvement measured in handicap strokes, not feel-good moments on the range. Every session builds toward a game that holds up under pressure.',
              },
            ].map(({ title, body }, i) => (
              <div
                key={title}
                className="reveal bg-forest-800/40 border border-forest-700/30 rounded-lg p-8"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-px bg-gold-400 mb-5" />
                <h3 className="font-display text-xl text-cream-50 font-semibold mb-3">{title}</h3>
                <p className="text-cream-400 text-sm font-body leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

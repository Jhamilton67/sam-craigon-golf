import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel } from '../components/ui';
import { ArrowRight } from 'lucide-react';

const credentials = [
  { k: 'Qualification', v: 'PGA Professional' },
  { k: 'Based at', v: 'Uphall Golf Club' },
  { k: 'Technology', v: 'TrackMan Studio' },
  { k: 'Works with', v: 'All abilities' },
];

const principles = [
  { title: 'Honest feedback', body: 'You will always know exactly where your game stands and what to work on. No flattery, no ambiguity — just clear assessment that helps you improve.' },
  { title: 'Proven methods', body: 'Data-led coaching does not mean robotic coaching. The numbers inform the plan; the plan is built around how you actually swing.' },
  { title: 'Results you can trust', body: 'Improvement measured in handicap strokes, not feel-good moments on the range. Every session builds a game that holds up under pressure.' },
];

export default function About() {
  useScrollReveal();

  return (
    <div>
      {/* ── EDITORIAL PROFILE (deep fairway) ─────────────────── */}
      <section className="bg-fairway-deep pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="mb-10">
            <SectionLabel>About Sam</SectionLabel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            {/* Large photo */}
            <div className="lg:col-span-5 reveal">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-fairway-light/50">
                <img
                  src="/images/sam-portrait.png"
                  alt="Sam Craigon, PGA Professional at Uphall Golf Club"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Pull-quote intro */}
            <div className="lg:col-span-7 reveal">
              <p className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light mb-6">
                Sam Craigon · PGA Professional
              </p>
              <p className="font-display text-2xl md:text-4xl lg:text-[2.75rem] text-bone font-medium leading-[1.12] tracking-tight text-balance">
                “I coach simple. The data tells us <span className="italic text-brass-light">why</span> a
                change works — so it holds up long after the lesson ends.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIO (ivory) ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 reveal">
              <div className="space-y-5 text-ink-soft text-base md:text-lg font-body leading-relaxed">
                <p>
                  I am Sam Craigon, a PGA professional based at Uphall Golf Club,
                  where I deliver high-quality coaching using a fully equipped
                  TrackMan performance studio.
                </p>
                <p>
                  My coaching journey includes time at Warrington Golf Club, where
                  I built a strong reputation for helping golfers of all abilities
                  make real, lasting improvements. Working with beginners,
                  high-handicappers, and competitive club players shaped the way I
                  coach: clear, direct feedback, backed by data, focused on changes
                  that hold up when you get to the course.
                </p>
                <p>
                  I focus on simple coaching supported by advanced performance
                  data, so every player understands not just <em>how</em> they are
                  improving, but <em>why</em>. That understanding is the difference
                  between a lesson that fades after two rounds and a change that
                  lowers your handicap for good.
                </p>
                <p>
                  Alongside coaching, I stock and fit all major golf brands —
                  lessons, custom fitting, and expert equipment advice in one
                  place. Whether you are new to the game or chasing your next
                  level, the aim is always the same: honest feedback, proven
                  methods, and results you can trust.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <GoldButton to="/book">
                  Book a lesson <ArrowRight size={16} />
                </GoldButton>
                <GhostButton to="/fitting" tone="light">Custom fitting</GhostButton>
              </div>
            </div>

            {/* Credentials — instrument readout style */}
            <div className="lg:col-span-5 reveal">
              <div className="rounded-2xl border border-ink/10 bg-ivory-dark/50 overflow-hidden">
                {credentials.map(({ k, v }, i) => (
                  <div
                    key={k}
                    className={`flex items-center justify-between px-6 py-5 ${
                      i < credentials.length - 1 ? 'border-b border-ink/10' : ''
                    }`}
                  >
                    <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-ink-mute">
                      {k}
                    </span>
                    <span className="font-mono text-sm font-medium text-ink">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES (dark) ────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-12 max-w-lg">
            <SectionLabel>How I coach</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-bone font-semibold tracking-tight leading-[1.08]">
              The principles behind every session.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map(({ title, body }, i) => (
              <div key={title} className="reveal border-t border-fairway-light/50 pt-6" style={{ transitionDelay: `${i * 100}ms` }}>
                <h3 className="font-display text-xl text-bone font-semibold mb-3">{title}</h3>
                <p className="text-bone-soft text-sm font-body leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

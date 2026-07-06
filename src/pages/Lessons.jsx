import { CircleCheck as CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel, PageHero } from '../components/ui';

const heroStats = [
  { label: 'Club Path', value: 2.1, unit: '°', decimals: 1 },
  { label: 'Face Angle', value: 0.8, unit: '°', decimals: 1 },
  { label: 'Launch', value: 14.2, unit: '°', decimals: 1 },
  { label: 'Carry', value: 172, unit: 'yds', decimals: 0 },
];

const studioFeatures = [
  'TrackMan data on every shot — ball flight, club path, face angle, spin',
  'Video swing analysis reviewed with your coach in real time',
  'Targeted drills designed around your specific data',
  'Accurate feedback regardless of weather or season',
  'Track improvement across sessions with saved data history',
];

const courseFeatures = [
  'Real playing situations, not range habits',
  'Course management and shot selection under pressure',
  'Reading lies and adjusting for wind and conditions',
  'Club choice strategy to fit your game, not a textbook',
  'Turning good practice into lower scores on the card',
];

export default function Lessons() {
  useScrollReveal();

  return (
    <div>
      <PageHero
        label="Golf Lessons"
        title="Coaching that changes how you play."
        subtitle="Whether you are new to the game or shooting scratch, every lesson is built around your swing — backed by data, driven by results."
        cta="/book"
        ctaLabel="Book a Lesson"
        stats={heroStats}
      />

      {/* ── INTRO (ivory) ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="max-w-3xl reveal">
            <SectionLabel tone="light">The approach</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold mb-6 leading-[1.08] tracking-tight text-balance">
              Simple coaching. Advanced data. Real results.
            </h2>
            <p className="text-ink-soft text-base md:text-lg font-body leading-relaxed">
              Every session focuses on what matters: grip, stance, swing
              mechanics, short game, and course strategy — tailored to your
              ability level. Sam uses alignment sticks, targeted drills, video
              analysis, and TrackMan to make improvements that stick, not just
              feel good on the day.
            </p>
          </div>
        </div>
      </section>

      {/* ── LESSON TYPES (dark) ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10 space-y-6">
          {/* Indoor Studio */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-fairway-light/50">
            <div
              className="h-64 lg:h-auto min-h-[18rem] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/studio.png')" }}
              role="img"
              aria-label="Indoor TrackMan golf studio"
            />
            <div className="bg-fairway-deep/60 p-9 lg:p-12">
              <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light">
                Indoor
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-bone font-semibold mt-4 mb-4 tracking-tight">
                Indoor Studio Lesson
              </h3>
              <p className="text-bone-soft text-sm font-body leading-relaxed mb-7">
                Sam's TrackMan performance studio gives you data-driven coaching
                year-round. Every swing is captured — ball flight, club path,
                face angle, launch, spin, carry — so you understand exactly what
                is happening and why it is changing.
              </p>
              <ul className="space-y-3 mb-8">
                {studioFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-brass mt-0.5 shrink-0" />
                    <span className="text-bone-soft text-sm font-body">{f}</span>
                  </li>
                ))}
              </ul>
              <GoldButton to="/book">
                Book studio lesson <ArrowRight size={16} />
              </GoldButton>
            </div>
          </div>

          {/* On-Course */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-fairway-light/50">
            <div className="bg-fairway-deep/60 p-9 lg:p-12 order-2 lg:order-1">
              <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light">
                On course
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-bone font-semibold mt-4 mb-4 tracking-tight">
                On-Course Lesson
              </h3>
              <p className="text-bone-soft text-sm font-body leading-relaxed mb-7">
                Studio numbers only take you so far. On-course sessions put you
                in real playing situations — course management, shot selection
                under pressure, reading lies, adjusting for wind. This is where
                good practice becomes lower scores.
              </p>
              <ul className="space-y-3 mb-8">
                {courseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-brass mt-0.5 shrink-0" />
                    <span className="text-bone-soft text-sm font-body">{f}</span>
                  </li>
                ))}
              </ul>
              <GoldButton to="/book">
                Book on-course lesson <ArrowRight size={16} />
              </GoldButton>
            </div>
            <div
              className="h-64 lg:h-auto min-h-[18rem] bg-cover bg-center order-1 lg:order-2"
              style={{ backgroundImage: "url('/images/course.png')" }}
              role="img"
              aria-label="Parkland golf course at Uphall"
            />
          </div>
        </div>
      </section>

      {/* ── CTA (ivory) ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center reveal">
          <h2 className="font-display text-3xl md:text-4xl text-ink font-semibold mb-4 tracking-tight text-balance">
            Not sure which lesson is right for you?
          </h2>
          <p className="text-ink-soft text-base font-body max-w-md mx-auto mb-8">
            Get in touch and Sam will help you decide the best starting point
            for your game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton to="/book">
              Book now <ArrowRight size={16} />
            </GoldButton>
            <GhostButton href="mailto:Sam@samcraigongolf.com" tone="light">
              Email Sam
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

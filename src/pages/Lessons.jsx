import { Monitor, Map, CircleCheck as CheckCircle, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, GhostButton, SectionLabel, PageHero } from '../components/ui';

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
        subtitle="Whether you're new to the game or shooting scratch, every lesson is built around your swing — backed by data, driven by results."
        cta="/book"
        ctaLabel="Book a Lesson"
        bgImage="https://picsum.photos/seed/golfer/1600/800"
      />

      {/* ── INTRO ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl reveal">
            <SectionLabel>The Approach</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold mb-6 leading-snug">
              Simple coaching. Advanced data. Real results.
            </h2>
            <p className="text-cream-300 text-base md:text-lg font-body leading-relaxed">
              Every session focuses on what matters: grip, stance, swing mechanics, short game, and course strategy — tailored to your ability level. Sam uses alignment sticks, targeted drills, video swing analysis, and TrackMan to make improvements that stick, not just feel good on the day.
            </p>
          </div>
        </div>
      </section>

      {/* ── LESSON TYPES ────────────────────────────────────── */}
      <section className="pb-24 md:pb-32 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-6">

          {/* Indoor Studio */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-forest-700/40">
            <div
              className="h-64 lg:h-auto bg-cover bg-center"
              style={{ backgroundImage: "url('https://picsum.photos/seed/trackman/800/600')" }}
            >
              <div className="h-full bg-forest-950/30" />
            </div>
            <div className="bg-forest-800/60 p-10 lg:p-12">
              <div className="w-10 h-10 rounded-md bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-6">
                <Monitor size={18} className="text-gold-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-cream-50 font-semibold mb-3">
                Indoor Studio Lesson
              </h3>
              <p className="text-cream-400 text-sm font-body leading-relaxed mb-6">
                Sam's TrackMan performance studio gives you high-tech, data-driven coaching year-round. Every swing is captured — ball flight, club path, face angle, launch angle, spin rate, carry distance — so you understand exactly what's happening and why it's changing.
              </p>
              <ul className="space-y-3 mb-8">
                {studioFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    <span className="text-cream-300 text-sm font-body">{f}</span>
                  </li>
                ))}
              </ul>
              <GoldButton to="/book">
                Book Studio Lesson <ArrowRight size={16} />
              </GoldButton>
            </div>
          </div>

          {/* On-Course */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-forest-700/40">
            <div className="bg-forest-800/60 p-10 lg:p-12 order-2 lg:order-1">
              <div className="w-10 h-10 rounded-md bg-gold-400/10 border border-gold-400/20 flex items-center justify-center mb-6">
                <Map size={18} className="text-gold-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-cream-50 font-semibold mb-3">
                On-Course Lesson
              </h3>
              <p className="text-cream-400 text-sm font-body leading-relaxed mb-6">
                Studio numbers only take you so far. On-course sessions put you in real playing situations — navigating course management, shot selection under pressure, reading lies, adjusting for wind. This is where good practice becomes lower scores.
              </p>
              <ul className="space-y-3 mb-8">
                {courseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    <span className="text-cream-300 text-sm font-body">{f}</span>
                  </li>
                ))}
              </ul>
              <GoldButton to="/book">
                Book On-Course Lesson <ArrowRight size={16} />
              </GoldButton>
            </div>
            <div
              className="h-64 lg:h-auto bg-cover bg-center order-1 lg:order-2"
              style={{ backgroundImage: "url('https://picsum.photos/seed/oncourse/800/600')" }}
            >
              <div className="h-full bg-forest-950/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-forest-900 border-t border-forest-800/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center reveal">
          <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold mb-4">
            Not sure which lesson type is right for you?
          </h2>
          <p className="text-cream-400 text-base font-body max-w-md mx-auto mb-8">
            Get in touch and Sam will help you decide the best starting point for your game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldButton to="/book">
              Book Now <ArrowRight size={16} />
            </GoldButton>
            <GhostButton href="mailto:Sam@samcraigongolf.com">
              Email Sam
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}

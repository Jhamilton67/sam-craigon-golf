import { ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, SectionLabel, PageHero } from '../components/ui';

const heroStats = [
  { label: 'Ball Speed', value: 154.6, unit: 'mph', decimals: 1 },
  { label: 'Spin', value: 2410, unit: 'rpm', decimals: 0 },
  { label: 'Smash', value: 1.48, unit: 'factor', decimals: 2 },
  { label: 'Carry', value: 261, unit: 'yds', decimals: 0 },
];

const dataPoints = [
  { label: 'Club Path', desc: 'Inside-out, outside-in, or straight — measured to the degree.' },
  { label: 'Face Angle', desc: 'Where the face points at impact — the primary driver of start direction.' },
  { label: 'Launch Angle', desc: 'Optimise carry and distance with the correct launch for your speed.' },
  { label: 'Spin Rate', desc: 'Too much or too little spin costs distance. We find the sweet spot.' },
  { label: 'Ball Speed', desc: 'A direct measure of energy transfer — higher is better. We chase it.' },
  { label: 'Carry Distance', desc: 'Real carry numbers for every club in the bag, no estimates.' },
  { label: 'Dispersion', desc: 'Tighter dispersion means more fairways and more greens.' },
  { label: 'Dynamic Loft', desc: 'The loft the club presents at impact — critical for shaft fitting.' },
];

const fittingAreas = [
  { kicker: 'Shaft', label: 'Flex, profile, weight, and material matched to your tempo.' },
  { kicker: 'Head', label: 'Loft, lie angle, sole grind, and face technology dialled in.' },
  { kicker: 'Ball', label: 'Compression, spin profile, and cover hardness for your game.' },
];

export default function Fitting() {
  useScrollReveal();

  return (
    <div>
      <PageHero
        label="Custom Fitting"
        title="Equipment fitted to your swing. Not someone else's."
        subtitle="No two golfers swing the same. TrackMan fitting removes the guesswork and gives you hard numbers to shop from."
        cta="/book"
        ctaLabel="Book a Fitting"
        stats={heroStats}
      />

      {/* ── PITCH (ivory) ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
            <div className="reveal">
              <SectionLabel tone="light">Why fitting matters</SectionLabel>
              <h2 className="font-display text-3xl md:text-[2.75rem] text-ink font-semibold leading-[1.08] tracking-tight mb-6 text-balance">
                The right equipment is a performance upgrade, not a marketing line.
              </h2>
              <p className="text-ink-soft text-base font-body leading-relaxed mb-4">
                Most golfers play clubs that do not suit their swing. Wrong shaft
                flex, incorrect loft and lie, a grip that fights their hands. The
                result is compensations, inconsistency, and distance left on the
                table.
              </p>
              <p className="text-ink-soft text-base font-body leading-relaxed mb-8">
                A TrackMan fitting measures precisely how you hit the ball and
                identifies the exact specs that will improve distance, accuracy,
                and consistency for <em>your</em> swing.
              </p>
              <GoldButton to="/book">
                Book a fitting <ArrowRight size={16} />
              </GoldButton>
            </div>

            <div
              className="reveal rounded-2xl overflow-hidden h-64 md:h-[26rem] bg-cover bg-center border border-ink/10"
              style={{ backgroundImage: "url('/images/fitting.png')" }}
              role="img"
              aria-label="Premium golf club heads laid out for a custom fitting"
            />
          </div>
        </div>
      </section>

      {/* ── DATA CAPTURED (dark) ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-fairway">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-14 max-w-xl">
            <SectionLabel>TrackMan data</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-bone font-semibold leading-[1.08] tracking-tight">
              Every number that matters. Captured on every swing.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-fairway-light/40 rounded-xl overflow-hidden border border-fairway-light/40">
            {dataPoints.map(({ label, desc }) => (
              <div
                key={label}
                className="reveal bg-fairway p-6 hover:bg-fairway-deep/60 transition-colors duration-300"
              >
                <h4 className="font-mono text-xs font-medium tracking-widest uppercase text-brass-light mb-3">
                  {label}
                </h4>
                <p className="text-bone-soft text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FITTING AREAS + CTA (ivory) ──────────────────────── */}
      <section className="py-20 md:py-28 bg-ivory">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="reveal mb-12">
            <SectionLabel tone="light">What we optimise</SectionLabel>
            <h2 className="font-display text-3xl md:text-5xl text-ink font-semibold leading-[1.08] tracking-tight">
              Shaft. Head. Ball. Everything.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {fittingAreas.map(({ kicker, label }) => (
              <div key={kicker} className="reveal bg-ivory-dark/60 border border-ink/10 rounded-xl p-7">
                <span className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-dark">
                  {kicker}
                </span>
                <p className="text-ink-soft text-sm font-body leading-relaxed mt-3">{label}</p>
              </div>
            ))}
          </div>

          <div className="reveal bg-fairway rounded-2xl p-7 sm:p-9 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-bone font-semibold mb-4 tracking-tight">
                  Ready to change your game?
                </h3>
                <p className="text-bone-soft text-base font-body leading-relaxed mb-6">
                  Book a TrackMan fitting and leave with a spec sheet — not just
                  a feeling.
                </p>
                <GoldButton to="/book">
                  Book a fitting <ArrowRight size={16} />
                </GoldButton>
              </div>
              <ul className="space-y-3">
                {[
                  'All major brands fitted on-site',
                  'Irons, woods, wedges, and putter fitting available',
                  'Ball fitting included where relevant',
                  'No obligation to purchase — the data is yours to keep',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={15} className="text-brass mt-0.5 shrink-0" />
                    <span className="text-bone-soft text-sm font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

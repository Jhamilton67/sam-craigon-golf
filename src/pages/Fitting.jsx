import { ChartBar as BarChart3, Crosshair, FileSliders as Sliders, ArrowRight, CircleCheck as CheckCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GoldButton, SectionLabel, PageHero } from '../components/ui';

const dataPoints = [
  { label: 'Club Path', desc: 'Inside-out, outside-in, or straight — measured to the degree.' },
  { label: 'Face Angle', desc: 'Where the face is pointing at impact, the primary driver of start direction.' },
  { label: 'Launch Angle', desc: 'Optimise carry and distance with the correct launch for your swing speed.' },
  { label: 'Spin Rate', desc: 'Too much or too little spin costs you distance. We find the sweet spot.' },
  { label: 'Ball Speed', desc: 'Direct measure of energy transfer — higher is better. We chase it.' },
  { label: 'Carry Distance', desc: 'Real carry numbers for every club in the bag, no estimates.' },
  { label: 'Dispersion', desc: 'How consistent are you? Tighter dispersion = more fairways and greens.' },
  { label: 'Dynamic Loft', desc: 'The loft the club presents at impact — critical for shaft fitting.' },
];

const fittingAreas = [
  { icon: Crosshair, label: 'Shaft selection — flex, profile, weight, material' },
  { icon: Sliders, label: 'Head design — loft, lie angle, sole grind, face technology' },
  { icon: BarChart3, label: 'Ball fitting — compression, spin profile, cover hardness' },
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
        bgImage="https://picsum.photos/seed/clubfitting/1600/800"
      />

      {/* ── PITCH ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <SectionLabel>Why Fitting Matters</SectionLabel>
              <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold leading-snug mb-6">
                The right equipment is a performance upgrade, not a marketing line.
              </h2>
              <p className="text-cream-300 text-base font-body leading-relaxed mb-4">
                Most golfers are playing clubs that don't suit their swing. Wrong shaft flex, incorrect loft and lie, grip size that fights their hands. The result is compensations, inconsistency, and distance left on the table.
              </p>
              <p className="text-cream-300 text-base font-body leading-relaxed mb-8">
                A TrackMan custom fitting session measures precisely how you hit the ball and identifies the exact specifications that will improve distance, accuracy, and consistency for <em>your</em> swing.
              </p>
              <GoldButton to="/book">
                Book a Fitting <ArrowRight size={16} />
              </GoldButton>
            </div>

            <div
              className="reveal rounded-xl overflow-hidden h-80 lg:h-96 bg-cover bg-center border border-forest-700/40"
              style={{ backgroundImage: "url('https://picsum.photos/seed/golflab/800/600')" }}
            >
              <div className="h-full bg-forest-950/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── DATA CAPTURED ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionLabel>TrackMan Data</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold leading-snug max-w-xl">
              Every number that matters. Captured on every swing.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataPoints.map(({ label, desc }, i) => (
              <div
                key={label}
                className="reveal bg-forest-800/50 border border-forest-700/30 rounded-lg p-6 hover:border-gold-400/30 hover:bg-forest-800/70 transition-all duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <h4 className="font-display text-lg text-gold-400 font-semibold mb-2">{label}</h4>
                <p className="text-cream-400 text-sm font-body leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FITTING AREAS ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-forest-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-14">
            <SectionLabel>What We Optimise</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50 font-semibold leading-snug">
              Shaft. Head. Ball. Everything.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {fittingAreas.map(({ icon: Icon, label }) => (
              <div key={label} className="reveal flex items-center gap-4 bg-forest-800/40 border border-forest-700/30 rounded-lg p-6">
                <div className="w-10 h-10 rounded-md bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-gold-400" />
                </div>
                <p className="text-cream-200 text-sm font-body">{label}</p>
              </div>
            ))}
          </div>

          <div className="reveal bg-forest-800/40 border border-gold-400/20 rounded-xl p-10 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl text-cream-50 font-semibold mb-4">
                  Ready to change your game?
                </h3>
                <p className="text-cream-400 text-base font-body leading-relaxed mb-6">
                  Book a TrackMan custom fitting session and leave with a spec sheet — not just a feeling.
                </p>
                <GoldButton to="/book">
                  Book a Fitting <ArrowRight size={16} />
                </GoldButton>
              </div>
              <ul className="space-y-3">
                {[
                  'All major brands fitted on-site',
                  'Irons, woods, wedges, and putter fitting available',
                  'Ball fitting included where relevant',
                  'No obligation to purchase — data is yours to keep',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    <span className="text-cream-300 text-sm font-body">{item}</span>
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

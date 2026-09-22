import SEO from '../components/SEO';
import { SectionLabel } from '../components/ui';

const sections = [
  {
    heading: '1. Acceptance of terms',
    body: (
      <p>
        By using this website, you agree to these terms. If you do not agree,
        please do not use the site. These terms apply to your use of the
        website only, not to any separate contract or agreement you enter
        into with Sam Craigon Golf for coaching, fitting, or membership
        services, which will be agreed directly.
      </p>
    ),
  },
  {
    heading: '2. Use of this website',
    body: (
      <p>
        This website is provided for general information about our coaching,
        custom fitting, and studio membership services at Uphall Golf Club.
        You may not use it in any way that causes damage to the site or
        impairs its availability, or in any way that is unlawful or
        fraudulent.
      </p>
    ),
  },
  {
    heading: '3. Bookings and enquiries',
    body: (
      <p>
        Enquiries and bookings made through this site (by phone, email, or
        our online booking calendar) are not confirmed until acknowledged
        directly by Sam Craigon Golf. Pricing shown on this site is indicative
        and may change; the price confirmed at the time of booking applies.
      </p>
    ),
  },
  {
    heading: '4. Intellectual property',
    body: (
      <p>
        All content on this site — text, images, and the Sam Craigon Golf
        name and branding — belongs to Sam Craigon Golf unless otherwise
        stated, and may not be copied or reused without permission.
      </p>
    ),
  },
  {
    heading: '5. Third-party links and services',
    body: (
      <p>
        This site links to third-party services, including Uphall Golf Club's
        tee-time booking system and, where enabled, Calendly for session
        booking. We are not responsible for the content or practices of
        third-party sites.
      </p>
    ),
  },
  {
    heading: '6. Liability',
    body: (
      <p>
        This website is provided "as is" without warranties of any kind. We
        aren't liable for any loss or damage arising from your use of this
        site, to the fullest extent permitted by law.
      </p>
    ),
  },
  {
    heading: '7. Governing law',
    body: (
      <p>
        These terms are governed by the law of Scotland, and any disputes
        will be handled by the Scottish courts.
      </p>
    ),
  },
  {
    heading: '8. Changes to these terms',
    body: (
      <p>
        We may update these terms from time to time. The current version will
        always be available on this page.
      </p>
    ),
  },
  {
    heading: '9. Contact',
    body: (
      <p>
        Questions about these terms can be sent to{' '}
        <a href="mailto:Sam@samcraigongolf.com" className="text-brass-dark underline">
          Sam@samcraigongolf.com
        </a>{' '}
        or 01506 856404.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <div>
      <SEO
        title="Terms of Use"
        description="Terms of use for the Sam Craigon Golf website."
        path="/terms"
      />
      <section className="bg-fairway-deep pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl text-bone font-semibold tracking-tight">
            Terms of Use
          </h1>
          <p className="mt-4 text-bone-mute text-sm font-mono uppercase tracking-widest">
            Last updated September 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="space-y-10">
            {sections.map(({ heading, body }) => (
              <div key={heading}>
                <h2 className="font-display text-xl md:text-2xl text-ink font-semibold mb-3">
                  {heading}
                </h2>
                <div className="text-ink-soft text-sm md:text-base font-body leading-relaxed">
                  {body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

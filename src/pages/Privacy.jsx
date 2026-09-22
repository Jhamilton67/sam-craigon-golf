import SEO from '../components/SEO';
import { SectionLabel } from '../components/ui';
import { reopenCookieBanner } from '../components/CookieConsent';

const sections = [
  {
    heading: '1. Who we are',
    body: (
      <>
        <p>
          This website is operated by Sam Craigon Golf, based at Uphall Golf
          Club, West Lothian, Scotland. For any question about this policy or
          your data, contact{' '}
          <a href="mailto:Sam@samcraigongolf.com" className="text-brass-dark underline">
            Sam@samcraigongolf.com
          </a>{' '}
          or 01506 856404.
        </p>
      </>
    ),
  },
  {
    heading: '2. Information you give us',
    body: (
      <p>
        We collect information you provide directly, such as your name, email
        address and phone number when you contact us or book a session by
        phone, email, or through our online booking calendar. We use this only
        to respond to your enquiry and to deliver the coaching, fitting, or
        membership services you've booked.
      </p>
    ),
  },
  {
    heading: '3. Cookies and tracking technologies',
    body: (
      <>
        <p className="mb-4">
          When you first visit this site, you're asked to accept or reject
          non-essential cookies. Your choice is remembered on this device.
          You can change it at any time using the link below.
        </p>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-ink mb-1">Strictly necessary — always active</p>
            <p>
              Google reCAPTCHA runs on this site regardless of your cookie
              choice, to protect our forms from spam and abuse. It is provided
              by Google and is not used to track you across other websites.
            </p>
          </div>
          <div>
            <p className="font-semibold text-ink mb-1">Analytics — only with consent</p>
            <p>
              If you accept cookies, we use Google Analytics and Microsoft
              Clarity to understand how visitors use the site (pages viewed,
              time on site, and general behaviour such as scrolling and
              clicks) so we can improve it. These do not run unless you
              accept.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    heading: '4. Third-party services',
    body: (
      <p>
        We use trusted third parties to run parts of this site: Google
        (Analytics and reCAPTCHA), Microsoft (Clarity), and Calendly (online
        booking, where enabled). Each of these providers processes data
        under their own privacy policy in addition to this one.
      </p>
    ),
  },
  {
    heading: '5. Your rights',
    body: (
      <p>
        Under UK GDPR, you have the right to access, correct, or delete
        personal data we hold about you, to object to or restrict how it's
        used, and to request a copy of it. To exercise any of these rights,
        contact us using the details above. You also have the right to
        complain to the Information Commissioner's Office (ico.org.uk) if you
        believe your data has been mishandled.
      </p>
    ),
  },
  {
    heading: '6. Data retention',
    body: (
      <p>
        We keep enquiry and booking information only for as long as needed to
        provide our services and meet any legal or accounting obligations,
        after which it is deleted.
      </p>
    ),
  },
  {
    heading: '7. Changes to this policy',
    body: (
      <p>
        We may update this policy from time to time. The current version will
        always be available on this page.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <div>
      <SEO
        title="Privacy Policy"
        description="How Sam Craigon Golf collects, uses, and protects your data, and how we use cookies and tracking technologies on this site."
        path="/privacy-policy"
      />
      <section className="bg-fairway-deep pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-display text-4xl sm:text-5xl text-bone font-semibold tracking-tight">
            Privacy Policy
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

          <div className="mt-12 pt-8 border-t border-ink/10">
            <button
              onClick={reopenCookieBanner}
              className="text-brass-dark text-sm font-semibold font-body underline hover:text-brass transition-colors duration-200"
            >
              Manage cookie preferences
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

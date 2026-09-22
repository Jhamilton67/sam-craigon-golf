import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { reopenCookieBanner } from './CookieConsent';

const footerLinks = [
  { heading: 'Services', links: [
    { to: '/lessons',    label: 'Golf Lessons' },
    { to: '/fitting',    label: 'Custom Fitting' },
    { to: '/membership', label: 'Studio Membership' },
    { to: '/book',       label: 'Book a Lesson' },
  ]},
  { heading: 'About', links: [
    { to: '/about',    label: 'About Sam' },
    { to: '/location', label: 'Our Location' },
  ]},
];

export default function Footer() {
  return (
    <footer className="bg-fairway-deep border-t border-fairway-light/40">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/scg-logo-on-dark.png"
                alt="Sam Craigon Golf"
                width="726"
                height="431"
                className="h-10 w-auto mb-2"
              />
              <span className="block font-mono text-[10px] tracking-mega uppercase text-brass-light font-medium">
                Golf · PGA Professional
              </span>
            </Link>
            <p className="text-bone-mute text-sm font-body leading-relaxed max-w-xs">
              PGA-qualified coaching, TrackMan custom fitting, and year-round studio access at Uphall Golf Club.
            </p>
          </div>

          {/* Nav columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light mb-4">
                {heading}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-bone-soft text-sm font-body hover:text-bone transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brass mt-0.5 shrink-0" />
                <span className="text-bone-soft text-sm font-body leading-relaxed">
                  Uphall Golf Club<br />182 Station Road, Uphall<br />Broxburn, EH52 6JT
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-brass shrink-0" />
                <a
                  href="tel:01506856404"
                  className="text-bone-soft text-sm font-body hover:text-bone transition-colors duration-200"
                >
                  01506 856404
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-brass shrink-0" />
                <a
                  href="mailto:Sam@samcraigongolf.com"
                  className="text-bone-soft text-sm font-body hover:text-bone transition-colors duration-200"
                >
                  Sam@samcraigongolf.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-fairway-light/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-bone-mute text-xs font-body text-center sm:text-left">
            <p>© {new Date().getFullYear()} Sam Craigon Golf. All rights reserved.</p>
            <a
              href="https://www.hamiltontechconsulting.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block underline hover:text-bone-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded transition-colors duration-200"
              aria-label="Hamilton Tech Consulting website - opens in new window"
            >
              Designed by: Hamilton Tech Consulting
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="text-bone-mute text-xs font-body hover:text-bone-soft transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-bone-mute text-xs font-body hover:text-bone-soft transition-colors duration-200">
              Terms of Use
            </Link>
            <button
              onClick={reopenCookieBanner}
              className="text-bone-mute text-xs font-body hover:text-bone-soft transition-colors duration-200"
            >
              Cookie preferences
            </button>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">
            PGA Professional · Uphall Golf Club
          </p>
        </div>
      </div>
    </footer>
  );
}

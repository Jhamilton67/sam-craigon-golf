import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

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
              <span className="block font-display text-xl font-semibold text-bone">
                Sam Craigon
              </span>
              <span className="block font-mono text-[10px] tracking-mega uppercase text-brass-light font-medium mt-1">
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
              <h4 className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light mb-4">
                {heading}
              </h4>
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
            <h4 className="font-mono text-[10px] font-medium tracking-mega uppercase text-brass-light mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brass mt-0.5 shrink-0" />
                <span className="text-bone-soft text-sm font-body leading-relaxed">
                  Uphall Golf Club,<br />West Lothian
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

        <div className="mt-12 pt-6 border-t border-fairway-light/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bone-mute text-xs font-body">
            © {new Date().getFullYear()} Sam Craigon Golf. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">
            PGA Professional · Uphall Golf Club
          </p>
        </div>
      </div>
    </footer>
  );
}

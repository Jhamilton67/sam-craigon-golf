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
    <footer className="bg-forest-950 border-t border-forest-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="block font-display text-xl font-semibold text-cream-50">
                Sam Craigon
              </span>
              <span className="block font-body text-[10px] tracking-widest uppercase text-gold-400 font-medium mt-0.5">
                Golf · PGA Professional
              </span>
            </Link>
            <p className="text-cream-400 text-sm font-body leading-relaxed max-w-xs">
              PGA-qualified coaching, TrackMan custom fitting, and year-round studio access at Uphall Golf Club.
            </p>
          </div>

          {/* Nav columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400 mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-cream-300 text-sm font-body hover:text-cream-50 transition-colors duration-200"
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
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-gold-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-cream-300 text-sm font-body leading-relaxed">
                  Uphall Golf Club,<br />West Lothian
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-gold-400 shrink-0" />
                <a
                  href="tel:01506856404"
                  className="text-cream-300 text-sm font-body hover:text-cream-50 transition-colors duration-200"
                >
                  01506 856404
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <a
                  href="mailto:Sam@samcraigongolf.com"
                  className="text-cream-300 text-sm font-body hover:text-cream-50 transition-colors duration-200"
                >
                  Sam@samcraigongolf.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-forest-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-charcoal-300 text-xs font-body">
            © {new Date().getFullYear()} Sam Craigon Golf. All rights reserved.
          </p>
          <p className="text-charcoal-400 text-xs font-body">
            PGA Professional · Uphall Golf Club
          </p>
        </div>
      </div>
    </footer>
  );
}

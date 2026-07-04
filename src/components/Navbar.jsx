import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/lessons',  label: 'Golf Lessons' },
  { to: '/fitting',  label: 'Custom Fitting' },
  { to: '/membership', label: 'Membership' },
  { to: '/about',    label: 'About' },
  { to: '/location', label: 'Location' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `text-sm font-body font-medium tracking-tight transition-colors duration-200 ${
      isActive ? 'text-brass-light' : 'text-bone-soft hover:text-bone'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-fairway-deep/95 backdrop-blur-md border-b border-fairway-light/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-none group"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-lg md:text-xl font-semibold text-bone tracking-tight group-hover:text-brass-light transition-colors duration-200">
            Sam Craigon
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-mega uppercase text-brass-light font-medium mt-0.5">
            Golf · PGA Professional
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="ml-2 px-5 py-2.5 bg-brass hover:bg-brass-light text-fairway-deep text-sm font-semibold font-body tracking-wide rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-brass/20 active:scale-[0.98]"
          >
            Book a Lesson
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-bone hover:text-brass-light transition-colors duration-200 p-2 -mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } bg-fairway-deep/98 backdrop-blur-md border-t border-fairway-light/30`}
      >
        <nav className="flex flex-col px-6 pt-6 pb-8 gap-5">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-base font-medium font-body transition-colors duration-200 ${
                  isActive ? 'text-brass-light' : 'text-bone hover:text-bone'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/book"
            className="mt-2 w-full text-center px-5 py-3 bg-brass hover:bg-brass-light text-fairway-deep text-sm font-semibold font-body tracking-wide rounded-md transition-all duration-200 active:scale-[0.98]"
            onClick={() => setOpen(false)}
          >
            Book a Lesson
          </Link>
          <div className="mt-4 pt-5 border-t border-fairway-light/40 space-y-2">
            <p className="text-bone-soft text-sm font-body">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">Tel · </span>01506 856404
            </p>
            <p className="text-bone-soft text-sm font-body">
              <span className="font-mono text-[10px] uppercase tracking-widest text-bone-mute">Email · </span>Sam@samcraigongolf.com
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}

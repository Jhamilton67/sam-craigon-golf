import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoredConsent, setStoredConsent, loadTrackingScripts, CONSENT_KEY } from '../lib/tracking';

/* Fired by the Footer's "Cookie preferences" link to reopen this banner. */
export const REOPEN_EVENT = 'scg-reopen-cookie-banner';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === 'accepted') {
      loadTrackingScripts();
    } else if (consent !== 'rejected') {
      setVisible(true);
    }

    const reopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  function accept() {
    setStoredConsent('accepted');
    loadTrackingScripts();
    setVisible(false);
  }

  function reject() {
    setStoredConsent('rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] bg-fairway-deep border-t border-fairway-light/50 px-6 py-6"
    >
      <div className="max-w-content mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <p className="text-bone-soft text-sm font-body leading-relaxed max-w-2xl">
          We use cookies for analytics (Google Analytics, Microsoft Clarity) to
          understand how visitors use this site. These only run if you accept.
          See our{' '}
          <Link to="/privacy-policy" className="underline hover:text-brass-light">
            Privacy Policy
          </Link>{' '}
          for details. Google reCAPTCHA runs regardless of your choice, to keep
          our forms free of spam.
        </p>
        <div className="flex gap-3 shrink-0 w-full md:w-auto">
          <button
            onClick={reject}
            className="flex-1 md:flex-none px-6 py-3 border border-bone/25 hover:border-brass text-bone text-sm font-medium font-body rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="flex-1 md:flex-none px-6 py-3 bg-brass hover:bg-brass-light text-fairway-deep text-sm font-semibold font-body rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export function reopenCookieBanner() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

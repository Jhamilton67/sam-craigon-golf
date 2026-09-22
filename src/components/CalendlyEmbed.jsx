import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

/* Hand-rolled Calendly inline embed — no react-calendly dependency.
   (That package pulls in its own React interop layer that collided with
   Vite's dependency pre-bundling here and threw "Invalid hook call"; this
   does the same two things it would have, with zero dependency risk:

   1. Auto-resize: Calendly's scheduling page posts a `calendly.page_height`
      message as its content grows (picking a date, then a time, then the
      confirmation form) — window-level, works for any iframe pointed at
      Calendly regardless of embed method. We resize the container to
      match instead of a fixed height with an ugly internal scrollbar.
   2. hide_event_type_details / hide_gdpr_banner query params: our page
      already shows the event name/duration/location via the service
      cards, and already has its own cookie banner — Calendly's built-in
      versions of both would just be confusing duplicates.

   onEventScheduled fires a GA4 conversion event when a visitor actually
   books, so real bookings show up as conversions (only if GA4 is loaded,
   i.e. cookies were accepted). */

function buildEmbedUrl(url) {
  const params = new URLSearchParams({
    hide_event_type_details: '1',
    hide_landing_page_details: '1',
    hide_gdpr_banner: '1',
  });
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}

export default function CalendlyEmbed({ url, eventLabel }) {
  const [height, setHeight] = useState(700);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function onMessage(e) {
      if (e.origin !== 'https://calendly.com' || !e.data?.event) return;

      if (e.data.event === 'calendly.page_height') {
        const newHeight = e.data.payload?.height;
        if (newHeight) setHeight(newHeight);
      } else if (e.data.event === 'calendly.event_scheduled') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'schedule', { event_category: 'booking', event_label: eventLabel });
        }
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [eventLabel]);

  useEffect(() => {
    setIsLoading(true);
    setHeight(700);
  }, [url]);

  return (
    <div className="relative" style={{ minHeight: `${height}px` }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <Loader2 size={28} className="text-brass animate-spin" />
        </div>
      )}
      <iframe
        key={url}
        src={buildEmbedUrl(url)}
        title={`Book a ${eventLabel} with Sam Craigon Golf`}
        width="100%"
        height={height}
        style={{ display: 'block', transition: 'height 0.2s ease' }}
        frameBorder="0"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

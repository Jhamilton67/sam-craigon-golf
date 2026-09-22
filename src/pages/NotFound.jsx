import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { GoldButton, SectionLabel } from '../components/ui';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found | Sam Craigon Golf';
    let el = document.head.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex');
    return () => el.remove();
  }, []);

  return (
    <section className="bg-fairway-deep min-h-[70vh] flex items-center pt-32 pb-24">
      <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
        <SectionLabel>404</SectionLabel>
        <h1 className="font-display text-4xl sm:text-5xl text-bone font-semibold tracking-tight mb-4">
          That page isn't on the course.
        </h1>
        <p className="text-bone-soft text-base font-body leading-relaxed mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist. Head back to the homepage
          or book a session with Sam.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GoldButton to="/">Back to homepage</GoldButton>
          <GoldButton to="/book">
            Book a session <ArrowRight size={16} />
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

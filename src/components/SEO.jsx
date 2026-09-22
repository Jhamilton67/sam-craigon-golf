import { useEffect } from 'react';

export const SITE_URL = 'https://samcraigongolf.com';
export const BUSINESS_ID = `${SITE_URL}/#business`;
const SITE_NAME = 'Sam Craigon Golf';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.jpg`;

function setMetaByAttr(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMetaByAttr(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(blocks) {
  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
  blocks.forEach((block, i) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = String(i);
    script.text = JSON.stringify(block);
    document.head.appendChild(script);
  });
}

/* Builds a BreadcrumbList schema from a list of {name, path} crumbs. */
function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/* Sets per-page title, description, keywords, canonical, social preview
   tags, and structured data (breadcrumbs + any page-specific JSON-LD, e.g.
   Service or FAQPage schema). No SSR here, so this runs client-side on
   mount/route change rather than being present in the initial HTML — fine
   for social crawlers that render JS (Facebook/LinkedIn do), and search
   engines execute JS during indexing too. */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  keywords,
  breadcrumb,
  jsonLd = [],
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    setMetaByAttr('name', 'description', description);
    if (keywords) {
      setMetaByAttr('name', 'keywords', keywords);
    } else {
      removeMetaByAttr('name', 'keywords');
    }
    setLink('canonical', url);

    setMetaByAttr('property', 'og:title', fullTitle);
    setMetaByAttr('property', 'og:description', description);
    setMetaByAttr('property', 'og:url', url);
    setMetaByAttr('property', 'og:image', image);
    setMetaByAttr('property', 'og:type', 'website');
    setMetaByAttr('property', 'og:site_name', SITE_NAME);
    setMetaByAttr('property', 'og:locale', 'en_GB');

    setMetaByAttr('name', 'twitter:card', 'summary_large_image');
    setMetaByAttr('name', 'twitter:title', fullTitle);
    setMetaByAttr('name', 'twitter:description', description);
    setMetaByAttr('name', 'twitter:image', image);

    const blocks = [...jsonLd];
    if (breadcrumb) blocks.push(breadcrumbSchema(breadcrumb));
    setJsonLd(blocks);
  }, [title, description, path, image, keywords, JSON.stringify(breadcrumb), JSON.stringify(jsonLd)]);

  return null;
}

import { useEffect, useRef } from 'react';
import { GlobalService, Language } from '../types';

export interface DynamicSEOOptions {
  service: GlobalService | null;
  lang?: Language;
  baseUrl?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Helper to update or create a <meta> tag in document.head
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link rel="canonical"> tag
 */
function setCanonicalLink(href: string) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Helper to update or remove dynamic JSON-LD structured data
 */
function setJsonLdScript(id: string, data: Record<string, any> | null) {
  if (typeof document === 'undefined') return;
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data, null, 2);
}

/**
 * useDynamicSEO: Updates document head with tool/service-specific meta tags,
 * OpenGraph, Twitter cards, and JSON-LD structured data when selectedServiceModal changes.
 */
export function useDynamicSEO({
  service,
  lang = 'ar',
  baseUrl,
  defaultTitle,
  defaultDescription,
}: DynamicSEOOptions) {
  const isArabic = lang === 'ar';
  
  // Store initial meta tags to restore on unmount/closure
  const initialDataRef = useRef<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!initialDataRef.current) {
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      initialDataRef.current = {
        title: document.title,
        description: metaDesc,
      };
    }

    const effectiveBaseUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
    
    // Default site values
    const fallbackTitle = defaultTitle || (isArabic 
      ? 'GServia — بوابتك العالمية إلى خدمات Google والذكاء الاصطناعي'
      : 'GServia — Your Gateway to Google Services & AI Tools'
    );
    
    const fallbackDescription = defaultDescription || (isArabic
      ? 'GServia: منصة وبوابة عالمية مستقلة تساعدك على اكتشاف وتنظيم والوصول إلى كافة خدمات ومنتجات Google الرسمية والذكاء الاصطناعي في شاشة واحدة فائقة السرعة.'
      : 'Discover, organize and access official Google services and cutting-edge AI tools from one powerful, independent global platform.'
    );

    if (service) {
      // 1. Compute dynamic service title & description
      const serviceName = isArabic && service.nameAr ? service.nameAr : service.name;
      const subtitle = isArabic 
        ? `${serviceName} — دليل ومميزات الخدمة والوصول المباشر | GServia`
        : `${service.name} — Review, Features & Direct Access | GServia`;

      const serviceDesc = isArabic 
        ? (service.shortDescriptionAr || service.descriptionAr || service.description || fallbackDescription)
        : (service.shortDescription || service.description || fallbackDescription);

      const serviceUrl = `${effectiveBaseUrl}/#service-${service.slug || service.id}`;
      const serviceImage = service.logoUrl || `${effectiveBaseUrl}/icon-512.svg`;

      // Keywords list
      const keywords = [
        service.name,
        service.nameAr,
        service.categoryId,
        service.subcategoryId,
        ...(service.features || []).slice(0, 4),
        ...(service.featuresAr || []).slice(0, 4),
        'Google Services',
        'GServia',
        'AI Tools',
        'Cloud Applications',
      ].filter(Boolean).join(', ');

      // Update Document Title
      document.title = subtitle;

      // Update Standard Meta
      setMetaTag('name', 'description', serviceDesc);
      setMetaTag('name', 'keywords', keywords);

      // Update OpenGraph
      setMetaTag('property', 'og:title', subtitle);
      setMetaTag('property', 'og:description', serviceDesc);
      setMetaTag('property', 'og:url', serviceUrl);
      setMetaTag('property', 'og:image', serviceImage);
      setMetaTag('property', 'og:type', 'article');

      // Update Twitter Card
      setMetaTag('name', 'twitter:title', subtitle);
      setMetaTag('name', 'twitter:description', serviceDesc);
      setMetaTag('name', 'twitter:image', serviceImage);

      // Update Canonical Link
      setCanonicalLink(serviceUrl);

      // Add SoftwareApplication JSON-LD Structured Data
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: service.name,
        alternateName: service.nameAr || undefined,
        description: serviceDesc,
        applicationCategory: service.categoryId,
        operatingSystem: 'All (Web, Android, iOS, Desktop)',
        url: service.websiteUrl || serviceUrl,
        image: serviceImage,
        offers: {
          '@type': 'Offer',
          price: service.startingPrice ? String(service.startingPrice) : (service.freePlan ? '0' : '0'),
          priceCurrency: service.currency || 'USD',
        },
        aggregateRating: service.rating ? {
          '@type': 'AggregateRating',
          ratingValue: service.rating,
          reviewCount: service.reviewCount || 120,
          bestRating: '5',
          worstRating: '1',
        } : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'GServia Directory',
          url: effectiveBaseUrl,
        },
      };

      setJsonLdScript('gservia-service-jsonld', structuredData);
    } else {
      // Revert to default site metadata
      document.title = fallbackTitle;
      setMetaTag('name', 'description', fallbackDescription);
      setMetaTag('name', 'keywords', 'GServia, Google Services Hub, Google AI, Gemini, Google Search, Gmail, Google Drive, YouTube, Google Cloud, Firebase, Google Workspace, PWA');

      setMetaTag('property', 'og:title', fallbackTitle);
      setMetaTag('property', 'og:description', fallbackDescription);
      setMetaTag('property', 'og:url', effectiveBaseUrl || '/');
      setMetaTag('property', 'og:image', `${effectiveBaseUrl}/icon-512.svg`);
      setMetaTag('property', 'og:type', 'website');

      setMetaTag('name', 'twitter:title', fallbackTitle);
      setMetaTag('name', 'twitter:description', fallbackDescription);
      setMetaTag('name', 'twitter:image', `${effectiveBaseUrl}/icon-512.svg`);

      setCanonicalLink(effectiveBaseUrl || '/');

      // Remove specific service JSON-LD
      setJsonLdScript('gservia-service-jsonld', null);
    }
  }, [service, lang, baseUrl, defaultTitle, defaultDescription, isArabic]);
}

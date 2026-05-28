export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type ContactClickLocation = 'home' | 'about' | 'business' | 'business-recruiting' | 'project';

type Gtag = (...args: unknown[]) => void;

function gtagSafe(): Gtag | undefined {
  if (typeof window === 'undefined') return undefined;
  const fn = (window as Window & { gtag?: Gtag }).gtag;
  return typeof fn === 'function' ? fn : undefined;
}

export function trackContactClick(
  location: ContactClickLocation,
  options?: { projectSlug?: string },
) {
  if (!GA_MEASUREMENT_ID) return;

  const gtag = gtagSafe();
  if (!gtag) return;

  gtag('event', 'contact_click', {
    location,
    page_path: window.location.pathname,
    ...(options?.projectSlug ? { project_slug: options.projectSlug } : {}),
  });
}

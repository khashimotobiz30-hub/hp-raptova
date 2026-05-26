import { trackContactClick, type ContactClickLocation } from './analytics';

/** GA only; mailto navigation is handled by <a href={MAILTO_HREF}>. */
export function handleContactClick(
  location: ContactClickLocation,
  options?: { projectSlug?: string },
) {
  trackContactClick(location, options);
}

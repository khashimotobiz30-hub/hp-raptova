import { trackContactClick, type ContactClickLocation } from './analytics';

/** GA helper for contact CTAs that navigate to /contact. */
export function handleContactClick(
  location: ContactClickLocation,
  options?: { projectSlug?: string },
) {
  trackContactClick(location, options);
}

import { trackContactClick, type ContactClickLocation } from './analytics';
import { MAILTO_HREF } from './config';

export function handleContactClick(
  location: ContactClickLocation,
  options?: { projectSlug?: string },
) {
  trackContactClick(location, options);
  window.location.href = MAILTO_HREF;
  // Phase 3: この関数の中身をNOVAモーダル起動処理に差し替える
}

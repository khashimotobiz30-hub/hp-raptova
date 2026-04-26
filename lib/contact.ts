import { MAILTO_HREF } from './config';

export function handleContactClick() {
  window.location.href = MAILTO_HREF;
  // Phase 3: この関数の中身をNOVAモーダル起動処理に差し替える
}

// SendButtonIcon — pure CSS arrow icon with direction rotation.

import type { ArrowDirection } from './SendButton.types';
import styles from './SendButton.module.scss';

const DIRECTION_CLASSES: Record<ArrowDirection, string> = {
  up: styles.dirUp ?? '',
  down: styles.dirDown ?? '',
  left: styles.dirLeft ?? '',
  right: styles.dirRight ?? '',
};

export function SendButtonIcon({ direction }: { readonly direction: ArrowDirection }) {
  const dirClass = DIRECTION_CLASSES[direction] ?? styles.dirUp;
  return <span aria-hidden="true" className={`${styles.arrowIcon} ${dirClass}`} />;
}

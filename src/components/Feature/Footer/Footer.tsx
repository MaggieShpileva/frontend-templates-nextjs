import Link from 'next/link';
import { FC } from 'react';
import clsx from 'clsx';

import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={clsx(styles.footer)}>
      <div className={styles.footerContainer}>
        <div className={styles.copyright}>© 2025 All rights reserved</div>

        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

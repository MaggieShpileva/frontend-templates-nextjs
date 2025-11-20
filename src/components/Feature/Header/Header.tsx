import Link from 'next/link';
import clsx from 'clsx';

import SVG_Next from '@public/icons/next.svg';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <nav className={styles.navigation}>
        <SVG_Next width={100} height={20} />
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.navigationItem}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

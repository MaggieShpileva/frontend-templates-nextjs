import { Title } from '@/components/UI';
import clsx from 'clsx';

import styles from './Banner.module.scss';

export const Banner = () => {
  return (
    <section className={clsx(styles.banner)}>
      <Title tag="h1" variant="bold" className={styles.bannerTitle}>
        Шаблон проекта на Next.js
      </Title>










      
    </section>
  );
};

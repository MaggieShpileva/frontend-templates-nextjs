import Link from 'next/link';
import { FC } from 'react';
import { Button, Title, Typography } from '@/components/UI';

import styles from './NotFoundContent.module.scss';

export const NotFoundContent: FC = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title tag="h1" variant="bold" className={styles.code}>
            404
          </Title>
          <Title tag="h2" variant="medium" className={styles.title}>
            Page Not Found
          </Title>
          <Typography variant="regular" className={styles.description}>
            Sorry, we couldn't find the page you're looking for.
          </Typography>
          <Link href="/">
            <Button variant="dark" size="large">
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

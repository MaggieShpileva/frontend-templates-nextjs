import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Typography.module.scss';

type TypographyProps = {
  variant?: 'regular' | 'medium' | 'bold';
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span';
};

export const Typography: FC<TypographyProps> = ({
  variant = 'regular',
  children,
  className,
  as: Component = 'p',
}) => {
  const typographyClass = clsx(
    styles.typography,
    styles[`${variant}`],
    className
  );

  return <Component className={typographyClass}>{children}</Component>;
};

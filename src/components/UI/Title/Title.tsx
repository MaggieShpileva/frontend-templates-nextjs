import { FC, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Title.module.scss';

type TitleProps = {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  variant?: 'regular' | 'medium' | 'bold';
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

export const Title: FC<TitleProps> = ({
  children,
  tag,
  className,
  variant = 'regular',
  ...restProps
}) => {
  const Tag = tag;

  return (
    <Tag
      className={clsx(
        styles.title,
        className,
        styles[`title-${tag.slice(1)}`],
        styles[`${variant}`]
      )}
      {...restProps}
    >
      {children}
    </Tag>
  );
};

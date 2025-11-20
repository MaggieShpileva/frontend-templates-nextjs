import { FC, InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';

import styles from './Input.module.scss';

type InputProps = {
  name: string;
  label?: string;
  error?: string;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  name,
  label,
  error,
  fullWidth = false,
  className,
  id,
  ...props
}) => {
  const inputId = useId();
  const finalId = id || inputId;

  return (
    <div
      className={clsx(styles.inputWrapper, { [styles.fullWidth]: fullWidth })}
    >
      {label && (
        <label htmlFor={finalId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={finalId}
        className={clsx(
          styles.input,
          {
            [styles.error]: error,
          },
          className
        )}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${finalId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${finalId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

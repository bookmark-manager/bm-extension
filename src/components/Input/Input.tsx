import type { FC } from 'react';
import classes from './Input.module.css';

interface InputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({ value, onChange, label }) => {
  return (
    <div className={classes.container}>
      <span className={classes.title}>{label}</span>
      <input
        value={value}
        onChange={e => onChange?.(e.currentTarget.value)}
        className={classes.input}
      />
    </div>
  );
};

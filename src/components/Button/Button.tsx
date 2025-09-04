import type { FC, ReactNode } from 'react';
import classes from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={classes.btn}>
      {children}
    </button>
  );
};

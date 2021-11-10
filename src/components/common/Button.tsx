import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: string;
  size?: ButtonSize;
  value?: string;
  variant?: Variants;
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum Variants {
  BASE = 'base',
  NEUTRAL = 'neutral',
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className = '',
  icon,
  size = ButtonSize.MEDIUM,
  value,
  variant = Variants.NEUTRAL,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(
        'px-4 py-2 text-base disabled:text-gray-500 disabled:cursor-not-allowed uppercase',
        {
          'rounded-container bg-yellow-100 hover:bg-yellow-200 disabled:bg-gray-100':
            variant === Variants.NEUTRAL,
        },
        className
      )}
      {...otherProps}
    >
      {icon && <Icon icon={icon} size={size} aria-hidden='true' />}
      {value ? <span className={icon && 'ml-2'}>{value}</span> : children}
    </button>
  );
};

export default Button;

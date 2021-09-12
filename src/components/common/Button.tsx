import React, { FunctionComponent } from 'react';
// import Icon from './Icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  icon?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  size?: ButtonSize;
  value?: string;
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

// color --> light dark --> correspondance bgcolor text color
// variant --> outline full...

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className = '',
  // onClick,
  icon,
  // size = ButtonSize.MEDIUM,
  type,
  value,
  ...otherProps
}) => {
  return (
    <button
      type={type}
      className={`py-2 px-2 rounded inline-flex ${className}`}
      {...otherProps}
    >
      {/* {icon && <Icon icon={icon} size={size} aria-hidden="true" />} */}
      {value ? <span className={icon && 'ml-2'}>{value}</span> : children}
    </button>
  );
};

export default Button;

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, id, name, placeholder, maxLength, ...otherProps }, ref) => {
    return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        name={name}
        ref={ref}
        maxLength={maxLength}
        {...otherProps}
      />
    );
  }
);

export default Input;

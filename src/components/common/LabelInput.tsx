import React, { forwardRef } from 'react';
import Input from './Input';

interface LabelInputProps {
  label: string;
  type: string;
  id: string;
  name: string;
  className?: string;
  required?: boolean;
  value?: string;
  maxLength?: number;
}

const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
  (
    { label, type, id, name, maxLength, required, className, ...otherProps },
    ref
  ) => {
    return (
      <React.Fragment>
        <label htmlFor={id} className={className}>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
        <Input
          id={id}
          type={type}
          placeholder={label}
          name={name}
          ref={ref}
          maxLength={maxLength}
          className='w-full p-2 border rounded'
          {...otherProps}
        />
      </React.Fragment>
    );
  }
);

export default LabelInput;

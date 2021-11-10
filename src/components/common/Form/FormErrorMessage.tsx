import React from 'react';

const FormErrorMessage: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return <p className='text-sm text-red-500'>{errorMessage}</p>;
};

export default FormErrorMessage;

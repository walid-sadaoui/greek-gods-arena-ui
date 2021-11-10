import React from 'react';

const FormHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <h2 className='text-2xl text-center font-greek'>{title}</h2>
      <p className='text-center text-md'>
        Bring your Greek Gods to the Top of the Olympus
      </p>
    </>
  );
};

export default FormHeader;

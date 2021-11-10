import React from 'react';

const Header: React.FC = ({ children }) => {
  return (
    <header className='flex items-center w-full p-4 text-white bg-gray-900 bg-opacity-50'>
      {children}
    </header>
  );
};

export default Header;

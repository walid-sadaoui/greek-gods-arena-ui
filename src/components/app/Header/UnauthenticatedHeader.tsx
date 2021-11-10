import React from 'react';
import { Link } from 'react-router-dom';
import Header from '.';

const UnauthenticatedHeader: React.FC = () => {
  return (
    <Header>
      <Link
        to='/'
        className='px-4 py-2 mr-2 rounded font-greek hover:bg-white hover:text-black'
      >
        Home
      </Link>
      <Link
        to='/login'
        className='px-4 py-2 mr-2 rounded font-greek hover:bg-white hover:text-black'
      >
        Login
      </Link>
      <Link
        to='/signup'
        className='px-4 py-2 mr-2 rounded font-greek hover:bg-white hover:text-black'
      >
        Sign Up
      </Link>
    </Header>
  );
};

export default UnauthenticatedHeader;

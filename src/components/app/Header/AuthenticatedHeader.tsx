import React from 'react';
import { Link } from 'react-router-dom';
import Header from '.';
import { useAuth } from 'shared/context/AuthContext';
import Button, { Variants } from 'components/common/Button';

const AuthenticatedHeader: React.FC = () => {
  const { logout } = useAuth();
  return (
    <Header>
      <Link
        to='/'
        className='px-4 py-2 mr-2 rounded font-greek hover:bg-white hover:text-black'
      >
        Home
      </Link>
      <Button
        value='Logout'
        onClick={logout}
        variant={Variants.BASE}
        className='mr-2 rounded hover:bg-white hover:text-black font-greek'
      />
    </Header>
  );
};

export default AuthenticatedHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../shared/context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <article>
      {user ? (
        <Link to='/lobby'>
          <button type='button'>Play</button>
        </Link>
      ) : (
        <p>User not logged In</p>
      )}
    </article>
  );
};

export default Home;

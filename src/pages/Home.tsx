import React from 'react';
import { useAuth } from '../shared/context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <article>
      {user ? <p>{JSON.stringify(user)}</p> : <p>User not logged In</p>}
    </article>
  );
};

export default Home;

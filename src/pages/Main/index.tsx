import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
// import Container from 'components/common/Container';
// import { HowToPlay, Menu } from './elements';

const Logo = () => {
  return (
    <h1 className='text-3xl text-center border-black rounded-container font-greek'>
      Greek Gods <br /> Arena
    </h1>
  );
};

const Main: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center flex-1 bg-opacity-50'>
      <Logo />
      <Link className='mx-auto mt-4' to='/lobby'>
        <Button type='button' className='text-5xl'>
          Play
        </Button>
      </Link>
    </div>
  );
};

export default Main;

import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

export const HowToPlay: React.FC = () => {
  return (
    <article className='flex flex-col items-center h-full'>
      <h3 className='pb-4 text-xl font-greek'>How To Play</h3>
      <div className='w-full p-4 mb-8 overflow-y-auto text-justify h-3/4'>
        <p className='pb-4'>
          You can add Greek Gods to your characters list or improve the Greek
          Gods you already own by clicking on "Manage your Greek Gods". You
          cannot own more than 10 Greek Gods.
        </p>
        <p className='pb-4'>
          Click on "Play". Select your Greek God, improve its skills if you want
          and click on "Start The Fight". An opponent will be automatically
          chosen based on your selected Greek God level.
        </p>
        <p className='pb-4'>
          You can now process the fight and discover if your Greek God can reach
          the top of The Olympus !
        </p>
      </div>
    </article>
  );
};

export const Menu: React.FC = () => {
  return (
    <article className='flex flex-col items-center w-full h-full p-4'>
      <h3 className='pb-4 text-xl font-greek'>Menu</h3>
      <Link className='mx-auto mt-auto mb-4' to='/lobby'>
        <Button type='button'>Play</Button>
      </Link>
      <Link className='mx-auto mb-auto' to='/profile'>
        <Button>Manage your Greek Gods</Button>
      </Link>
    </article>
  );
};

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import { Fight } from 'models/Fight';

const Room: React.FC = () => {
  const { state } = useLocation<{ fight: Fight }>();
  const { fight } = state;

  return (
    <Container title='Room'>
      <div className='flex flex-col items-center justify-between'>
        <div className='flex items-center justify-around'>
          <div className='flex flex-col items-center justify-end w-full h-full p-4'>
            <img
              src={`/src/assets/img/greek-gods/${fight.firstOpponent.name}.svg`}
              alt={`${fight.firstOpponent.name}`}
              className='m-4 h-1/2'
            />
            <span className='text-3xl font-greek'>
              {fight.firstOpponent.name}
            </span>
          </div>
          <span className='text-5xl font-greek'>VS</span>
          <div className='flex flex-col items-center justify-end w-full h-full p-4'>
            <img
              src={`/src/assets/img/greek-gods/${fight.secondOpponent.name}.svg`}
              alt={`${fight.secondOpponent.name}`}
              className='w-1/2 m-4'
            />
            <span className='text-3xl font-greek'>
              {fight.secondOpponent.name}
            </span>
          </div>
        </div>
        <Link to={`/arena/${fight._id}`}>
          <Button>Enter The Arena</Button>
        </Link>
      </div>
    </Container>
  );
};

export default Room;

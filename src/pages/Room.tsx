import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { newFight } from '../api/fights';
import { Character } from '../models/Character';
import { Fight } from '../models/Fight';
import { useAuth } from '../shared/context/AuthContext';

const Room: React.FC = () => {
  const { getUser } = useAuth();
  const { state } = useLocation<{ character: Character }>();
  const { character } = state;
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>('');

  const runFight = async (): Promise<void> => {
    const newFightResponse = await newFight(getUser()._id, character.name);
    console.log(newFightResponse);
    if (newFightResponse.data) setFight(newFightResponse.data.fight);
    if (newFightResponse.error) setFightError(newFightResponse.error.message);
  };

  return (
    <section>
      <button onClick={runFight}>Run Fight</button>
      {fightError && <p>{fightError}</p>}
      {fight && <Redirect to={`/arena/${fight._id}`} />}
    </section>
  );
};

export default Room;

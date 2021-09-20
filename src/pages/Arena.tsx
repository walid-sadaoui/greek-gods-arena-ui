import React from 'react';
import { useParams } from 'react-router-dom';
import { getFight } from '../api/fights';
import { Character } from '../models/Character';
import { Fight } from '../models/Fight';
import { Turn } from '../models/Turn';

const Arena: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>('');
  const [fightFinished, setFightFinished] = React.useState<boolean>(false);
  const [turnCount, setTurnCount] = React.useState<number>(-1);
  const [turn, setTurn] = React.useState<Turn | undefined>(undefined);

  const handleNewTurn = (fight: Fight): void => {
    const defender = fight.turns[turnCount].defender;
    if (defender.id === fight.firstOpponent._id)
      fight.firstOpponent.health = defender.remainingHealth;
    if (defender.id === fight.secondOpponent._id)
      fight.secondOpponent.health = defender.remainingHealth;
  };

  React.useEffect(() => {
    getFight(id).then((getFightResponse) => {
      console.log(getFightResponse);
      if (getFightResponse.data) setFight(getFightResponse.data.fight);
      if (getFightResponse.error) setFightError(getFightResponse.error.message);
    });
  }, []);

  React.useEffect(() => {
    if (fight) {
      if (turnCount < fight.turns.length - 1) {
        setTurn(fight.turns[turnCount]);
        handleNewTurn(fight);
      } else {
        setTurn(fight.turns[turnCount]);
        handleNewTurn(fight);
        setFightFinished(true);
      }
    }
  }, [turnCount]);

  return (
    <section>
      {fight && (
        <div className='flex flex-col'>
          <div className='flex justify-between'>
            <CharacterDetail character={fight.firstOpponent} />
            <CharacterDetail character={fight.secondOpponent} />
          </div>
          <h2>Turns</h2>
          {turn && <p>{JSON.stringify(turn)}</p>}
          {turn && <p>{turnCount}</p>}
          <button
            disabled={fightFinished}
            onClick={() => setTurnCount(turnCount + 1)}
          >
            Next Turn
          </button>
        </div>
      )}
      {fightError && <p>{fightError}</p>}
    </section>
  );
};

const CharacterDetail: React.FC<{ character: Character }> = ({ character }) => {
  return (
    <div className='flex flex-col border-2'>
      <p>{character.name}</p>
      <p>SkillPoints : {character.skillPoints}</p>
      <p>Health :{character.health}</p>
      <p>Attack :{character.attack}</p>
      <p>Defense : {character.defense}</p>
      <p>Magik : {character.magik}</p>
      <p>Level : {character.level}</p>
    </div>
  );
};

export default Arena;

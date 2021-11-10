import React from 'react';
import { Fight } from 'models/Fight';

interface FightTurnProps {
  fight: Fight;
  turnCount: number;
}
const FightTurn: React.FC<FightTurnProps> = ({ fight, turnCount }) => {
  const getAttacker = (): string => {
    if (fight.turns[turnCount].attacker.id === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  // const getDefender = (): string => {
  //   if (fight.turns[turnCount].defender.id === fight.firstOpponent._id) {
  //     return `${fight.firstOpponent.name} (You)`;
  //   } else {
  //     return fight.secondOpponent.name;
  //   }
  // };

  const getWinner = (): string => {
    if (fight.winner === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const getLoser = (): string => {
    if (fight.loser === fight.firstOpponent._id) {
      return `${fight.firstOpponent.name} (You)`;
    } else {
      return fight.secondOpponent.name;
    }
  };

  const magikUsed = (): boolean => {
    if (
      fight.turns[turnCount].damages ===
        fight.turns[turnCount].attacker.attackValue -
          fight.turns[turnCount].defender.defenseSkillPoints ||
      fight.turns[turnCount].damages === 0
    )
      return false;
    return true;
  };

  const getTurnDescription = (): string => {
    if (turnCount === -1)
      return `Click on Next Turn to process the fight ! Your God ${fight.firstOpponent.name} goes first !`;

    const ATTACKER = `${getAttacker()} attacks !`;
    const ATTACK_VALUE = `${
      fight.turns[turnCount].attackSuccess
        ? `Attack landed !`
        : `Attack failed !`
    }`;
    const MAGIK = `${magikUsed() ? `${getAttacker()} uses Magik !` : ''}`;
    const FIGHT_END = `The fight is over, ${getLoser()} is dead !`;
    const FIGHT_RESULT = `The winner is ${getWinner()} !`;

    return `${ATTACKER} ${ATTACK_VALUE} ${MAGIK} ${
      fight.turns[turnCount].defender.remainingHealth === 0
        ? `${FIGHT_END} ${FIGHT_RESULT}`
        : ``
    }`;
  };

  return (
    <div className='p-4 bg-yellow-100 border-4 border-black'>
      <p>{getTurnDescription()}</p>
    </div>
  );
};

export default FightTurn;

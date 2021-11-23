import React from 'react';
import { motion } from 'framer-motion';
import Icon, { IconName } from 'components/common/Icon';
import { Character } from 'models/Character';
import { Fight } from 'models/Fight';

enum HealthStatusColors {
  GOOD = 'bg-green-700',
  MEDIUM = 'bg-yellow-600',
  BAD = 'bg-red-700',
}

const HealthBar: React.FC<{ max: number; skillValue: number }> = ({
  max,
  skillValue,
}) => {
  const [progressColor, setProgressColor] = React.useState(
    HealthStatusColors.GOOD
  );

  const handleProgressColor = () => {
    if (skillValue / max > 0.5) {
      setProgressColor(HealthStatusColors.GOOD);
    } else if (skillValue / max < 0.2) {
      setProgressColor(HealthStatusColors.BAD);
    } else {
      setProgressColor(HealthStatusColors.MEDIUM);
    }
  };

  React.useEffect(() => {
    handleProgressColor();
  }, [skillValue]);

  return (
    <div
      className='w-full bg-gray-400 border-4 border-black'
      role='progressbar'
    >
      <div
        className={`py-1 text-xs leading-none text-center text-white ${progressColor}`}
        style={{
          width: `${(skillValue * 100) / max}%`,
        }}
      >
        <span>{skillValue}</span>
      </div>
    </div>
  );
};

const SkillIconValue: React.FC<{ iconName: IconName; skillValue: number }> = ({
  iconName,
  skillValue,
}) => {
  return (
    <div className='flex mr-2'>
      <Icon icon={iconName} />
      <span>{skillValue}</span>
    </div>
  );
};

interface FightOpponentProps {
  opponent: Character;
  remainingHealth: number;
  opponentTurn: boolean;
}

const FightOpponent: React.FC<FightOpponentProps> = ({
  opponent,
  remainingHealth,
  opponentTurn,
}) => {
  const variants = {
    hidden: { scale: 1 },
    visible: {
      scale: 1.2,
      transition: { duration: 1, yoyo: Infinity },
    },
  };
  return (
    <>
      <div className='flex flex-col items-center justify-end w-full h-2/3'>
        <div
          className={`flex flex-col p-4 mb-4 text-white bg-black bg-opacity-75 rounded-container ${
            opponentTurn && 'ring-4 ring-yellow-200'
          }`}
        >
          <div className='flex pb-2 font-greek'>
            {opponentTurn && (
              <Icon icon='chevron-right' className='text-yellow-200' />
            )}
            <p>{opponent.name}</p>
          </div>
          <div className='flex pb-2'>
            <motion.div initial='hidden' animate='visible' variants={variants}>
              <Icon icon='heart' className='mr-2 text-red-500' />
            </motion.div>
            <HealthBar max={opponent.health} skillValue={remainingHealth} />
          </div>
          <div className='flex'>
            <SkillIconValue
              iconName={IconName.SWORD}
              skillValue={opponent.attack}
            />
            <SkillIconValue
              iconName={IconName.SHIELD}
              skillValue={opponent.defense}
            />
            <SkillIconValue
              iconName={IconName.MAGIC}
              skillValue={opponent.magik}
            />
          </div>
        </div>
        <motion.div
          animate={{
            rotate: remainingHealth === 0 ? -90 : 0,
            transition: { duration: 1 },
          }}
          className={`w-full h-full bg-center bg-no-repeat bg-contain ${
            remainingHealth === 0 && 'transform filter grayscale'
          }`}
          style={{
            backgroundImage: `url(${`/src/assets/img/greek-gods/${opponent.name}.svg`})`,
          }}
        ></motion.div>
      </div>
    </>
  );
};

interface FightRingProps {
  fight: Fight;
  turnCount: number;
}

const FightRing: React.FC<FightRingProps> = ({ fight, turnCount }) => {
  const getRemainingHealth = (
    currentFight: Fight,
    opponent: Character
  ): number => {
    if (turnCount === -1) return opponent.health;

    const defender = currentFight.turns[turnCount].defender;
    if (defender.id === opponent._id) return defender.remainingHealth;
    return currentFight.turns[turnCount].attacker.remainingHealth;
  };

  return (
    <div className='flex items-end flex-1 p-4'>
      <FightOpponent
        opponent={fight.firstOpponent}
        remainingHealth={getRemainingHealth(fight, fight.firstOpponent)}
        opponentTurn={
          turnCount !== fight.turns.length - 1 &&
          fight.firstOpponent._id === fight.turns[turnCount + 1].attacker.id
        }
      />
      <FightOpponent
        opponent={fight.secondOpponent}
        remainingHealth={getRemainingHealth(fight, fight.secondOpponent)}
        opponentTurn={
          turnCount !== fight.turns.length - 1 &&
          fight.secondOpponent._id === fight.turns[turnCount + 1].attacker.id
        }
      />
    </div>
  );
};

export default FightRing;

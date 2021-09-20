import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateCharacter } from '../../api/users';
import { Character } from '../../models/Character';
import { useAuth } from '../../shared/context/AuthContext';

interface CharacterEditProps {
  character: Character;
}

interface EditCharacterInput {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

const SERVER_ERROR = 'Server Error, please try again later';

const CharacterEdit: React.FC<CharacterEditProps> = ({ character }) => {
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
  const [availableSkillPoints, setAvailableSkillPoints] = useState<number>(
    character.skillPoints
  );
  const [health, setHealth] = useState<number>(character.health);
  const [attack, setAttack] = useState<number>(character.attack);
  const [defense, setDefense] = useState<number>(character.defense);
  const [magik, setMagik] = useState<number>(character.magik);
  const { handleSubmit, register } = useForm<EditCharacterInput>({
    mode: 'all',
  });
  const { getUser } = useAuth();

  const healthValue = register('health');
  const attackValue = register('attack');
  const defenseValue = register('defense');
  const magikValue = register('magik');

  const getMaxPropertyValue = (propertyValue: number): number => {
    let remainingSkillPoints = availableSkillPoints;
    let maxValue = propertyValue;
    while (remainingSkillPoints > 0) {
      if (propertyValue === 0) {
        remainingSkillPoints = remainingSkillPoints - 1;
      } else {
        remainingSkillPoints =
          remainingSkillPoints - Math.ceil(propertyValue / 5);
      }
      if (remainingSkillPoints >= 0) maxValue = maxValue + 1;
    }
    return maxValue;
  };

  const getMaxHealthValue = (): number => {
    const maxHealth = health + availableSkillPoints;
    return maxHealth;
  };

  const updateHealth = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newHealth = parseInt(event.target.value);
    if (newHealth > health) {
      increaseHealth();
    } else {
      decreaseHealth();
    }
  };

  const updateAttack = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newAttack = parseInt(event.target.value);
    if (newAttack > attack) {
      increaseAttack();
    } else {
      decreaseAttack();
    }
  };

  const updateDefense = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newDefense = parseInt(event.target.value);
    if (newDefense > defense) {
      increaseDefense();
    } else {
      decreaseDefense();
    }
  };

  const updateMagik = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newMagik = parseInt(event.target.value);
    if (newMagik > magik) {
      increaseMagik();
    } else {
      decreaseMagik();
    }
  };

  const increaseHealth = (): void => {
    setHealth(health + 1);
    setAvailableSkillPoints(availableSkillPoints - 1);
  };

  const decreaseHealth = (): void => {
    setHealth(health - 1);
    setAvailableSkillPoints(availableSkillPoints + 1);
  };

  const increaseAttack = (): void => {
    const remainingSkillPoints =
      availableSkillPoints - (attack === 0 ? 1 : Math.ceil(attack / 5));
    setAttack(attack + 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const decreaseAttack = (): void => {
    const remainingSkillPoints =
      availableSkillPoints + (attack === 1 ? 1 : Math.ceil((attack - 1) / 5));
    setAttack(attack - 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const increaseDefense = (): void => {
    const remainingSkillPoints =
      availableSkillPoints - (defense === 0 ? 1 : Math.ceil(defense / 5));
    setDefense(defense + 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const decreaseDefense = (): void => {
    const remainingSkillPoints =
      availableSkillPoints + (defense === 1 ? 1 : Math.ceil((defense - 1) / 5));
    setDefense(defense - 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const increaseMagik = (): void => {
    const remainingSkillPoints =
      availableSkillPoints - (magik === 0 ? 1 : Math.ceil(magik / 5));
    setMagik(magik + 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const decreaseMagik = (): void => {
    const remainingSkillPoints =
      availableSkillPoints + (magik === 1 ? 1 : Math.ceil((magik - 1) / 5));
    setMagik(magik - 1);
    setAvailableSkillPoints(remainingSkillPoints);
  };

  const onSubmit: SubmitHandler<EditCharacterInput> = async (
    characterSkills
  ) => {
    try {
      console.log('Skills : ', characterSkills);
      const errorMessage = await updateCharacter(
        getUser()._id,
        character.name,
        characterSkills
      );
      console.log('Edit character response : ', errorMessage);
    } catch (error) {
      setServerErrorMessage(SERVER_ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Improve Your Character</h2>
      <p>Available SkillPoints : {availableSkillPoints}</p>
      <label htmlFor='health'>Health</label>
      <p>{health}</p>
      <input
        type='range'
        min={character.health}
        max={getMaxHealthValue()}
        value={health}
        step={1}
        onChange={(e) => {
          healthValue.onChange(e);
          updateHealth(e);
        }}
        ref={healthValue.ref}
      />
      <label htmlFor='attack'>Attack</label>
      <p>{attack}</p>
      <input
        type='range'
        min={character.attack}
        max={getMaxPropertyValue(attack)}
        value={attack}
        onChange={(e) => {
          attackValue.onChange(e);
          updateAttack(e);
        }}
        ref={attackValue.ref}
      />
      <label htmlFor='defense'>Defense</label>
      <p>{defense}</p>
      <input
        type='range'
        min={character.defense}
        max={getMaxPropertyValue(defense)}
        value={defense}
        onChange={(e) => {
          defenseValue.onChange(e);
          updateDefense(e);
        }}
        ref={defenseValue.ref}
      />
      <label htmlFor='magik'>Magik</label>
      <p>{magik}</p>
      <input
        type='range'
        min={character.magik}
        max={getMaxPropertyValue(magik)}
        value={magik}
        onChange={(e) => {
          magikValue.onChange(e);
          updateMagik(e);
        }}
        ref={magikValue.ref}
      />
      <input type='submit' value='ok' />
      <p>{serverErrorMessage}</p>
    </form>
  );
};

export default CharacterEdit;

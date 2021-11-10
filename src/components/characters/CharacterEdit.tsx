import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateCharacter } from 'api/users';
import { Character } from 'models/Character';
import { useAuth } from 'shared/context/AuthContext';
import Button from 'components/common/Button';
import SkillUpdater from './SkillUpdater';

interface CharacterEditProps {
  character: Character;
  onUpdate: (character: Character) => void;
}

interface EditCharacterInput {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

const SERVER_ERROR = 'Server Error, please try again later';

const CharacterEdit: React.FC<CharacterEditProps> = ({
  character,
  onUpdate,
}) => {
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');
  const [characterToEdit, setCharacterToEdit] = useState<Character>(character);
  const { handleSubmit, register, setValue } = useForm<EditCharacterInput>({
    mode: 'all',
  });
  const { getUser, updateUserState } = useAuth();

  const getMaxPropertyValue = (propertyValue: number): number => {
    let remainingSkillPoints = characterToEdit.skillPoints;
    let maxValue = propertyValue;
    while (remainingSkillPoints > 0) {
      if (maxValue === 0) {
        remainingSkillPoints = remainingSkillPoints - 1;
      } else {
        remainingSkillPoints = remainingSkillPoints - Math.ceil(maxValue / 5);
      }
      if (remainingSkillPoints >= 0) maxValue = maxValue + 1;
    }
    return maxValue;
  };

  const getMaxHealthValue = (): number => {
    const maxHealth = characterToEdit.health + characterToEdit.skillPoints;
    return maxHealth;
  };

  const updateSkill = (
    newSkillValue: number,
    skillName: string,
    previousSkillValue: number
  ): void => {
    if (newSkillValue > previousSkillValue) {
      increaseSkill(skillName);
    } else {
      decreaseSkill(skillName);
    }
  };

  const increaseSkill = (skillName: string): void => {
    switch (skillName) {
      case 'health':
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            health: characterToEdit.health + 1,
            skillPoints: characterToEdit.skillPoints - 1,
          },
        });
        break;
      case 'attack':
        const remainingAttack =
          characterToEdit.skillPoints -
          (characterToEdit.attack === 0
            ? 1
            : Math.ceil(characterToEdit.attack / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            attack: characterToEdit.attack + 1,
            skillPoints: remainingAttack,
          },
        });
        break;
      case 'defense':
        const remainingDefense =
          characterToEdit.skillPoints -
          (characterToEdit.defense === 0
            ? 1
            : Math.ceil(characterToEdit.defense / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            defense: characterToEdit.defense + 1,
            skillPoints: remainingDefense,
          },
        });
        break;
      case 'magik':
        const remainingMagik =
          characterToEdit.skillPoints -
          (characterToEdit.magik === 0
            ? 1
            : Math.ceil(characterToEdit.magik / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            magik: characterToEdit.magik + 1,
            skillPoints: remainingMagik,
          },
        });
        break;

      default:
        break;
    }
  };

  const decreaseSkill = (skillName: string): void => {
    switch (skillName) {
      case 'health':
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            health: characterToEdit.health - 1,
            skillPoints: characterToEdit.skillPoints + 1,
          },
        });
        break;
      case 'attack':
        const remainingAttack =
          characterToEdit.skillPoints +
          (characterToEdit.attack === 1
            ? 1
            : Math.ceil((characterToEdit.attack - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            attack: characterToEdit.attack - 1,
            skillPoints: remainingAttack,
          },
        });
        break;
      case 'defense':
        const remainingDefense =
          characterToEdit.skillPoints +
          (characterToEdit.defense === 1
            ? 1
            : Math.ceil((characterToEdit.defense - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            defense: characterToEdit.defense - 1,
            skillPoints: remainingDefense,
          },
        });
        break;
      case 'magik':
        const remainingMagik =
          characterToEdit.skillPoints +
          (characterToEdit.magik === 1
            ? 1
            : Math.ceil((characterToEdit.magik - 1) / 5));
        setCharacterToEdit({
          ...characterToEdit,
          ...{
            magik: characterToEdit.magik - 1,
            skillPoints: remainingMagik,
          },
        });
        break;

      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<EditCharacterInput> = async (
    characterSkills
  ) => {
    try {
      const { data, error } = await updateCharacter(
        getUser()._id,
        character.name,
        characterSkills
      );
      if (data) {
        await updateUserState();
        setCharacterToEdit(data.character);
        onUpdate(data.character);
      }
      if (error) {
        setServerErrorMessage(error.message);
      }
    } catch (error) {
      setServerErrorMessage(SERVER_ERROR);
    }
  };

  React.useEffect(() => {
    setValue('health', characterToEdit.health);
    setValue('attack', characterToEdit.attack);
    setValue('defense', characterToEdit.defense);
    setValue('magik', characterToEdit.magik);
  }, [characterToEdit]);

  React.useEffect(() => {
    setCharacterToEdit(character);
  }, [character]);

  React.useEffect(() => {
    register('health');
    register('attack');
    register('defense');
    register('magik');
  }, []);

  return (
    <div className='flex p-4'>
      <div className='flex flex-col items-center flex-1 p-4'>
        <span className='font-sans uppercase'>Available SkillPoints</span>
        <span className='pb-4 font-mono text-3xl'>
          {characterToEdit.skillPoints}
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col p-4 mx-auto'
      >
        <SkillUpdater
          onChange={(skillValue) =>
            updateSkill(skillValue, 'health', characterToEdit.health)
          }
          label='Health'
          maxPropertyValue={getMaxHealthValue()}
          minPropertyValue={character.health}
          value={characterToEdit.health}
        />
        <SkillUpdater
          onChange={(skillValue) => {
            updateSkill(skillValue, 'attack', characterToEdit.attack);
          }}
          label='Attack'
          maxPropertyValue={getMaxPropertyValue(characterToEdit.attack)}
          minPropertyValue={character.attack}
          value={characterToEdit.attack}
        />
        <SkillUpdater
          onChange={(skillValue) =>
            updateSkill(skillValue, 'defense', characterToEdit.defense)
          }
          label='Defense'
          maxPropertyValue={getMaxPropertyValue(characterToEdit.defense)}
          minPropertyValue={character.defense}
          value={characterToEdit.defense}
        />
        <SkillUpdater
          onChange={(skillValue) =>
            updateSkill(skillValue, 'magik', characterToEdit.magik)
          }
          label='Magik'
          maxPropertyValue={getMaxPropertyValue(characterToEdit.magik)}
          minPropertyValue={character.magik}
          value={characterToEdit.magik}
        />
        <Button
          type='submit'
          value='Update'
          className='self-start'
          disabled={
            character.name !== characterToEdit.name ||
            (character.name === characterToEdit.name &&
              character.skillPoints === characterToEdit.skillPoints)
          }
        />
        <p>{serverErrorMessage}</p>
      </form>
    </div>
  );
};

export default CharacterEdit;

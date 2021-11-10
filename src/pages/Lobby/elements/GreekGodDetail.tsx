import { newFight } from 'api/fights';
import { createCharacter, deleteCharacter } from 'api/users';
import CharacterEdit from 'components/characters/CharacterEdit';
import Button from 'components/common/Button';
import { Character, GreekGods } from 'models/Character';
import { Fight } from 'models/Fight';
import React from 'react';
import { Redirect } from 'react-router';
import { useAuth } from 'shared/context/AuthContext';
import useModal from 'components/common/Modal/useModal';
import DeleteGodModal from './DeleteGodModal';

interface GreekGodDetailProps {
  greekGod: Character | undefined;
  greekGodToHire: GreekGods | '';
  onDelete: () => void;
}

export const GreekGodDetail: React.FC<GreekGodDetailProps> = ({
  greekGod,
  greekGodToHire,
  onDelete,
}) => {
  const { getUser } = useAuth();
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);

  const runFight = async (greekGodName: GreekGods): Promise<void> => {
    const { data } = await newFight(getUser()._id, greekGodName);
    if (data) setFight(data.fight);
    // if (error) setFightError(error.message);
  };

  const handleDeleteGod = (): void => {
    onDelete();
  };

  const handleCharacterUpdate = (): void => {
    // onDelete();
  };

  const handleHireGod = (): void => {
    // onDelete();
  };

  return (
    <div className='flex flex-col items-stretch justify-center flex-1 h-full p-4'>
      {greekGod && (
        <>
          <div className='flex items-center justify-between'>
            <CharacterSelected
              greekGodSelected={greekGod}
              onDelete={handleDeleteGod}
            />
            <CharacterEdit
              character={greekGod}
              onUpdate={handleCharacterUpdate}
            />
          </div>
          <div className='flex flex-col items-center w-full'>
            <Button
              onClick={() => runFight(greekGod.name)}
              disabled={greekGod.attack === 0}
              className=''
            >
              Start the Fight
            </Button>
            {/* <p className='text-red-500'>{fightError}</p> */}
          </div>
          {fight && (
            <Redirect
              to={{
                pathname: '/room',
                state: { fight: fight },
              }}
            />
          )}
        </>
      )}
      {greekGodToHire && (
        <CharacterToHire greekGodName={greekGodToHire} onHire={handleHireGod} />
      )}
    </div>
  );
};

export const CharacterSelected: React.FC<{
  greekGodSelected: Character;
  onDelete: (characterName: GreekGods) => void;
}> = ({ greekGodSelected, onDelete }) => {
  const { getUser, updateUserState } = useAuth();
  const { isShowing, toggle } = useModal();

  const deleteGod = async (): Promise<void> => {
    toggle();
    const deleteResponse = await deleteCharacter(
      getUser()._id,
      greekGodSelected.name
    );
    if (deleteResponse.data) {
      await updateUserState();
      onDelete(greekGodSelected.name);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center p-4 mx-auto'>
      <img
        src={`/src/assets/img/greek-gods/${greekGodSelected.name}.svg`}
        alt={`${greekGodSelected.name}`}
        className='m-4 h-36'
      />
      <span className='text-3xl font-greek'>{greekGodSelected.name}</span>
      <span className='pb-4 font-greek'>Lvl. {greekGodSelected.level}</span>
      <Button onClick={toggle}>{`Fire ${greekGodSelected.name}`}</Button>
      <DeleteGodModal
        greekGodName={greekGodSelected.name}
        onYes={deleteGod}
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
  );
};

export const CharacterToHire: React.FC<{
  greekGodName: GreekGods;
  onHire: (character: Character) => void;
}> = ({ greekGodName, onHire }) => {
  const { getUser, updateUserState } = useAuth();

  const hireGod = async (): Promise<void> => {
    const { data, error } = await createCharacter(getUser()._id, greekGodName);
    if (error) {
      console.log('Create Error : ', error);
    }
    if (data) {
      await updateUserState();
      onHire(data.character);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4'>
      <img
        src={`/src/assets/img/greek-gods/${greekGodName}.svg`}
        alt={`${greekGodName}`}
        className='m-4 h-36'
      />
      <span className='mb-4 text-3xl font-greek'>{greekGodName}</span>
      <Button onClick={hireGod}>{`Hire ${greekGodName}`}</Button>
    </div>
  );
};

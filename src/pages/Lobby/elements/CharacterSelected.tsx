import React from 'react';
import Button from 'components/common/Button';
import DeleteGodModal from './DeleteGodModal';
import { Character, GreekGods } from 'models/Character';
import { useAuth } from 'shared/context/AuthContext';
import useModal from 'components/common/Modal/useModal';
import { deleteCharacter } from 'api/users';

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

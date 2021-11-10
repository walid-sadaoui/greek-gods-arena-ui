import React from 'react';
import { Character, GreekGods, GreekGodsArray } from 'models/Character';
import { useAuth } from 'shared/context/AuthContext';
import Container from 'components/common/Container';
import { createCharacter, deleteCharacter } from 'api/users';
import Button from 'components/common/Button';

interface CharacterIconProps {
  greekGod: GreekGods;
  className?: string;
  onSelect?: React.MouseEventHandler<HTMLDivElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  role?: string;
}
const CharacterIcon: React.FC<CharacterIconProps> = ({
  greekGod,
  className,
  onSelect,
  onKeyPress,
  role,
}) => {
  return (
    <div
      className={`flex flex-col p-2 ${className}`}
      onClick={onSelect}
      onKeyPress={onKeyPress}
      role={role}
    >
      <img
        src={`/src/assets/img/greek-gods/${greekGod}.svg`}
        alt={`${greekGod}`}
        className='w-10 h-10 mx-4'
      />
      <span className='text-xs text-center font-greek'>{greekGod}</span>
    </div>
  );
};

const HireGod: React.FC = () => {
  const { getUser, updateUserState } = useAuth();
  const [characters, setCharacters] = React.useState(getUser().characters);
  const [greekGodSelected, setGreekGodSelected] = React.useState<string>('');
  const [createCharacterErrorMessage, setCreateCharacterErrorMessage] =
    React.useState<string>('');

  const userAlreadyOwnsThisGod = (greekGod: string): boolean => {
    const userAlreadyOwnsThisGod = characters.some(
      (character: Character) => character.name === greekGod
    );
    return userAlreadyOwnsThisGod;
  };

  const onSelectGod = (greekGod: GreekGods): void => {
    if (
      !userAlreadyOwnsThisGod(greekGod) &&
      (greekGodSelected === '' || greekGodSelected !== greekGod)
    ) {
      setGreekGodSelected(greekGod);
    } else {
      setGreekGodSelected('');
    }
  };

  const hireGod = async (): Promise<void> => {
    const { data, error } = await createCharacter(
      getUser()._id,
      greekGodSelected
    );
    if (error) {
      console.log('Create Error : ', error);
      setCreateCharacterErrorMessage(error.message);
    }
    if (data) {
      setGreekGodSelected('');
      updateUserState();
    }
  };

  React.useEffect(() => {
    setCharacters(getUser().characters);
  });

  return (
    <>
      <h3 className='pb-4 text-xl font-greek'>Hire a Greek God</h3>
      <ul className='flex flex-wrap justify-center overflow-y-auto'>
        {GreekGodsArray.map((greekGod) => {
          const disabled = userAlreadyOwnsThisGod(greekGod);
          return (
            <li key={greekGod}>
              <CharacterIcon
                greekGod={greekGod}
                className={`border rouned hover:bg-yellow-100 ${
                  disabled && 'filter grayscale'
                } ${greekGodSelected === greekGod && 'bg-yellow-100'}`}
                onSelect={() => onSelectGod(greekGod)}
                role='button'
              />
            </li>
          );
        })}
      </ul>
      <Button
        onClick={hireGod}
        value='Select'
        className={`my-4`}
        disabled={greekGodSelected === ''}
      />
      <p className='text-red-500'>{createCharacterErrorMessage}</p>
    </>
  );
};

const SkillsDisplay: React.FC<{ skillName: string; value: number }> = ({
  skillName,
  value,
}) => {
  return (
    <div className='flex items-center justify-between'>
      <span className='pr-2 text-sm font-greek'>{skillName}</span>
      <span className='w-8 text-right'>{value}</span>
    </div>
  );
};

const CharacterDetail: React.FC<{ character: Character }> = ({ character }) => {
  const { getUser, updateUserState } = useAuth();

  const deleteGod = async (): Promise<void> => {
    const { data } = await deleteCharacter(getUser()._id, character.name);
    if (data) updateUserState();
  };

  return (
    <div className='flex mr-2'>
      <div className='flex items-center mb-2 mr-2 bg-yellow-100 rounded shadow-md'>
        <CharacterIcon greekGod={character.name} className='flex-shrink-0' />
        <div className='flex justify-between p-2'>
          <div className='flex flex-col pr-4'>
            <SkillsDisplay
              skillName='SkillPoints'
              value={character.skillPoints}
            />
            <SkillsDisplay skillName='Attack' value={character.attack} />
            <SkillsDisplay skillName='Defense' value={character.defense} />
          </div>
          <div className='flex flex-col'>
            <SkillsDisplay skillName='Level' value={character.level} />
            <SkillsDisplay skillName='Health' value={character.health} />
            <SkillsDisplay skillName='Magik' value={character.magik} />
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center mb-2'>
        {/* <Button value='Edit' /> */}
        <Button value='Delete' onClick={deleteGod} />
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const { getUser } = useAuth();
  const [characters, setCharacters] = React.useState<Character[]>(
    getUser().characters
  );

  React.useEffect(() => {
    setCharacters(getUser().characters);
  });

  return (
    <Container title='Profile'>
      <div className='flex items-center justify-between h-full py-4'>
        <div className='flex flex-col items-center w-full h-full'>
          <section className='flex flex-col items-center w-full h-full p-4'>
            <h3 className='pb-4 text-xl font-greek'>Your Greek Gods</h3>
            {characters.length === 0 ? (
              <p>
                You don't own any Greek God, please select some Greek Gods to be
                able to enter the Arena
              </p>
            ) : (
              <ul className='flex flex-col mb-8 overflow-y-auto'>
                {characters.map((character) => {
                  return (
                    <li key={character._id}>
                      <CharacterDetail character={character} />
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
        <span className='w-px mx-auto my-4 bg-gray-300 h-3/4'></span>
        <section className='flex flex-col items-center justify-between w-full h-full p-4'>
          <HireGod />
        </section>
      </div>
    </Container>
  );
};

export default Profile;

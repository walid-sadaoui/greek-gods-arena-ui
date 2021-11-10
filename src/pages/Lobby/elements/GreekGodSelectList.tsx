import classNames from 'classnames';
import { Character, GreekGods, GreekGodsArray } from 'models/Character';
import React from 'react';

interface CharacterIconProps {
  greekGod: GreekGods;
  className?: string;
  onSelect?: React.MouseEventHandler<HTMLButtonElement>;
}

const CharacterIcon: React.FC<CharacterIconProps> = ({
  greekGod,
  className,
  onSelect,
}) => {
  return (
    <button
      className={`flex flex-col justify-center items-center w-20 h-20 ${className}`}
      onClick={onSelect}
    >
      <img
        src={`/src/assets/img/greek-gods/${greekGod}.svg`}
        alt={`${greekGod}`}
        className='w-10 h-10'
      />
      <span className='w-20 text-xs text-center font-greek'>{greekGod}</span>
    </button>
  );
};

const GreekGodItem: React.FC<{
  greekGodName: GreekGods;
  selected: boolean;
  onSelect: () => void;
}> = ({ greekGodName, selected, onSelect }) => {
  return (
    <li
      key={greekGodName}
      className={classNames('relative hover:z-20', { 'z-10': selected })}
    >
      <CharacterIcon
        greekGod={greekGodName}
        className={classNames(
          'border hover:bg-yellow-100 transform hover:-rotate-6 hover:scale-110',
          { 'bg-yellow-100 ring-2 ring-black rotate-6': selected },
          { 'bg-white': !selected }
        )}
        onSelect={onSelect}
      />
    </li>
  );
};

interface CharactersListProps {
  characters: Character[];
  characterSelected: Character | undefined;
  greekGodToHire: GreekGods | '';
  onSelectGod: (characterName: GreekGods) => void;
  onSelectGodToHire: (characterName: GreekGods) => void;
  className?: string;
  onKeyPress?: React.KeyboardEventHandler<HTMLDivElement>;
  role?: string;
}

export const GreekGodSelectList: React.FC<CharactersListProps> = ({
  characters,
  characterSelected,
  greekGodToHire,
  onSelectGod,
  onSelectGodToHire,
}) => {
  const handleSelectGod = (characterName: GreekGods): void => {
    onSelectGod(characterName);
  };

  const handleSelectGodToHire = (characterName: GreekGods): void => {
    onSelectGodToHire(characterName);
  };

  const renderGreekGodSelect = (character: Character) => {
    return (
      <GreekGodItem
        greekGodName={character.name}
        selected={character.name === characterSelected?.name}
        onSelect={() => handleSelectGod(character.name)}
      />
    );
  };

  const renderGreekGodHire = (characterName: GreekGods) => {
    return (
      <GreekGodItem
        greekGodName={characterName}
        selected={characterName === greekGodToHire}
        onSelect={() => handleSelectGodToHire(characterName)}
      />
    );
  };

  const getAvailableCharacters = (): GreekGods[] => {
    let availableGreekGods = GreekGodsArray;
    characters.forEach((character) => {
      availableGreekGods = availableGreekGods.filter(
        (greekGod) => greekGod !== character.name
      );
    });
    return availableGreekGods;
  };

  return (
    <div className='flex flex-col h-full p-8 ml-8 overflow-y-auto'>
      {characters.length > 0 && (
        <>
          <span className='relative font-sans text-xs font-semibold tracking-wide text-gray-600 uppercase'>
            Your Gods {`(${characters.length}/10)`}
          </span>
          <ul className='grid grid-cols-2 mt-2'>
            {characters.map(renderGreekGodSelect)}
          </ul>
        </>
      )}
      {characters.length < 10 && (
        <>
          <span className='relative mt-4 text-xs font-semibold tracking-wide text-gray-600 uppercase'>
            Available to Hire {`(${10 - characters.length}/10)`}
          </span>
          <ul className='grid grid-cols-2 mt-2'>
            {getAvailableCharacters().map(renderGreekGodHire)}
          </ul>
        </>
      )}
    </div>
  );
};

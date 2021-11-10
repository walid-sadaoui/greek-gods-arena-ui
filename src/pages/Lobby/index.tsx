import React from 'react';
import { Redirect } from 'react-router-dom';
import { newFight } from 'api/fights';
import { Fight } from 'models/Fight';
import CharacterEdit from 'components/characters/CharacterEdit';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import { Character, GreekGods, GreekGodsArray } from 'models/Character';
import { useAuth } from 'shared/context/AuthContext';
import { GreekGodSelectList } from './elements/GreekGodSelectList';
import { CharacterSelected } from './elements/CharacterSelected';
import { CharacterToHire } from './elements/CharacterToHire';

const Lobby: React.FC = () => {
  const { getUser } = useAuth();
  const [characters, setCharacters] = React.useState<Character[]>(
    getUser().characters
  );
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);
  const [greekGodToHire, setGreekGodToHire] = React.useState<GreekGods | ''>(
    ''
  );
  const [fight, setFight] = React.useState<Fight | undefined>(undefined);
  const [fightError, setFightError] = React.useState<string>('');

  const runFight = async (greekGodName: GreekGods): Promise<void> => {
    const { data, error } = await newFight(getUser()._id, greekGodName);
    if (data) setFight(data.fight);
    if (error) setFightError(error.message);
  };

  const selectGod = (characterName: GreekGods): void => {
    const selectedCharacter = characters.find(
      (character: Character) => character.name === characterName
    );
    if (selectedCharacter) {
      setCharacterSelected(selectedCharacter);
      setGreekGodToHire('');
    }
  };

  const selectGodToHire = (characterName: GreekGods): void => {
    setCharacterSelected(undefined);
    setGreekGodToHire(characterName);
  };

  const handleDeleteGod = (characterName: GreekGods): void => {
    const greekGodsList = characters.filter(
      (character: Character) => character.name !== characterName
    );
    setCharacters(greekGodsList);
    setCharacterSelected(greekGodsList[0] || undefined);
  };

  const handleHireGod = (character: Character): void => {
    setCharacters([...characters, character]);
    setGreekGodToHire('');
    setCharacterSelected(character);
  };

  const handleCharacterUpdate = (character: Character): void => {
    const characterIndex = characters.findIndex(
      (greekGod) => greekGod.name === character.name
    );
    if (characterIndex !== -1) {
      const updatedCharacters = [...characters];
      updatedCharacters[characterIndex] = character;
      setCharacters(updatedCharacters);
      setCharacterSelected(character);
    }
  };

  React.useEffect(() => {
    setCharacters(getUser().characters);
    if (getUser().characters.length > 0) {
      setCharacterSelected(getUser().characters[0]);
    } else {
      setGreekGodToHire(GreekGodsArray[0]);
    }
  }, []);

  React.useEffect(() => {
    if (characterSelected !== undefined && greekGodToHire !== '')
      setGreekGodToHire('');
  }, [characterSelected]);

  React.useEffect(() => {
    if (greekGodToHire !== '' && characterSelected !== undefined)
      setCharacterSelected(undefined);
  }, [greekGodToHire]);

  return (
    <Container title='Select a God to play'>
      <div className='flex items-center flex-1 h-5/6'>
        <GreekGodSelectList
          characters={characters}
          onSelectGod={selectGod}
          onSelectGodToHire={selectGodToHire}
          characterSelected={characterSelected}
          greekGodToHire={greekGodToHire}
        />
        {/* <GreekGodDetail greekGod={characterSelected} greekGodToHire={greekGodToHire} onDelete={handleDeleteGod} /> */}
        <div className='flex flex-col items-stretch justify-center flex-1 h-full p-4'>
          {characterSelected && (
            <>
              <div className='flex items-center justify-between'>
                <CharacterSelected
                  greekGodSelected={characterSelected}
                  onDelete={handleDeleteGod}
                />
                <CharacterEdit
                  character={characterSelected}
                  onUpdate={handleCharacterUpdate}
                />
              </div>
              <div className='flex flex-col items-center w-full'>
                <Button
                  onClick={() => runFight(characterSelected.name)}
                  disabled={characterSelected.attack === 0}
                  className=''
                >
                  Start the Fight
                </Button>
                <p className='text-red-500'>{fightError}</p>
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
            <CharacterToHire
              greekGodName={greekGodToHire}
              onHire={handleHireGod}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Lobby;

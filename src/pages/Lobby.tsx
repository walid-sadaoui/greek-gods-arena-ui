import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CharacterEdit from '../components/characters/CharacterEdit';
import { Character, GreekGods } from '../models/Character';
import { useAuth } from '../shared/context/AuthContext';

const Lobby: React.FC = () => {
  const { getUser } = useAuth();
  const [characters] = React.useState<Character[]>(getUser().characters);
  const [characterSelected, setCharacterSelected] = React.useState<
    Character | undefined
  >(undefined);

  const { register, handleSubmit } = useForm({
    mode: 'all',
  });

  const handleReturn = () => {
    setCharacterSelected(undefined);
  };

  const onSubmit: SubmitHandler<{ characterName: GreekGods }> = async ({
    characterName,
  }) => {
    const selectedCharacter = characters.find(
      (character: Character) => character.name === characterName
    );
    setCharacterSelected(selectedCharacter);
  };

  return (
    <section>
      {characterSelected ? (
        <>
          <p>Your character</p>
          <p>{characterSelected.name}</p>
          <p>SkillPoints : {characterSelected.skillPoints}</p>
          <p>Health :{characterSelected.health}</p>
          <p>Attack :{characterSelected.attack}</p>
          <p>Defense : {characterSelected.defense}</p>
          <p>Magik : {characterSelected.magik}</p>
          <p>Level : {characterSelected.level}</p>
          <CharacterEdit character={characterSelected} />
          <button onClick={handleReturn}>Return</button>
          <Link
            to={{ pathname: '/room', state: { character: characterSelected } }}
          >
            <button>Start the Fight</button>
          </Link>
        </>
      ) : (
        <>
          <h2>Select A Character</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select id='character-select' {...register('characterName')}>
              <option value=''>--Please choose a Greek God--</option>
              {characters.map((character) => {
                return (
                  <option key={character._id} value={character.name}>
                    {character.name}
                  </option>
                );
              })}
            </select>
            <input type='submit' value='Submit' />
          </form>
        </>
      )}
    </section>
  );
};

export default Lobby;

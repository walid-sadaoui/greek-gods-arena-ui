import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createCharacter } from '../api/users';
import CharacterEdit from '../components/characters/CharacterEdit';
import { Character, GreekGods } from '../models/Character';
import { useAuth } from '../shared/context/AuthContext';

const UserDetail: React.FC = () => {
  const [characterToUpdate, setCharacterToUpdate] = React.useState<
    Character | undefined
  >(undefined);
  const [createCharacterError, setCreateCharacterError] =
    React.useState<string>('');
  const { user } = useAuth();
  const greekGods = Object.values(GreekGods);
  const { register, handleSubmit } = useForm({
    mode: 'all',
  });

  const getAvailableCharacters = () => {
    if (user?.characters) {
      const userGreekGods: GreekGods[] = [];
      const userCharacters = user.characters;
      userCharacters.forEach((character) => {
        userGreekGods.push(character.name);
      });
      let availableCharacters = greekGods;
      availableCharacters = availableCharacters.filter(
        (greekGod) => !userGreekGods.includes(greekGod)
      );

      return availableCharacters;
    }
    return [];
  };

  const onSubmit: SubmitHandler<{ characterName: GreekGods }> = async ({
    characterName,
  }) => {
    if (user) {
      const { error } = await createCharacter(user._id, characterName);
      if (error) {
        setCreateCharacterError(error.message);
      }
    }
  };

  return (
    <section>
      <h2>User Details</h2>
      <span>{user?.username}</span>
      <span>{user?.email}</span>
      <h3>Your Characters</h3>
      <button>New Character</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select id='character-select' {...register('characterName')}>
          <option value=''>--Please choose a Greek God--</option>
          {getAvailableCharacters().map((greekGod) => {
            return (
              <option key={greekGod} value={greekGod}>
                {greekGod}
              </option>
            );
          })}
        </select>
        <input type='submit' value='Submit' />
        <p>{createCharacterError}</p>
      </form>
      <ul>
        {user?.characters?.map((character) => {
          return (
            <li key={character._id}>
              {character.name}
              {character.skillPoints}
              {character.health}
              {character.attack}
              {character.defense}
              {character.magik}
              {character.level}
              <button
                onClick={() => setCharacterToUpdate(character)}
                disabled={characterToUpdate !== undefined}
              >
                Update
              </button>
            </li>
          );
        })}
      </ul>
      {characterToUpdate && (
        <div>
          <CharacterEdit character={characterToUpdate} />
          <button onClick={() => setCharacterToUpdate(undefined)}>Ok</button>
        </div>
      )}
    </section>
  );
};

export default UserDetail;

import {
  APIResponse,
  deleteRequest,
  getRequest,
  postRequest,
  ResponseData,
} from '.';
import { Character, CharacterSkills } from 'models/Character';
import { User } from 'models/User';

interface GetUserData extends ResponseData {
  user: User;
}

interface CreateCharacterData extends ResponseData {
  character: Character;
}

interface GetCharactersData extends ResponseData {
  characters: Character[];
}

interface EditCharacterData extends ResponseData {
  character: Character;
}

export const getCurrentUser = async (): Promise<APIResponse<GetUserData>> => {
  const getCurrentUserResponse = await getRequest<GetUserData>('/me');
  return getCurrentUserResponse;
};

export const createCharacter = async (
  userId: string,
  characterName: string
): Promise<APIResponse<CreateCharacterData>> => {
  const createCharacterResponse = await postRequest<CreateCharacterData>(
    `/users/${userId}/characters`,
    JSON.stringify({ characterName })
  );
  return createCharacterResponse;
};

export const getCharacters = async (
  userId: string
): Promise<APIResponse<GetCharactersData>> => {
  const getCharactersResponse = await getRequest<GetCharactersData>(
    `/users/${userId}/characters`
  );
  return getCharactersResponse;
};

export const updateCharacter = async (
  userId: string,
  characterName: string,
  characterProperties: CharacterSkills
): Promise<APIResponse<EditCharacterData>> => {
  const editCharacterResponse = await postRequest<EditCharacterData>(
    `/users/${userId}/characters/${characterName}`,
    JSON.stringify(characterProperties)
  );
  return editCharacterResponse;
};

export const deleteCharacter = async (
  userId: string,
  characterName: string
): Promise<APIResponse<ResponseData>> => {
  const deleteCharacterResponse = await deleteRequest<ResponseData>(
    `/users/${userId}/characters/${characterName}`
  );
  return deleteCharacterResponse;
};

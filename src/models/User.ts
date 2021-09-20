import { Character } from './Character';

export interface User {
  _id: string;
  username: string;
  email: string;
  characters: Character[];
  createdAt: string;
  updatedAt: string;
}

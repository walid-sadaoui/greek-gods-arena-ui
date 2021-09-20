import { Character } from './Character';
import { Turn } from './Turn';

export interface Fight {
  _id: string;
  finished: boolean;
  firstOpponent: Character;
  secondOpponent: Character;
  winner: string;
  loser: string;
  turns: Turn[];
  createdAt: Date;
  updatedAt: number;
}

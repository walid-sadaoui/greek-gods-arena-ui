import { APIResponse, getRequest, postRequest, ResponseData } from '.';
import { GreekGods } from 'models/Character';
import { Fight } from 'models/Fight';

interface FightData extends ResponseData {
  fight: Fight;
}

export const newFight = async (
  userId: string,
  characterName: GreekGods
): Promise<APIResponse<FightData>> => {
  const newFightResponse = await postRequest<FightData>(
    '/fights',
    JSON.stringify({ userId, characterName })
  );
  return newFightResponse;
};

export const getFight = async (
  fightId: string
): Promise<APIResponse<FightData>> => {
  const newFightResponse = await getRequest<FightData>(`/fights/${fightId}`);
  return newFightResponse;
};

export interface Turn {
  _id: string;
  count: number;
  attacker: Attacker;
  defender: Defender;
  attackSuccess: boolean;
  damages: number;
}

interface Attacker {
  id: string;
  attackValue: number;
  remainingHealth: number;
}

interface Defender {
  id: string;
  defenseSkillPoints: number;
  remainingHealth: number;
}

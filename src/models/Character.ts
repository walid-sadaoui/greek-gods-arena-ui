export interface Character {
  _id: string;
  name: GreekGods;
  skillPoints: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  level: number;
}

export interface CharacterSkills {
  health: number;
  attack: number;
  defense: number;
  magik: number;
}

export enum GreekGods {
  APHRODITE = 'APHRODITE',
  APOLLO = 'APOLLO',
  ARES = 'ARES',
  ARTEMIS = 'ARTEMIS',
  ATHENA = 'ATHENA',
  DEMETER = 'DEMETER',
  DIONYSUS = 'DIONYSUS',
  HADES = 'HADES',
  HEPHAESTUS = 'HEPHAESTUS',
  HERA = 'HERA',
  HERMES = 'HERMES',
  // HESTIA = 'HESTIA',
  POSEIDON = 'POSEIDON',
  ZEUS = 'ZEUS',
}

export const GreekGodsArray = Object.values(GreekGods);

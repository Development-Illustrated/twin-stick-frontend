export const activeZombieList = [
  "swarmer",
  "hunter",
  "charger",
  "spitter",
  "witch"
];

export const Swarmer = {
  tileset: "swarmer",
  health: 2,
  startFrame: 1,
  movementSpeed: 15,
  attackSpeed: 0,
  attackDamage: 0,
  minRespawn: 150,
  maxRespawn: 500,
  maxAlive: 50
};

export const Hunter = {
  tileset: "hunter",
  health: 1,
  startFrame: 1,
  movementSpeed: 95,
  attackSpeed: 0,
  attackDamage: 0,
  minRespawn: 1250,
  maxRespawn: 2500,
  maxAlive: 10
};

export const Charger = {
  tileset: "charger",
  health: 15,
  startFrame: 1,
  movementSpeed: 35,
  attackSpeed: 0,
  attackDamage: 0,
  minRespawn: 8000,
  maxRespawn: 12000,
  maxAlive: 3
};

export const Spitter = {
  tileset: "spitter",
  health: 6,
  startFrame: 1,
  movementSpeed: 20,
  attackSpeed: 0,
  attackDamage: 0,
  minRespawn: 8000,
  maxRespawn: 12000,
  maxAlive: 5
};

export const Witch = {
  tileset: "witch",
  health: 30,
  startFrame: 1,
  movementSpeed: 20,
  attackSpeed: 0,
  attackDamage: 0,
  minRespawn: 30000,
  maxRespawn: 60000,
  maxAlive: 1
};

type MonsterDetail = {
  index: string;
  name: string;
  hit_points: number;
  armor_class: { value: number }[];
  dexterity: number;
};

export const mockMonsterDetails: Record<string, MonsterDetail> = {
  goblin: {
    index: "goblin",
    name: "Goblin",
    hit_points: 7,
    armor_class: [{ value: 15 }],
    dexterity: 14,
  },
  orc: {
    index: "orc",
    name: "Orc",
    hit_points: 15,
    armor_class: [{ value: 13 }],
    dexterity: 12,
  },
  skeleton: {
    index: "skeleton",
    name: "Skeleton",
    hit_points: 13,
    armor_class: [{ value: 13 }],
    dexterity: 14,
  },
  zombie: {
    index: "zombie",
    name: "Zombie",
    hit_points: 22,
    armor_class: [{ value: 8 }],
    dexterity: 6,
  },
  "young-red-dragon": {
    index: "young-red-dragon",
    name: "Young Red Dragon",
    hit_points: 178,
    armor_class: [{ value: 18 }],
    dexterity: 10,
  },
};

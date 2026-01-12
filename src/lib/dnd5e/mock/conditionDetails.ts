type ConditionDetail = {
  index: string;
  name: string;
  desc: string[];
};

export const mockConditionDetails: Record<string, ConditionDetail> = {
  blinded: {
    index: "blinded",
    name: "Blinded",
    desc: [
      "- A blinded creature can't see and automatically fails any ability check that requires sight.",
      "- Attack rolls against the creature have advantage, and the creature's attack rolls have disadvantage." 
    ],
  },
  charmed: {
    index: "charmed",
    name: "Charmed",
    desc: [
      "- A charmed creature can't attack the charmer or target the charmer with harmful abilities or magical effects.",
      "- The charmer has advantage on any ability check to interact socially with the creature."
    ],
  },
  deafened: {
    index: "deafened",
    name: "Deafened",
    desc: [
      "- A deafened creature can't hear and automatically fails any ability check that requires hearing."
    ],
  },
  exhaustion: {
    index: "exhaustion",
    name: "Exhaustion",
    desc: [
      "Some special abilities and environmental hazards, such as starvation and the long-term effects of freezing or scorching temperatures, can lead to a special condition called exhaustion. Exhaustion is measured in six levels. An effect can give a creature one or more levels of exhaustion, as specified in the effect's description.",
      "1 - Disadvantage on ability checks",
      "2 - Speed halved",
      "3 - Disadvantage on attack rolls and saving throws",
      "4 - Hit point maximum halved",
      "5 - Speed reduced to 0",
      "6 - Death",
      "If an already exhausted creature suffers another effect that causes exhaustion, its current level of exhaustion increases by the amount specified in the effect's description.",
      "A creature suffers the effect of its current level of exhaustion as well as all lower levels. For example, a creature suffering level 2 exhaustion has its speed halved and has disadvantage on ability checks.",
      "An effect that removes exhaustion reduces its level as specified in the effect's description, with all exhaustion effects ending if a creature's exhaustion level is reduced below 1.",
      "Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink."
    ],
  },
  frightened: {
    index: "frightened",
    name: "Frightened",
    desc: [
      "- A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.",
      "- The creature can't willingly move closer to the source of its fear."
    ],
  },
};

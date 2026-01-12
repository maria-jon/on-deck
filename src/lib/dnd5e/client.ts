import { mockMonsterIndex } from "./mock/monsters";
import { mockMonsterDetails } from "./mock/monsterDetails";
import { mockConditionIndex } from "./mock/conditions";
import { mockConditionDetails } from "./mock/conditionDetails";

const USE_MOCKS = import.meta.env.DEV;

export async function fetchMonsterIndex() {
  if (USE_MOCKS) {
    return mockMonsterIndex;
  }

  const res = await fetch("/api/dnd5e/monsters.json");
  if (!res.ok) throw new Error("Failed to fetch monster list");
  return res.json();
}

export async function fetchMonsterByIndex(index: string) {
  if (USE_MOCKS) {
    const monster = mockMonsterDetails[index];
    if (!monster) throw new Error(`Mock monster not found: ${index}`);
    return monster;
  }
  
  const res = await fetch(`/api/dnd5e/monster/${index}.json`);
  if (!res.ok) throw new Error("Failed to fetch monster");
  return res.json();
}

export async function fetchConditionIndex() {
  if (USE_MOCKS) {
    return mockConditionIndex;
  }

  const res = await fetch("/api/dnd5e/conditions.json");
  if (!res.ok) throw new Error("Failed to fetch condition list");
  return res.json();
}

export async function fetchConditionByIndex(index: string) {
  if (USE_MOCKS) {
    const condition = mockConditionDetails[index];
    if (!condition) throw new Error(`Mock condition not found: ${index}`);
    return condition;
  }
  
  const res = await fetch(`/api/dnd5e/condition/${index}.json`);
  if (!res.ok) throw new Error("Failed to fetch condition");
  return res.json();
}

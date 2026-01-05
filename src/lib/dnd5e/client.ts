export async function fetchMonsterIndex() {
  const res = await fetch("/api/dnd5e/monsters.json");
  if (!res.ok) throw new Error("Failed to fetch monster list");
  return res.json();
}

export async function fetchMonsterByIndex(index: string) {
  const res = await fetch(`/api/dnd5e/monster/${index}.json`);
  if (!res.ok) throw new Error("Failed to fetch monster");
  return res.json();
}

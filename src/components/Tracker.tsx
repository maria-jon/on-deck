import { useState } from "react";
import "../styles/Tracker.scss";

import { type Character } from "../types/characters";

export default function Tracker({
  id: initialId,
  name: initialName,
  initiative: initialInitiative,
  hp: initialHp,
  ac: initialAc,
  type: initialType,
  hasActed: initialHasActed,
}: {
  id: number;
  name: string;
  initiative: number;
  hp: number;
  ac: number;
  type: string;
  hasActed: boolean;
}) {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [round, setRound] = useState<number>(1);
  const addRound = () => setRound((i) => i + 1);

  function toNumberOrEmpty(value: string) {
    if (value.trim() === "") return "";
    const n = Number(value);
    return Number.isNaN(n) ? "" : n;
  }
  
  function updateCharacter(id: string, patch: Partial<Character>) {
    setCharacters(prev => prev.map(c => (c.id === id ? { ...c, ...patch } : c)));
  }

  function addNew() {
    console.log("click");
    setCharacters(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        initiative: "",
        hp: "",
        ac: "",
        type: "pc",
        hasActed: false,
      },
    ]);
  }

  return (
  <div className="tracker-wrapper">
    <header>
      <h2>Round {round}</h2>
      <div>
        Time: 14m 30s 
        <span> (button)</span>
      </div>
    </header>
    
    <div className="tracker-container">
      <div className="tracker-row head">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
      <div className="tracker-row item">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit">Edit</div>
      </div>
      {characters.map((c, index) => (
        <div
          key={c.id}
          className={`tracker-row item row ${c.hasActed ? "row--acted" : ""} ${index === activeIndex ? "row--active" : ""}`}
        >
          <input 
            value={c.initiative}
            onChange={(e) => updateCharacter(c.id, { initiative: toNumberOrEmpty(e.target.value) })}
          />
          <input 
            value={c.name}
            onChange={(e) => updateCharacter(c.id, { name: e.target.value })}
          />
          <input 
            value={c.hp}
            onChange={(e) => updateCharacter(c.id, { hp: toNumberOrEmpty(e.target.value) })}
          />
          <input 
            value={c.ac}
            onChange={(e) => updateCharacter(c.id, { ac: toNumberOrEmpty(e.target.value) })}
          />
        </div>
      ))}
    </div>

    <div className="tracker-controls">
      <div className="control-buttons">
        <button>Next</button>
        <button>Sort</button>
      </div>
      <button onClick={addRound}>New round</button>
      <button onClick={addNew}>Add new</button>
    </div>
  </div>
  )
};
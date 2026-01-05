import { useState, useReducer } from "react";
import "../styles/Tracker.scss";

import { type Character } from "../types/characters";

const ACTIONS = {
  ADD: "add",
  UPDATE: "update",
  SORT: "sort",
  NEXT: "next",
  RESET_ROUND: "reset-round"
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.RESET_ROUND:
      return { round: state.round + 1 }
  }
}

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

  const [state, dispatch] = useReducer(reducer, { round: 1 });
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  //const [round, setRound] = useState<number>(1);
  //const addRound = () => setRound((i) => i + 1);
  function addRound() {
    dispatch({ type: ACTIONS.RESET_ROUND })
  }

  function toNumberOrEmpty(value: string) {
    if (value.trim() === "") return "";
    const n = Number(value);
    return Number.isNaN(n) ? "" : n;
  }
  
  function updateCharacter(id: string, patch: Partial<Character>) {
    setCharacters(prev => prev.map(c => (c.id === id ? { ...c, ...patch } : c)));
  }

  function addNew() {
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

  function sortByInitiative() {
    setCharacters(prev => {
      const sorted = [...prev].sort((a, b) => (Number(b.initiative) || 0) - (Number(a.initiative) || 0));
      return sorted.map(c => ({ ...c, hasActed: false }));
    });
    setActiveIndex(0);
  }

  function nextTurn() {
    setCharacters(prev => {
      if (prev.length === 0) return prev;
  
      const currentIndex = activeId ? prev.findIndex(c => c.id === activeId) : 0;
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  
      const current = prev[safeIndex];
      const updated = prev.map(c => (c.id === current.id ? { ...c, hasActed: true } : c));
  
      console.log(`Current:`, current);
      console.log(`Characters:`, characters);

      const nextIndex = (safeIndex + 1) % prev.length;
      setActiveId(prev[nextIndex].id);
  
      return updated;
    });

    console.log(`Characters:`, characters);
    
    const allHasActed = (character: Character) => {
      return character.hasActed === true;
    }
    if (characters.every(allHasActed)) {
      addRound();
      setCharacters(character => {
        const resetHasActed = character.map(c => ({ ...c, hasActed: false}));
        return resetHasActed;
      })
    }
  }
  

  return (
  <div className="tracker-wrapper">
    <header>
      <h2>Round {state?.round}</h2>
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
      {characters.map((c, index: number | null) => (
        <div
          key={c.id}
          className={`tracker-row item row ${c.hasActed ? "row--acted" : ""} ${index === activeId ? "row--active" : ""}`}
        >
          <input 
            name="initiative"
            value={c.initiative}
            onChange={(e) => updateCharacter(c.id, { initiative: toNumberOrEmpty(e.target.value) })}
          />
          <input 
            name="name"
            value={c.name}
            onChange={(e) => updateCharacter(c.id, { name: e.target.value })}
          />
          <input 
            name="hp"
            value={c.hp}
            onChange={(e) => updateCharacter(c.id, { hp: toNumberOrEmpty(e.target.value) })}
          />
          <input 
            name="ac"
            value={c.ac}
            onChange={(e) => updateCharacter(c.id, { ac: toNumberOrEmpty(e.target.value) })}
          />
        </div>
      ))}
    </div>

    <div className="tracker-controls">
      <div className="control-buttons">
        <button onClick={nextTurn}>Next</button>
        <button onClick={sortByInitiative}>Sort</button>
      </div>
      <button onClick={addRound}>New round</button>
      <button onClick={addNew}>Add new</button>
    </div>
  </div>
  )
};
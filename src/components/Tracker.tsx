import { useState, useReducer } from "react";
import "../styles/Tracker.scss";

import { type Character } from "../types/characters";

type TrackerState = {
  round: number;
  characters: Character[];
  activeId: string | null;
};

type Action =
  | { type: "ADD_NEW" }
  | { type: "UPDATE"; id: string; patch: Partial<Character> }
  | { type: "SORT" }
  | { type: "NEXT" }
  | { type: "RESET_ROUND" }
;

const initialState: TrackerState = {
  round: 1,
  characters: [],
  activeId: null,
};

function reducer(state: TrackerState, action: Action): TrackerState {
  switch (action.type) {
    case "RESET_ROUND": {
      return { 
        ...state,
        round: state.round + 1,
        characters: state.characters.map((c) => ({ ...c, hasActed: false })),
        // activeId
      };
    }

    case "ADD_NEW": {
      const newChar: Character = {
        id: crypto.randomUUID(),
        name: "",
        initiative: "",
        hp: "",
        ac: "",
        type: "pc",
        hasActed: false,
      };

      const nextCharacters = [...state.characters, newChar];
      
      // If this is the first character, make them active
      const nextActiveId = state.activeId ?? newChar.id;

      return { ...state, characters: nextCharacters, activeId: nextActiveId };
    }

    case "UPDATE": {
      return {
        ...state,
        characters: state.characters.map((c) => 
          c.id === action.id ? { ...c, ...action.patch } : c
        ),
      };
    }

    case "SORT":{
      const sorted = [...state.characters].sort(
        (a, b) => (Number(b.initiative) || 0) - (Number(a.initiative) || 0)        
      );

      const reset = sorted.map((c) => ({ ...c, hasActed: false }));

      // After sorting, set active to first item (or null if list empty)
      return {
        ...state,
        characters: reset,
        activeId: reset[0]?.id ?? null,
      };
    }

    case "NEXT": {
      const list = state.characters;
      if (list.length === 0) return state;

      const currentIndex = state.activeId
        ? list.findIndex((c) => c.id === state.activeId)
        : 0;

      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const current = list[safeIndex];

      // 1) mark current as acted
      const updated = list.map((c) =>
        c.id === current.id ? { ...c, hasActed: true } : c
      );

      // 2) compute next active (move forward in the updated order)
      const nextIndex = (safeIndex + 1) % updated.length;
      const nextActiveId = updated[nextIndex]?.id ?? null;

      // 3) if everyone has acted, new round + reset hasActed
      const allActed = updated.length > 0 && updated.every((c) => c.hasActed);
      if (allActed) {
        const resetForNewRound = updated.map((c) => ({ ...c, hasActed: false }));
        return {
          ...state,
          round: state.round + 1,
          characters: resetForNewRound,
          activeId: resetForNewRound[0]?.id ?? null,
        };
      }

      return { ...state, characters: updated, activeId: nextActiveId };
    }

    default:
      return state;
  }
}

export default function Tracker() {

  const [state, dispatch] = useReducer(reducer, initialState);
  /*
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [round, setRound] = useState<number>(1);
  */
  //const addRound = () => setRound((i) => i + 1);

  function toNumberOrEmpty(value: string) {
    if (value.trim() === "") return "";
    const n = Number(value);
    return Number.isNaN(n) ? "" : n;
  }
  /*
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
  */

  return (
  <div className="tracker-wrapper">
    <header>
      <h2>Round {state.round}</h2>
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
      {state.characters.map((c) => (
        <div
          key={c.id}
          className={`tracker-row item row ${c.hasActed ? "row--acted" : ""} ${
            c.id === state.activeId ? "row--active" : ""
          }`}
        >
          <input 
            name="initiative"
            value={c.initiative}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                id: c.id,
                patch: { initiative: toNumberOrEmpty(e.target.value) },
              })
            }
          />
          <input 
            name="name"
            value={c.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                id: c.id,
                patch: { name: e.target.value },
              })
            }
          />
          <input 
            name="hp"
            value={c.hp}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                id: c.id,
                patch: { hp: toNumberOrEmpty(e.target.value) },
              })
            }
          />
          <input 
            name="ac"
            value={c.ac}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                id: c.id,
                patch: { ac: toNumberOrEmpty(e.target.value) },
              })
            }
          />
        </div>
      ))}
    </div>

    <div className="tracker-controls">
    <div className="control-buttons">
          <button onClick={() => dispatch({ type: "NEXT" })}>Next</button>
          <button onClick={() => dispatch({ type: "SORT" })}>Sort</button>
        </div>

        <button onClick={() => dispatch({ type: "RESET_ROUND" })}>
          New round
        </button>

        <button onClick={() => dispatch({ type: "ADD_NEW" })}>Add new</button>
    </div>
  </div>
  )
};
import { useState, useReducer, useEffect } from "react";
import "../../styles/Tracker.scss";

import { type Character } from "../../types/characters";
import { type MonsterListItem } from "./NameAutocomplete";
import { fetchMonsterIndex, fetchMonsterByIndex } from "../../lib/dnd5e/client"
import TrackerRow from "./TrackerRow";
import Stopwatch from "../Stopwatch";

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
  | { type: "REMOVE"; id: string }
;

function createEmptyCharacter(): Character {
  return {
    id: crypto.randomUUID(),
    name: "",
    initiative: "",
    hp: "",
    ac: "",
    type: "pc",
    hasActed: false,
  }
}

function makeInitialState(): TrackerState {
  const characters = Array.from({ length: 4 }, () => createEmptyCharacter());
  return {
    round: 1,
    characters,
    activeId: characters[0]?.id ?? null,
  }
}

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

    case "REMOVE": {
      const filtered = state.characters.filter((c) => c.id !== action.id);

      // If list is empty after removal
      if (filtered.length === 0) {
        return {
          ...state,
          characters: [],
          activeId: null,
        };
      }
      
      // If removed character was NOT the active one, keep activeId
      if (state.activeId !== action.id) {
        return {
          ...state,
          characters: filtered,
        };
      }

      // If removed character WAS active -> 
      // move to next character in list or fallback to first
      const removedIndex = state.characters.findIndex(
        (c) => c.id === action.id
      );

      const nextIndex = 
      removedIndex >= filtered.length ? 0 : removedIndex;

      return {
        ...state,
        characters: filtered,
        activeId: filtered[nextIndex]?.id ?? null,
      };
    }

    default:
      return state;
  }
}

export default function Tracker() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState);
  const [monsterIndex, setMonsterIndex] = useState<MonsterListItem[]>([]);
  const [monsterError, setMonsterError] = useState<string | null>(null);

  async function pickMonsterForRow(rowId: string, monsterIdx: string) {
    try {
      const monster = await fetchMonsterByIndex(monsterIdx);
  
      const hp = monster.hit_points;
  
      const ac =
        monster.armor_class?.[0]?.value ??
        monster.armor_class?.[0] ??
        "";
  
      dispatch({
        type: "UPDATE",
        id: rowId,
        patch: {
          name: monster.name,
          hp,
          ac,
          type: "monster",
          // initiative: leave blank or set later (dex mod / roll)
        },
      });
    } catch (e) {
      // optional: show a toast / inline message
      console.error("Failed to fetch monster", e);
    }
  }

  useEffect(() => {
    let cancelled = false;
  
    (async () => {
      try {
        const data = await fetchMonsterIndex(); // should return { results: [...] }
        if (!cancelled) setMonsterIndex(data.results ?? []);
      } catch (e) {
        if (!cancelled) setMonsterError("Could not load monster list");
      }
    })();
  
    return () => {
      cancelled = true;
    };
  }, []);

  return (
  <div className="tracker-wrapper">
    <header>
      <h2>Round {state.round}</h2>
      <Stopwatch />
    </header>
    
    <div className="tracker-container">
      <div className="tracker-row head">
        <div className="row-initiative">Initiative</div>
        <div className="row-name">Name</div>
        <div className="row-hp">HP</div>
        <div className="row-ac">AC</div>
        <div className="row-edit"></div>
      </div>
      {state.characters.map((c) => (
        <TrackerRow
          key={c.id}
          character={c}
          isActive={c.id === state.activeId}
          dispatch={dispatch}
          monsterIndex={monsterIndex}
          onPickMonster={pickMonsterForRow}
        />
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
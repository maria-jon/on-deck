import { useState, useReducer, useEffect } from "react";
import "../../styles/Tracker.scss";

import { type Character } from "../../types/characters";
import { type MonsterListItem } from "./NameAutocomplete";
import { fetchMonsterIndex, fetchMonsterByIndex } from "../../lib/dnd5e/client";
import TrackerRow from "./TrackerRow";
import Stopwatch from "../Stopwatch";
import { NextIcon, SortIcon, AddNewIcon, NewRoundIcon, LinkIcon } from "../utils/IconSVGs";

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
  | { type: "NEW_ROUND" }
  | { type: "REMOVE"; id: string }
;

type PersistedState = TrackerState;
const STORAGE_KEY = "initiative-tracker:v1";

function reducer(state: TrackerState, action: Action): TrackerState {
  switch (action.type) {
    case "NEW_ROUND": {
      return { 
        ...state,
        round: state.round + 1,
        characters: state.characters.map((c) => ({ ...c, hasActed: false })),
        activeId: state.characters[0]?.id ?? null,
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

// URL ENCODE/DECODE HELPERS

function encodeState(state: unknown): string {
  const json = JSON.stringify(state);
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function decodeState<T>(encoded: string): T {
  const bin = atob(encoded);
  const bytes = new Uint8Array([...bin].map((ch) => ch.charCodeAt(0)));
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

function loadFromUrlHash(): PersistedState | null {
  const hash = window.location.hash; // "#s=..."
  const match = hash.match(/(?:^#|&)s=([^&]+)/);
  if (!match) return null;

  try {
    return decodeState<PersistedState>(match[1]);
  } catch {
    return null;
  }
}

// LOCALSTORAGE HELPERS

function loadFromLocalStorage(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function saveToLocalStorage(state: PersistedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota/private mode issues
  }
}

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

function makeDefaultState(): TrackerState {
  const characters = Array.from({ length: 4 }, () => createEmptyCharacter());
  return {
    round: 1,
    characters,
    activeId: characters[0]?.id ?? null,
  }
}

function makeInitialState(): TrackerState {
  const fallback = makeDefaultState();

  if (typeof window === "undefined") return fallback;

  return loadFromUrlHash() ?? loadFromLocalStorage() ?? fallback;
}

export default function Tracker() {
  const [state, dispatch] = useReducer(reducer, undefined, makeInitialState);
  const [monsterIndex, setMonsterIndex] = useState<MonsterListItem[]>([]);
  const [monsterError, setMonsterError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

  function isEmptyRow(c: Character) {
    return (
      !c.name &&
      c.initiative === "" &&
      c.hp === "" &&
      c.ac === ""
    );
  }
  
  async function copySessionLink() {
    const compact: PersistedState = {
      ...state,
      characters: state.characters.filter((c) => !isEmptyRow(c)),
    };
  
    const encoded = encodeState(compact);
    const url = new URL(window.location.href);
    url.hash = `s=${encoded}`;
  
    await navigator.clipboard.writeText(url.toString());

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);  

  useEffect(() => {
    if (window.location.hash.includes("s=")) {
      history.replaceState(null, "", window.location.pathname);
    }
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
        <button 
          onClick={() => dispatch({ type: "NEXT" })}
          className="button-icon"
        >
          <NextIcon 
            size={24}
            ariaHidden={true}
          />
          Next
        </button>
        <button 
          onClick={() => dispatch({ type: "SORT" })}
          className="button-icon"
        >
          <SortIcon
            size={24}
            ariaHidden={true}
          />
          Sort
        </button>
      </div>

      <div className="control-buttons">
        <button 
          onClick={() => dispatch({ type: "NEW_ROUND" })}
          className="button-icon"
        >
          <NewRoundIcon 
            size={24}
            ariaHidden={true}
          />
          New round
        </button>

        <button 
          onClick={() => dispatch({ type: "ADD_NEW" })}
          className="button-icon"
        >
          <AddNewIcon 
            size={24}
            ariaHidden={true}
          />
          Add new
        </button>
      </div>
    </div>
    <div className="tracker-controls">
      <button 
        type="button" 
        onClick={copySessionLink}
        className="button-icon"
      >
        <LinkIcon 
          size={24}
          ariaHidden={true}
        />
          {copied ? "Session link copied!" : "Copy session link"}
      </button>
    </div>
  </div>
  )
};
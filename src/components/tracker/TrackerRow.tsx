import type { Dispatch } from "react";
import type { Character } from "../../types/characters";
import NameAutocomplete from "./NameAutocomplete";
import HealthInput from "./HealthInput";

type Action =
  | { type: "UPDATE"; id: string; patch: Partial<Character> }
  | { type: "REMOVE"; id: string };

type MonsterListItem = { index: string; name: string; url: string };

type TrackerRowProps = {
  character: Character;
  isActive: boolean;
  dispatch: React.Dispatch<Action>;

  monsterIndex?: MonsterListItem[];
  onPickMonster?: (rowId: string, monsterIndex: string) => void;
  onHpChange?: (rowId: string) => void;
};

function toNumberOrEmpty(value: string) {
  if (value.trim() === "") return "";
  const n = Number(value);
  return Number.isNaN(n) ? "" : n;
};

export default function TrackerRow ({
  character,
  isActive,
  dispatch,
  monsterIndex,
  onPickMonster,
}: TrackerRowProps) {
  const rowClassName = [
    "tracker-row",
    "item",
    "row",
    character.hasActed ? "row--acted" : "",
    isActive ? "row--active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return(
    <div className={rowClassName}>
      <input 
        className="input-initiative row-cell"
        name="initiative"
        value={character.initiative}
        onChange={(e) =>
          dispatch({
            type: "UPDATE",
            id: character.id,
            patch: { initiative: toNumberOrEmpty(e.target.value) },
          })
        }
      />
      <NameAutocomplete 
        value={character.name}
        onTyped={(name) => 
          dispatch({ type: "UPDATE", id: character.id, patch: { name } })
        }
        items={monsterIndex ?? []}
        onPick={(monsterIdx) => onPickMonster?.(character.id, monsterIdx)}
      />
      <HealthInput 
        value={character.hp}
        onTyped={(hp) => 
          dispatch({ type: "UPDATE", id: character.id, patch: { hp } })
        }
        onHpChange={(hp) => 
          dispatch({ type: "UPDATE", id: character.id, patch: { hp } })
        }
      />
      <input 
        className="input-ac row-cell"
        name="ac"
        value={character.ac}
        onChange={(e) =>
          dispatch({
            type: "UPDATE",
            id: character.id,
            patch: { ac: toNumberOrEmpty(e.target.value) },
          })
        }
      />
      <div className="row-edit row-cell">
        <button
          type="button"
          onClick={() => {
            if (confirm(`Remove ${character.name || "this character"}?`)) {
              dispatch({ type: "REMOVE", id: character.id });
            }
          }}
          aria-label={`Remove ${character.name || "character"}`}
        >
          x
        </button>
      </div>
    </div>
  )
}
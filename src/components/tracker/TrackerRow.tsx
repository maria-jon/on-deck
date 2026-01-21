import type { Character } from "../../types/characters";
import NameAutocomplete from "./NameAutocomplete";
import HealthInput from "./HealthInput";
import toNumberOrEmpty from "../utils/toNumberOrEmpty";
import { DeleteIcon } from "../utils/IconSVGs";

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
    <div 
      className={rowClassName}
      aria-label={`Character row ${character.name}`}
    >
      <input 
        className="input-initiative row-cell"
        name="initiative"
        value={character.initiative}
        aria-labelledby="initiative-label"
        autoComplete="off"
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
        rowId={character.id}
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
        hasActed={character.hasActed}
      />
      <input 
        className="input-ac row-cell"
        name="ac"
        value={character.ac}
        aria-labelledby="ac-label"
        autoComplete="off"
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
          className={`button-icon delete 
            ${character.hasActed ? "" : "button-dark"}`
          }
        >
          <DeleteIcon 
            size={24}
            ariaHidden={true}
          />
        </button>
      </div>
    </div>
  )
}
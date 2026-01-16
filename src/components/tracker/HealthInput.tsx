import { useEffect, useRef, useState } from "react";
import toNumberOrEmpty from "../utils/toNumberOrEmpty";
import { PlusMinusIcon, HeartPlusIcon, HeartMinusIcon } from "../utils/IconSVGs";

type Props = {
  value: number | "";                     // Current text in the input from parent
  onTyped: (next: number) => void;        // Call when user types
  onHpChange: (hp: number ) => void;      // Call when adjusting HP w/ modifier
  hasActed: boolean;

  disabled?: boolean;
};

export default function HealthInput({
  value,
  onTyped,
  onHpChange,
  hasActed,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);

  // Allows user to click outside of menu to close it
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Allows autofocus on Modifier input when opening menu
  const inputModifierRef = useRef<HTMLInputElement | null>(null);

  const hitPoints = value === "" ? 0 : value;

  const [hpModifier, setHpModifier] = useState<number | "">("");

  const options = [
    { name: "Heal", icon: "plus" }, 
    { name: "Damage", icon: "minus" }
  ];
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    onTyped(+next);
  }
  
  function handleModifierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHpModifier(toNumberOrEmpty(e.target.value));
  }

  function handleHpChange(changeType: string) {
    const mod = hpModifier === "" ? 0 : hpModifier;
    let newValue = 0;

    if (changeType === "Heal") newValue = hitPoints + mod;
    if (changeType === "Damage") newValue = hitPoints - mod;
    
    onHpChange(newValue);
    setHpModifier("");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      const el= wrapperRef.current;

      if (!el) return;

      // Close if user clicks outside of component
      if (!el.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputModifierRef.current?.focus();
      inputModifierRef.current?.select();
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="health-input row-cell">
      <input
        name="hp"
        value={value}
        aria-labelledby="hp-label"
        onChange={handleChange}
        disabled={disabled}
        aria-expanded={open}
        className="input-hp row-cell"
      />

      <button
        onClick={() => setOpen(o => !o)}
        className={`button-icon plus-minus 
          ${hasActed ? "" : "button-dark"}`
        }
      >
        <PlusMinusIcon 
            size={24}
            ariaHidden={true}
          />
      </button>

      {open && options && (
        <div className="health-input__menu" role="listbox">
          <label
            className="hp-modifier__label"
          >
            <span>Adjust HP</span>
            <input 
              ref={inputModifierRef}
              name="hp-modifier"
              type="number"
              className="hp-modifier"
              value={hpModifier}
              onChange={handleModifierChange}
            />
            {options.map((h) => (
              <button
                key={h.name}
                type="button"
                className={`health-input__item ${h.icon}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => handleHpChange(h.name)}
                role="option"
              >
                {h.icon === "plus" 
                  ? <HeartPlusIcon size={24} ariaHidden={true} />
                    : <HeartMinusIcon size={24} ariaHidden={true} />
                }
                {h.name}
              </button>
            ))}
          </label>
        </div>
      )}
    </div>
  );
}
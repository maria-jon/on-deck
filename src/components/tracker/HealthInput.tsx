import { useRef, useState } from "react";

type Props = {
  value: number | "";                          // Current text in the input from parent
  onTyped: (next: number) => void;        // Call when user types
  onHpChange: (hp: number ) => void;

  disabled?: boolean;
};

export default function HealthInput({
  value,
  onTyped,
  onHpChange,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);

  // Tracks if the user is currently interacting w/ inputs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputModifierRef = useRef<HTMLInputElement | null>(null);

  const hitPoints: number = Number(value);

  const [hpModifier, setHpModifier] = useState(0);

  const options = [
    { name: "Heal" }, 
    { name: "Damage" }
  ];
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    onTyped(+next);
  }
  
  function handleModifierChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setHpModifier(+next);
  }

  function handleHpChange(changeType: string) {
    let newValue = 0;

    if (changeType === "Heal") {
      const add = (a: number, b: number) => {return a + b};

      newValue = add(hitPoints, hpModifier);
    }

    if (changeType === "Damage") {
      const sub = (a: number, b: number) => {return a - b};

      newValue = sub(hitPoints, hpModifier);
    }
    onHpChange(newValue);

    setHpModifier(0);

    setOpen(false);
  }

  function handleBlur() {
    // Delay so a click on a dropdown item still registers
    window.setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="health-input row-cell">
      <input
        ref={inputRef}
        name="hp"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        aria-expanded={open}
        className="input-hp row-cell"
      />

      <button
        onClick={() => setOpen(!open)}
      >
        +/-
      </button>

      {open && options && (
        <div className="health-input__menu" role="listbox">
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
              className="health-input__item"
              onMouseDown={(e) => {
                // Prevent blur firing before click
                e.preventDefault();
              }}
              onClick={() => handleHpChange(h.name)}
              role="option"
            >
              {h.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
import { useEffect, useMemo, useRef, useState } from "react";

export type MonsterListItem = {
  index: string;
  name: string;
  url: string;
};

type Props = {
  value: string;                          // Current text in the input from parent
  onTyped: (next: string) => void;        // Call when user types
  items: MonsterListItem[];               // Full monster list
  onPick: (monsterIndex: string) => void; // Call when user selects suggestion

  disabled?: boolean;
  minChars?: number;     // Default 2
  maxResults?: number;   // Default 8
};

export default function NameAutocomplete({
  value,
  onTyped,
  items,
  onPick,
  disabled = false,
  minChars = 2,
  maxResults = 8,
}: Props) {
  const [open, setOpen] = useState(false);

  // Tracks if the user is currently interacting 
  const inputRef = useRef<HTMLInputElement | null>(null);

  const query = value.trim().toLowerCase();

  const matches = useMemo(() => {
    if (query.length < minChars) return [];
    // switch to startsWith?
    return items
      .filter((m) => m.name.toLowerCase().includes(query))
      .slice(0, maxResults);
  }, [items, query, minChars, maxResults]);

  // Close dropdown if query becomes too short
  useEffect(() => {
    if (query.length < minChars) setOpen(false);
  }, [query, minChars]);

  function handleFocus() {
    if (matches.length > 0) setOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    onTyped(next);

    // Open as soon as it can show results
    if (next.trim().length >= minChars) setOpen(true);
  }

  function handlePick(monsterIndex: string) {
    onPick(monsterIndex);
    setOpen(false);

    // Keep focus 
    inputRef.current?.focus();
  }

  function handleBlur() {
    // Delay so a click on a dropdown item still registers
    window.setTimeout(() => setOpen(false), 120);
  }

  // Minimal keyboard support (Escape to close)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className="name-autocomplete">
      <input
        ref={inputRef}
        name="name"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        disabled={disabled}
        aria-autocomplete="list"
        aria-expanded={open}
        className="input-name row-cell"
      />

      {open && matches.length > 0 && (
        <div className="name-autocomplete__menu" role="listbox">
          {matches.map((m) => (
            <button
              key={m.index}
              type="button"
              className="name-autocomplete__item"
              onMouseDown={(e) => {
                // Prevent blur firing before click
                e.preventDefault();
              }}
              onClick={() => handlePick(m.index)}
              role="option"
            >
              {m.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
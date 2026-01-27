import { useEffect, useMemo, useRef, useState } from "react";

export type MonsterListItem = {
  index: string;
  name: string;
  url: string;
};

type Props = {
  value: string;                          // Current text in the input from parent
  rowId: string;
  onTyped: (next: string) => void;        // Call when user types
  items: MonsterListItem[];               // Full monster list
  onPick: (monsterIndex: string) => void; // Call when user selects suggestion

  disabled?: boolean;
  minChars?: number;     // Default 2
  maxResults?: number;   // Default 8
};

export default function NameAutocomplete({
  value,
  rowId,
  onTyped,
  items,
  onPick,
  disabled = false,
  minChars = 2,
  maxResults = 8,
}: Props) {
  const [open, setOpen] = useState(false);

  // Tracks if the user is currently interacting with name input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Tracks if the user is currently interacting with wrapper
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const query = value.trim().toLowerCase();

  const listBoxId = `listbox-${rowId}`;

  const matches = useMemo(() => {
    if (query.length < minChars) return [];
    
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

  function handleWrapperBlur(e: React.FocusEvent<HTMLDivElement>) {
    const nextFocused = e.relatedTarget as Node | null;
    const el = wrapperRef.current;

    // Close if focus is outside of component
    if (!el) return;

    if (nextFocused && !el.contains(nextFocused)) {
      setOpen(false);
    }

    // Close if null 
    if (!nextFocused) {
      setOpen(false);
    }
  }

  // Minimal keyboard support (Escape to close)
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div 
      ref={wrapperRef}
      className="name-autocomplete row-cell"
      role="combobox"
      aria-expanded={open}
      aria-controls={open ? listBoxId : undefined}
      aria-haspopup="listbox"
      onBlur={handleWrapperBlur}
    >
      <input
        ref={inputRef}
        name="name"
        value={value}
        className="input-name row-cell"
        aria-labelledby="name-label"
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        disabled={disabled}
        aria-autocomplete="list"
      />

      {open && matches.length > 0 && (
        <div 
          className="name-autocomplete__menu" 
          role="listbox"
          id={listBoxId}
        >
          {matches.map((m) => (
            <button
              key={m.index}
              type="button"
              className="name-autocomplete__item"
              onMouseDown={(e) => e.preventDefault()}
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
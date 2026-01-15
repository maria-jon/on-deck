import { useEffect, useMemo, useState } from "react";

import { TimerPauseIcon, TimerResetIcon, TimerStartIcon } from "./utils/IconSVGs";
import { formatTime } from "./utils/formatTime";

type Props = {
  /** Optional: start running automatically */
  autoStart?: boolean;

  /** Optional: tick frequency in ms */
  tickMs?: number;
};

export default function Stopwatch({ autoStart = false, tickMs = 250 }: Props) {
  const [isRunning, setIsRunning] = useState(autoStart);

  // Total elapsed time accumulated while paused
  const [elapsedMs, setElapsedMs] = useState(0);

  // Timestamp when we last started (null when paused)
  const [startTs, setStartTs] = useState<number | null>(
    autoStart ? Date.now() : null
  );

  const [now, setNow] = useState(Date.now());

  // Update elapsed time while running
  useEffect(() => {
    if (!isRunning || startTs === null) return;

    const id = window.setInterval(() => {
      setNow(Date.now());
    }, tickMs);

    return () => window.clearInterval(id);
  }, [isRunning, startTs, tickMs]);

  // Compute "live" elapsed time 
  const liveElapsed = useMemo(() => {
    if (!isRunning || startTs === null) return elapsedMs;
    return elapsedMs + (now - startTs);
  }, [elapsedMs, isRunning, startTs, now]);

  function toggleRunning() {
    setIsRunning((running) => {
      if (running) {
        // stopping: fold current run into elapsedMs
        if (startTs !== null) {
          setElapsedMs((prev) => prev + (Date.now() - startTs));
        }
        setStartTs(null);
        return false;
      } else {
        // starting
        setNow(Date.now());
        setStartTs(Date.now());
        return true;
      }
    });
  }

  function reset() {
    setElapsedMs(0);
    setStartTs(isRunning ? Date.now() : null);
  }

  return (
    <div className="stopwatch">
      <span className="stopwatch__time" aria-live="polite">
        {formatTime(liveElapsed)}
      </span>

      <div className="stopwatch__controls">
      <button 
          type="button" 
          onClick={reset} 
          disabled={liveElapsed === 0}
          aria-label="Reset timer"
          className="button-warning"
        >
          <TimerResetIcon 
            size={24}
            fill="#3D340D"
            ariaHidden={true}
          />
        </button>

        <button 
          type="button" 
          onClick={toggleRunning}
          aria-label="Toggle timer"
        >
          {isRunning ? <TimerPauseIcon size={24} fill="#3D340D" ariaHidden={true} /> 
            : <TimerStartIcon size={24} fill="#3D340D" ariaHidden={true} />
          }
        </button>
      </div>
    </div>
  );
}
import { useEffect, useMemo, useState, type SVGProps } from "react";

import { TimerPauseIcon, TimerResetIcon, TimerStartIcon } from "./utils/IconSVGs";

type Props = {
  /** Optional: start running automatically */
  autoStart?: boolean;

  /** Optional: tick frequency in ms */
  tickMs?: number;
};

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad2 = (n: number) => String(n).padStart(2, "0");

  // Show hours only when needed 
  return hours > 0
    ? `${hours}:${pad2(minutes)}:${pad2(seconds)}`
    : `${minutes}:${pad2(seconds)}`;
}

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
        >
          <TimerResetIcon 
            size={24}
            fill="#3D340D"
          />
        </button>
        
        <button 
          type="button" 
          onClick={toggleRunning}
          aria-label="Toggle timer"
        >
          <span>
            {isRunning ? <TimerPauseIcon size={24} fill="#3D340D" /> 
              : <TimerStartIcon size={24} fill="#3D340D" />
            }
          </span>
        </button>
      </div>
    </div>
  );
}
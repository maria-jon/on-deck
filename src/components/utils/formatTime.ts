export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad2 = (n: number) => String(n).padStart(2, "0");

  // Show hours only when needed 
  return hours > 0
    ? `${hours}h ${pad2(minutes)}m ${pad2(seconds)}s`
    : `${minutes}m ${pad2(seconds)}s`;
}
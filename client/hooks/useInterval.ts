import { useEffect, useState } from "react";

export function useInterval(fn: () => void, ms: number) {
  const [interval, setIntervalState] = useState<null | NodeJS.Timeout>(null);
  useEffect(() => {
    // Set interval
    setIntervalState(setInterval(fn, ms));

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fn, ms, interval]);

  // Return clear function
  return () => {
    if (interval) clearInterval(interval);
  };
}

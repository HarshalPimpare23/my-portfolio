import { useEffect, useRef, useState } from "react";
import { safeGetJSON, safeSetJSON } from "../utils/storage";

export default function useLocalStorageState(key, initial) {
  const [state, setState] = useState(() => {
    const stored = safeGetJSON(key, undefined);
    if (stored === undefined) return typeof initial === "function" ? initial() : initial;
    return stored;
  });

  const timerRef = useRef(null);
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => safeSetJSON(key, state), 150);
    return () => clearTimeout(timerRef.current);
  }, [key, state]);

  return [state, setState];
}

import { useState, useEffect } from "react";

export function useLocalStorageState(key, options = {}) {
  const { defaultValue = null } = options;

  const [value, setValue] = useState(defaultValue);

  // Leggi da localStorage solo dopo il montaggio
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        setValue(JSON.parse(storedValue));
      } catch (error) {
        console.error("Failed to parse localStorage value", error);
      }
    }
  }, [key]);

  // Scrivi su localStorage ogni volta che `value` cambia
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

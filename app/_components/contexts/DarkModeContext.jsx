"use client";

import { useLocalStorageState } from "@/app/_hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // Impostiamo un valore di default (false), poi lo aggiorneremo con matchMedia nel client
  const [isDarkMode, setIsDarkMode] = useLocalStorageState("isDarkMode", {
    defaultValue: false,
  });

  // Usa useEffect per leggere le preferenze del sistema *solo nel browser*
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode((prev) => {
      // Solo se non c'è già una preferenza salvata
      if (prev === null || prev === undefined) return prefersDark;
      return prev;
    });
  }, []);

  // Aggiorna la classe sul <html>
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.toggle("dark");
    else document.documentElement.classList.toggle("dark");
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prev) => !prev);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };

"use client";

import { createContext, useContext, useMemo, useState } from "react";

const FormButtonsContext = createContext();

export function FormButtonsContextProvider({ children }) {
  const [buttonState, setButtonState] = useState("idle");

  const FormButtonsContextValue = useMemo(
    () => ({ buttonState, setButtonState }),
    [buttonState],
  );

  return (
    <FormButtonsContext.Provider value={FormButtonsContextValue}>
      {children}
    </FormButtonsContext.Provider>
  );
}

export function useFormButtonsContext() {
  const context = useContext(FormButtonsContext);
  if (!context) {
    throw new Error(
      "useFormButtonsContext deve essere racchiuso in un FormButtonsContextProvider",
    );
  }
  return context;
}

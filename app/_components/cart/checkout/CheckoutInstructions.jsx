"use client";

import { Check, CopyIcon } from "lucide-react";
import { useRef, useState } from "react";

function CheckoutInstructions() {
  const [isClicked, setIsClicked] = useState(false);
  const textRef = useRef(null);

  const copy = async () => {
    const text = textRef.current.textContent;

    try {
      await navigator.clipboard.writeText(text);
      setIsClicked((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white text-black dark:bg-black dark:text-white">
      <ul className="xs:text-sm list-disc space-y-0.5 px-4 text-xs">
        <li>Copia il numero della carta di test.</li>
        <li>Inserisci una data di scadenza futura per la carta.</li>
        <li>Inserisci un numero di 3 cifre per il CVV.</li>
      </ul>
      <div className="flex w-fit items-center justify-between gap-5 rounded-xl border border-gray-200 px-3 py-1 dark:border-zinc-800">
        <span ref={textRef} aria-readonly>
          4242 4242 4242 4242
        </span>
        <button
          type="button"
          title={isClicked ? "Numero carta copiato" : "Copia numero carta"}
          aria-label={isClicked ? "Numero carta copiato" : "Copia numero carta"}
          className="cursor-pointer rounded bg-gray-100 p-1.5 transition-colors duration-200 hover:bg-gray-200 active:bg-gray-200 disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent disabled:active:bg-transparent dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:active:bg-zinc-800"
          disabled={isClicked}
          onClick={copy}
        >
          {isClicked ? (
            <Check
              aria-hidden
              className="size-4 text-green-600 dark:text-green-500"
            />
          ) : (
            <CopyIcon aria-hidden className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

export default CheckoutInstructions;

"use client";

import { useEffect } from "react";
import Button from "./_components/ui/Button";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section
      role="alert"
      aria-labelledby="error-heading"
      className="flex min-h-screen flex-col items-center justify-center gap-3 pb-10"
    >
      <h2 id="error-heading" className="text-center text-2xl">
        Qualcosa è andato storto! 😓
      </h2>
      <p
        className="text-primary-dark-950 max-w-md text-center text-base dark:text-gray-50"
        role="status"
      >
        Si è verificato un errore durante il caricamento della pagina. Puoi
        riprovare cliccando il pulsante qui sotto.
      </p>
      <Button
        className="rounded px-4"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
        ariaLabel="Riprova a caricare la pagina"
      >
        Riprova
      </Button>
    </section>
  );
}

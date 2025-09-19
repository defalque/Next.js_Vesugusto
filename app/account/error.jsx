"use client";

import Button from "../_components/ui/Button";

export default function Error({ error, reset }) {
  return (
    <section
      role="alert"
      aria-labelledby="error-heading"
      className="flex flex-col items-center justify-center gap-6"
    >
      <h1 id="error-heading" className="text-3xl font-semibold">
        Qualcosa è andato storto!
      </h1>
      <p className="text-lg" role="status">
        {error.message}
      </p>

      <Button
        className="rounded px-2 py-1 text-lg"
        ariaLabel="Riprova a caricare la pagina"
        onClick={reset}
      >
        Riprova
      </Button>
    </section>
  );
}

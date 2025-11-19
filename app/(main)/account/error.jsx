"use client";

export default function Error({ error, reset }) {
  return (
    <div className="grid h-full place-content-center py-20">
      <section
        role="alert"
        aria-labelledby="error-heading"
        className="my-auto flex flex-col items-center justify-center gap-6"
      >
        <h1 id="error-heading" className="text-3xl font-semibold">
          Qualcosa è andato storto!
        </h1>
        <p className="text-lg" role="status">
          {error.message}
        </p>

        <button
          className="cursor-pointer rounded-full bg-black px-4 py-2 font-medium text-white shadow-sm transition-all duration-300 text-shadow-2xs hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
          onClick={
            // Attempt to recover by trying to re-render the invoices route
            () => reset()
          }
        >
          Riprova
        </button>
      </section>
    </div>
  );
}

"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Qualcosa è andato storto!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block cursor-pointer bg-primary-950 dark:bg-primary-dark-200 hover:bg-primary-900 dark:hover:bg-primary-dark-300 text-primary-100 rounded-2xl px-6 py-3 text-lg"
        onClick={reset}
      >
        Riprova
      </button>
    </main>
  );
}

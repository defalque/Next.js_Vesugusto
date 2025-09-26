import { ArrowRightIcon } from "@heroicons/react/24/outline";

function Newsletter({ font }) {
  return (
    <section
      role="region"
      aria-labelledby="newsletter-signup"
      className="bg-brand-color page-padding flex w-full flex-col items-center gap-x-15 gap-y-6 py-10 sm:py-15 md:py-20 lg:flex-row"
    >
      <div className="flex h-max w-full flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="space-y-3">
          <h2
            id="newsletter-signup"
            className={`from-primary-50 to-primary-400 bg-linear-to-tr bg-clip-text p-0.5 text-2xl font-bold text-transparent text-shadow-2xs sm:text-4xl ${font.className}`}
          >
            Iscriviti e resta aggiornato
          </h2>
          <h3
            id="newsletter-description"
            className="bg-primary-200/90 bg-clip-text text-sm/6 text-transparent sm:text-base"
          >
            Unisciti alla nostra newsletter per ricevere tutte le ultime novità,
            sconti e offerte.
          </h3>
        </div>
      </div>

      <form className="relative w-full">
        <label htmlFor="newsletter" className="sr-only">
          Inserisci la tua email
        </label>
        <input
          type="email"
          id="newsletter"
          name="email"
          required
          aria-required="true"
          aria-describedby="newsletter-description"
          className="focus relative block w-full rounded-xl bg-white/80 px-5 py-3.5 pr-10 text-base shadow-xs backdrop-blur-xs transition-colors duration-200 placeholder:text-zinc-500 sm:text-lg dark:bg-black/30 dark:placeholder:text-zinc-300/90"
          placeholder="Inserisci la tua email"
        />
        <button
          aria-label="Iscriviti ora"
          type="submit"
          className="custom-control-focus absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-base font-bold text-white transition-colors duration-200 hover:bg-black/80 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/80 dark:active:bg-white/80"
        >
          <ArrowRightIcon aria-hidden className="size-5" />
        </button>
      </form>
    </section>
  );
}

export default Newsletter;

import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Button from "./_components/ui/Button";
import Link from "next/link";

async function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center gap-2"
    >
      <FaceFrownIcon className="w-10 text-zinc-600 dark:text-white" />
      <h1 id="not-found-heading" className="sr-only">
        Pagina non trovata
      </h1>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="mb-5 text-center">
        Non è stato possibile trovare la pagina da te richiesta.
      </p>
      <Link
        className="cursor-pointer rounded-full bg-black px-4 py-2 font-medium text-white shadow-sm transition-all duration-300 text-shadow-2xs hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
        href="/shop"
      >
        Vai allo shop
      </Link>
    </section>
  );
}

export default NotFound;

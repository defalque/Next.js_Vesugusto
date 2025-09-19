import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Button from "./_components/ui/Button";

async function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center gap-2"
    >
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h1 id="not-found-heading" className="sr-only">
        Pagina non trovata
      </h1>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="text-center">
        Non è stato possibile trovare la pagina da te richiesta.
      </p>
      <Button
        className="mt-2 rounded-full px-4 py-1 text-base font-semibold sm:text-lg"
        href="/shop"
      >
        Vai ai prodotti
      </Button>
    </section>
  );
}

export default NotFound;

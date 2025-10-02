import Button from "@/app/_components/ui/Button";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="-mt-20 flex h-full min-h-screen flex-col items-center justify-center gap-2"
    >
      <h1 id="not-found-heading" className="sr-only">
        Errore: dettagli ordine non trovati.
      </h1>

      <FaceFrownIcon aria-hidden className="w-10 text-gray-400" />

      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="text-center">
        Non siamo riusciti a trovare i dettagli del tuo ordine.
      </p>
      <Button
        className="mt-2 rounded-full px-4 py-1 text-base font-semibold sm:text-lg"
        href="/shop"
      >
        Torna allo shop
      </Button>
    </section>
  );
}

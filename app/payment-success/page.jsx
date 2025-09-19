import { auth } from "@/auth";
import { formatCurrency } from "../_lib/formatCurrency";
import { redirect } from "next/navigation";
import { getUserOrder } from "../_lib/data-service";
import Image from "next/image";
import Button from "../_components/ui/Button";
import { invalidateOrderToken } from "../_lib/actions";

// http://localhost:3000/payment-success?amount=3500&payment_intent=pi_3S8IdZLSaUlqfQsn1h8FlkDH&payment_intent_client_secret=pi_3S8IdZLSaUlqfQsn1h8FlkDH_secret_6SKwHhIKMXeR3Zhy2VNhWS3L9&redirect_status=succeeded

export const metadata = {
  title: "Grazie per l'acquisto",
  description:
    "Grazie per aver acquistato su Vesugusto! Il tuo ordine è stato confermato. Scopri i nostri nuovi prodotti e approfitta delle offerte riservate a te.",
};

async function Page({ searchParams }) {
  const params = await searchParams;
  if (
    !params.amount ||
    !params.payment_intent ||
    !params.payment_intent_client_secret ||
    !params.redirect_status
  ) {
    redirect("/shop");
  }

  const amount = params.amount;
  const paymentIntent = params.payment_intent;

  const session = await auth();
  const { data, orderId, success } = await getUserOrder(
    session.user.userId,
    paymentIntent,
  );
  if (!success || !data) {
    redirect("/shop");
  }

  const ok = await invalidateOrderToken(orderId);
  if (!ok) {
    redirect("/shop");
  }

  return (
    <div className="flex min-h-screen items-start justify-center px-5 py-10 md:px-30">
      <section
        aria-labelledby="thankyou-page-heading"
        className="text-primary-dark-950 xs:px-5 flex w-full max-w-4xl min-w-fit flex-col gap-20 rounded-lg bg-gray-50 px-3 py-5 dark:bg-zinc-900/80"
      >
        <div className="mx-auto space-y-5 text-center">
          <h1 className="xs:text-5xl text-4xl font-semibold text-gray-900 text-shadow-lg/10 text-shadow-black sm:text-7xl dark:text-gray-300 dark:text-shadow-white/50">
            Grazie!
          </h1>
          <span id="thankyou-page-heading" className="sr-only">
            Riengraziamento per l'acquisto e riepilogo dettagli dell’ordine
          </span>
          <p className="xs:text-sm/7 max-w-5xl min-w-xs text-xs/5 whitespace-pre-line text-gray-900 text-shadow-2xs text-shadow-black/10 sm:text-lg dark:text-gray-300 dark:text-shadow-white/20">
            Siamo entusiasti di averti con noi! Il tuo ordine è stato ricevuto
            correttamente e presto sarà pronto per la spedizione. Nel frattempo,
            dai un’occhiata alle nostre ultime novità e approfitta delle offerte
            riservate ai nostri clienti.
          </p>
          <div className="inline-flex flex-wrap justify-center gap-5">
            <Button
              href="/shop"
              className="mt-2 rounded-full px-3 py-1 text-base font-semibold sm:text-lg"
            >
              Visita i nostri prodotti
            </Button>
            <Button
              href="/account/orders"
              className="mt-2 rounded-full px-3 py-1 text-base font-semibold sm:text-lg"
            >
              Vai ai tuoi ordini
            </Button>
          </div>
        </div>

        <div className="text-primary-dark-950 dark:bg-primary-dark-950 bg-primary-50 divide-y divide-gray-200 rounded-lg px-5 py-2 dark:divide-zinc-800 dark:text-gray-200">
          <div className="flex flex-wrap justify-between gap-4 py-4 text-xl font-semibold">
            <div className="space-x-2">
              <span className="text-lg text-zinc-500 dark:text-gray-100/65">
                Codice ordine:
              </span>
              <span className="text-2xl">{orderId}</span>
            </div>
            <div className="space-x-2">
              <span className="text-lg text-zinc-500 dark:text-gray-100/65">
                Totale pagato:
              </span>
              <span className="text-2xl">{formatCurrency(amount)}</span>
            </div>
          </div>

          <div className="flex h-max flex-col divide-y divide-gray-200 dark:divide-zinc-800">
            {data.map((product, index) => (
              <div
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-6`}
                key={product.id}
              >
                <div className="relative aspect-2/3 h-30">
                  <Image
                    priority={index < 2}
                    src={product.product.image}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    alt={`Immagine del prodotto ${product.product.name}`}
                    className="rounded-lg object-cover"
                    sizes="(min-width: 64rem) 50vw, 100vw"
                  />
                </div>

                <div className="flex h-full flex-col gap-2">
                  <h1 className="font-semibold">{product.product.name}</h1>
                  <p className="hidden text-xs font-light sm:block sm:text-sm">
                    {product.product.details || ""}
                  </p>
                  <p className="mt-auto text-sm">
                    Prezzo:{" "}
                    {formatCurrency(
                      product.product.regularPrice - product.product.discount,
                    )}
                  </p>
                  <p className="mt-auto text-sm">
                    Quantità: {product.quantity}
                  </p>
                </div>

                <span className="font-semibold">
                  {formatCurrency(product.orderItemPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;

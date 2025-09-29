import { auth } from "@/auth";
import { formatCurrency } from "../../_lib/formatCurrency";
import { notFound, redirect } from "next/navigation";
import { getUserOrder } from "../../_lib/data-service";
import Image from "next/image";
import Button from "../../_components/ui/Button";
import { invalidateOrderToken } from "../../_lib/actions";
import { resend } from "../../_lib/resend";
import { ConfirmedOrderEmail } from "../../_components/ui/EmailTemplate";

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
    // redirect("/shop");
    notFound();
  }

  const amount = params.amount;
  const paymentIntent = params.payment_intent;

  const session = await auth();
  const { data, orderId, success } = await getUserOrder(
    session.user.userId,
    paymentIntent,
  );
  if (!success || !data) {
    // redirect("/shop");
    notFound();
  }

  const ok = await invalidateOrderToken(orderId);
  if (!ok) {
    // redirect("/shop");
    notFound();
  }

  // Invio email al cliente dopo conferma ordine
  await resend.emails.send({
    from: "Vesugusto <noreply@resend.dev>",
    // to: [session.user.email], // in produzione
    to: ["marcodefalco2017@libero.it"], // in sviluppo
    subject: "Conferma del tuo ordine su Vesugusto",
    react: ConfirmedOrderEmail({
      username: session.user.name,
      items: data.map((item) => ({
        id: item.id,
        name: item.product.name,
        quantity: item.quantity,
        price: formatCurrency(item.orderItemPrice),
        image: item.product.image,
      })),
      total: formatCurrency(amount),
    }),
  });

  const formattedAriaLabel = `Ordine ricevuto. Codice ordine ${orderId}, importo di ${formatCurrency(amount)}.`;

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-10 sm:px-6 md:px-30">
      <section
        aria-labelledby="thankyou-page-heading"
        className="text-primary-dark-950 xs:px-5 flex w-full max-w-4xl min-w-fit flex-col gap-20 rounded-lg bg-gray-50 px-3 py-5 dark:bg-zinc-900/80"
      >
        <span id="thankyou-page-heading" className="sr-only">
          Riengraziamento per l'acquisto e riepilogo dettagli dell’ordine
        </span>

        <div aria-live="polite" className="sr-only">
          {formattedAriaLabel}
        </div>

        <div
          role="group"
          aria-label="Sezione ringraziamento"
          className="mx-auto space-y-5 text-center"
        >
          <h1 className="xs:text-5xl text-4xl font-semibold text-black text-shadow-lg/10 text-shadow-black sm:text-7xl dark:text-white dark:text-shadow-white/50">
            Grazie!
          </h1>

          <p className="xs:text-sm/relaxed max-w-5xl min-w-xs text-xs/relaxed whitespace-pre-line text-black/65 text-shadow-2xs text-shadow-black/10 sm:text-lg/relaxed dark:text-white/85 dark:text-shadow-white/20">
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

        <div
          role="group"
          aria-label="Sezione riepilogo del tuo ordine"
          className="text-primary-dark-950 dark:bg-primary-dark-950 bg-primary-50 divide-y divide-gray-200 rounded-lg px-5 py-2 dark:divide-zinc-800 dark:text-gray-200"
        >
          <div className="flex flex-wrap justify-between gap-4 py-4 text-xl font-semibold">
            <dl className="flex items-baseline space-x-2">
              <dt className="text-lg text-zinc-500 dark:text-gray-100/65">
                Codice ordine:
              </dt>
              <dd className="text-2xl">{orderId}</dd>
            </dl>

            <dl className="flex items-baseline space-x-2">
              <dt className="text-lg text-zinc-500 dark:text-gray-100/65">
                Totale pagato:
              </dt>
              <dd className="text-2xl">{formatCurrency(amount)}</dd>
            </dl>
          </div>

          <ul className="flex h-max flex-col divide-y divide-gray-200 dark:divide-zinc-800">
            {data.map((product, index) => (
              <li key={product.id}>
                <article
                  aria-labelledby={`product-title-${product.id}`}
                  className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-6`}
                >
                  <div className="relative aspect-2/3 h-40">
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
                    <h2
                      id={`product-title-${product.id}`}
                      className="font-semibold"
                    >
                      {product.product.name}
                    </h2>

                    <p className="hidden text-xs text-black/65 sm:block sm:text-sm dark:text-white/85">
                      {product.product.details || ""}
                    </p>

                    <div className="mt-auto space-x-1 text-sm">
                      <span className="text-black/65 dark:text-white/85">
                        Prezzo:
                      </span>
                      <span className="font-semibold text-black dark:text-white">
                        {formatCurrency(
                          product.product.regularPrice -
                            product.product.discount,
                        )}
                      </span>
                    </div>

                    <div className="mt-auto space-x-1 text-sm">
                      <span className="text-black/65 dark:text-white/85">
                        Quantità:
                      </span>
                      <span className="font-semibold text-black dark:text-white">
                        {product.quantity}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-label={`Prezzo totale per questo prodotto: ${formatCurrency(product.orderItemPrice)}`}
                    className="font-semibold"
                  >
                    {formatCurrency(product.orderItemPrice)}
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Page;

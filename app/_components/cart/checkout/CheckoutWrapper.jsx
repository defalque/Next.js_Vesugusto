import { SHIPPING_COST } from "@/app/_lib/constants";
import { getCartProd, getUserInfo } from "@/app/_lib/data-service";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Image from "next/image";
import CheckoutFormWrapper from "./CheckoutFormWrapper";
// import PaymentFormWrapper from "./PaymentFormWrapper";
import { redirect } from "next/navigation";
import PaymentWrapper from "./PaymentWrapper";

async function CheckoutWrapper({ userId, cartId, name, email, canceled }) {
  const productsData = getCartProd(cartId);
  const userData = getUserInfo(userId);

  const [productsResult, userResult] = await Promise.allSettled([
    productsData,
    userData,
  ]);

  const products =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  const user = userResult.status === "fulfilled" ? userResult.value : [];

  const { via, numeroCivico, comune, cap } = user ?? {};

  if (products.length === 0) {
    redirect("/shop");
  }

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.cartItemPrice;
  }, 0);

  return (
    <div className="grid grid-cols-1 gap-8 pb-30 lg:grid-cols-2">
      <section
        aria-label="Riepilogo ordine"
        className="text-primary-dark-950 xs:px-5 top-25 flex h-max flex-col gap-6 rounded-md bg-gray-50 px-3 py-5 lg:sticky lg:order-2 dark:bg-zinc-900/80"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-gray-900 uppercase dark:text-gray-300">
            Importo dovuto
          </h2>
          <span className="text-3xl font-semibold sm:text-4xl dark:text-gray-200">
            {formatCurrency(totalPrice + SHIPPING_COST)}
          </span>
        </div>

        <ul
          aria-label="Prodotti nel carrello"
          className="text-primary-dark-950 flex h-max flex-col divide-y divide-gray-200 dark:divide-zinc-800"
        >
          {products.map((product, index) => (
            <li key={product.product.id}>
              <article
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-8`}
              >
                <div className="relative aspect-2/3 h-30">
                  <Image
                    priority={index < 2}
                    src={product.product.image}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    alt={`Immagine di ${product.product.name}`}
                    className="rounded-lg object-cover"
                    sizes="(min-width: 64rem) 50vw, 100vw"
                  />
                </div>

                <div className="flex h-full flex-col gap-2 dark:text-gray-200">
                  <h3 className="font-semibold">{product.product.name}</h3>
                  <p className="text-xs font-light sm:text-sm">
                    {product.product.details ||
                      "Nessuna descrizione disponibile"}
                  </p>
                  <p className="mt-auto text-sm">
                    Quantità:{" "}
                    <span className="font-bold">{product.quantity}</span>
                  </p>
                </div>

                <span className="font-semibold dark:text-gray-200">
                  {formatCurrency(
                    product.product.regularPrice - product.product.discount,
                  )}
                </span>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col divide-y divide-gray-200 lg:order-1 dark:divide-zinc-800">
        <section
          aria-labelledby="address-info"
          className="flex flex-col gap-7 pt-5 pb-8"
        >
          <h2
            id="address-info"
            className="text-sm font-semibold text-gray-900 uppercase dark:text-gray-300"
          >
            Informazioni sulla spedizione
          </h2>
          <CheckoutFormWrapper
            via={via}
            comune={comune}
            cap={cap}
            numeroCivico={numeroCivico}
          />
        </section>

        <section
          aria-labelledby="payment-method-info"
          className="flex flex-col gap-7 pt-8"
        >
          <h2
            id="payment-method-info"
            className="text-sm font-semibold text-gray-900 uppercase dark:text-gray-300"
          >
            Pagamento
          </h2>
          <PaymentWrapper
            amount={formatCurrency(totalPrice + SHIPPING_COST)}
            canceled={canceled}
            disabled={!via || !numeroCivico || !comune || !cap}
          />
          {/* <form action="/api/checkout_sessions" method="POST">
            <button
              className="focus-visible:dark:ring-primary-950 focus-visible:ring-primary-dark-500/95 dark:border-primary-dark-300 inset-shadow-primary-50/60 active:bg-primary-800 dark:active:border-primary-dark-100 dark:active:bg-primary-950/40 dark:hover:border-primary-dark-100 bg-primary-dark-200 hover:bg-primary-dark-100 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 outline-primary-dark-300 disabled:bg-primary-dark-200/75 dark:disabled:bg-primary-950/20 dark:disabled:border-primary-dark-600 focus w-full cursor-pointer justify-center rounded py-3 text-sm font-bold text-white uppercase inset-shadow-sm ring-offset-transparent outline-offset-2 transition-colors duration-300 hover:shadow focus:ring-offset-2 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none active:shadow disabled:cursor-not-allowed disabled:shadow-none disabled:inset-shadow-none disabled:text-shadow-none sm:text-base dark:border dark:inset-shadow-none dark:text-shadow-md/10"
              type="submit"
              role="link"
              aria-label="Paga su Stripe"
              disabled={!via || !numeroCivico || !comune || !cap}
            >
              Paga {formatCurrency(totalPrice + SHIPPING_COST)} con Stripe
            </button>
          </form> */}
          {/* <PaymentFormWrapper
            amount={totalPrice + SHIPPING_COST}
            userId={userId}
            cartId={cartId}
            name={name}
            email={email}
            disabled={!via || !numeroCivico || !comune || !cap}
          /> */}
        </section>
      </div>
    </div>
  );
}

export default CheckoutWrapper;

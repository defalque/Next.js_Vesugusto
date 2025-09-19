import { SHIPPING_COST } from "@/app/_lib/constants";
import { getCartProd, getUserInfo } from "@/app/_lib/data-service";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Image from "next/image";
import CheckoutFormWrapper from "./CheckoutFormWrapper";
import PaymentFormWrapper from "./PaymentFormWrapper";
import { redirect } from "next/navigation";

async function CheckoutWrapper({ userId, cartId, name, email }) {
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
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-zinc-800">
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
          <PaymentFormWrapper
            amount={totalPrice + SHIPPING_COST}
            userId={userId}
            cartId={cartId}
            name={name}
            email={email}
            disabled={!via || !numeroCivico || !comune || !cap}
          />
        </section>
      </div>

      <section
        aria-labelledby="checkout-summary-heading"
        className="text-primary-dark-950 xs:px-5 sticky top-25 flex h-max flex-col gap-6 rounded-md bg-gray-50 px-3 py-5 dark:bg-zinc-900/80"
      >
        <h2 id="checkout-summary-heading" className="sr-only">
          Riepilogo ordine
        </h2>

        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-gray-900 uppercase dark:text-gray-300">
            Importo dovuto
          </h3>
          <span className="text-3xl font-semibold sm:text-4xl dark:text-gray-200">
            {formatCurrency(totalPrice + SHIPPING_COST)}
          </span>
        </div>

        <div className="text-primary-dark-950 flex h-max flex-col divide-y divide-gray-200 dark:divide-zinc-800">
          {products.map((product, index) => (
            <div
              className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6 py-8`}
              key={product.product.id}
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
                <h1 className="font-semibold">{product.product.name}</h1>
                <p className="text-xs font-light sm:text-sm">
                  {product.product.details || ""}
                </p>
                <p className="mt-auto text-sm">Quantità: {product.quantity}</p>
              </div>

              <span className="font-semibold dark:text-gray-200">
                {formatCurrency(product.cartItemPrice)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CheckoutWrapper;

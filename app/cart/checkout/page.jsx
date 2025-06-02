// import CheckoutButton from "@/app/_components/ui/CheckoutButton";
import PaymentForm from "@/app/_components/ui/PaymentForm";
import { getCartProducts, getUserInfo } from "@/app/_lib/data-service";
import { formatPrice } from "@/app/_lib/formatPrice";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout",
};

export default async function Page() {
  const session = await auth();
  const products = await getCartProducts(session.user.cartId);
  if (!products || products.length === 0) {
    redirect("/cart");
  }

  const {
    via,
    numeroCivico,
    comune: city,
    cap,
  } = await getUserInfo(session.user.userId);

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.cartQuantity * product.regularPrice;
  }, 0);
  const shippingCost = 0;
  const total = totalPrice + shippingCost;

  return (
    <div className="flex flex-col gap-8 px-10 xl:px-45 mt-14 mb-30">
      {/* <h1 className="text-5xl font-medium tracking-wide border-b border-b-zinc-200 pb-8">
        Checkout
      </h1> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="border-b border-b-gray-200 dark:border-b-dark-200 pb-8 flex flex-col gap-7">
            <h2 className="text-sm uppercase font-semibold text-gray-900 dark:text-gray-300">
              Informazioni sulla spedizione
            </h2>
            <div className="grid grid-cols-4 gap-x-5 gap-y-6 font-normal text-sm md:text-base">
              <div className="col-span-4">
                <label htmlFor="indirizzo" className="pl-1">
                  Indirizzo
                </label>
                <input
                  required
                  name="indirizzo"
                  defaultValue={via ? `${via}, ${numeroCivico}` : ""}
                  className="mt-1 rounded-xl px-3 py-2 bg-primary-50 border border-gray-300 dark:border-dark-200 dark:bg-dark-300 dark:text-gray-200 w-full text-primary-dark-900  outline-primary-950"
                />
              </div>

              <div className="col-span-3">
                <label htmlFor="city" className="pl-1">
                  Città
                </label>
                <input
                  required
                  name="city"
                  className="mt-1 rounded-xl px-3 py-2 bg-primary-50 border border-gray-300 dark:border-dark-200 dark:bg-dark-300 dark:text-gray-200 w-full text-primary-dark-900  outline-primary-950 "
                  defaultValue={city}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="cap" className="pl-1">
                  CAP
                </label>
                <input
                  required
                  name="cap"
                  defaultValue={cap}
                  className="mt-1 rounded-xl px-3 py-2 bg-primary-50 dark:border-dark-200 dark:bg-dark-300 dark:text-gray-200 border border-gray-300 w-full text-primary-dark-900  outline-primary-950 "
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-sm uppercase font-semibold pt-6 text-gray-900 dark:text-gray-300">
              Pagamento
            </h2>
            <PaymentForm
              total={total}
              userId={session.user.userId}
              cartId={session.user.cartId}
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-dark-400 text-primary-dark-950 flex flex-col gap-6 h-max py-5 px-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-sm text-gray-600 dark:text-gray-300">
              Importo dovuto
            </h1>
            <span className="text-3xl sm:text-4xl font-semibold dark:text-gray-200">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <div className="bg-gray-50 dark:bg-dark-400 text-primary-dark-950 flex flex-col h-max">
            {products.map((product, index) => (
              <div
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6  py-8 ${
                  index < products.length - 1
                    ? "border-b border-gray-200 dark:border-dark-200"
                    : ""
                }`}
                key={product.id}
              >
                <div className="h-30 relative aspect-2/3">
                  <Image
                    src={product.image?.at(0)}
                    fill
                    alt={product.name}
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex flex-col h-full gap-2 dark:text-gray-200">
                  <h1 className="font-semibold">{product.name}</h1>
                  <p className="text-xs sm:text-sm font-light">
                    {product.details || ""}
                  </p>
                  <p className="text-sm mt-auto">
                    Quantità: {product.cartQuantity}
                  </p>
                </div>

                <span className="font-semibold dark:text-gray-200">
                  {formatPrice(product.regularPrice)}
                </span>
              </div>
            ))}
          </div>

          {/* <CheckoutButton /> */}
        </div>
      </div>
    </div>
  );
}

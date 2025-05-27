import CheckoutButton from "@/app/_components/ui/CheckoutButton";
import { getCartProducts, getUserInfo } from "@/app/_lib/data-service";
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
    redirect("/cart"); // o altra pagina tipo homepage
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
    <div className="flex flex-col gap-8 px-35 my-12">
      <h1 className="text-5xl font-medium tracking-wide border-b border-b-zinc-200 pb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-y-10 py-5">
          <h2 className="text-2xl">Informazioni sulla spedizione</h2>
          <div className="grid grid-cols-4 gap-x-5 gap-y-6">
            <div className="col-span-4">
              <label htmlFor="indirizzo" className="pl-1">
                Indirizzo
              </label>
              <input
                required
                name="indirizzo"
                defaultValue={`${via}, ${numeroCivico}`}
                className="mt-1 rounded-xl px-3 py-2 bg-primary-50 border border-gray-300 w-full text-primary-dark-900  outline-primary-950"
              />
            </div>

            <div className="col-span-3">
              <label htmlFor="city" className="pl-1">
                Città
              </label>
              <input
                required
                name="city"
                className="mt-1 rounded-xl px-3 py-2 bg-primary-50 border border-gray-300 w-full text-primary-dark-900  outline-primary-950 "
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
                className="mt-1 rounded-xl px-3 py-2 bg-primary-50 border border-gray-300 w-full text-primary-dark-900  outline-primary-950 "
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 text-primary-dark-950 flex flex-col gap-6 h-max py-5 px-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-sm text-gray-600">Importo dovuto</h1>
            <span className="text-4xl font-semibold">
              {Number.isInteger(totalPrice)
                ? `${totalPrice},00`
                : totalPrice.toFixed(2).replace(".", ",")}{" "}
              &euro;
            </span>
          </div>

          <div className="bg-gray-50 text-primary-dark-950 flex flex-col h-max">
            {products.map((product, index) => (
              <div
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-6  py-8 ${
                  index < products.length - 1 ? "border-b border-gray-200" : ""
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

                <div className="flex flex-col h-full gap-2">
                  <h1 className="font-semibold">{product.name}</h1>
                  <p className="text-sm font-light">{product.details || ""}</p>
                  <p className="text-sm mt-auto">
                    Quantità: {product.cartQuantity}
                  </p>
                </div>

                <span className="font-semibold">
                  {Number.isInteger(product.regularPrice)
                    ? `${product.regularPrice},00`
                    : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
                  &euro;
                </span>
              </div>
            ))}
          </div>

          <CheckoutButton />
        </div>
      </div>
    </div>
  );
}

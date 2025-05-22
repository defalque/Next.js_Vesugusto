import { auth } from "@/auth";
import CartProducts from "../_components/ui/CartProducts";
import TotalSummary from "../_components/ui/TotalSummary";
import { getCartProducts } from "../_lib/data-service";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Carrello",
};

export default async function Page() {
  const session = await auth();
  const products = await getCartProducts(session.user.cartId);
  // console.log(products);

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.cartQuantity * product.regularPrice;
  }, 0);
  // console.log(totalPrice);
  const shippingCost = 0;
  const total = totalPrice + shippingCost;

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-10">
      <CartProducts products={products}></CartProducts>

      <div className="flex flex-col gap-6 bg-slate-50 h-max px-5 py-5 rounded-md">
        <h1 className="text-xl font-medium mb-4">Riepilogo</h1>
        <div className="flex items-center pb-2 border-b border-b-zinc-200">
          <span className="font-light">Subtotale</span>
          <span className="ml-auto font-semibold text-lg">
            {Number.isInteger(totalPrice)
              ? `${totalPrice},00`
              : totalPrice.toFixed(2).replace(".", ",")}{" "}
            &euro;
          </span>
        </div>
        <div className="flex items-center pb-2 border-b border-b-zinc-200">
          <span className="font-light mr-2">Spese di spedizione</span>
          <QuestionMarkCircleIcon className="size-5 fill-primary-50"></QuestionMarkCircleIcon>
          <span className="ml-auto font-semibold text-lg">
            {Number.isInteger(shippingCost)
              ? `${shippingCost},00`
              : shippingCost.toFixed(2).replace(".", ",")}{" "}
            &euro;
          </span>
        </div>
        <div className="flex items-center pb-2 border-b border-b-zinc-200">
          <span className="font-semibold text-lg">Totale ordine</span>
          <span className="ml-auto font-semibold text-lg">
            {Number.isInteger(total)
              ? `${total},00`
              : total.toFixed(2).replace(".", ",")}{" "}
            &euro;
          </span>
        </div>
        <button className="py-3 uppercase bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold w-3xs mx-auto mt-3 cursor-pointer rounded-md">
          Procedi all'acqusto
        </button>
      </div>
    </div>
  );
}

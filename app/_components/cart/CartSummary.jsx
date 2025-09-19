import { SHIPPING_COST } from "@/app/_lib/constants";
import { formatCurrency } from "@/app/_lib/formatCurrency";

function CartSummary({ products, totalPrice, children }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-zinc-800">
        <ul className="flex flex-col gap-4 pb-4">
          {products.map((product) => (
            <li key={product.id} className="inline-flex justify-between">
              <span>{product.product.name}</span>
              <div className="space-x-2">
                <span className="text-sm">{`(${formatCurrency(product.product.regularPrice - product.product.discount)} x ${product.quantity})`}</span>
                <span>{formatCurrency(product.cartItemPrice)}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 pt-4">
          <div className="flex items-center">
            <span>Subtotale</span>
            <span className="ml-auto">{formatCurrency(totalPrice)}</span>
          </div>

          <div className="flex items-center">
            <span className="mr-2">Spese di spedizione</span>
            <span className="ml-auto">{formatCurrency(SHIPPING_COST)}</span>
          </div>

          <div className="text-primary-dark-950 flex items-center text-lg font-semibold sm:text-xl dark:text-white">
            <span>Totale ordine</span>
            <span className="ml-auto">{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default CartSummary;

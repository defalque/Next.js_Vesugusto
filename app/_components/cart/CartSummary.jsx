import { SHIPPING_COST } from "@/app/_lib/constants";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import { shimmer } from "../ui/skeleton/Skeletons";

function CartSummary({ products, totalPrice, isPending, children }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-zinc-800">
        <ul className="flex flex-col gap-4 pb-4">
          {products.map((product) => (
            <li key={product.id} className="flex items-start justify-between">
              {isPending ? (
                <span
                  className={`${shimmer} relative h-5 w-20 overflow-hidden rounded bg-gray-200 py-2 dark:bg-zinc-700`}
                />
              ) : (
                <span>{product.product.name}</span>
              )}
              <div className="flex items-center space-x-2">
                {isPending ? (
                  <>
                    <span
                      className={`${shimmer} relative h-3.5 w-20 overflow-hidden rounded bg-gray-200 py-2 dark:bg-zinc-700`}
                    />
                    <span
                      className={`${shimmer} relative h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-sm">{`(${formatCurrency(product.product.regularPrice - product.product.discount)} x ${product.quantity})`}</span>
                    <span>{formatCurrency(product.cartItemPrice)}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 pt-4">
          <div className="flex items-center">
            <span>Subtotale</span>
            {isPending ? (
              <span
                className={`${shimmer} relative ml-auto h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
              />
            ) : (
              <span className="ml-auto">{formatCurrency(totalPrice)}</span>
            )}
          </div>

          <div className="flex items-center">
            <span className="mr-2">Spese di spedizione</span>
            {isPending ? (
              <span
                className={`${shimmer} relative ml-auto h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
              />
            ) : (
              <span className="ml-auto">{formatCurrency(SHIPPING_COST)}</span>
            )}
          </div>

          <div className="text-primary-dark-950 flex items-center text-lg font-semibold sm:text-xl dark:text-white">
            <span>Totale ordine</span>
            {isPending ? (
              <span
                className={`${shimmer} relative ml-auto h-6 w-16 overflow-hidden rounded bg-gray-200 py-2 sm:h-8 dark:bg-zinc-700`}
              />
            ) : (
              <span className="ml-auto">{formatCurrency(totalPrice)}</span>
            )}
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default CartSummary;

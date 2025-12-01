import { SHIPPING_COST } from "@/app/_lib/constants";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import { shimmer } from "../ui/skeleton/Skeletons";

function CartSummary({ products, totalPrice, isPending, children }) {
  const formattedPrice = formatCurrency(totalPrice);
  const formattedShippingCost = formatCurrency(SHIPPING_COST);
  const formattedTotalPrice = formatCurrency(totalPrice + SHIPPING_COST);

  return (
    <>
      <div className="divide-primary-200/80 divide-y dark:divide-zinc-800">
        <ul className="flex flex-col gap-4 pb-4">
          {products.map((product) => (
            <li key={product.id} className="flex items-start justify-between">
              {isPending ? (
                <span
                  aria-hidden
                  className={`${shimmer} relative h-5 w-20 overflow-hidden rounded bg-gray-200 py-2 dark:bg-zinc-700`}
                />
              ) : (
                <h2 className="font-medium">{product.product.name}</h2>
              )}
              <div className="flex items-center space-x-2">
                {isPending ? (
                  <>
                    <span
                      aria-hidden
                      className={`${shimmer} relative h-3.5 w-20 overflow-hidden rounded bg-gray-200 py-2 dark:bg-zinc-700`}
                    />
                    <span
                      aria-hidden
                      className={`${shimmer} relative h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
                    />
                  </>
                ) : (
                  <>
                    <span className="text-[15px] text-black/65 dark:text-white/85">{`(${formatCurrency(product.product.regularPrice - product.product.discount)} x ${product.quantity})`}</span>
                    <span className="font-medium">
                      {formatCurrency(product.cartItemPrice)}
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-4 pt-4">
          <div className="flex items-center">
            <h2>Subtotale</h2>

            {isPending ? (
              <span
                aria-hidden
                className={`${shimmer} relative ml-auto h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
              />
            ) : (
              <span className="ml-auto slashed-zero">{formattedPrice}</span>
            )}
          </div>

          <div className="flex items-center">
            <h2 className="mr-2">Spese di spedizione</h2>

            {isPending ? (
              <span
                aria-hidden
                className={`${shimmer} relative ml-auto h-4 w-10 overflow-hidden rounded bg-gray-200 py-2 sm:h-5 dark:bg-zinc-700`}
              />
            ) : (
              <span className="ml-auto tabular-nums" aria-hidden>
                {formattedShippingCost}
              </span>
            )}
          </div>

          <div className="text-primary-dark-950 flex items-center text-lg font-semibold sm:text-xl dark:text-white">
            <h2>Totale ordine</h2>

            {isPending ? (
              <span
                aria-hidden
                className={`${shimmer} relative ml-auto h-6 w-16 overflow-hidden rounded bg-gray-200 py-2 sm:h-8 dark:bg-zinc-700`}
              />
            ) : (
              <span
                className="ml-auto"
                role="status"
                aria-live="polite"
                aria-atomic="true"
                aria-label={`Totale ordine: ${formattedTotalPrice}`}
              >
                <span>{formattedTotalPrice}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default CartSummary;

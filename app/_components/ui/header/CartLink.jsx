import { getCartProductsCount } from "@/app/_lib/data-service";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import { ShoppingCart } from "lucide-react";

async function CartLink() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const cartItems = session?.user?.cartId
    ? await getCartProductsCount(session.user.cartId)
    : 0;

  const ariaLabel =
    cartItems > 0
      ? `Vai al carrello. Prodotti nel carrello: ${cartItems}`
      : "Vai al carrello: nessun prodotto nel carrello";

  return (
    <>
      <NavLink href="/cart" type="main" aria-label={ariaLabel}>
        <ShoppingCart className="text-primary-dark-900 dark:text-primary-50 inline size-6 transition-colors duration-300 md:size-5" />
        {cartItems > 0 && (
          <span
            className="bg-primary-dark-200 dark:bg-primary-dark-500 dark:border-primary-dark-100 absolute top-0 left-1/2 inline-flex size-4.5 items-center justify-center rounded-full text-xs font-semibold text-gray-50 dark:border dark:text-gray-50"
            aria-label={`Prodotti nel carrello: ${cartItems}`}
          >
            <span aria-hidden>{cartItems}</span>
          </span>
        )}
      </NavLink>
    </>
  );
}

export default CartLink;

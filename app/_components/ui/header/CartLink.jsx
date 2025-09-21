import { getCartProductsCount } from "@/app/_lib/data-service";
import NavLink from "./NavLink";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";

async function CartLink() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const cartItems = session?.user?.cartId
    ? await getCartProductsCount(session.user.cartId)
    : 0;

  return (
    <NavLink href="/cart" name="Carrello">
      <ShoppingCartIcon
        aria-hidden="true"
        className="text-primary-dark-900 dark:text-primary-50 relative size-6 transition-colors duration-300 md:size-5"
      />
      {cartItems > 0 && (
        <span
          className="bg-primary-950 dark:bg-primary-dark-500 dark:border-primary-dark-100 absolute top-0 left-1/2 inline-flex size-4.5 items-center justify-center rounded-full text-xs font-semibold text-gray-50 dark:border dark:text-gray-50"
          aria-label={`${cartItems} prodotti nel carrello`}
        >
          {cartItems}
        </span>
      )}
    </NavLink>
  );
}

export default CartLink;

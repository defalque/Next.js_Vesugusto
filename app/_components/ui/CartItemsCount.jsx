import { getCartProductsCount } from "@/app/_lib/data-service";
import * as motion from "motion/react-client";

async function CartItemsCount({ session }) {
  let cartItemsCount = [];
  session?.user?.cartId
    ? (cartItemsCount = await getCartProductsCount(session.user.cartId))
    : (cartItemsCount = []);

  return (
    <>
      {cartItemsCount?.length > 0 && (
        <>
          <motion.span
            key={cartItemsCount.length}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
            // className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-primary-950 rounded-full"
            className="hidden md:inline-flex absolute -top-1 -right-1 items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-primary-950 rounded-full"
          >
            {cartItemsCount?.length}
          </motion.span>
          <span className="inline-flex md:hidden">{cartItemsCount.length}</span>
        </>
      )}
      {
        <span className="inline-flex md:hidden">
          {cartItemsCount.length === 0 ? 0 : null}
        </span>
      }
    </>
  );
}

export default CartItemsCount;

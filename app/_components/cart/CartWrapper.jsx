import { getCartProd } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import CartProductsListOptimistic from "./CartProductsListOptimistic";

async function CartWrapper() {
  const session = await auth();
  const products = await getCartProd(session.user.cartId);

  return (
    <CartProductsListOptimistic
      products={products}
      userId={session.user.userId}
      userName={session.user.name}
      userEmail={session.user.email}
      cartId={session.user.cartId}
    />
  );
}

export default CartWrapper;

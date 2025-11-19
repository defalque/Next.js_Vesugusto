import { getCartProd } from "@/app/_lib/data-service";
import CartProductsListOptimistic from "./CartProductsListOptimistic";

async function CartWrapper() {
  const { cartId, cartProducts } = await getCartProd();

  return <CartProductsListOptimistic products={cartProducts} cartId={cartId} />;
}

export default CartWrapper;

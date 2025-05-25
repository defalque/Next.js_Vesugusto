import { auth } from "@/auth";
import { getCartProducts, getCartProductsCount } from "../_lib/data-service";
import CartProductsList from "../_components/ui/CartProductsList";

export const metadata = {
  title: "Carrello",
};

export default async function Page() {
  const session = await auth();
  const products = await getCartProducts(session.user.cartId);
  const count = await getCartProductsCount(session.user.cartId);
  console.log(count);

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.cartQuantity * product.regularPrice;
  }, 0);
  const shippingCost = 0;
  const total = totalPrice + shippingCost;

  return (
    <div className="flex flex-col gap-8 px-35 my-12">
      <h1 className={`text-5xl font-medium tracking-wide`}>Il mio carrello</h1>
      <CartProductsList
        products={products}
        cartId={session.user.cartId}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        total={total}
      />
    </div>
  );
}

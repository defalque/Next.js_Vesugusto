import { getCartProducts } from "@/app/_lib/data-service";
import { auth } from "@/auth";

export const metadata = {
  title: "Checkout",
};

export default async function Page() {
  const session = await auth();
  const products = await getCartProducts(session.user.cartId);

  const totalPrice = products.reduce((sum, product) => {
    return sum + product.cartQuantity * product.regularPrice;
  }, 0);
  const shippingCost = 0;
  const total = totalPrice + shippingCost;

  return (
    <div className="flex flex-col gap-8 px-35 my-12">
      <h1 className="text-5xl font-medium tracking-wide">Checkout</h1>
    </div>
  );
}

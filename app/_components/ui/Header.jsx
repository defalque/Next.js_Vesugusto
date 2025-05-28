import { auth } from "@/auth";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";
import { getCartProductsCount } from "@/app/_lib/data-service";

async function Header() {
  const session = await auth();
  let cartItemsCount = [];
  if (session?.user?.cartId) {
    cartItemsCount = await getCartProductsCount(session.user.cartId);
  } else {
    cartItemsCount = [];
  }

  return (
    <header className="px-8 dark:py-0 border-b border-b-gray-200 sticky top-0 left-0 bg-primary-50 z-1000">
      <div className="flex justify-between items-center mx-auto">
        <p className="text-4xl text-primary-950 dark:text-primary-100 tracking-wider font-medium">
          Vesugusto
        </p>
        <div className="flex gap-16">
          <Navigation
            session={session}
            cartItemsCount={cartItemsCount}
          ></Navigation>
          <DarkModeToggle></DarkModeToggle>
        </div>
      </div>
    </header>
  );
}

export default Header;

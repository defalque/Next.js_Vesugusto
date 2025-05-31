import { auth } from "@/auth";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";
import { getCartProductsCount } from "@/app/_lib/data-service";
import Image from "next/image";

import vesugusto from "@/public/vesugusto.png";

async function Header() {
  const session = await auth();
  let cartItemsCount = [];
  if (session?.user?.cartId) {
    cartItemsCount = await getCartProductsCount(session.user.cartId);
  } else {
    cartItemsCount = [];
  }

  return (
    <header className="px-8 dark:py-0 sticky top-0 left-0 bg-primary-50 z-1000 flex items-center border-b border-b-gray-50">
      <Image
        src={vesugusto}
        width={60}
        height={60}
        alt="Vesugusto logo"
        className="-ml-6"
      ></Image>
      <span className="text-4xl -ml-3 text-primary-950 dark:text-primary-100 tracking-wider font-medium self-center">
        esugusto
      </span>
      <div className="flex gap-16 ml-auto">
        <Navigation
          session={session}
          cartItemsCount={cartItemsCount}
        ></Navigation>
        <DarkModeToggle></DarkModeToggle>
      </div>
    </header>
  );
}

export default Header;

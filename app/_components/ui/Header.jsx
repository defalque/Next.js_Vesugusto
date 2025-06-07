import { auth } from "@/auth";
import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";
import Image from "next/image";

import vesugusto from "@/public/vesugusto.png";
import { Suspense } from "react";
import CartItemsCount from "./CartItemsCount";
import SkeletonCartBadge from "./SkeletonCartBadge";

async function Header() {
  const session = await auth();

  return (
    <header className="px-4 sm:px-8 sticky top-0 left-0 bg-primary-50 dark:bg-primary-dark-950 z-1000 flex items-center border-b border-b-gray-50 dark:border-b-dark-400">
      <Image
        src={vesugusto}
        width={60}
        height={60}
        alt="Vesugusto logo"
        className="-ml-3 sm:-ml-6"
      ></Image>
      <span className="text-4xl -ml-3 text-primary-950 tracking-wider font-bold self-center">
        esugusto
      </span>

      <div className="flex gap-4 sm:gap-8 md:gap-16 ml-auto">
        <Navigation session={session}>
          <Suspense fallback={<SkeletonCartBadge />}>
            <CartItemsCount session={session}></CartItemsCount>
          </Suspense>
        </Navigation>

        <DarkModeToggle></DarkModeToggle>
      </div>
    </header>
  );
}

export default Header;

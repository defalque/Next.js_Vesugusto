import { Suspense } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import {
  CartLinkSkeleton,
  NavLinkSkeleton,
  SignedInSkeleton,
} from "../skeleton/Skeletons";
import NavLink from "./NavLink";
import CartLink from "./CartLink";
import UserActions from "./UserActions";

const links = [
  {
    name: "Shop",
    href: "/shop",
  },
];

function Navbar() {
  return (
    <ul className="flex items-center justify-center gap-1 text-base md:gap-2">
      <Suspense fallback={<NavLinkSkeleton />}>
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} type="section">
            {link.name}
          </NavLink>
        ))}
      </Suspense>

      <Suspense fallback={<SignedInSkeleton />}>
        <SignedIn>
          <Suspense fallback={<CartLinkSkeleton />}>
            <CartLink />
          </Suspense>

          <UserActions />
        </SignedIn>
      </Suspense>

      <Suspense>
        <SignedOut>
          <SignInButton>
            <button className="bg-primary-dark-500 dark:bg-primary-dark-300 cursor-pointer rounded-full px-2.5 py-2 text-xs font-medium text-white sm:px-4 sm:text-base">
              Accedi
            </button>
          </SignInButton>
        </SignedOut>
      </Suspense>
    </ul>
  );
}

export default Navbar;

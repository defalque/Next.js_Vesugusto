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
import { LogIn } from "lucide-react";

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

      <Suspense
        fallback={
          <div className="bg-primary-dark-500 dark:bg-primary-dark-300 animate-pulse cursor-not-allowed rounded-full px-2.5 py-2 text-xs font-medium text-white sm:px-4 sm:text-base">
            Accedi
          </div>
        }
      >
        <SignedOut>
          <SignInButton>
            <div>
              <button className="bg-primary-dark-200/90 dark:hover:bg-primary-950/65 hidden cursor-pointer rounded-full px-2.5 py-1 text-xs font-medium text-white transition-colors duration-300 sm:block sm:px-4 sm:text-base">
                Accedi
              </button>
              <button className="touch-hitbox flex cursor-pointer rounded-xl px-2 py-1 hover:bg-gray-200/80 sm:hidden dark:hover:bg-white/10">
                <LogIn className="size-6" />
              </button>
            </div>
          </SignInButton>
        </SignedOut>
      </Suspense>
    </ul>
  );
}

export default Navbar;

import { Suspense } from "react";
import { CartLinkSkeleton } from "../skeleton/Skeletons";
import NavLink from "./NavLink";
import CartLink from "./CartLink";
import UserAvatar from "./UserAvatar";

const links = [
  {
    name: "Shop",
    href: "/shop",
  },
];

function Navbar() {
  return (
    <ul className="flex items-center justify-center gap-1 text-base md:gap-2">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href} type="section">
          {link.name}
        </NavLink>
      ))}

      <Suspense fallback={<CartLinkSkeleton />}>
        <CartLink />
      </Suspense>

      <Suspense fallback={<CartLinkSkeleton />}>
        <UserAvatar />
      </Suspense>
    </ul>
  );
}

export default Navbar;

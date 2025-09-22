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
    <ul className="flex items-center justify-center space-x-2">
      {links.map((link) => (
        <NavLink key={link.href} name={link.name} href={link.href} />
      ))}

      <Suspense fallback={<CartLinkSkeleton />}>
        <CartLink />
      </Suspense>

      <Suspense fallback={<CartLinkSkeleton />}>
        <UserAvatar />
      </Suspense>

      {/* <Suspense fallback={<DynamicLinksSkeleton />}>
        <DynamicLinks />
      </Suspense> */}
    </ul>
  );
}

export default Navbar;

"use client";

import dynamic from "next/dynamic";
import { AccountNavLink } from "../ui/skeleton/Skeletons";
import { Suspense } from "react";
const NavLink = dynamic(() => import("../ui/header/NavLink"), {
  ssr: false,
  loading: () => <AccountNavLink />,
});

function NavLinks({ navLinks }) {
  return (
    <Suspense fallback={<div>Caricamento...</div>}>
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          href={link.href}
          name={link.name}
          isAside={true}
        >
          {link.icon}
          <span className="hidden lg:inline">{link.name}</span>
        </NavLink>
      ))}
    </Suspense>
  );
}

export default NavLinks;

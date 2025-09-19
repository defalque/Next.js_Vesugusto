"use client";

import dynamic from "next/dynamic";
import { AccountNavLink } from "../ui/skeleton/Skeletons";
const NavLink = dynamic(() => import("../ui/header/NavLink"), {
  ssr: false,
  loading: () => <AccountNavLink />,
});

function NavLinks({ navLinks }) {
  return (
    <>
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
    </>
  );
}

export default NavLinks;

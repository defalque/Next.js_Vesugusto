"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import NavLink from "../ui/header/NavLink";

function AccountNavLinks({ navLinks }) {
  const pathname = usePathname();
  const activeRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [pathname]);

  return (
    <>
      {navLinks.map((link) => (
        <NavLink
          ref={pathname === link.href ? activeRef : null}
          key={link.name}
          href={link.href}
          aria-label={link.name || undefined}
          type="account"
        >
          <span>{link.icon}</span>
          <span className="hidden md:inline">{link.name}</span>
        </NavLink>
      ))}
    </>
  );
}

export default AccountNavLinks;

// <li key={link.name} className="snap-start">
//   <Link
//     ref={pathname === link.href ? activeRef : null}
//     aria-current={pathname === link.href ? "page" : undefined}
//     aria-label={link.name || undefined}
//     href={link.href}
//     // className={`focus-visible:ring-primary-950 flex w-full cursor-pointer items-center gap-2 rounded-xl px-0 py-2 font-bold whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none sm:px-2 sm:py-1 sm:font-medium lg:px-4 ${pathname === link.href ? "text-black sm:bg-gray-200/80 sm:font-medium dark:text-white sm:dark:bg-zinc-700/50" : "text-black/55 dark:text-white/55"} hover:text-black active:text-black sm:hover:bg-gray-200/80 sm:hover:font-medium sm:active:bg-gray-200/80 dark:hover:text-white dark:active:text-white sm:dark:hover:bg-zinc-700/50 sm:dark:active:bg-zinc-700/50`}
//   >
//     <span className="hidden sm:block">{link.icon}</span>
//     <span>{link.name}</span>
//   </Link>
// </li>

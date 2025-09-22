"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
        <li key={link.name} className="snap-start">
          <Link
            ref={pathname === link.href ? activeRef : null}
            aria-current={pathname === link.href ? "page" : undefined}
            aria-label={link.name || undefined}
            href={link.href}
            className={`focus-visible:ring-primary-950 flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-2 whitespace-nowrap focus-visible:ring-2 focus-visible:outline-none sm:px-2 sm:py-1 lg:px-4 ${pathname === link.href ? "bg-gray-200/80 dark:bg-zinc-700/50" : ""} hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50`}
          >
            <span className="hidden sm:block">{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        </li>
      ))}
    </>
  );
}

export default AccountNavLinks;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  name,
  href,
  onClick,
  isFooter = false,
  isAside = false,
  children,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (onClick) {
    return (
      <li className="flex w-full items-center">
        <Link
          aria-current={isActive ? "page" : undefined}
          aria-label={name}
          href={href}
          className="focus w-full rounded py-3 text-center transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
          onClick={onClick}
        >
          {name}
        </Link>
      </li>
    );
  }

  if (children) {
    return (
      <li className="flex items-center">
        <Link
          aria-current={isActive ? "page" : undefined}
          aria-label={name || undefined}
          href={href}
          className={`focus relative ${isActive ? "bg-gray-100 text-black dark:bg-zinc-900 dark:text-white" : "hover:bg-gray-100 dark:hover:bg-zinc-900"} ${isAside ? "inline-flex w-full items-center text-base lg:space-x-3" : ""} rounded-xl px-2 py-1 transition-colors duration-300 dark:cursor-pointer dark:hover:text-white`}
        >
          {children}
        </Link>
      </li>
    );
  }

  return (
    <>
      <li className={`${isFooter ? "" : "hidden py-5"} md:inline`}>
        <Link
          aria-current={isActive ? "page" : undefined}
          aria-label={name}
          href={href}
          className={`focus relative ${isActive && !isFooter ? "bg-gray-100 text-black dark:bg-zinc-900 dark:text-white" : "hover:bg-gray-100 dark:hover:bg-zinc-900"} rounded-xl px-2 py-1 transition-colors duration-300 dark:cursor-pointer dark:hover:text-white`}
        >
          {name}
        </Link>
      </li>
    </>
  );
}

export default NavLink;

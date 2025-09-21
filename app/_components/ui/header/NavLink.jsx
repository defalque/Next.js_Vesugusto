"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  name,
  href,
  onClick,
  isFooter = false,
  isAside = false,
  isAvatar = false,
  children,
}) {
  const pathname = usePathname();
  // const isActive = pathname === href;
  const isActive =
    href === "/shop" || href === "/account"
      ? pathname === href
      : pathname.startsWith(href);

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
          className={`focus relative ${
            isAvatar
              ? ""
              : isActive
                ? "bg-gray-100 text-black dark:bg-zinc-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-zinc-900"
          } ${isAside ? "_text-base inline-flex w-full items-center lg:space-x-3" : ""} rounded-xl px-2 py-1.5 text-sm font-semibold transition-colors duration-300 md:px-3 dark:cursor-pointer dark:hover:text-white`}
        >
          {children}
        </Link>
      </li>
    );
  }

  return (
    <>
      <li
        className={`${isFooter ? "" : "_text-sm hidden py-5 font-semibold"} text-sm md:inline`}
      >
        <Link
          aria-current={isActive ? "page" : undefined}
          aria-label={name}
          href={href}
          className={`focus relative ${isActive && !isFooter ? "bg-gray-100 text-black dark:bg-zinc-900 dark:text-white" : "hover:bg-gray-100 dark:hover:bg-zinc-900"} rounded-xl px-3 py-1.5 transition-colors duration-300 dark:cursor-pointer dark:hover:text-white`}
        >
          {name}
        </Link>
      </li>
    </>
  );
}

export default NavLink;

"use client";

import * as m from "motion/react-m";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ type, shouldReduce = false, ...props }) {
  const { href, children, ...restProps } = props;

  const pathname = usePathname();
  const isActive =
    href === "/shop" ? pathname === href : pathname.startsWith(href);

  return (
    <li
      className={`flex items-center ${type === "section" ? "hidden md:flex" : ""}`}
    >
      {type === "section" && (
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          {...restProps}
          className={`focus ${
            isActive
              ? "bg-gray-200/80 text-black dark:bg-zinc-700/50 dark:text-white"
              : "hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
          } rounded-xl px-2 py-1 transition-colors duration-300 active:text-white dark:cursor-pointer dark:hover:text-white`}
          {...props}
        >
          {children}
        </Link>
      )}

      {type === "main" && (
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          {...restProps}
          className={`focus relative ${
            isActive
              ? "bg-gray-200/80 text-black dark:bg-zinc-700/50 dark:text-white"
              : "hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
          } rounded-xl px-2 py-1 transition-colors duration-300 active:text-white dark:cursor-pointer dark:hover:text-white`}
          {...props}
        >
          {children}
        </Link>
      )}

      {type === "account" && (
        <>
          {pathname === href &&
            (shouldReduce === false ? (
              <m.span
                aria-hidden
                layoutId="dot"
                className="hidden aspect-square size-1.5 rounded-full bg-black md:mr-2 md:flex dark:bg-white"
              />
            ) : (
              <span className="hidden aspect-square size-1.5 rounded-full bg-black md:mr-2 md:flex dark:bg-white" />
            ))}
          <m.div layout>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              {...props}
              {...restProps}
              className={`accountLinksFocus relative z-100 flex min-w-full items-center gap-2 rounded-xl px-2 py-1 font-medium ${props.active === href ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-200"}`}
            >
              {children}
            </Link>
          </m.div>
        </>
      )}

      {type === "footer" && (
        <Link
          href={href}
          {...restProps}
          className={`focus rounded-xl px-2 py-1 transition-colors duration-300 hover:bg-gray-200/80 active:bg-gray-200/80 active:text-white dark:cursor-pointer dark:hover:bg-zinc-700/50 dark:hover:text-white dark:active:bg-zinc-700/50`}
          {...props}
        >
          {children}
        </Link>
      )}
    </li>
  );
}

export default NavLink;

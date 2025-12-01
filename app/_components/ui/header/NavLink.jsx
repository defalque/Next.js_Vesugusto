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
          className={`focus-style ${
            isActive
              ? "bg-primary-100/70 text-black dark:bg-white/10 dark:text-white"
              : "hover:bg-primary-100/70 active:bg-primary-100/70 dark:hover:bg-white/10 dark:active:bg-white/10"
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
          className={`focus-style relative ${
            isActive
              ? "bg-primary-100/70 text-black dark:bg-white/10 dark:text-white"
              : "hover:bg-primary-100/70 active:bg-primary-100/70 dark:hover:bg-white/10 dark:active:bg-white/10"
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
                className="hidden aspect-square size-1 rounded-full bg-black/80 md:mr-2 md:flex dark:bg-white"
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
              className={`accountLinksFocus group relative z-100 flex min-w-full items-center gap-2 rounded-xl font-medium ${props.active === href ? "_text-zinc-900 text-zinc-600 dark:text-white" : "text-zinc-600 dark:text-zinc-300"}`}
            >
              <m.div
                className="flex items-center gap-2 rounded-xl px-2 py-1"
                initial="initial"
                whileHover="animate"
              >
                {children}
              </m.div>
            </Link>
          </m.div>
        </>
      )}

      {type === "footer" && (
        <Link
          href={href}
          {...restProps}
          className={`focus-style hover:bg-primary-100/70 active:bg-primary-100/70 rounded-xl px-2 py-1 transition-colors duration-300 dark:cursor-pointer dark:hover:bg-white/10 dark:hover:text-white dark:active:bg-white/10`}
          {...props}
        >
          {children}
        </Link>
      )}
    </li>
  );
}

export default NavLink;

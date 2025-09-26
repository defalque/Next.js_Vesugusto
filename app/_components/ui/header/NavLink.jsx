"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({ type, ...props }) {
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
        >
          {children}
        </Link>
      )}

      {type === "account" && (
        <Link
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          {...restProps}
          className={`accountLinksFocus _w-full flex min-w-full items-center gap-2 font-medium ${
            pathname === href
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "hover:bg-black hover:text-white active:bg-black active:text-white dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black"
          } rounded-xl px-4 py-3 md:px-2 md:py-1`}
        >
          {children}
        </Link>
      )}
    </li>
  );

  // if (onClick) {
  //   return (
  //     <li className="flex w-full items-center" {...props}>
  //       <Link
  //         aria-current={isActive ? "page" : undefined}
  //         aria-label={name}
  //         href={href}
  //         className="focus w-full rounded py-3 text-center transition-colors duration-300 hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
  //         onClick={onClick}
  //       >
  //         {name}
  //       </Link>
  //     </li>
  //   );
  // }

  // if (children) {
  //   return (
  //     <li className="flex items-center" {...props}>
  //       <Link
  //         aria-current={isActive ? "page" : undefined}
  //         aria-label={name || undefined}
  //         href={href}
  //         className={`focus relative ${
  //           isAvatar
  //             ? ""
  //             : isActive
  //               ? "bg-gray-200/80 text-black dark:bg-zinc-700/50 dark:text-white"
  //               : "hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
  //         } ${isAside ? "_text-base inline-flex w-full items-center justify-center md:justify-start lg:space-x-3" : ""} rounded-xl px-2 py-1.5 text-sm font-semibold transition-colors duration-300 active:text-white md:px-3 dark:cursor-pointer dark:hover:text-white`}
  //       >
  //         {children}
  //       </Link>
  //     </li>
  //   );
  // }

  // return (
  //   <>
  //     <li
  //       className={`${isFooter ? "" : "hidden py-5"} text-base md:inline`}
  //       {...props}
  //     >
  //       <Link
  //         aria-current={isActive ? "page" : undefined}
  //         aria-label={name}
  //         href={href}
  //         className={`focus relative ${isActive && !isFooter ? "bg-gray-200/80 text-black dark:bg-zinc-700/50 dark:text-white" : "hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"} rounded-xl px-3 py-1.5 transition-colors duration-300 dark:cursor-pointer dark:hover:text-white`}
  //       >
  //         {name}
  //       </Link>
  //     </li>
  //   </>
  // );
}

export default NavLink;

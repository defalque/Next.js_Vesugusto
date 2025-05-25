"use client";

import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function Navigation({ session, cartItemsCount }) {
  const pathname = usePathname();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-13 dark:gap-11 items-center">
        <li>
          <Link
            href="/about"
            className={`py-5.5 hover:border-b hover:border-b-primary-dark-100 dark:hover:border-b-0 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-100 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer ${
              pathname === "/about"
                ? "text-primary-950 dark:bg-dark-400 dark:hover:bg-dark-400 border-b border-b-primary-950 dark:border-b-0"
                : "text-primary-dark-900"
            }`}
          >
            Chi siamo
          </Link>
        </li>

        <li>
          <Link
            href="/products"
            className={`py-5.5 hover:border-b hover:border-b-primary-dark-100 dark:hover:border-b-0 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-100 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer ${
              pathname === "/products"
                ? "text-primary-950 dark:bg-dark-400 dark:hover:bg-dark-400 border-b border-b-primary-950 dark:border-b-0"
                : "text-primary-dark-900"
            }`}
          >
            Prodotti
          </Link>
        </li>

        <li className="py-5.5">
          <Link
            href="/create"
            className={`py-5.5 hover:border-b hover:border-b-primary-dark-100 dark:hover:border-b-0 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-100 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer ${
              pathname === "/create"
                ? "text-primary-950 dark:bg-dark-400 dark:hover:bg-dark-400 border-b border-b-primary-950 dark:border-b-0"
                : "text-primary-dark-900"
            }`}
          >
            creIAmo
          </Link>
        </li>

        {session?.user ? (
          <li>
            <Link href="/cart">
              <div className="relative">
                <ShoppingBagIcon
                  className={`size-8 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-zinc-500 ${
                    pathname === "/cart"
                      ? "text-primary-900 dark:text-primary-800"
                      : "text-primary-dark-900"
                  }`}
                />
                {cartItemsCount.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-primary-950 rounded-full">
                    {cartItemsCount.length}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ) : null}

        <li>
          <Link href="/account">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                className="h-8 rounded-full hover:brightness-95"
                alt={session.user.name}
                referrerPolicy="no-referrer"
                width={32}
                height={32}
              />
            ) : (
              <UserIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"></UserIcon>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

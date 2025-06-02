"use client";

import Link from "next/link";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

function Navigation({ session, cartItemsCount }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-10 text-lg font-normal mx-auto w-full">
      <ul className="hidden md:flex gap-16 dark:gap-11 items-center">
        <li className="py-5.5">
          <Link
            href="/products"
            className={` dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-100 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer transition-colors duration-300 ${
              pathname === "/products"
                ? "text-primary-950 dark:bg-dark-300 dark:hover:bg-dark-300"
                : "text-primary-dark-900"
            }`}
          >
            Prodotti
          </Link>
        </li>

        <li className="py-5.5">
          <Link
            href="/create"
            className={`py-5.5 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-100 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer transition-colors duration-300 ${
              pathname === "/create"
                ? "text-primary-950 dark:bg-dark-300 dark:hover:bg-dark-300"
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
                  className={`size-6 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-950 transition-colors duration-300 ${
                    pathname === "/cart"
                      ? "text-primary-900 dark:text-dark-300"
                      : "text-primary-dark-900"
                  }`}
                />
                {cartItemsCount?.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-primary-950 rounded-full">
                    {cartItemsCount?.length}
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
              <UserIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-950transition-colors duration-300"></UserIcon>
            )}
          </Link>
        </li>
      </ul>
      {/* Mobile Nav Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-primary-dark-900 hover:text-primary-dark-100 dark:text-primary-100 cursor-pointer"
        >
          {menuOpen ? (
            <XMarkIcon className="size-7 transition duration-300" />
          ) : (
            <Bars3Icon className="size-7 transition duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-primary-50 dark:bg-primary-dark-950 z-20 flex flex-col items-center text-xl font-normal md:hidden shadow-lg dark:shadow-dark-400 transition-all duration-300">
          <Link
            href="/products"
            className="hover:bg-gray-100 dark:hover:dark:bg-dark-300 w-full text-center py-3"
            onClick={() => setMenuOpen(false)}
          >
            Prodotti
          </Link>
          <Link
            href="/create"
            className="hover:bg-gray-100 dark:hover:dark:bg-dark-300 w-full text-center py-3"
            onClick={() => setMenuOpen(false)}
          >
            creIAmo
          </Link>
          {session?.user && (
            <Link
              href="/cart"
              className="hover:bg-gray-100 dark:hover:dark:bg-dark-300 w-full text-center py-3"
              onClick={() => setMenuOpen(false)}
            >
              Carrello ({cartItemsCount?.length || 0})
            </Link>
          )}
          <Link
            href="/account"
            className="hover:bg-gray-100 dark:hover:dark:bg-dark-300 w-full text-center py-3"
            onClick={() => setMenuOpen(false)}
          >
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navigation;

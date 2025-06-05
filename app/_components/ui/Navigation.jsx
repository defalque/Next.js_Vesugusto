"use client";

import Link from "next/link";
import {
  Bars3Icon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { HoverCard } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";

function Navigation({ session, cartItemsCount, info }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="z-10 text-lg font-normal mx-auto w-full">
      <ul className="hidden md:flex gap-16 dark:gap-11 items-center">
        <li className="py-5.5">
          <Link
            href="/products"
            className={` dark:text-gray-100 hover:text-primary-dark-100 dark:hover:text-primary-50 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer transition-colors duration-300 ${
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
            className={`py-5.5 dark:text-gray-100 hover:text-primary-dark-100 dark:hover:text-primary-50 dark:py-3 dark:px-2 dark:rounded-2xl dark:hover:bg-dark-200 dark:cursor-pointer transition-colors duration-300 ${
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
                  className={`size-6 dark:text-gray-100 hover:text-primary-dark-100 dark:hover:text-primary-950 transition-colors duration-300 ${
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
              <div>
                <HoverCard.Root>
                  <HoverCard.Trigger asChild>
                    <Image
                      src={session.user.image}
                      className="h-8 w-8 rounded-full hover:brightness-95 cursor-pointer"
                      alt={session.user.name}
                      referrerPolicy="no-referrer"
                      width={32}
                      height={32}
                    />
                  </HoverCard.Trigger>

                  <HoverCard.Portal>
                    <HoverCard.Content
                      className="z-1100 w-55 rounded-xl bg-gray-100 dark:bg-dark-300 p-3 border border-gray-200 dark:border-dark-100 shadow-xl space-y-1"
                      sideOffset={0}
                      side="top"
                    >
                      <div className="space-y-5">
                        <div className="flex items-center gap-1.5">
                          <UserIcon className="size-4 dark:fill-primary-50" />
                          <p className="text-base font-bold dark:text-primary-50">
                            {session.user.name}
                          </p>
                        </div>
                        {/* {info.via ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-[auto_1fr] gap-1.5">
                              <MapPinIcon className="size-4 fill-primary-50" />
                              <p className="text-xs text-primary-50">
                                {`${info.via}, ${info.numeroCivico}, ${info.comune}`}
                              </p>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <DevicePhoneMobileIcon className="size-4 fill-primary-50" />
                              <p className="text-xs text-primary-50">
                                {info.phoneNumber}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-primary-50">
                            Aggiorna le tue informazioni di profilo!
                          </p>
                        )} */}
                        <div className="flex flex-col text-sm space-y-1 transition-colors duration-200">
                          <Link
                            href="/account/orders"
                            className="hover:text-primary-950"
                          >
                            I tuoi ordini
                          </Link>
                          <Link
                            href="/account/favorites"
                            className="hover:text-primary-950"
                          >
                            I tuoi preferiti
                          </Link>
                          <Link
                            href="/account/recipes"
                            className="hover:text-primary-950"
                          >
                            Le tue ricette
                          </Link>
                        </div>
                      </div>

                      <HoverCard.Arrow className="fill-gray-100 dark:fill-dark-300" />
                    </HoverCard.Content>
                  </HoverCard.Portal>
                </HoverCard.Root>
              </div>
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -250, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -250, opacity: 0.3 }}
            transition={{ duration: 0, type: "spring", staggerChildren: 0.05 }}
            className="absolute top-full left-0 right-0 bg-primary-50 dark:bg-primary-dark-950 z-5 flex flex-col items-center text-xl font-normal md:hidden shadow-lg dark:shadow-dark-400 transition-all duration-300"
          >
            <Link
              href="/products"
              className="hover:bg-gray-50 hover:text-primary-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Prodotti
            </Link>
            <Link
              href="/create"
              className="hover:bg-gray-50 hover:text-primary-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              creIAmo
            </Link>
            {session?.user && (
              <Link
                href="/cart"
                className="hover:bg-gray-50 hover:text-primary-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Carrello ({cartItemsCount?.length || 0})
              </Link>
            )}
            <Link
              href="/account"
              className="hover:bg-gray-50 hover:text-primary-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navigation;

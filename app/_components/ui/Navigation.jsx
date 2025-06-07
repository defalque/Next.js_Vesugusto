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
import { HoverCard } from "radix-ui";
import { AnimatePresence, motion } from "framer-motion";

function Navigation({ session, children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // per invertire lo stagger all'uscita (facoltativo)
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <nav className="z-10 text-lg font-normal mx-auto w-full">
      <ul className="hidden md:flex gap-16 dark:gap-11 items-center">
        <li className="py-5.5">
          <Link
            href="/products"
            className={`relative dark:text-gray-200 dark:hover:text-white py-3 px-2 rounded-2xl dark:cursor-pointer transition-colors duration-300`}
          >
            Prodotti
            {pathname === "/products" ? (
              <motion.div
                id="nav-tab-indicator"
                layoutId="nav-tab-indicator"
                className="absolute -z-10 top-0 right-0 left-0 h-full bg-primary-100 dark:bg-dark-300 rounded-2xl"
              ></motion.div>
            ) : null}
          </Link>
        </li>

        <li className="py-5.5">
          <Link
            href="/create"
            className={`relative dark:text-gray-200 dark:hover:text-white py-3 px-2 rounded-2xl dark:cursor-pointer transition-colors duration-300`}
          >
            creIAmo
            {pathname === "/create" ? (
              <motion.div
                id="nav-tab-indicator"
                layoutId="nav-tab-indicator"
                className="absolute -z-10 top-0 right-0 left-0 h-full bg-primary-100 dark:bg-dark-300 rounded-2xl"
              ></motion.div>
            ) : null}
          </Link>
        </li>

        {session?.user ? (
          <li>
            <Link href="/cart" aria-label="Carrello">
              <div className="relative">
                <ShoppingBagIcon
                  className={`size-6 dark:text-gray-100 hover:text-primary-dark-100 dark:hover:text-primary-950 transition-colors duration-300 ${
                    pathname === "/cart"
                      ? "text-primary-900 dark:text-dark-300"
                      : "text-primary-dark-900"
                  }`}
                />
                {children}
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
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-full left-0 right-0 z-500 flex flex-col items-center text-xl font-normal md:hidden transition-all duration-300"
          >
            <motion.div
              className="w-full flex items-center"
              variants={itemVariants}
            >
              <Link
                href="/products"
                className=" hover:bg-gray-50 bg-primary-50 dark:bg-primary-dark-950 hover:text-primary-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Prodotti
              </Link>
            </motion.div>

            <motion.div
              className="w-full flex items-center"
              variants={itemVariants}
            >
              <Link
                href="/create"
                className="hover:bg-gray-50 hover:text-primary-950 bg-primary-50 dark:bg-primary-dark-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
                onClick={() => setMenuOpen(false)}
              >
                creIAmo
              </Link>
            </motion.div>

            {session?.user && (
              <motion.div
                className="w-full flex items-center"
                variants={itemVariants}
              >
                <Link
                  href="/cart"
                  className="hover:bg-gray-50 hover:text-primary-950 bg-primary-50 dark:bg-primary-dark-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Carrello ({children ?? 0})
                </Link>
              </motion.div>
            )}

            <motion.div
              className="w-full flex items-center"
              variants={itemVariants}
            >
              <Link
                href="/account"
                className="hover:bg-gray-50 hover:text-primary-950 bg-primary-50 dark:bg-primary-dark-950 dark:hover:text-primary-50 dark:hover:dark:bg-dark-400 w-full text-center py-3 transition-colors duration-200 shadow-lg dark:shadow-dark-400"
                onClick={() => setMenuOpen(false)}
              >
                Account
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navigation;

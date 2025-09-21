"use client";

import { EllipsisVerticalIcon, Bars4Icon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

function ToggleNavbarMobile() {
  return (
    <Menu as="nav" className="relative md:hidden">
      {/* <MenuButton
        aria-haspopup="true"
        aria-label="Apri menu di navigazione mobile"
        className="data-focus:outline-primary-950 inline-flex cursor-pointer rounded-xl px-2 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-hover:bg-gray-200/80 data-open:bg-gray-200/50 dark:data-hover:bg-zinc-700/50 dark:data-open:bg-zinc-700/50"
      >
        <EllipsisVerticalIcon
          aria-hidden={true}
          className="size-6 transition duration-300"
        />
      </MenuButton> */}

      <MenuButton as={Fragment}>
        {({ active }) => (
          <button
            aria-label={`${active ? "Chiudi menu di navigazione mobile" : "Apri menu di navigazione mobile"}`}
            className="data-focus:outline-primary-950 inline-flex cursor-pointer rounded-xl px-2 py-1.5 focus:not-data-focus:outline-none data-focus:outline-2 data-hover:bg-gray-200/80 data-open:bg-gray-200/50 dark:data-hover:bg-zinc-700/50 dark:data-open:bg-zinc-700/50"
          >
            <Bars4Icon
              aria-hidden={true}
              className="size-6 transition duration-300"
            />
          </button>
        )}
      </MenuButton>

      <MenuItems
        as="ul"
        modal={false}
        // transition
        anchor="bottom end"
        className="_origin-top-right _divide-y z-150 min-w-xs space-y-2 divide-white/5 rounded-xl bg-gray-100 p-2 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(2)] focus:outline-none data-closed:-translate-y-1 data-closed:scale-95 data-closed:opacity-0 dark:bg-zinc-900"
      >
        <MenuItem as="li">
          {({ focus, close }) => (
            <Link
              href="/shop"
              className={`block w-full rounded-lg px-3 py-2 transition ${
                focus
                  ? "bg-black/5 dark:bg-white/5"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={close}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Shop
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Visualizza i nostri prodotti
              </div>
            </Link>
          )}
        </MenuItem>
        <MenuItem as="li">
          {({ focus, close }) => (
            <Link
              href="/#"
              className={`block w-full rounded-lg px-3 py-2 transition ${
                focus
                  ? "bg-black/5 dark:bg-white/5"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={close}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Privacy policy
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Leggi la nostra politica sulla privacy
              </div>
            </Link>
          )}
        </MenuItem>
        <MenuItem as="li">
          {({ focus, close }) => (
            <Link
              href="/#"
              className={`block w-full rounded-lg px-3 py-2 transition ${
                focus
                  ? "bg-black/5 dark:bg-white/5"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              onClick={close}
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Cookie policy
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Leggi la nostra politica sulla privacy
              </div>
            </Link>
          )}
        </MenuItem>

        {/* <MenuItem as="li">
          <Link
            href="/#"
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10 focus:outline-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10"
          >
            <div>
              <div className="text-sm/6 font-medium text-gray-900 dark:text-white">
                Privacy policy
              </div>
              <div className="text-xs/5 text-gray-600 dark:text-gray-400">
                Leggi la nostra politica sulla privacy
              </div>
            </div>
          </Link>
        </MenuItem>

        <MenuItem as="li">
          <Link
            href="/#"
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10 focus:outline-none data-[focus]:bg-black/10 dark:data-[focus]:bg-white/10"
          >
            <div>
              <div className="text-sm/6 font-medium text-gray-900 dark:text-white">
                Cookie policy
              </div>
              <div className="text-xs/5 text-gray-600 dark:text-gray-400">
                Leggi la nostra politica sulla privacy
              </div>
            </div>
          </Link>
        </MenuItem> */}
      </MenuItems>
    </Menu>
  );
}

export default ToggleNavbarMobile;

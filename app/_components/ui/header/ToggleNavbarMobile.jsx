"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import NavLink from "./NavLink";
import { Dialog, DialogPanel } from "@headlessui/react";

function ToggleNavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="focus text-primary-dark-900 dark:text-primary-100 inline cursor-pointer rounded-xl p-1 text-sm hover:bg-gray-100 md:hidden dark:hover:bg-zinc-900"
        onClick={() => setIsOpen(true)}
        aria-label="Apri menu navigazione"
      >
        <Bars3Icon className="size-7 transition duration-300" />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 md:hidden"
      >
        <DialogPanel className="dark:bg-primary-dark-950 _border bg-primary-50 fixed inset-0 px-4 py-1.5">
          <button
            className="focus text-primary-dark-900 dark:text-primary-50 inline cursor-pointer rounded-xl p-1 text-center hover:bg-gray-100 dark:hover:bg-zinc-900"
            onClick={() => setIsOpen(false)}
            aria-label="Chiudi menu navigazione"
          >
            <XMarkIcon className="size-7 transition duration-300" />
            {/* Chiudi */}
          </button>

          <ul className="flex w-full flex-col items-center gap-3 text-xl font-normal transition-all duration-300 md:hidden">
            <NavLink
              href="/shop"
              name="Prodotti"
              onClick={() => setIsOpen(false)}
            />
          </ul>
        </DialogPanel>
      </Dialog>
    </>
  );
}

export default ToggleNavbarMobile;

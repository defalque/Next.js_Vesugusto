"use client";

import { useMobileNavbarContext } from "@/app/_contexts/MobileNavbarContext";
import { Bars4Icon } from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
const DrawerDialog = dynamic(() => import("../drawer/DrawerDialog"), {
  ssr: false,
});

function ToggleNavbar({ children }) {
  const { isOpen, setIsOpen } = useMobileNavbarContext();

  return (
    <nav className="relative md:hidden">
      <button
        aria-label={`Apri menu di navigazione mobile`}
        className="focus:outline-primary-950 inline-flex cursor-pointer rounded-xl px-2 py-1.5 hover:bg-gray-200/80 active:bg-gray-200/80 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50"
        onClick={() => setIsOpen(!isOpen)}
        aria-pressed={isOpen}
      >
        <Bars4Icon
          aria-hidden={true}
          className="size-6 transition duration-300"
        />
      </button>

      <DrawerDialog
        className="dark:bg-primary-dark-950 bg-primary-50 px-2 py-2 text-sm"
        open={isOpen}
        setOpen={setIsOpen}
        direction="right"
      >
        {children}
      </DrawerDialog>
    </nav>
  );
}

export default ToggleNavbar;

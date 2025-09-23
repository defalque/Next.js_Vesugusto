"use client";

import { useMobileNavbarContext } from "@/app/_contexts/MobileNavbarContext";

import dynamic from "next/dynamic";
import { shimmer } from "../skeleton/Skeletons";
const DrawerDialog = dynamic(() => import("../drawer/DrawerDialog"), {
  ssr: false,
  loading: () => (
    <span
      className={`${shimmer} relative size-6 animate-pulse overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700`}
    />
  ),
});

function ToggleNavbar({ children }) {
  const { isOpen, setIsOpen } = useMobileNavbarContext();

  return (
    <nav className="relative ml-2 flex items-baseline md:hidden">
      <DrawerDialog
        className="dark:bg-primary-dark-950 bg-primary-50 px-4.5 py-3 text-sm"
        open={isOpen}
        setOpen={setIsOpen}
        direction="right"
        buttonStyles="data-focus:outline-primary-950 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/80 px-2 py-1.5 hover:bg-gray-200/80 focus:not-data-focus:outline-none active:bg-gray-200/80 data-focus:outline-2 dark:bg-black/80 data-focus:-outline-offset-2 dark:hover:dark:bg-zinc-700/50 dark:active:dark:bg-zinc-700/50"
      >
        {children}
      </DrawerDialog>
    </nav>
  );
}

export default ToggleNavbar;

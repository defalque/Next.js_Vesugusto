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

function ToggleNavbarMobile({ children }) {
  const { isOpen, setIsOpen } = useMobileNavbarContext();

  return (
    <div className="flex items-center md:hidden">
      <DrawerDialog
        ariaLabel="Esplora altre sezioni"
        className="bgColor px-4.5 py-3 text-sm"
        open={isOpen}
        setOpen={setIsOpen}
        direction="right"
        buttonStyles="data-focus:outline-primary-950 cursor-pointer rounded-xl bg-white/80 px-2 py-1 hover:bg-gray-200/80 focus:not-data-focus:outline-none active:bg-gray-200/80 data-focus:outline-2 dark:bg-black/80 data-focus:-outline-offset-2 dark:hover:dark:bg-zinc-700/50 dark:active:dark:bg-zinc-700/50"
      >
        {children}
      </DrawerDialog>
    </div>
  );
}

export default ToggleNavbarMobile;

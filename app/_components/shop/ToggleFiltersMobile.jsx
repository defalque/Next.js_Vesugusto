"use client";

import dynamic from "next/dynamic";
import { shimmer } from "../ui/skeleton/Skeletons";
const DrawerDialog = dynamic(() => import("../ui/drawer/DrawerDialog"), {
  ssr: false,
  loading: () => (
    <div
      className={`${shimmer} relative h-full w-20 animate-pulse overflow-hidden rounded-md bg-gray-200 dark:bg-zinc-700`}
    />
  ),
});

import { useState } from "react";

function ToggleFiltersMobile({ children }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="relative self-stretch lg:hidden">
      <DrawerDialog
        ariaLabel="Filtri"
        className="bgColor"
        open={isOpenMobile}
        setOpen={setIsOpenMobile}
        buttonStyles="data-focus:outline-primary-950 inline-flex h-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white/80 px-2 py-1 backdrop-blur-sm hover:bg-gray-200/80 focus:not-data-focus:outline-none active:bg-gray-200/80 data-focus:outline-2 data-focus:-outline-offset-2 sm:text-base dark:bg-black/80 dark:hover:dark:bg-zinc-700/50 dark:active:dark:bg-zinc-700/50"
      >
        {children}
      </DrawerDialog>
    </div>
  );
}

export default ToggleFiltersMobile;

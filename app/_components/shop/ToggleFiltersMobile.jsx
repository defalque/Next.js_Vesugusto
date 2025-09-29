"use client";

import dynamic from "next/dynamic";
import { shimmer } from "../ui/skeleton/Skeletons";
const DrawerDialog = dynamic(() => import("../ui/drawer/DrawerDialog"), {
  ssr: false,
  loading: () => (
    <div
      className={`${shimmer} relative h-10 w-23 animate-pulse overflow-hidden rounded-full bg-gray-200 md:h-full dark:bg-zinc-700`}
    />
  ),
});

import { useState } from "react";

function ToggleFiltersMobile({ children }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="relative self-stretch lg:hidden">
      <DrawerDialog
        className="bgColor"
        open={isOpenMobile}
        setOpen={setIsOpenMobile}
        buttonStyles="data-focus:outline-primary-950 transition-colors duration-200 inline-flex h-full font-semibold cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 bg-black text-white dark:text-black hover:bg-black/75 active:bg-black/75 dark:bg-white dark:hover:bg-white/70 dark:active:bg-white/70 focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 sm:text-base"
      >
        {children}
      </DrawerDialog>
    </div>
  );
}

export default ToggleFiltersMobile;

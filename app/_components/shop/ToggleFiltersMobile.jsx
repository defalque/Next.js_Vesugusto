"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

import dynamic from "next/dynamic";
const DrawerDialog = dynamic(() => import("../ui/drawer/DrawerDialog"), {
  ssr: false,
});
// import DrawerDialog from "../ui/drawer/DrawerDialog";

import { useState } from "react";

function ToggleFiltersMobile({ children }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <>
      <button
        className="focus inline-flex cursor-pointer items-center justify-center gap-2 self-stretch rounded-xl bg-white/80 px-2 py-1 text-sm backdrop-blur-sm hover:bg-gray-200/80 sm:text-base lg:hidden dark:bg-black/80 dark:hover:bg-zinc-900/80"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        aria-pressed={isOpenMobile}
        aria-label="Mostra filtri"
      >
        <span>Filtri</span>
        <AdjustmentsHorizontalIcon className="size-5" />
      </button>

      <DrawerDialog
        className="dark:bg-primary-dark-950 bg-primary-50 px-2 py-2 text-sm"
        open={isOpenMobile}
        setOpen={setIsOpenMobile}
      >
        {children}
      </DrawerDialog>
    </>
  );
}

export default ToggleFiltersMobile;

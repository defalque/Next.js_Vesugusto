"use client";

import { signOutAction } from "@/app/_lib/actions";
import { PowerIcon } from "@heroicons/react/24/outline";

export function SignOut() {
  return (
    <button
      onClick={signOutAction}
      aria-label="Esci"
      type="submit"
      // className={`focus-visible:ring-primary-950 spx-0 flex w-full cursor-pointer items-center gap-2 rounded-xl py-2 font-bold whitespace-nowrap text-black/55 hover:text-black focus-visible:ring-2 focus-visible:outline-none active:text-black sm:px-2 sm:py-1 sm:font-medium sm:hover:bg-gray-200/80 sm:active:bg-gray-200/80 lg:px-4 dark:text-white/55 dark:hover:text-white dark:active:text-white sm:dark:hover:bg-zinc-700/50 sm:dark:active:bg-zinc-700/50`}
      className={`accountLinksFocus flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium hover:bg-black hover:text-white active:bg-black active:text-white md:px-2 md:py-1 dark:hover:bg-white dark:hover:text-black dark:active:bg-white dark:active:text-black`}
    >
      <span>
        <PowerIcon aria-hidden className="size-9 md:size-6 lg:size-5" />
      </span>
      <span className="hidden md:inline">Esci</span>
    </button>
  );
}

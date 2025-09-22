"use client";

import { signOutAction } from "@/app/_lib/actions";
import { PowerIcon } from "@heroicons/react/24/outline";

export function SignOut() {
  return (
    <button
      onClick={signOutAction}
      aria-label="Esci"
      type="submit"
      className={`flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-2 whitespace-nowrap hover:bg-gray-200/80 active:bg-gray-200/80 sm:px-2 sm:py-1 lg:px-4 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50`}
    >
      <span className="hidden sm:block">
        <PowerIcon aria-hidden className="size-4.5 sm:size-6 lg:size-5" />
      </span>
      <span>Esci</span>
    </button>
  );
}

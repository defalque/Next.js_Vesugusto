import { signOutAction } from "@/app/_lib/actions";
import { PowerIcon } from "@heroicons/react/24/outline";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className={`focus relative inline-flex w-full cursor-pointer items-center rounded-xl px-2 py-1 text-base transition-colors duration-300 hover:bg-gray-100 lg:space-x-3 dark:cursor-pointer dark:hover:bg-zinc-900 dark:hover:text-white`}
      >
        <PowerIcon className="size-6 lg:size-5" />
        <span className="hidden lg:inline">Esci</span>
      </button>
    </form>
  );
}

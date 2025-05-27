import { signOutAction } from "@/app/_lib/actions";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

export function SignOut() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-md py-1 text-base px-2 cursor-pointer w-full flex items-center gap-4 font-semibold hover:bg-primary-950 hover:text-primary-50"
      >
        <ArrowRightEndOnRectangleIcon className="h-5 w-5"></ArrowRightEndOnRectangleIcon>
        <span>Esci</span>
      </button>
    </form>
  );
}

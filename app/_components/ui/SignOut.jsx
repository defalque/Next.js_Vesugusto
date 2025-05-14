import { signOut } from "@/auth.js";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
      className="flex items-center"
    >
      <button type="submit" className="cursor-pointer">
        <ArrowRightEndOnRectangleIcon className="size-6 text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"></ArrowRightEndOnRectangleIcon>
      </button>
    </form>
  );
}

import Image from "next/image";
import NavLink from "./NavLink";
import { UserIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";

// Funzione helper per il delay
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

async function UserAvatar() {
  // await delay(2000);
  const session = await auth();

  if (!session?.user) {
    return (
      <NavLink href="/login" name="Login">
        <span className="hidden md:inline">Account</span>
        <UserIcon className="dark:text-primary-50 inline size-6 text-black md:hidden" />
      </NavLink>
    );
  }

  const userImage = session?.user?.image;
  const userName = session?.user?.name || "User";

  return (
    <NavLink href="/account" name="Account">
      <Image
        src={userImage}
        className="_hover:brightness-95 size-7 cursor-pointer rounded-full md:size-6"
        alt={`Immagine del profilo di ${userName}`}
        referrerPolicy="no-referrer"
        width={32}
        height={32}
      />
    </NavLink>
  );
}

export default UserAvatar;

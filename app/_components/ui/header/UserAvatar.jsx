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
      <NavLink href="/credentials/login" name="Login">
        <span className="hidden md:inline">Accedi</span>
        <UserIcon className="dark:text-primary-50 inline size-6 text-black md:hidden" />
      </NavLink>
    );
  }

  const userImage = session?.user?.image;
  const userName = session?.user?.name || "User";

  return (
    <NavLink href="/account" name="Account" isAvatar>
      <Image
        src={userImage}
        className="_size-6 cursor-pointer rounded-full hover:brightness-95"
        alt={`Immagine del profilo di ${userName}`}
        referrerPolicy="no-referrer"
        width={26}
        height={26}
      />
    </NavLink>
  );
}

export default UserAvatar;

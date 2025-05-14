import { auth } from "@/auth";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

async function UserPic() {
  const session = await auth();

  return (
    <>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          className="h-8 rounded-full"
          alt={session.user.name}
          referrerPolicy="no-referrer"
          width={32}
          height={32}
        />
      ) : (
        <UserIcon className="size-6 text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"></UserIcon>
      )}
    </>
  );
}

export default UserPic;

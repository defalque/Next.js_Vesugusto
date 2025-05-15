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
          className="h-8 rounded-full hover:brightness-95"
          alt={session.user.name}
          referrerPolicy="no-referrer"
          width={32}
          height={32}
        />
      ) : (
        <UserIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"></UserIcon>
      )}
    </>
  );
}

export default UserPic;

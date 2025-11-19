// import Image from "next/image";
import NavLink from "./NavLink";
// import { auth } from "@/auth";
import { auth, currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";

// Funzione helper per il delay
// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

async function UserAvatar() {
  // await delay(2000);
  // const session = await auth();

  // if (!session?.user) {
  //   return (
  //     <NavLink href="/credentials/login" type="main" aria-label="Accedi">
  //       <span className="hidden text-base md:inline">Accedi</span>
  //       <User
  //         aria-hidden
  //         className="dark:text-primary-50 block size-6 text-black md:hidden md:size-5"
  //       />
  //     </NavLink>
  //   );
  // }

  // Use `auth()` to access `isAuthenticated` - if false, the user is not signed in
  const { isAuthenticated } = await auth();

  // Protect the route by checking if the user is signed in
  if (!isAuthenticated) {
    return <div>Sign in to view this page</div>;
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  // const userImage = session?.user?.image;
  // const userName = session?.user?.name || "User";

  return (
    <NavLink href="/account" type="main" aria-label="Il tuo account">
      <User
        aria-hidden
        className="dark:text-primary-50 inline size-6 text-black md:size-5"
      />
      {/* <Image
          src={userImage}
          className="size-6 cursor-pointer rounded-full hover:brightness-95"
          alt={`Immagine del profilo di ${userName}`}
          referrerPolicy="no-referrer"
          width={30}
          height={30}
        /> */}
    </NavLink>
  );
}

export default UserAvatar;

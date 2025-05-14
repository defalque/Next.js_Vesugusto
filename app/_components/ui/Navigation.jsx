import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { SignOut } from "./SignOut";
import { auth } from "@/auth";
import UserPic from "./UserPic";

async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/about"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"
          >
            Chi siamo
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"
          >
            Prodotti
          </Link>
        </li>
        <li>
          <Link
            href="/recipes"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"
          >
            Ricette
          </Link>
        </li>
        <li>
          <Link
            href="/create"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"
          >
            creIAmo
          </Link>
        </li>
        {session?.user ? (
          <li>
            <Link href="/cart">
              <ShoppingCartIcon className="size-6 text-orange-950 dark:text-orange-100 hover:text-orange-700 dark:hover:text-orange-200"></ShoppingCartIcon>
            </Link>
          </li>
        ) : null}
        <li>
          <Link href="/account">
            <UserPic></UserPic>
          </Link>
        </li>
        {session?.user ? (
          <li>
            <SignOut></SignOut>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navigation;

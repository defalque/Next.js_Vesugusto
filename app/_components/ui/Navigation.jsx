import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { SignOut } from "./SignOut";
import { auth } from "@/auth";
import UserPic from "./UserPic";

async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-13 items-center">
        <li>
          <Link
            href="/about"
            className="text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"
          >
            Chi siamo
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"
          >
            Prodotti
          </Link>
        </li>
        <li>
          <Link
            href="/recipes"
            className="text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"
          >
            Ricette
          </Link>
        </li>
        <li>
          <Link
            href="/create"
            className="text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"
          >
            creIAmo
          </Link>
        </li>
        {session?.user ? (
          <li>
            <Link href="/cart">
              <ShoppingCartIcon className="size-6 text-primary-dark-900 dark:text-primary-100 hover:text-primary-dark-100 dark:hover:text-primary-300"></ShoppingCartIcon>
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

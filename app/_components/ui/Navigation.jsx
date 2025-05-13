import Link from "next/link";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/about"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"
          >
            Chi siamo
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"
          >
            Prodotti
          </Link>
        </li>
        <li>
          <Link
            href="/recipes"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"
          >
            Ricette
          </Link>
        </li>
        <li>
          <Link
            href="/create"
            className="text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"
          >
            creIAmo
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <ShoppingCartIcon className="size-6 text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"></ShoppingCartIcon>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <UserIcon className="size-6 text-orange-950 dark:text-orange-100 hover:text-orange-50 dark:hover:text-orange-300"></UserIcon>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

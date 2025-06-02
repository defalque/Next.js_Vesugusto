"use client";

import {
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOut } from "./SignOut";

const navLinks = [
  {
    name: "Il tuo profilo",
    href: "/account",
    icon: <UserIcon className="h-5 w-5" />,
  },
  {
    name: "I tuoi ordini",
    href: "/account/orders",
    icon: <ClipboardDocumentIcon className="h-5 w-5 " />,
  },
  {
    name: "I tuoi preferiti",
    href: "/account/favorites",
    icon: <HeartIcon className="h-5 w-5 " />,
  },
  {
    name: "Le tue ricette",
    href: "/account/recipes",
    icon: <SparklesIcon className="h-5 w-5 " />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="border-r my-5 border-r-gray-200 dark:border-r-dark-200 sticky top-18 left-0 w-max xl:w-58"
      style={{ height: "calc(100vh - 73px)" }}
    >
      <ul className="flex flex-col gap-2 text-lg px-0 xl:px-3 py-3 h-full">
        {/* <li className="text-primary-950 text-sm px-3 font-semibold">Account</li> */}
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`xl:rounded-md py-2 md:py-1 px-2 hover:text-primary-950 md:hover:bg-primary-950 md:hover:text-primary-50 transition-colors duration-100 text-base flex items-center gap-2 xl:gap-4 font-medium ${
                pathname === link.href
                  ? "text-primary-950 md:bg-primary-950 md:text-primary-50"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden md:flex">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="py-0.5 mt-auto mb-8">
          <SignOut />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;

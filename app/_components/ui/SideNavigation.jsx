"use client";

import {
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
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
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-orange-50 shadow-sm dark:border-midnight dark:shadow-2xl">
      <ul className="flex flex-col gap-2 text-lg px-3 py-7.5 h-full">
        {/* <li className="text-primary-950 text-sm px-3 font-semibold">Account</li> */}
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`rounded-xl py-0.5 px-2 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors duration-100 flex items-center gap-4 font-semibold ${
                pathname === link.href
                  ? "bg-primary-950 text-primary-100 dark:bg-primary-800 dark:text-primary-50"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
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

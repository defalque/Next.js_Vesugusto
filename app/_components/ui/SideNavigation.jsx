"use client";

import {
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <ul className="flex flex-col gap-3 text-lg px-3 py-2 mt-5">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`rounded-xl py-1 px-3 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-dark-200 transition-colors flex items-center gap-4 font-semibold ${
                pathname === link.href
                  ? "bg-primary-950 text-primary-100 dark:bg-primary-dark-200"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideNavigation;

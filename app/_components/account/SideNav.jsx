import {
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SignOut } from "../ui/SignOut";
import NavLinks from "./NavLinks";

const navLinks = [
  {
    name: "Il mio profilo",
    href: "/account",
    icon: <UserIcon className="size-6 lg:size-5" />,
  },
  {
    name: "I miei ordini",
    href: "/account/orders",
    icon: <ClipboardDocumentIcon className="size-6 lg:size-5" />,
  },
  {
    name: "I miei preferiti",
    href: "/account/favorites",
    icon: <HeartIcon className="size-6 lg:size-5" />,
  },
];

function SideNav() {
  return (
    <nav className="sticky top-14.5 h-[calc(100vh-5rem)] md:top-22 md:h-[calc(100vh-6.6rem)]">
      <ul className="flex h-full flex-col gap-2 text-lg">
        <NavLinks navLinks={navLinks} />

        <li className="mt-auto">
          <SignOut />
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;

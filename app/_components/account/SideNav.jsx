import {
  ClipboardDocumentIcon,
  HeartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SignOut } from "../ui/SignOut";
import AccountNavLinks from "./AccountNavLinks";

const navLinks = [
  {
    name: "Il mio profilo",
    href: "/account",
    icon: <UserIcon aria-hidden className="size-4.5 sm:size-6 lg:size-5" />,
  },
  {
    name: "I miei ordini",
    href: "/account/orders",
    icon: (
      <ClipboardDocumentIcon
        aria-hidden
        className="size-4.5 sm:size-6 lg:size-5"
      />
    ),
  },
  {
    name: "I miei preferiti",
    href: "/account/favorites",
    icon: <HeartIcon aria-hidden className="size-4.5 sm:size-6 lg:size-5" />,
  },
];

function SideNav() {
  return (
    <aside className="no-scrollbar sticky top-13 z-150 flex h-fit overflow-x-auto bg-white px-1 py-4 sm:top-16 sm:h-[calc(100vh-12vh)] sm:w-fit sm:px-5 sm:py-2 dark:bg-black">
      <nav className="grow">
        <ul className="_sm:text-sm flex h-full min-w-full snap-x scroll-pl-1 flex-row justify-center gap-2.5 text-base sm:flex-col sm:gap-1">
          <AccountNavLinks navLinks={navLinks} />

          <li className="mt-0 mb-0 snap-start sm:mt-auto sm:mb-4">
            <SignOut />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;

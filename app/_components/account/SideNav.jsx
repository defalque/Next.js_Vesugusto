import {
  BellIcon,
  ClipboardDocumentIcon,
  GiftIcon,
  HeartIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { SignOut } from "../ui/SignOut";
import AccountNavLinks from "./AccountNavLinks";

const navLinks = [
  {
    name: "Il mio profilo",
    href: "/account",
    icon: <UserIcon aria-hidden className="size-9 md:size-6 lg:size-5" />,
  },
  {
    name: "I miei ordini",
    href: "/account/orders",
    icon: (
      <ClipboardDocumentIcon
        aria-hidden
        className="size-9 md:size-6 lg:size-5"
      />
    ),
  },
  {
    name: "I miei preferiti",
    href: "/account/favorites",
    icon: <HeartIcon aria-hidden className="size-9 md:size-6 lg:size-5" />,
  },
  {
    name: "Carte regalo e buoni",
    href: "/account/gift-cards",
    icon: <GiftIcon aria-hidden className="size-9 md:size-6 lg:size-5" />,
  },
  {
    name: "Preferenze",
    href: "/account/preferences",
    icon: <BellIcon aria-hidden className="size-9 md:size-6 lg:size-5" />,
  },
  {
    name: "Supporto clienti",
    href: "/account/info",
    icon: (
      <InformationCircleIcon
        aria-hidden
        className="size-9 md:size-6 lg:size-5"
      />
    ),
  },
];

function SideNav() {
  return (
    <aside
      aria-label="Barra di navigazione account"
      className="no-scrollbar account-padding _top-12 z-150 flex h-fit overflow-x-auto bg-white mask-x-from-97% py-1 md:sticky md:top-18 md:min-h-[calc(100vh-24vh)] md:w-fit md:mask-none dark:bg-black"
    >
      <nav aria-label="Navigazione account" className="grow">
        <ul className="_min-w-full flex h-full w-full snap-x scroll-pl-1 flex-row justify-center gap-4 px-0.5 py-1 text-lg sm:text-base md:flex-col md:gap-2 md:py-0">
          <AccountNavLinks navLinks={navLinks} />

          <li className="_min-w-full mt-0 mb-0 snap-start md:mt-auto md:mb-4">
            <SignOut />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;

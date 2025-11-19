import {
  BellIcon,
  ClipboardDocumentIcon,
  GiftIcon,
  HeartIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import AccountNavLinks from "./AccountNavLinks";
import { Suspense } from "react";
import { AccountNavLinksSkeleton } from "../ui/skeleton/Skeletons";

const navLinks = [
  {
    name: "Il mio profilo",
    href: "/account",
    icon: <UserIcon aria-hidden className="size-6 md:size-5" />,
  },
  {
    name: "I miei ordini",
    href: "/account/orders",
    icon: <ClipboardDocumentIcon aria-hidden className="size-6 md:size-5" />,
  },
  {
    name: "I miei preferiti",
    href: "/account/favorites",
    icon: <HeartIcon aria-hidden className="size-6 md:size-5" />,
  },
  {
    name: "Carte regalo e buoni",
    href: "/account/gift-cards",
    icon: <GiftIcon aria-hidden className="size-6 md:size-5" />,
  },
  {
    name: "Preferenze",
    href: "/account/preferences",
    icon: <BellIcon aria-hidden className="size-6 md:size-5" />,
  },
  {
    name: "Supporto clienti",
    href: "/account/customer-service",
    icon: <InformationCircleIcon aria-hidden className="size-6 md:size-5" />,
  },
];

async function SideNav() {
  return (
    <aside
      aria-label="Barra di navigazione account"
      className="no-scrollbar md:min-h-[calc(100vh-24vh) sticky top-16 z-150 -ml-3 flex h-fit min-h-fit py-2 sm:ml-0 md:w-fit md:py-1 dark:bg-black"
    >
      <nav className="grow">
        <ul className="flex h-full w-full flex-col justify-center gap-4 px-0.5 py-1 text-lg sm:text-base md:gap-2 md:py-0">
          <Suspense fallback={<AccountNavLinksSkeleton />}>
            <AccountNavLinks navLinks={navLinks} />
          </Suspense>
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav;

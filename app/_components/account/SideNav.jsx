"use client";

import AccountNavLinks from "./AccountNavLinks";
import { Suspense } from "react";
import { AccountNavLinksSkeleton } from "../ui/skeleton/Skeletons";
import { navLinks } from "./SideNavLinks";
import * as m from "motion/react-m";

function SideNav() {
  return (
    <m.aside
      layout
      layoutRoot
      layoutScroll
      aria-label="Barra di navigazione account"
      className="no-scrollbar inset-y-19 z-150 flex min-h-svh w-12 sm:w-15 md:inset-y-24 md:w-56"
      style={{ position: "fixed" }}
    >
      <nav>
        <ul className="flex h-full w-full flex-col gap-4 px-0.5 py-1 text-lg sm:text-base md:gap-2 md:py-0">
          <Suspense fallback={<AccountNavLinksSkeleton />}>
            <AccountNavLinks navLinks={navLinks} />
          </Suspense>
        </ul>
      </nav>
    </m.aside>
  );
}

export default SideNav;

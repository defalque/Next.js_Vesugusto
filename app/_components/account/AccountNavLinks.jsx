"use client";

import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import NavLink from "../ui/header/NavLink";

import * as m from "motion/react-m";
import { LazyMotion, MotionConfig } from "motion/react";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { AccountNavLinksSkeleton } from "../ui/skeleton/Skeletons";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function AccountNavLinks({ navLinks }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);
  const shouldReduce = useReducedMotion();

  return (
    <div
      onMouseLeave={() => setActive(null)}
      className="space-y-4 md:space-y-2"
    >
      <LazyMotion features={loadFeatures}>
        <MotionConfig reducedMotion={shouldReduce ? "always" : "never"}>
          <Suspense fallback={<AccountNavLinksSkeleton />}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                aria-label={link.name || undefined}
                type="account"
                active={active}
                shouldReduce={shouldReduce}
                onMouseEnter={() => setActive(link.href)}
                onMouseLeave={() => setActive(link.href)}
              >
                <span>{link.icon}</span>
                <span className="hidden md:inline">{link.name}</span>
                {/* {pathname === link.href && (
                  <m.div
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    layoutId="bg"
                    className="absolute inset-0 -z-10 flex rounded-xl bg-black/10 md:hidden dark:bg-white/15"
                  />
                )} */}
                {!shouldReduce && active === link.href ? (
                  <m.div
                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                    layoutId="link"
                    className="bg-primary-800/10 absolute inset-0 -z-10 rounded-xl dark:bg-white/10"
                  ></m.div>
                ) : (
                  active === link.href && (
                    <div className="absolute inset-0 -z-10 rounded-xl bg-black/10 dark:bg-white/15"></div>
                  )
                )}
              </NavLink>
            ))}
          </Suspense>
        </MotionConfig>
      </LazyMotion>
    </div>
  );
}

export default AccountNavLinks;

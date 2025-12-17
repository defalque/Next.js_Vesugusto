"use client";

import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

import NavLink from "../ui/header/NavLink";

import * as m from "motion/react-m";
import { MotionConfig } from "motion/react";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { AccountNavLinksSkeleton } from "../ui/skeleton/Skeletons";

function AccountNavLinks({ navLinks }) {
  const pathname = usePathname();
  const [active, setActive] = useState(null);
  const shouldReduce = useReducedMotion();

  return (
    <div
      onMouseLeave={() => setActive(null)}
      className="space-y-4 md:space-y-2"
    >
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
              {!shouldReduce && active === link.href ? (
                <m.div
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  layoutId="link"
                  style={{ originX: 0 }}
                  className="absolute inset-0 -z-10 rounded-xl bg-black/5 dark:bg-white/10"
                ></m.div>
              ) : (
                active === link.href && (
                  <div className="absolute inset-0 -z-10 rounded-xl bg-black/5 dark:bg-white/10"></div>
                )
              )}
            </NavLink>
          ))}
        </Suspense>
      </MotionConfig>
    </div>
  );
}

export default AccountNavLinks;

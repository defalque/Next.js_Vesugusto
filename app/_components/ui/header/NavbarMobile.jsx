"use client";

import dynamic from "next/dynamic";
const ToggleNavbarMobile = dynamic(() => import("./ToggleNavbarMobile"), {
  ssr: false,
});

function NavbarMobile() {
  return (
    <nav aria-label="Menu principale (mobile)">
      <ToggleNavbarMobile />
    </nav>
  );
}

export default NavbarMobile;

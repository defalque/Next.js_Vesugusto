"use client";

import { useState } from "react";
import AccountHeader from "./AccountHeader";
import SideNavigation from "./SideNavigation";

function ToggleMenu({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="row-span-1 sm:row-span-full">
      <div className="_sm:h-[calc(100vh-5.6rem)] _md:h-[calc(100vh-6.6rem)] _h-full sticky sm:top-14 md:top-15">
        <SideNavigation isOpen={isOpen}>{children}</SideNavigation>
      </div>

      <div className="hidden sm:block">
        <AccountHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}

export default ToggleMenu;

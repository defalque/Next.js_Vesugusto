"use client";

import { useState } from "react";
import AccountHeader from "./AccountHeader";
import SideNavigation from "./SideNavigation";

function ToggleMenu({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SideNavigation isOpen={isOpen}>{children}</SideNavigation>
      <AccountHeader isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ToggleMenu;

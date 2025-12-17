import Logo from "../Logo";
import Navbar from "./Navbar";
import { MobileNavbarProvider } from "@/app/_contexts/MobileNavbarContext";
import ToggleNavbarMobile from "./ToggleNavbarMobile";
import MobileNavbarLinks from "./MobileNavbarLinks";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-200 h-14 bg-inherit">
      <nav className="page-padding mx-auto flex max-w-[95rem] items-center justify-between py-2">
        <Logo />

        <div className="flex items-center gap-1 md:gap-0">
          <Navbar />

          <MobileNavbarProvider>
            <ToggleNavbarMobile>
              <MobileNavbarLinks />
            </ToggleNavbarMobile>
          </MobileNavbarProvider>
        </div>
      </nav>
    </header>
  );
}

export default Header;

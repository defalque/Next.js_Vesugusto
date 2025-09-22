import Logo from "../Logo";
import Navbar from "./Navbar";
// import ToggleNavbarMobile from "./ToggleNavbarMobile";
import { MobileNavbarProvider } from "@/app/_contexts/MobileNavbarContext";
import ToggleNavbar from "./ToggleNavbar";
import MobileNavbarLinks from "./MobileNavbarLinks";

function Header() {
  return (
    <header
      role="banner"
      className="bg-primary-50 dark:bg-primary-dark-950 sticky top-0 left-0 z-150 flex items-center px-4 py-2 md:py-0"
    >
      <Logo complete />

      <div className="ml-auto">
        <nav
          aria-label="Menu principale (desktop)"
          className="_font-normal z-150 mx-auto w-full text-lg"
        >
          <Navbar />
        </nav>
      </div>

      <MobileNavbarProvider>
        <ToggleNavbar>
          <MobileNavbarLinks />
        </ToggleNavbar>
      </MobileNavbarProvider>
    </header>
  );
}

export default Header;

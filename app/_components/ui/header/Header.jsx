import Logo from "../Logo";
import Navbar from "./Navbar";
import { MobileNavbarProvider } from "@/app/_contexts/MobileNavbarContext";
import ToggleNavbar from "./ToggleNavbar";
import MobileNavbarLinks from "./MobileNavbarLinks";

function Header() {
  return (
    <header
      role="banner"
      className="sticky top-0 left-0 z-200 flex items-center bg-linear-10 from-gray-100 to-white px-4 py-2 md:py-0 dark:from-zinc-900 dark:to-zinc-950"
    >
      <Logo />

      <div className="ml-auto">
        <nav
          aria-label="Menu principale"
          className="z-150 mx-auto flex w-full items-baseline text-base"
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

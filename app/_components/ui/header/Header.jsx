import Logo from "../Logo";
import Navbar from "./Navbar";
import ToggleNavbarMobile from "./ToggleNavbarMobile";

function Header() {
  return (
    <header
      role="banner"
      className="bg-primary-50 dark:bg-primary-dark-950 sticky top-0 left-0 z-150 flex items-center px-4 py-2 md:py-0"
    >
      {/* <NavbarMobile /> */}

      <Logo complete />

      <div className="ml-auto">
        <nav
          aria-label="Menu principale (desktop)"
          className="z-150 mx-auto w-full text-lg font-normal"
        >
          <Navbar />
        </nav>
      </div>

      <ToggleNavbarMobile />
    </header>
  );
}

export default Header;

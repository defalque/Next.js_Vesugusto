import Logo from "../Logo";
import Navbar from "./Navbar";
import ToggleNavbarMobile from "./ToggleNavbarMobile";

function Header() {
  return (
    <header
      role="banner"
      className="bg-primary-50 dark:bg-primary-dark-950 sticky top-0 left-0 z-50 flex items-center px-4"
    >
      {/* <NavbarMobile /> */}
      <nav aria-label="Menu principale (mobile)">
        <ToggleNavbarMobile />
      </nav>

      <Logo complete />

      <div className="ml-auto flex gap-4 sm:gap-8 md:gap-16">
        <nav
          aria-label="Menu principale (desktop)"
          className="z-10 mx-auto w-full text-lg font-normal"
        >
          <Navbar />
        </nav>
      </div>
    </header>
  );
}

export default Header;

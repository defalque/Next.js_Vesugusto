import DarkModeToggle from "./DarkModeToggle";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className=" px-8 py-5 shadow-sm shadow-amber-700/20">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-4xl text-orange-950 dark:text-orange-400 tracking-wide">
          Vesugusto
        </p>
        <div className="flex gap-16">
          <Navigation></Navigation>
          <DarkModeToggle></DarkModeToggle>
        </div>
      </div>
    </header>
  );
}

export default Header;
